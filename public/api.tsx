import { NextApiRequest, NextApiResponse } from "next"; // Import tipe untuk request dan response API Next.js
import prisma from "@/lib/prisma"; // Import instance Prisma Client untuk interaksi database

// Definisikan tipe untuk MassMap (peta dari nama penyakit ke nilai belief)
type MassMap = Map<string, number>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Penanganan Metode HTTP
  if (req.method !== "POST") {
    // Pastikan hanya request POST yang diterima
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  // 2. Ekstraksi dan Validasi Input
  const { symptoms, userId }: { symptoms: string[]; userId: number } = req.body; // Ambil gejala dan userId dari body request

  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    // Validasi gejala: harus ada, array, dan tidak kosong
    return res.status(400).json({ message: "Symptoms array is required" });
  }

  if (!userId || typeof userId !== "number") {
    // Validasi userId: harus ada dan berupa angka
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // 3. Mengambil Data Gejala dari Database
    const symptomsData = await prisma.symptom.findMany({
      where: { code: { in: symptoms } }, // Cari gejala berdasarkan kode yang diterima
      include: { diseases: { include: { disease: true } } }, // Sertakan data penyakit yang terkait dengan gejala
    });

    if (symptomsData.length === 0) {
      // Jika tidak ada gejala yang cocok ditemukan
      return res.status(400).json({ message: "No matching symptoms found" });
    }

    // 4. Fungsi Pembantu untuk Dempster-Shafer

    // Fungsi untuk membuat belief mass dari 1 gejala
    function convertSymptomToMass(symptom: (typeof symptomsData)[0]): MassMap {
      const mass = new Map<string, number>();
      const total = symptom.diseases.reduce(
        (sum, ds) => sum + ds.probability,
        0
      ); // Hitung total probabilitas untuk normalisasi

      if (total === 0) return mass; // Hindari pembagian dengan nol

      symptom.diseases.forEach((ds) => {
        const prob = ds.probability / total; // Normalisasi probabilitas
        const name = ds.disease.name; // Ambil nama penyakit
        mass.set(name, prob); // Set belief mass untuk penyakit tersebut
      });

      return mass;
    }

    // Fungsi untuk menggabungkan dua belief mass (aturan kombinasi Dempster)
    function combineMasses(m1: MassMap, m2: MassMap): MassMap {
      const combined = new Map<string, number>(); // Peta untuk menyimpan hasil kombinasi
      let conflict = 0; // Inisialisasi nilai konflik

      m1.forEach((m1Val, d1) => {
        // Iterasi melalui mass m1
        m2.forEach((m2Val, d2) => {
          // Iterasi melalui mass m2
          const intersection = d1 === d2 ? d1 : null; // Tentukan irisan (penyakit yang sama)

          if (intersection) {
            const existing = combined.get(intersection) || 0;
            combined.set(intersection, existing + m1Val * m2Val); // Tambahkan produk belief jika ada irisan
          } else {
            conflict += m1Val * m2Val; // Jika tidak ada irisan, itu adalah konflik
          }
        });
      });

      if (conflict < 1) {
        // Jika tidak ada konflik total (konflik < 1), normalisasi hasilnya
        combined.forEach((val, key) => {
          combined.set(key, val / (1 - conflict));
        });
      }

      return combined;
    }

    // 5. Langkah Utama: Menghitung Belief Mass Gabungan

    // Inisialisasi combinedMass dengan belief mass dari gejala pertama
    let combinedMass = convertSymptomToMass(symptomsData[0]);

    // **Perulangan Utama (Loop Dempster-Shafer)**
    // Iterasi dari gejala kedua hingga terakhir untuk menggabungkan belief mass
    for (let i = 1; i < symptomsData.length; i++) {
      const nextMass = convertSymptomToMass(symptomsData[i]); // Buat belief mass untuk gejala berikutnya
      combinedMass = combineMasses(combinedMass, nextMass); // Gabungkan dengan combinedMass yang sudah ada
    }

    // 6. Menentukan Penyakit Paling Mungkin

    let mostLikelyDisease: string | null = null;
    let highestBelief = 0;
    combinedMass.forEach((val, key) => {
      // Iterasi melalui combinedMass untuk menemukan penyakit dengan belief tertinggi
      if (val > highestBelief) {
        highestBelief = val;
        mostLikelyDisease = key;
      }
    });

    const mostLikelyDiseaseRecord = mostLikelyDisease
      ? await prisma.disease.findUnique({ where: { name: mostLikelyDisease } }) // Ambil detail penyakit paling mungkin dari DB
      : null;

    const mostLikelyDiseaseId = mostLikelyDiseaseRecord?.id ?? undefined;

    // 7. Menyimpan Hasil Konsultasi ke Database

    await prisma.consultation.create({
      data: {
        userId,
        userInput: symptoms, // Gejala yang dimasukkan pengguna
        diseaseId: mostLikelyDiseaseId, // ID penyakit paling mungkin
        results: Object.fromEntries(combinedMass), // Semua hasil belief mass yang digabungkan
      },
    });

    // 8. Mengambil Konsultasi Terbaru untuk Respon

    const latestConsultation = await prisma.consultation.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Ambil konsultasi terbaru
      include: {
        disease: {
          select: {
            name: true,
            image: true,
            solutions: {
              select: {
                solution: {
                  select: { description: true },
                },
              },
            },
          },
        },
      },
    });

    if (!latestConsultation) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "No consultations found for this user",
      });
    }

    // 9. Mengolah Hasil untuk Respon API

    const results = latestConsultation.results;
    let highestDisease = "Unknown";
    let highestValue = 0;
    let highestImage = "";
    const otherDiseases = []; // Array untuk penyakit lain dengan belief value

    if (results && typeof results === "object" && !Array.isArray(results)) {
      // Loop untuk memisahkan penyakit dengan belief tertinggi dan penyakit lainnya
      for (const [disease, value] of Object.entries(results)) {
        if (typeof value === "number") {
          if (value > highestValue) {
            // Jika nilai saat ini lebih tinggi dari highestValue, maka ini menjadi penyakit tertinggi baru
            if (highestDisease !== "Unknown") {
              // Pindahkan penyakit tertinggi sebelumnya ke 'otherDiseases' jika bukan 'Unknown'
              otherDiseases.push({ name: highestDisease, value: highestValue });
            }
            highestDisease = disease;
            highestValue = value;
            highestImage = latestConsultation.disease?.image || "";
          } else {
            // Jika tidak lebih tinggi, tambahkan ke 'otherDiseases'
            otherDiseases.push({ name: disease, value });
          }
        }
      }
    }

    // 10. Mengirim Respon Sukses

    return res.status(200).json({
      success: true,
      data: {
        id: latestConsultation.id,
        createdAt: latestConsultation.createdAt,
        disease: {
          name: highestDisease,
          value: highestValue,
          image: highestImage,
        },
        otherDiseases,
        solutions:
          latestConsultation.disease?.solutions.map(
            (s) => s.solution.description
          ) || [],
        userInput: latestConsultation.userInput,
      },
    });
  } catch (error) {
    // 11. Penanganan Error
    console.error("Error in disease diagnosis:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

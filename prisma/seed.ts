import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.consultation.deleteMany();
  await prisma.diseaseSymptom.deleteMany();
  await prisma.symptom.deleteMany();
  await prisma.disease.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.solution.deleteMany();
  await prisma.diseaseSolution.deleteMany();

  // Create roles
  await prisma.role.createMany({
    data: [{ name: 'Admin' }, { name: 'User ' }],
  });

  const hashedPassword = await bcrypt.hash('password123', 10);
  // Create users
  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        email: 'admin@mail.com',
        password: hashedPassword,
        roleId: 1, // Admin role
      },
      {
        username: 'user1',
        email: 'user@mail.com',
        password: hashedPassword,
        roleId: 2, // User role
      },
    ],
  });

  // Create diseases
  const diseases = await prisma.disease.createMany({
    data: [
      {
        name: 'Penyakit Blas Daun',
        description:
          'Penyakit blas yang disebabkan oleh jamur Magnaporthe oryzae adalah salah satu penyakit paling destruktif pada tanaman padi di dunia. Infeksi biasanya dimulai dengan bercak berbentuk belah ketupat pada daun, yang kemudian berkembang menjadi luka necrotic besar. Jika menyerang batang atau leher malai, penyakit ini dapat menyebabkan malai tidak menghasilkan bulir padi yang sempurna. Penyakit ini berkembang pesat di lingkungan dengan suhu yang fluktuatif, kelembapan tinggi, dan sirkulasi udara yang buruk. Dampaknya sangat signifikan',
        image: 'penyakit_blas_daun.jpg',
      },
      {
        name: 'Penyakit Blas Leher',
        description:
          'Penyakit blas yang disebabkan oleh jamur Magnaporthe oryzae adalah salah satu penyakit paling destruktif pada tanaman padi di dunia. Infeksi biasanya dimulai dengan bercak berbentuk belah ketupat pada daun, yang kemudian berkembang menjadi luka necrotic besar. Jika menyerang batang atau leher malai, penyakit ini dapat menyebabkan malai tidak menghasilkan bulir padi yang sempurna. Penyakit ini berkembang pesat di lingkungan dengan suhu yang fluktuatif, kelembapan tinggi, dan sirkulasi udara yang buruk. Dampaknya sangat signifikan',
        image: 'penyakit_blas_leher.jpg',
      },
      {
        name: 'Penyakit Bercak Semit',
        description: 'A bacterial disease causing wilting and yellowing of leaves.',
        image: 'penyakit_bercak_semit.jpg',
      },
      {
        name: 'Penyakit Hawar Pelepah',
        description: 'A fungal disease causing brown spots on leaves.',
        image: 'penyakit_hawar_pelepah.jpg',
      },
      {
        name: 'Penyakit Busuk Pelepah',
        description: 'A fungal disease causing brown spots on leaves.',
        image: 'penyakit_busuk_pelepah.jpg',
      },
      {
        name: 'Hawar Daun Bakteri',
        description: 'A fungal disease causing brown spots on leaves.',
        image: 'hawar_daun_bakteri.jpg',
      },
      {
        name: 'Bacterial Red Stripe',
        description: 'A fungal disease causing brown spots on leaves.',
        image: 'bacterial_red_stripe.jpg',
      },
      {
        name: 'Bacterial Leaf Streak',
        description: 'A fungal disease causing brown spots on leaves.',
        image: 'bacterial_leaf_streak.jpg',
      },
      {
        name: 'Penyakit Kerdil Hampa',
        description: 'A fungal disease causing brown spots on leaves.',
        image: 'penyakit_kerdil_hampa.jpg',
      },
      {
        name: 'Penyakit Kerdil Rumput Tipe 1',
        description: 'A fungal disease causing brown spots on leaves.',
        image: 'penyakit_kerdil_rumput_tipe_1.jpg',
      },
      {
        name: 'Penyakit Kerdil Rumput Tipe 2',
        description: 'A fungal disease causing brown spots on leaves.',
        image: 'penyakit_kerdil_rumput_tipe_2.jpg',
      },
      {
        name: 'Penyakit Kerdil Tungro',
        description: 'A fungal disease causing brown spots on leaves.',
        image: 'penyakit_kerdil_tungro.jpg',
      },
    ],
  });

  // Create symptoms
  const symptoms = await prisma.symptom.createMany({
    data: [
      {
        code: 'G01',
        description: 'Munculnya bercak berwarna coklat abu dan kuning dengan bentuk bulat ujung runcing atau menyerupai bentuk belah ketupat',
      },
      {
        code: 'G02',
        description: 'Pada tengah-tengah terdapat bercak berwarna putih',
      },
      {
        code: 'G03',
        description: 'Pada pangkal malai terdapat bercak berwarna coklat kehitaman pada leher malai, sehingga mengakibatkan malai menjadi patah dan roboh',
      },
      {
        code: 'G04',
        description: 'Pada daun hingga pelepah terdapat bercak pendek sempit seperti garis-garis berwarna coklat dengan variasi warna dari coklat terang hingga coklat gelap',
      },
      {
        code: 'G05',
        description: 'Terdapat bercak pada pelepah daun yang mula-mula berwarna kelabu kehijau-hijauan, berbentuk oval atau elips dengan panjang 1–3 cm',
      },
      {
        code: 'G06',
        description: 'Pada pusat bercak warna menjadi putih keabu-abuan dengan tepi berwarna coklat',
      },
      {
        code: 'G07',
        description: 'Terdapat bercak pada pelepah yang berukuran 0.5 Cm—1,5 Cm',
      },
      {
        code: 'G08',
        description: 'Warna abu abu di bagian tengah dan coklat abu dipinggirnya.',
      },
      {
        code: 'G09',
        description: 'Bercak dapat melebar menutupi seluruh permukaan pelepah daun, mengakibatkan malai tidak muncul atau muncul sebagian',
      },
      {
        code: 'G10',
        description: 'Mula-mula pada tepi daun tampak garis bercak kebasahan, kemudian berkembang meluas, berwarna hijau keabu-abuan, seluruh daun keriput, dan akhirnya kering seperti hawar dan layu seperti tersiram air panas',
      },
      {
        code: 'G11',
        description: 'Pada daun tampak bergaris berwarna merah kekuningan',
      },
      {
        code: 'G12',
        description: 'Pelepah daun saat pembungaan menjadi tidak serempak sehingga pematangan bulir menjadi tidak serempak',
      },
      {
        code: 'G13',
        description: 'Terdapat bercak kecil berwarna jingga, yang timbul di mana saja pada helaian daun mirip gejala hawar',
      },
      {
        code: 'G14',
        description: 'Pertumbuhan tanaman kerdil',
      },
      {
        code: 'G15',
        description: 'Jumlah anakan banyak',
      },
      {
        code: 'G16',
        description: 'Tepi daun bergerigi (ragged) dan berlekuk-lekuk atau sobek- sobek, daun hijau pendek, sempit',
      },
      {
        code: 'G17',
        description: 'Kekuningan (klorosis) terjadi pembengkakan tulang daun atau pembentukan puru yang berwarna kuning pucat sampai coklat serta terjadi pembelitan daun (twisting)',
      },
      {
        code: 'G18',
        description: 'Malai tidak dapat keluar dengan sempurna dan gabahnya hampa',
      },
      {
        code: 'G19',
        description: 'Pada daun tanaman padi yang terserang virus ini akan menjadi sempit',
      },
      {
        code: 'G20',
        description: 'Tanaman akan pendek, kaku',
      },
      {
        code: 'G21',
        description: 'Daun berwarna hijau kekuningan',
      },
      {
        code: 'G22',
        description: 'Penuh dengan bercak coklat pada permukaan daun seperti karat',
      },
      {
        code: 'G23',
        description: 'Tanaman menjadi sangat kerdil',
      },
      {
        code: 'G24',
        description: 'Daun hijau pucat sampai kuning atau daun-daun sempit berwarna kuning sampai oranye',
      },
      {
        code: 'G25',
        description: 'Daun sempit dengan bintik-bintik karat kecil',
      },
      {
        code: 'G26',
        description: 'Pada daun muda terjadi perubahan warna menjadi kuning oranye.',
      },
      {
        code: 'G27',
        description: 'Daun muda agak menggulung',
      },
      {
        code: 'G28',
        description: 'Jumlah anakan berkurang',
      },
      {
        code: 'G29',
        description: 'Tanaman kerdil dan pertumbuhan terhambat',
      },
    ],
  });

  // Create solutions
  const solutions = await prisma.solution.createMany({
    data: [
      { description: 'Use resistant varieties of rice.' },
      { description: 'Apply fungicides as a preventive measure.' },
      { description: 'Practice crop rotation to reduce disease incidence.' },
      { description: 'Ensure proper drainage to prevent waterlogging.' },
      { description: 'Implement integrated pest management strategies.' },
    ],
  });

  // Create disease-symptom relationships
  const diseaseSymptoms = await prisma.diseaseSymptom.createMany({
    data: [
      { diseaseId: 1, symptomId: 1, probability: 0.8 },
      { diseaseId: 1, symptomId: 2, probability: 0.7 },
      { diseaseId: 1, symptomId: 3, probability: 0.6 },
      { diseaseId: 1, symptomId: 4, probability: 0.5 },
      { diseaseId: 1, symptomId: 5, probability: 0.4 },
      { diseaseId: 2, symptomId: 3, probability: 0.7 },
      { diseaseId: 2, symptomId: 2, probability: 0.9 },
      { diseaseId: 2, symptomId: 6, probability: 0.8 },
      { diseaseId: 2, symptomId: 7, probability: 0.6 },
      { diseaseId: 3, symptomId: 3, probability: 0.85 },
      { diseaseId: 3, symptomId: 4, probability: 0.75 },
      { diseaseId: 3, symptomId: 5, probability: 0.65 },
      { diseaseId: 4, symptomId: 1, probability: 0.9 },
      { diseaseId: 4, symptomId: 6, probability: 0.7 },
      { diseaseId: 4, symptomId: 8, probability: 0.6 },
      { diseaseId: 5, symptomId: 2, probability: 0.8 },
      { diseaseId: 5, symptomId: 3, probability: 0.7 },
      { diseaseId: 5, symptomId: 9, probability: 0.5 },
      { diseaseId: 6, symptomId: 4, probability: 0.85 },
      { diseaseId: 6, symptomId: 5, probability: 0.75 },
      { diseaseId: 6, symptomId: 10, probability: 0.65 },
      { diseaseId: 7, symptomId: 1, probability: 0.8 },
      { diseaseId: 7, symptomId: 11, probability: 0.7 },
      { diseaseId: 7, symptomId: 12, probability: 0.6 },
      { diseaseId: 8, symptomId: 2, probability: 0.9 },
      { diseaseId: 8, symptomId: 3, probability: 0.8 },
      { diseaseId: 8, symptomId: 13, probability: 0.7 },
      { diseaseId: 9, symptomId: 14, probability: 0.85 },
      { diseaseId: 9, symptomId: 15, probability: 0.75 },
      { diseaseId: 10, symptomId: 16, probability: 0.8 },
      { diseaseId: 10, symptomId: 17, probability: 0.7 },
      { diseaseId: 11, symptomId: 18, probability: 0.85 },
      { diseaseId: 11, symptomId: 19, probability: 0.75 },
      { diseaseId: 12, symptomId: 20, probability: 0.9 },
      { diseaseId: 12, symptomId: 21, probability: 0.8 },
    ],
  });

  // Create disease-solution relationships
  const diseaseSolutions = await prisma.diseaseSolution.createMany({
    data: [
      { diseaseId: 1, solutionId: 1 },
      { diseaseId: 1, solutionId: 2 },
      { diseaseId: 2, solutionId: 1 },
      { diseaseId: 2, solutionId: 3 },
      { diseaseId: 3, solutionId: 4 },
      { diseaseId: 4, solutionId: 5 },
      { diseaseId: 5, solutionId: 1 },
      { diseaseId: 6, solutionId: 2 },
      { diseaseId: 7, solutionId: 3 },
      { diseaseId: 8, solutionId: 4 },
      { diseaseId: 9, solutionId: 5 },
      { diseaseId: 10, solutionId: 1 },
      { diseaseId: 11, solutionId: 2 },
      { diseaseId: 12, solutionId: 3 },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

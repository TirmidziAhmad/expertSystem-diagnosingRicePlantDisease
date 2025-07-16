import CardMenu from "../../../fragments/CardMenu";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import Image from "next/image";

const TentangLayout = () => {
  return (
    <div className="flex min-h-screen ">
      <CardMenu />
      <main className="flex-1 p-6 sm:ml-[260px]">
        <Navbar title="Tentang Sistem" />
        <div className="mt-20 flex flex-row justify-center items-center ">
          <Image width={80} height={80} src="/logo.svg" alt="Logo" />
          <h1 className="text-6xl font-bold text-olive mt-4">ESRDP</h1>
        </div>
        <div className=" mt-10 flex flex-col justify-center items-start ">
          <h2 className="font-bold text-xl mt-10">Deskripsi Sistem</h2>
          <p className="mt-2 leading-relaxed text-justify">
            Expert System for Rice Disease Prediction (ESRDP) adalah sebuah
            sistem pakar berbasis web yang dirancang untuk membantu petani,
            penyuluh pertanian, atau pengguna umum dalam mendiagnosis penyakit
            yang menyerang tanaman padi. Sistem ini bekerja dengan menggabungkan
            informasi gejala-gejala yang diamati di lapangan dan menggunakan
            metode <strong>Dempster-Shafer</strong> untuk menghitung kemungkinan
            penyakit yang paling mungkin terjadi. Dengan adanya sistem ini,
            diharapkan pengguna dapat mengambil tindakan lebih cepat dan tepat
            dalam menangani permasalahan pada tanaman padi.
          </p>
        </div>
        <div className=" mt-6 flex flex-col justify-center items-start ">
          <h2 className="font-bold text-xl mt-6">Cara Menggunakan Sistem</h2>
          <p className="mt-2 leading-relaxed text-justify">
            Berikut langkah-langkah menggunakan sistem ESRDP:
            <br />
            <br />
            <strong>1. Login atau Registrasi</strong>
            <br />
            Pengguna dapat masuk ke dalam sistem menggunakan akun yang telah
            terdaftar atau membuat akun baru terlebih dahulu.
            <br />
            <br />
            <strong>2. Pilih Menu Diagnosa</strong>
            <br />
            Setelah berhasil login, pengguna dapat menuju menu Diagnosa untuk
            memulai proses diagnosis.
            <br />
            <br />
            <strong>3. Pilih Gejala</strong>
            <br />
            Pengguna diminta memilih gejala-gejala yang muncul pada tanaman padi
            yang dimilikinya. Pilih semua gejala yang sesuai dengan kondisi
            lapangan.
            <br />
            <br />
            <strong>4. Lihat Hasil Diagnosis</strong>
            <br />
            Sistem akan memproses informasi gejala yang diberikan dan
            menampilkan hasil kemungkinan penyakit beserta tingkat keyakinannya.
            <br />
            <br />
            <strong>5. Solusi</strong>
            <br />
            Bersamaan dengan hasil diagnosis, sistem juga akan menampilkan saran
            atau solusi penanganan berdasarkan jenis penyakit yang terdeteksi.
          </p>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default TentangLayout;

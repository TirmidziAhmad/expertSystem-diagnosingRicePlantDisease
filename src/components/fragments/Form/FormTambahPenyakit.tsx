import InputLabel from "../../elements/InputElement/InputLabel";
import AcceptedFiles from "../../elements/AcceptedFiles";

const TambahPenyakit = () => {
  return (
    <div>
        <InputLabel label="Nama Penyakit" placeholder="Masukkan nama penyakit" />
        <InputLabel label="Deskripsi Penyakit" placeholder="Masukkan deskripsi penyakit" />
        <InputLabel label="Cara Pengendali Penyakit" placeholder="Masukkan cara pengendalian penyakit" />
        <AcceptedFiles />
    </div>
  );
};

export default TambahPenyakit;

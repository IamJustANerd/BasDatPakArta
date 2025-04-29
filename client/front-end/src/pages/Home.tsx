import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-light w-full min-h-screen overflow-clip px-[6rem]">
      <div className="h-[10rem]">

      </div>
      {/* Title */}
      <div className="text-[72px] text-center">
        Selamat Datang di Database Sekolah X!
      </div>

      {/* Description */}
      <div className="text-[30px] text-justify">
        Silahkan pilih tombol sesuai keperluan. Jika terdapat pertanyaan atau mengalami kendala, mohon segera hubungi Mikel dengan nomor: 112233.
      </div>

      {/* Buttons untuk navigasi */}
      <div className="flex flex-col w-full items-center gap-[5rem] py-[10rem] font-semibold">
        <a href="/InputSiswaBaru">
          <button className="bg-orange hover:bg-light_orange text-light py-2 px-4 rounded w-[15rem] h-[3rem]">
            Input Siswa Baru
          </button>
        </a>
        <a href="/InputNilaiSiswa">
          <button className="bg-orange hover:bg-light_orange text-light py-2 px-4 rounded w-[15rem] h-[3rem]">
            Input Nilai Siswa
          </button>
        </a>
        <a href="/InputProjectBaru">
          <button className="bg-orange hover:bg-light_orange text-light py-2 px-4 rounded w-[15rem] h-[3rem]">
            Input Project Baru
          </button>
        </a>
        <a href="/CekNilaiSiswa">
          <button className="bg-orange hover:bg-light_orange text-light py-2 px-4 rounded w-[15rem] h-[3rem]">
            Cek Nilai Siswa
          </button> 
        </a>
      </div>
    </main>
  );
};

export default Home;

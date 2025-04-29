import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface MataPelajaran {
  id: number;
  nama: string;
}

interface Murid {
  id: number;
  nama: string;
}

interface SubAspek {
  id: number;
  nama: string;
  jumlah_kesalahan: number;
}

interface Aspek {
  id: number;
  nama: string;
  sub_aspek: SubAspek[];
}

interface Chapter {
  id: number;
  nama: string;
  aspek: Aspek[];
}

interface Project {
  id: number;
  nama: string;
  chapters: Chapter[];
}

const InputNilaiSiswa: React.FC = () => {
  const [mataPelajaranList, setMataPelajaranList] = useState<MataPelajaran[]>([]);
  const [muridList, setMuridList] = useState<Murid[]>([]);

  const [selectedMataPelajaranId, setSelectedMataPelajaranId] = useState<number | null>(null);
  const [selectedMuridId, setSelectedMuridId] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const [nilaiTugas, setNilaiTugas] = useState<number>(0);
  const [nilaiETS, setNilaiETS] = useState<number>(0);
  const [nilaiEAS, setNilaiEAS] = useState<number>(0);

  const [projectList, setProjectList] = useState<Project[]>([]);
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<Project | null>(null);

  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3000/mataPelajaran')
      .then(response => setMataPelajaranList(response.data))
      .catch(error => console.error('Gagal memuat mata pelajaran:', error));
  }, []);

  useEffect(() => {
    if (selectedMataPelajaranId !== null) {
      axios.get('http://localhost:3000/murid')
        .then(response => setMuridList(response.data))
        .catch(error => console.error('Gagal memuat murid:', error));

      axios.get(`http://localhost:3000/project/by-mataPelajaran/${selectedMataPelajaranId}`)
        .then(response => setProjectList(response.data))
        .catch(error => console.error('Gagal memuat project:', error));
    }
  }, [selectedMataPelajaranId]);

  useEffect(() => {
    if (selectedProjectId !== null) {
      axios.get(`http://localhost:3000/project/${selectedProjectId}/detail`)
        .then(response => setSelectedProjectDetail(response.data))
        .catch(error => console.error('Gagal memuat detail project:', error));
    }
  }, [selectedProjectId]);

  const updateJumlahKesalahan = (chapterIndex: number, aspekIndex: number, subIndex: number, value: number) => {
    if (!selectedProjectDetail) return;
    const updated = { ...selectedProjectDetail };
    updated.chapters[chapterIndex].aspek[aspekIndex].sub_aspek[subIndex].jumlah_kesalahan = value;
    setSelectedProjectDetail(updated);
  };

  const handleSubmit = async () => {
    if (!selectedMuridId || !selectedProjectDetail || !selectedMataPelajaranId) {
      setMessage("Lengkapi semua data terlebih dahulu.");
      return;
    }

    const nilaiEntry = {
      murid_id: selectedMuridId,
      nilai_tugas: nilaiTugas,
      nilai_ets: nilaiETS,
      nilai_eas: nilaiEAS,
      project: selectedProjectDetail,
    };

    try {
      await axios.put(`http://localhost:3000/mataPelajaran/${selectedMataPelajaranId}/nilai`, nilaiEntry);
      setMessage("Nilai berhasil disimpan.");
    } catch (error) {
      console.error("Gagal menyimpan nilai:", error);
      setMessage("Gagal menyimpan nilai.");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Input Nilai Siswa</h2>

      <label className="block">Pilih Mata Pelajaran:</label>
      <select
        className="w-full border p-2"
        onChange={e => setSelectedMataPelajaranId(Number(e.target.value))}
        value={selectedMataPelajaranId ?? ''}
      >
        <option value="">-- Pilih --</option>
        {mataPelajaranList.map(mp => (
          <option key={mp.id} value={mp.id}>{mp.nama}</option>
        ))}
      </select>

      {selectedMataPelajaranId && (
        <>
          <label className="block">Pilih Murid:</label>
          <select
            className="w-full border p-2"
            onChange={e => setSelectedMuridId(Number(e.target.value))}
            value={selectedMuridId ?? ''}
          >
            <option value="">-- Pilih --</option>
            {muridList.map(m => (
              <option key={m.id} value={m.id}>{m.nama}</option>
            ))}
          </select>
        </>
      )}

      {selectedMuridId && (
        <div className="space-y-4">
          <div>
            <label className="block">Nilai Tugas:</label>
            <input
              type="number"
              value={nilaiTugas}
              onChange={e => setNilaiTugas(Number(e.target.value))}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block">Nilai ETS:</label>
            <input
              type="number"
              value={nilaiETS}
              onChange={e => setNilaiETS(Number(e.target.value))}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block">Nilai EAS:</label>
            <input
              type="number"
              value={nilaiEAS}
              onChange={e => setNilaiEAS(Number(e.target.value))}
              className="w-full border p-2"
            />
          </div>

          <div>
            <label className="block">Pilih Project:</label>
            <select
              className="w-full border p-2"
              onChange={e => setSelectedProjectId(Number(e.target.value))}
              value={selectedProjectId ?? ''}
            >
              <option value="">-- Pilih Project --</option>
              {projectList.map(p => (
                <option key={p.id} value={p.id}>{p.nama}</option>
              ))}
            </select>
          </div>

          {selectedProjectDetail && selectedProjectDetail.chapters.map((chapter, cIdx) => (
            <div key={chapter.id} className="border rounded p-3 bg-gray-50 mt-4">
              <h3 className="font-semibold">Chapter: {cIdx + 1}</h3>
              {chapter.aspek.map((aspek, aIdx) => (
                <div key={aspek.id} className="ml-4 mt-2">
                  <p className="font-medium">Aspek: {aspek.nama}</p>
                  {aspek.sub_aspek.map((sub, sIdx) => (
                    <div key={sub.id} className="ml-4 mt-1">
                      <label className="block text-sm">
                        Sub-Aspek: {sub.nama}
                      </label>
                      <input
                        type="number"
                        value={sub.jumlah_kesalahan ?? 0}
                        onChange={(e) => updateJumlahKesalahan(cIdx, aIdx, sIdx, Number(e.target.value))}
                        className="w-full border p-1"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
      >
        Simpan Nilai
      </button>

      {message && <p className="text-center text-green-600 font-semibold">{message}</p>}
    </div>
  );
};

export default InputNilaiSiswa;
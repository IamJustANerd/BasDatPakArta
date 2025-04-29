import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface Murid {
  id: number;
  nama: string;
}

interface MataPelajaran {
  id: number;
  nama: string;
  nilai?: NilaiData[]; // Add nilai field to mataPelajaran interface
}

interface Project {
  id: number;
  nama: string;
}

interface NilaiChapter {
  chapter_id: number;
  chapter_nama: string;
  total_kesalahan: number;
  total_nilai: number;
  nilai_bobot: number;
  predikat: string;
}

interface NilaiData {
  project: {
    id: number;
    nama: string;
    chapters: {
      id: number;
      aspek: {
        id: number;
        nama: string;
        sub_aspek: {
          id: number;
          nama: string;
          aspek_id: number;
          jumlah_kesalahan: number;
        }[];
        chapter_id: number;
        total_kesalahan: number;
      }[];
      project_id: number;
      bobot_chapter: number;
      predikat_chapter: string;
      total_kesalahan_aspek: number;
    }[];
  };
  murid_id: number;
  nilai_eas: number;
  nilai_ets: number;
  nilai_tugas: number;
}

const CekNilaiSiswa: React.FC = () => {
  const [muridList, setMuridList] = useState<Murid[]>([]);
  const [mataPelajaranList, setMataPelajaranList] = useState<MataPelajaran[]>([]);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState({
    murid: false,
    mataPelajaran: false,
    projects: false,
    nilai: false
  });
  const [error, setError] = useState<string | null>(null);

  const [selectedMuridId, setSelectedMuridId] = useState<number | null>(null);
  const [selectedMataPelajaranId, setSelectedMataPelajaranId] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const [nilaiChapters, setNilaiChapters] = useState<NilaiChapter[]>([]);

  function ProjectNama({ projectId }: { projectId: number }) {
    const [namaProject, setNamaProject] = useState('');

    useEffect(() => {
      const fetchProject = async () => {
        try {
          const response = await fetch(`/api/project/${projectId}`);
          const data = await response.json();
          setNamaProject(data.nama);
        } catch (error) {
          console.error('Gagal mengambil project:', error);
          setNamaProject('Tidak ditemukan');
        }
      };

      fetchProject();
    }, [projectId]);

    return <span>{namaProject}</span>;
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(prev => ({...prev, murid: true, mataPelajaran: true}));
        setError(null);
        
        const [muridRes, mataPelajaranRes] = await Promise.all([
          axios.get<Murid[]>('http://localhost:3000/murid'),
          axios.get<MataPelajaran[]>('http://localhost:3000/mataPelajaran')
        ]);
        
        setMuridList(muridRes.data);
        setMataPelajaranList(mataPelajaranRes.data);
      } catch (err) {
        setError('Gagal memuat data awal. Silakan coba lagi.');
        console.error('Failed to fetch initial data:', err);
      } finally {
        setIsLoading(prev => ({...prev, murid: false, mataPelajaran: false}));
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
  const fetchProjects = async () => {
    if (selectedMuridId && selectedMataPelajaranId) {
      try {
        console.log('Fetching projects for:', { selectedMuridId, selectedMataPelajaranId });
        setIsLoading(prev => ({ ...prev, projects: true }));
        setError(null);

        const mataPelajaran = mataPelajaranList.find(mp => mp.id === selectedMataPelajaranId);
        console.log('Found mataPelajaran:', mataPelajaran);

        if (!mataPelajaran?.nilai) {
          console.warn('No nilai data found for mata pelajaran');
          setError('Data nilai tidak ditemukan untuk mata pelajaran ini');
          return;
        }

        console.log('All nilai data:', mataPelajaran.nilai);
        
        const filteredForMurid = mataPelajaran.nilai.filter(item => item.murid_id === selectedMuridId);
        console.log('Filtered for murid:', filteredForMurid);

        const uniqueProjects = filteredForMurid.filter((item, index, self) => 
          index === self.findIndex(p => p.project.id === item.project.id)
        );
        console.log('Unique projects:', uniqueProjects);

        const projectList = uniqueProjects.map(item => ({
          id: item.project.id,
          nama: item.project.nama
        }));
        console.log('Final project list:', projectList);

        setProjectList(projectList);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Gagal memuat daftar project. Silakan coba lagi.');
      } finally {
        setIsLoading(prev => ({ ...prev, projects: false }));
      }
    }
  };

  fetchProjects();
}, [selectedMuridId, selectedMataPelajaranId, mataPelajaranList]);


  useEffect(() => {
    const fetchNilai = async () => {
      if (selectedMuridId && selectedProjectId && selectedMataPelajaranId) {
        try {
          setIsLoading(prev => ({...prev, nilai: true}));
          setError(null);
          
          // Get the selected mata pelajaran
          const mataPelajaran = mataPelajaranList.find(mp => mp.id === selectedMataPelajaranId);
          
          if (!mataPelajaran?.nilai) {
            setError('Data nilai tidak ditemukan');
            return;
          }

          // Find the specific project's nilai data for this student
          const nilaiData = mataPelajaran.nilai.find(
            item => item.murid_id === selectedMuridId && item.project.id === selectedProjectId
          );

          if (!nilaiData) {
            setError('Data nilai tidak ditemukan untuk project ini');
            return;
          }

          // Transform the data into NilaiChapter format
          const chapters: NilaiChapter[] = nilaiData.project.chapters.map(chapter => ({
            chapter_id: chapter.id,
            chapter_nama: chapter.aspek[0]?.nama || `Chapter ${chapter.id}`,
            total_kesalahan: chapter.total_kesalahan_aspek,
            total_nilai: calculateTotalNilai(chapter),
            nilai_bobot: chapter.bobot_chapter,
            predikat: chapter.predikat_chapter
          }));

          setNilaiChapters(chapters);
        } catch (err) {
          setError('Gagal memuat nilai. Silakan coba lagi.');
          console.error('Failed to fetch nilai:', err);
        } finally {
          setIsLoading(prev => ({...prev, nilai: false}));
        }
      }
    };

    const calculateTotalNilai = (chapter: any): number => {
      // Implement your calculation logic here
      // Example: 100 - total errors
      return 100 - (chapter.total_kesalahan_aspek || 0);
    };

    fetchNilai();
  }, [selectedMuridId, selectedProjectId, selectedMataPelajaranId, mataPelajaranList]);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Cek Nilai Siswa</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {/* Student selection dropdown */}
      <div>
        <label className="block">Pilih Murid:</label>
        <select
          className="w-full border p-2"
          onChange={e => {
            setSelectedMuridId(Number(e.target.value));
            setSelectedMataPelajaranId(null);
            setSelectedProjectId(null);
            setNilaiChapters([]);
            setError(null);
          }}
          value={selectedMuridId ?? ''}
          disabled={isLoading.murid}
        >
          <option key="murid-default" value="">-- Pilih Murid --</option>
          {muridList.map(m => (
            <option key={`murid-${m.id}`} value={m.id}>{m.nama}</option>
          ))}
        </select>
        {isLoading.murid && <p className="text-sm text-gray-500">Memuat data murid...</p>}
      </div>

      {/* Subject selection dropdown */}
      {selectedMuridId && (
        <div>
          <label className="block">Pilih Mata Pelajaran:</label>
          <select
            className="w-full border p-2"
            onChange={e => {
              setSelectedMataPelajaranId(Number(e.target.value));
              setSelectedProjectId(null);
              setNilaiChapters([]);
              setError(null);
            }}
            value={selectedMataPelajaranId ?? ''}
            disabled={isLoading.mataPelajaran}
          >
            <option key="mapel-default" value="">-- Pilih Mata Pelajaran --</option>
            {mataPelajaranList.map(mp => (
              <option key={`mapel-${mp.id}`} value={mp.id}>{mp.nama}</option>
            ))}
          </select>
          {isLoading.mataPelajaran && <p className="text-sm text-gray-500">Memuat data mata pelajaran...</p>}
        </div>
      )}

      {/* Project selection dropdown */}
      {selectedMuridId && selectedMataPelajaranId && (
        <div>
          <label className="block">Pilih Project:</label>
          <select
            className="w-full border p-2"
            onChange={e => setSelectedProjectId(Number(e.target.value))}
            value={selectedProjectId ?? ''}
            disabled={isLoading.projects || projectList.length === 0}
          >
            <option key="project-default" value="">-- Pilih Project --</option>
            {projectList.map(p => (
              <option key={`project-${p.id}`} value={p.id}>{p.nama}</option>
            ))}
          </select>
          {isLoading.projects && <p className="text-sm text-gray-500">Memuat daftar project...</p>}
          {!isLoading.projects && projectList.length === 0 && (
            <p className="text-sm text-yellow-600">Tidak ada project ditemukan</p>
          )}
        </div>
      )}

      {/* Loading indicator for nilai data */}
      {isLoading.nilai && (
        <div className="text-center py-4">Memuat data nilai...</div>
      )}

      {/* Nilai chapters table */}
      {!isLoading.nilai && nilaiChapters.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border mt-4 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Chapter</th>
                <th className="border p-2">Total Kesalahan</th>
                <th className="border p-2">Total Nilai</th>
                <th className="border p-2">Nilai Bobot</th>
                <th className="border p-2">Predikat</th>
              </tr>
            </thead>
            <tbody>
              {nilaiChapters.map((ch, index) => (
                <tr key={`chapter-${ch.chapter_id}-${index}`}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{ch.chapter_nama}</td>
                  <td className="border p-2 text-center">{ch.total_kesalahan}</td>
                  <td className="border p-2 text-center">{ch.total_nilai}</td>
                  <td className="border p-2 text-center">{ch.nilai_bobot.toFixed(2)}</td>
                  <td className="border p-2 text-center">{ch.predikat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state for nilai data */}
      {!isLoading.nilai && selectedProjectId && nilaiChapters.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          Tidak ada data nilai ditemukan untuk project ini
        </div>
      )}
    </div>
  );
};

export default CekNilaiSiswa;
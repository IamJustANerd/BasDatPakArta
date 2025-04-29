import React, { useState } from "react";
import axios from "axios";

interface SubAspect {
  value: string;
}

interface Aspect {
  value: string;
  subAspects: SubAspect[];
}

interface Chapter {
  name: string;
  aspects: Aspect[];
}

export default function ProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [mataPelajaranId, setMataPelajaranId] = useState<number | null>(null);

  const [mataPelajaranList, setMataPelajaranList] = useState<{ id: number; nama: string }[]>([]);

  React.useEffect(() => {
    const fetchMataPelajaran = async () => {
      try {
        const res = await axios.get("http://localhost:3000/mataPelajaran");
        setMataPelajaranList(res.data);
      } catch (err) {
        console.error("Failed to fetch mata pelajaran:", err);
      }
    };
    fetchMataPelajaran();
  }, []);

  const handleAddChapter = () => {
    setChapters([...chapters, { name: "", aspects: [] }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mataPelajaranId || !projectName) {
      alert("Lengkapi semua field sebelum submit.");
      return;
    }

    try {
      // 1. Create Project
      const projectRes = await axios.post("http://localhost:3000/project", {
        nama: projectName,
        mata_pelajaran_id: mataPelajaranId,
        predikat: "",
        catatan_penguji: "",
        status: ""
      });

      const projectId = projectRes.data.id;

      // 2. Create Chapters
      for (const chapter of chapters) {
        const chapterRes = await axios.post("http://localhost:3000/chapter", {
          project_id: projectId,
          total_kesalahan_aspek: 0,
          bobot_chapter: 0,
          predikat_chapter: ""
        });

        const chapterId = chapterRes.data.id;

        // 3. Create Aspects
        for (const aspect of chapter.aspects) {
          const aspekRes = await axios.post("http://localhost:3000/aspek", {
            chapter_id: chapterId,
            nama: aspect.value,
            total_kesalahan: 0
          });

          const aspekId = aspekRes.data.id;

          // 4. Create Sub-Aspects
          for (const sub of aspect.subAspects) {
            await axios.post("http://localhost:3000/sub_aspek", {
              aspek_id: aspekId,
              nama: sub.value,
              jumlah_kesalahan: 0
            });
          }
        }
      }

      alert("Project berhasil disimpan!");
      setProjectName("");
      setMataPelajaranId(null);
      setChapters([]);
    } catch (err) {
      console.error("Gagal menyimpan project:", err);
      alert("Gagal menyimpan project.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-3xl mx-auto">
      <div>
        <label className="block">Mata Pelajaran</label>
        <select
          value={mataPelajaranId ?? ""}
          onChange={(e) => setMataPelajaranId(Number(e.target.value))}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="">Pilih Mata Pelajaran</option>
          {mataPelajaranList.map((mp) => (
            <option key={mp.id} value={mp.id}>
              {mp.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      {chapters.map((chapter, chapterIndex) => (
        <div key={chapterIndex} className="bg-gray-100 p-3 rounded space-y-3">
          <label>Chapter {chapterIndex + 1}</label>
          <input
            type="text"
            value={chapter.name}
            onChange={(e) => {
              const updated = [...chapters];
              updated[chapterIndex].name = e.target.value;
              setChapters(updated);
            }}
            className="border px-2 py-1 rounded w-full"
          />

          {chapter.aspects.map((aspect, aspectIndex) => (
            <div key={aspectIndex} className="ml-4 space-y-2">
              <input
                type="text"
                value={aspect.value}
                onChange={(e) => {
                  const updated = [...chapters];
                  updated[chapterIndex].aspects[aspectIndex].value = e.target.value;
                  setChapters(updated);
                }}
                placeholder={`Aspect ${aspectIndex + 1}`}
                className="border px-2 py-1 rounded w-full"
              />

              {aspect.subAspects.map((sub, subIndex) => (
                <input
                  key={subIndex}
                  type="text"
                  value={sub.value}
                  onChange={(e) => {
                    const updated = [...chapters];
                    updated[chapterIndex].aspects[aspectIndex].subAspects[subIndex].value =
                      e.target.value;
                    setChapters(updated);
                  }}
                  placeholder={`Sub-aspect ${subIndex + 1}`}
                  className="ml-4 border px-2 py-1 rounded w-full"
                />
              ))}

              <button
                type="button"
                className="text-sm text-blue-500"
                onClick={() => {
                  const updated = [...chapters];
                  updated[chapterIndex].aspects[aspectIndex].subAspects.push({ value: "" });
                  setChapters(updated);
                }}
              >
                + Add Sub-Aspect
              </button>
            </div>
          ))}

          <button
            type="button"
            className="text-sm text-green-500"
            onClick={() => {
              const updated = [...chapters];
              updated[chapterIndex].aspects.push({ value: "", subAspects: [] });
              setChapters(updated);
            }}
          >
            + Add Aspect
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddChapter}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Chapter
      </button>

      <button
        type="submit"
        className="block w-full bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
}

import React, { useState } from "react";

const InputSiswaBaru: React.FC = () => {
  const [nis, setNis] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    const payload = {
      NIS: nis, // match your backend expectation
      nama,
      kelas,
    };

    try {
      await fetch("http://localhost:3000/murid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setSuccess(true);
      setNis("");
      setNama("");
      setKelas("");
    } catch (err: any) {
      console.error('Error saat mengirim data:', error);
      setError(err.message || "Terjadi kesalahan.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Input Siswa Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">NIS</label>
          <input
            type="text"
            value={nis}
            onChange={(e) => setNis(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Kelas</label>
          <input
            type="text"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white px-4 py-2 rounded bg-orange hover:bg-light_orange"
        >
          Simpan
        </button>
      </form>

      {success && <p className="text-green-600 mt-4">Siswa berhasil ditambahkan!</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default InputSiswaBaru;

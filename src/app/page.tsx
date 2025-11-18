"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [mintLink, setMintLink] = useState<string>("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const generate = async () => {
    if (!file) return alert("Choose image first");
    const body = new FormData();
    body.append("image", file);
    const res = await fetch("/api/describe", { method: "POST", body });
    const data = await res.json();
    setDesc(data.description);
  };

  const mint = async () => {
    if (!file || !desc) return alert("Missing image/description");
    const body = new FormData();
    body.append("image", file);
    body.append("description", desc);
    const res = await fetch("/api/mint", { method: "POST", body });
    const data = await res.json();
    setMintLink(data.url);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* رفع صورة */}
        <section className="mb-6">
          <label className="block mb-2 font-semibold">Upload Property Image</label>
          <input type="file" accept="image/*" onChange={handleImage} />
          {preview && (
            <img src={preview} alt="preview" className="mt-4 w-64 rounded" />
          )}
        </section>

        {/* توليد الوصف */}
        <button
          onClick={generate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate AI Description
        </button>
        {desc && (
          <p className="mt-4 p-4 bg-white border rounded">{desc}</p>
        )}

        {/* Mint NFT */}
        <button
          onClick={mint}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Mint NFT
        </button>
        {mintLink && (
          <p className="mt-4">
            ✅ NFT minted:{" "}
            <a href={mintLink} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
              View on IPFS
            </a>
          </p>
        )}
      </div>
    </main>
  );
}

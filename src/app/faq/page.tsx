export default function FAQPage() {
  const faqSSG = [
    {
      id: 1,
      q: "Apa itu SSG di Next.js?",
      a: "SSG (Static Site Generation) adalah metode di mana Next.js membuat halaman HTML saat proses 'build'. Ini membuat website sangat cepat karena server tidak perlu mengolah data setiap kali ada permintaan.",
    },
    {
      id: 2,
      q: "Mengapa halaman utama web ini menggunakan SSG?",
      a: "Karena daftar produk tidak berubah setiap detik. Dengan SSG, pengguna mendapatkan konten secara instan, yang juga sangat baik untuk SEO.",
    },
    {
      id: 3,
      q: "Kapan kita sebaiknya tidak menggunakan SSG?",
      a: "SSG kurang cocok untuk halaman yang datanya dipersonalisasi (seperti profil user) atau data yang berubah sangat cepat secara real-time. Untuk itu, kita bisa menggunakan SSR atau CSR.",
    },
    {
      id: 4,
      q: "Apa perbedaan utama SSG dan SSR?",
      a: "SSG dibuat sekali saat build (statis), sedangkan SSR (Server-Side Rendering) dibuat setiap kali halaman diakses (dinamis). Halaman detail produk kami menggunakan SSR agar data selalu aktual.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Teknologi <span className="text-blue-600">SSG</span>
          </h1>
          <p className="text-slate-600">
            Pelajari bagaimana kami membangun website yang cepat dan optimal.
          </p>
        </div>

        <div className="space-y-6">
          {faqSSG.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-start">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs mr-3 mt-1">
                  Q
                </span>
                {item.q}
              </h3>
              <p className="text-slate-600 ml-9 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import { useState } from "react";
import RUNDOWN   from "../data/rundown.json";
import DRESSCODE from "../data/dresscode.json";

const TABS = [
  { key:"undangan", label:"📜 Undangan" },
  { key:"rundown",  label:"📋 Rundown"  },
];

/* ── Normalize name for fuzzy match ── */
function normName(s) {
  return s.toLowerCase()
    .replace(/[.,]/g,"")
    .replace(/\b(drs?|dra|dr|hj?|ir|s\.pd|s\.t|s\.kom|s\.ag|s\.st|s\.pdT|s\.pdt|s\.sos\.i|s\.ap|s\.i\.pust|m\.pd|m\.ds|m\.si|m\.pd\.i|m\.hum)\b/gi,"")
    .replace(/\s+/g," ").trim();
}

function isVIP(teacherName) {
  const tNorm = normName(teacherName);
  return DRESSCODE.jas.some(n => {
    const nNorm = normName(n);
    // Check if either contains the other (handles gelar mismatch)
    return tNorm.includes(nNorm) || nNorm.includes(tNorm) ||
      // Fallback: first 2 words match
      tNorm.split(" ").slice(0,2).join(" ") === nNorm.split(" ").slice(0,2).join(" ");
  });
}

function Divider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"4px 0" }}>
      <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,0.3))" }}/>
      <span style={{ color:"rgba(201,168,76,0.5)", fontSize:"0.55rem" }}>✦</span>
      <div style={{ flex:1, height:1, background:"linear-gradient(to left,transparent,rgba(201,168,76,0.3))" }}/>
    </div>
  );
}

export default function InvitationPage({ teacher }) {
  const [tab, setTab] = useState("undangan");
  const vip = isVIP(teacher.name);

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background:"linear-gradient(160deg,#0d1117 0%,#0f1e35 45%,#0d1117 100%)", fontFamily:"'Jost',sans-serif" }}
    >
      {/* Background orbs */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        <div style={{ position:"absolute", top:"-15%", left:"15%", width:"70vw", height:"70vw", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 65%)", animation:"orb1 9s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"55vw", height:"55vw", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 65%)", animation:"orb2 11s ease-in-out infinite" }}/>
      </div>
      {[...Array(12)].map((_,i) => (
        <div key={i} style={{ position:"fixed", left:`${8+i*7}%`, top:`${10+((i*37)%80)}%`,
          width:2+i%3, height:2+i%3, borderRadius:"50%", background:"rgba(201,168,76,0.5)",
          animation:`twinkle ${2+i*0.4}s ${i*0.5}s ease-in-out infinite`, pointerEvents:"none", zIndex:1 }}/>
      ))}

      {/* ── Hero ── */}
      <header className="relative text-center pt-14 pb-8 px-6 page-in" style={{ zIndex:2 }}>
        <div className="float inline-block mb-4" style={{ fontSize:"4.5rem", filter:"drop-shadow(0 6px 20px rgba(201,168,76,0.35))" }}>🎓</div>

        <div className="fade-up inline-block mb-5 px-6 py-3 rounded-2xl" style={{
          background:"rgba(201,168,76,0.07)", border:"1px solid rgba(201,168,76,0.25)", backdropFilter:"blur(12px)",
        }}>
          <p style={{ color:"rgba(201,168,76,0.55)", fontSize:"0.6rem", letterSpacing:"0.2em", marginBottom:3 }}>KEPADA YTH.</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontWeight:600, color:"#f5e6c0", margin:0 }}>
            {teacher.name}
          </p>
          <p style={{ color:"rgba(201,168,76,0.5)", fontSize:"0.65rem", marginTop:3 }}>{teacher.category}</p>
        </div>

        <div className="fade-up-d1">
          <div style={{ fontFamily:"'Pinyon Script',cursive", fontSize:"3.5rem", lineHeight:1,
            background:"linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Graduation
          </div>
          <div style={{ fontFamily:"'Pinyon Script',cursive", fontSize:"2.8rem", lineHeight:1, marginTop:-6,
            background:"linear-gradient(135deg,#a8873a,#e8c97a,#a8873a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Ceremony
          </div>
        </div>

        <div className="fade-up-d2 mt-3 space-y-0.5">
          <p style={{ color:"rgba(245,230,192,0.7)", fontSize:"0.8rem", fontWeight:300 }}>Pelepasan Siswa-Siswi Kelas XII</p>
          <p style={{ color:"#f5e6c0", fontSize:"0.9rem", fontWeight:600 }}>SMK Negeri 1 Adiwerna</p>
          <p style={{ color:"rgba(201,168,76,0.6)", fontSize:"0.7rem" }}>Tahun Ajaran 2025/2026</p>
        </div>
      </header>

      <main className="relative px-4 max-w-lg mx-auto space-y-4 pb-24" style={{ zIndex:2 }}>

        {/* Info Strip */}
        <div className="fade-up-d3 grid grid-cols-3 gap-3">
          {[
            { icon:"📅", label:"TANGGAL", val:"Rabu, 6 Mei 2026" },
            { icon:"🕖", label:"WAKTU",   val:"06.45 WIB – Selesai" },
            { icon:"📍", label:"TEMPAT",  val:"Aula Graha Adiwiyata" },
          ].map((c,i) => (
            <div key={i} className="text-center rounded-2xl py-4 px-2" style={{
              background:"rgba(255,255,255,0.03)", border:"1px solid rgba(201,168,76,0.18)", backdropFilter:"blur(12px)",
            }}>
              <div style={{ fontSize:"1.5rem", marginBottom:5 }}>{c.icon}</div>
              <p style={{ color:"rgba(201,168,76,0.5)", fontSize:"0.55rem", letterSpacing:"0.12em", marginBottom:3 }}>{c.label}</p>
              <p style={{ color:"#f5e6c0", fontSize:"0.72rem", fontWeight:500, lineHeight:1.35 }}>{c.val}</p>
            </div>
          ))}
        </div>

        {/* Tab Nav */}
        <div className="fade-up-d4 flex gap-2 p-1 rounded-2xl" style={{
          background:"rgba(255,255,255,0.03)", border:"1px solid rgba(201,168,76,0.15)",
        }}>
          {TABS.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)} className="tab-pill flex-1 py-2.5 rounded-xl text-xs font-medium"
              style={{
                background: tab===key ? "linear-gradient(135deg,#c9a84c,#a8873a)" : "transparent",
                color: tab===key ? "#0d1117" : "rgba(201,168,76,0.6)",
                border:"none", cursor:"pointer", fontFamily:"'Jost',sans-serif",
                boxShadow: tab===key ? "0 2px 12px rgba(201,168,76,0.3)" : "none",
              }}>
              {label}
            </button>
          ))}
        </div>

        {tab==="undangan" && <UndanganTab teacher={teacher} vip={vip} />}
        {tab==="rundown"  && <RundownTab />}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 text-center py-2 pointer-events-none" style={{ zIndex:3,
        background:"linear-gradient(to top,rgba(13,17,23,0.9),transparent)" }}>
        <p style={{ color:"rgba(201,168,76,0.25)", fontSize:"0.6rem", letterSpacing:"0.2em", fontFamily:"'Jost',sans-serif" }}>
          SMK NEGERI 1 ADIWERNA · GRADUATION CEREMONY 2026
        </p>
      </footer>
    </div>
  );
}

/* ── Undangan Tab ── */
function UndanganTab({ teacher, vip }) {
  const toCapital = s => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="tab-slide rounded-3xl p-6 space-y-5" style={{
      background:"rgba(255,255,255,0.02)", border:"1px solid rgba(201,168,76,0.18)",
      backdropFilter:"blur(16px)", boxShadow:"0 4px 40px rgba(0,0,0,0.3),inset 0 1px 0 rgba(201,168,76,0.08)",
    }}>
      {/* Bismillah */}
      <div className="text-center">
        <p style={{ color:"rgba(201,168,76,0.5)", fontSize:"0.6rem", letterSpacing:"0.2em", marginBottom:14 }}>
          BISMILLAHIRRAHMANIRRAHIM
        </p>
        <div className="rounded-2xl px-5 py-4 mb-4" style={{ background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ color:"rgba(201,168,76,0.5)", fontSize:"0.6rem", letterSpacing:"0.15em", marginBottom:5 }}>KEPADA YTH.</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.25rem", fontWeight:700, color:"#f5e6c0", lineHeight:1.3, margin:0 }}>
            {toCapital(teacher.name)}
          </p>
          <p style={{ color:"rgba(201,168,76,0.55)", fontSize:"0.7rem", marginTop:4 }}>{teacher.category}</p>
        </div>
        <p style={{ color:"rgba(245,230,192,0.75)", fontSize:"0.83rem", lineHeight:1.8, fontStyle:"italic" }}>
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu untuk menghadiri acara Pelepasan Siswa-Siswi Kelas XII SMK Negeri 1 Adiwerna Tahun Ajaran 2025/2026.
        </p>
      </div>

      <Divider />

      {/* Event */}
      <div className="text-center space-y-1">
        <p style={{ color:"rgba(201,168,76,0.55)", fontSize:"0.6rem", letterSpacing:"0.18em" }}>UNTUK DAPAT HADIR PADA ACARA</p>
        <div style={{ fontFamily:"'Pinyon Script',cursive", fontSize:"2.5rem", lineHeight:1.1,
          background:"linear-gradient(135deg,#c9a84c,#e8c97a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Graduation Ceremony
        </div>
        <p style={{ color:"rgba(245,230,192,0.7)", fontSize:"0.8rem", fontWeight:300 }}>Pelepasan Siswa-Siswi Kelas XII</p>
        <p style={{ color:"#f5e6c0", fontSize:"0.88rem", fontWeight:600 }}>SMK Negeri 1 Adiwerna</p>
        <p style={{ color:"rgba(201,168,76,0.6)", fontSize:"0.72rem" }}>Tahun Ajaran 2025/2026</p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon:"📅", label:"Hari/Tanggal", val:"Rabu, 6 Mei 2026" },
          { icon:"🕖", label:"Waktu",        val:"06.45 WIB – Selesai" },
        ].map((c,i) => (
          <div key={i} className="rounded-2xl p-4 text-center" style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.15)" }}>
            <div style={{ fontSize:"1.4rem", marginBottom:4 }}>{c.icon}</div>
            <p style={{ color:"rgba(201,168,76,0.45)", fontSize:"0.55rem", letterSpacing:"0.12em", marginBottom:3 }}>{c.label.toUpperCase()}</p>
            <p style={{ color:"#f5e6c0", fontSize:"0.78rem", fontWeight:500, margin:0 }}>{c.val}</p>
          </div>
        ))}
        <div className="col-span-2 rounded-2xl p-4 text-center" style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.15)" }}>
          <div style={{ fontSize:"1.4rem", marginBottom:4 }}>📍</div>
          <p style={{ color:"rgba(201,168,76,0.45)", fontSize:"0.55rem", letterSpacing:"0.12em", marginBottom:3 }}>TEMPAT</p>
          <p style={{ color:"#f5e6c0", fontSize:"0.78rem", fontWeight:500, margin:0 }}>Aula Graha Adiwiyata, SMKN 1 Adiwerna</p>
        </div>
      </div>

      <Divider />

      {/* ── DRESS CODE — dinamis ── */}
      <div>
        <p style={{ color:"rgba(201,168,76,0.55)", fontSize:"0.6rem", letterSpacing:"0.18em", textAlign:"center", marginBottom:12 }}>
          👔 DRESS CODE
        </p>

        {vip ? (
          /* VIP: Kepala / Waka / Kajur / Walikelas */
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4 text-center" style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)" }}>
              <div style={{ fontSize:"1.8rem", marginBottom:6 }}>🤵</div>
              <p style={{ color:"#e8c97a", fontSize:"0.72rem", fontWeight:600, marginBottom:8 }}>Bapak</p>
              <p style={{ color:"rgba(245,230,192,0.85)", fontSize:"0.72rem", display:"flex", alignItems:"center", gap:5, margin:"3px 0" }}>
                <span style={{ color:"rgba(201,168,76,0.5)", fontSize:"0.55rem" }}>▸</span>Jas eksekutif hitam
              </p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ background:"rgba(245,200,200,0.05)", border:"1px solid rgba(245,180,180,0.2)" }}>
              <div style={{ fontSize:"1.8rem", marginBottom:6 }}>👘</div>
              <p style={{ color:"rgba(245,180,180,0.85)", fontSize:"0.72rem", fontWeight:600, marginBottom:8 }}>Ibu</p>
              <p style={{ color:"rgba(245,230,192,0.85)", fontSize:"0.72rem", display:"flex", alignItems:"center", gap:5, margin:"3px 0" }}>
                <span style={{ color:"rgba(245,180,180,0.5)", fontSize:"0.55rem" }}>▸</span>Baju kebaya
              </p>
            </div>
          </div>
        ) : (
          /* Guru umum */
          <div className="rounded-2xl p-5 text-center" style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.18)" }}>
            <div style={{ fontSize:"2.2rem", marginBottom:8 }}>👔</div>
            <p style={{ color:"#e8c97a", fontSize:"0.8rem", fontWeight:600, marginBottom:6 }}>Seragam Hari Rabu</p>
            <p style={{ color:"rgba(245,230,192,0.7)", fontSize:"0.75rem", lineHeight:1.7 }}>
              Bapak/Ibu dipersilakan menggunakan seragam yang berlaku pada hari Rabu.
            </p>
          </div>
        )}
      </div>

      <Divider />

      <p style={{ color:"rgba(201,168,76,0.7)", fontSize:"0.85rem", fontStyle:"italic", textAlign:"center", lineHeight:1.7, fontFamily:"'Cormorant Garamond',serif" }}>
        "Merupakan suatu kehormatan apabila Bapak/Ibu dapat hadir pada acara ini"
      </p>

      <Divider />

      <div className="text-center space-y-1">
        <p style={{ color:"rgba(245,230,192,0.5)", fontSize:"0.7rem", fontStyle:"italic" }}>Hormat Kami Keluarga Besar</p>
        <p style={{ color:"#f5e6c0", fontSize:"0.9rem", fontWeight:600 }}>SMKN 1 Adiwerna</p>
        <p style={{ color:"rgba(201,168,76,0.5)", fontSize:"0.68rem" }}>Adiwerna, 26 April 2026</p>
      </div>
      <div style={{ borderTop:"1px solid rgba(201,168,76,0.15)", paddingTop:16, textAlign:"center" }}>
        <p style={{ color:"rgba(201,168,76,0.5)", fontSize:"0.65rem", marginBottom:4 }}>Ketua Angkatan</p>
        <p style={{ color:"#f5e6c0", fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:700 }}>Rizziq Fadhilah Akbar</p>
        <p style={{ color:"rgba(201,168,76,0.45)", fontSize:"0.65rem" }}>NIS: 23.21085</p>
      </div>
    </div>
  );
}

/* ── Rundown Tab ── */
function RundownTab() {
  return (
    <div className="tab-slide rounded-3xl p-5" style={{
      background:"rgba(255,255,255,0.02)", border:"1px solid rgba(201,168,76,0.18)",
      backdropFilter:"blur(16px)", boxShadow:"0 4px 40px rgba(0,0,0,0.3)",
    }}>
      <div style={{ fontFamily:"'Pinyon Script',cursive", fontSize:"2.5rem",
        background:"linear-gradient(135deg,#c9a84c,#e8c97a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        textAlign:"center", marginBottom:4 }}>
        Rundown Acara
      </div>
      <p style={{ color:"rgba(201,168,76,0.4)", fontSize:"0.6rem", letterSpacing:"0.15em", textAlign:"center", marginBottom:16 }}>
        RABU, 6 MEI 2026
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {RUNDOWN.map((item, i) => (
          <div key={i} style={{
            display:"flex", alignItems:"flex-start", gap:12,
            padding:"10px 12px", borderRadius:14,
            transition:"background 0.2s, transform 0.2s", cursor:"default",
          }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(201,168,76,0.07)"; e.currentTarget.style.transform="translateX(4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="translateX(0)"; }}
          >
            <div style={{ flexShrink:0, minWidth:80, background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.2)",
              borderRadius:10, padding:"5px 8px", textAlign:"center" }}>
              {item.time.split("–").map((t,j) => (
                <p key={j} style={{ color:"#c9a84c", fontSize:"0.58rem", fontWeight:600, margin:0, lineHeight:1.5 }}>{t.trim()}</p>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"flex-start", gap:6, paddingTop:3 }}>
              <span style={{ color:"rgba(201,168,76,0.35)", fontSize:"0.6rem", flexShrink:0, marginTop:2 }}>▸</span>
              <p style={{ color:"rgba(245,230,192,0.85)", fontSize:"0.8rem", lineHeight:1.55, margin:0 }}>{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import TEACHERS from "../data/teachers.json";

function normalize(s) {
  return s.toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/\b(drs?|dra|s\.pd|s\.t|s\.kom|s\.ag|m\.pd|m\.ds|s\.st|s\.i\.pust|s\.ap|s\.pdT|s\.pdt)\b/gi, "")
    .replace(/\s+/g, " ").trim();
}

export default function SearchScreen({ onFound }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = normalize(query);
    return TEACHERS.filter(t => normalize(t.name).includes(q)).slice(0, 8);
  }, [query]);

  const handleSelect = (teacher) => {
    setSelected(teacher);
    setQuery(teacher.name);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5"
      style={{ background:"linear-gradient(160deg,#0d1117 0%,#0f1e35 50%,#0d1117 100%)" }}
    >
      {/* Orbs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-20%", left:"20%", width:"60vw", height:"60vw", borderRadius:"50%",
          background:"radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", animation:"orb1 8s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", bottom:"-15%", right:"-10%", width:"50vw", height:"50vw", borderRadius:"50%",
          background:"radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", animation:"orb2 10s ease-in-out infinite" }}/>
      </div>

      {/* Sparkle dots */}
      {[...Array(14)].map((_,i) => (
        <div key={i} style={{
          position:"absolute",
          left:`${5+Math.random()*90}%`, top:`${5+Math.random()*90}%`,
          width: 3+i%3, height: 3+i%3, borderRadius:"50%",
          background:"rgba(201,168,76,0.6)",
          animation:`twinkle ${2+i*0.3}s ${i*0.4}s ease-in-out infinite`,
          pointerEvents:"none",
        }}/>
      ))}

      <div className="relative z-10 w-full max-w-sm page-in">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4 float inline-block" style={{ filter:"drop-shadow(0 4px 16px rgba(201,168,76,0.4))" }}>🎓</div>
          <div className="mb-1" style={{ fontFamily:"'Pinyon Script',cursive", fontSize:"3rem", lineHeight:1.1,
            background:"linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Graduation
          </div>
          <div style={{ fontFamily:"'Pinyon Script',cursive", fontSize:"2.2rem", lineHeight:1,
            background:"linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Ceremony
          </div>
          <div className="mt-3 flex items-center gap-3 justify-center">
            <div style={{ height:1, width:40, background:"linear-gradient(to right,transparent,rgba(201,168,76,0.5))" }}/>
            <p style={{ color:"rgba(201,168,76,0.7)", fontSize:"0.65rem", letterSpacing:"0.2em", fontFamily:"'Jost',sans-serif", fontWeight:500 }}>
              SMK NEGERI 1 ADIWERNA · 2026
            </p>
            <div style={{ height:1, width:40, background:"linear-gradient(to left,transparent,rgba(201,168,76,0.5))" }}/>
          </div>
        </div>

        {/* Card */}
        <div className="fade-up-d2 rounded-3xl p-6" style={{
          background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(201,168,76,0.2)",
          backdropFilter:"blur(20px)",
          boxShadow:"0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.1)",
        }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontWeight:600, color:"#e8c97a", textAlign:"center", marginBottom:4 }}>
            Cari Nama Anda
          </p>
          <p style={{ color:"rgba(201,168,76,0.55)", fontSize:"0.72rem", textAlign:"center", fontFamily:"'Jost',sans-serif", marginBottom:20 }}>
            Ketik nama Anda untuk menemukan undangan personal
          </p>

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setSelected(null); }}
              placeholder="Contoh: Joko Pramono"
              style={{
                width:"100%", padding:"12px 16px",
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(201,168,76,0.25)",
                borderRadius:14, color:"#f5e6c0",
                fontFamily:"'Jost',sans-serif", fontSize:"0.88rem",
                transition:"border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => { e.target.style.borderColor="rgba(201,168,76,0.6)"; }}
              onBlur={e => { e.target.style.borderColor="rgba(201,168,76,0.25)"; }}
            />
            <span style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", fontSize:"1rem" }}>🔍</span>
          </div>

          {/* Dropdown results */}
          {results.length > 0 && !selected && (
            <div className="mt-2 rounded-2xl overflow-hidden" style={{ border:"1px solid rgba(201,168,76,0.15)", background:"rgba(13,17,23,0.95)" }}>
              {results.map((t, i) => (
                <button key={i} onClick={() => handleSelect(t)}
                  style={{
                    display:"block", width:"100%", textAlign:"left",
                    padding:"11px 16px",
                    borderBottom: i < results.length-1 ? "1px solid rgba(201,168,76,0.08)" : "none",
                    background:"transparent", cursor:"pointer",
                    transition:"background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(201,168,76,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}
                >
                  <p style={{ color:"#f5e6c0", fontFamily:"'Jost',sans-serif", fontSize:"0.85rem", margin:0 }}>{t.name}</p>
                  <p style={{ color:"rgba(201,168,76,0.5)", fontFamily:"'Jost',sans-serif", fontSize:"0.68rem", margin:0 }}>{t.category}</p>
                </button>
              ))}
            </div>
          )}

          {/* Not found */}
          {query.trim().length >= 2 && results.length === 0 && !selected && (
            <div className="mt-3 text-center rounded-xl p-3" style={{ background:"rgba(255,80,80,0.06)", border:"1px solid rgba(255,100,100,0.15)" }}>
              <p style={{ color:"rgba(255,150,150,0.8)", fontSize:"0.75rem", fontFamily:"'Jost',sans-serif" }}>
                ⚠ Nama tidak ditemukan. Coba kata kunci lain.
              </p>
            </div>
          )}

          {/* Confirm */}
          {selected && (
            <div className="mt-4 tab-slide">
              <div className="rounded-2xl p-4 mb-4" style={{
                background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)",
              }}>
                <p style={{ color:"rgba(201,168,76,0.6)", fontSize:"0.65rem", letterSpacing:"0.15em", fontFamily:"'Jost',sans-serif", marginBottom:4 }}>
                  DITEMUKAN
                </p>
                <p style={{ color:"#f5e6c0", fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontWeight:600, margin:0 }}>
                  {selected.name}
                </p>
                <p style={{ color:"rgba(201,168,76,0.55)", fontSize:"0.7rem", fontFamily:"'Jost',sans-serif", margin:"3px 0 0" }}>
                  {selected.category}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setSelected(null); setQuery(""); }}
                  className="btn-gold flex-1 py-3 rounded-xl text-xs font-medium"
                  style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,168,76,0.2)", color:"rgba(201,168,76,0.7)", fontFamily:"'Jost',sans-serif" }}>
                  ← Bukan saya
                </button>
                <button onClick={() => onFound(selected)}
                  className="btn-gold flex-1 py-3 rounded-xl text-xs font-semibold"
                  style={{ background:"linear-gradient(135deg,#c9a84c,#a8873a)", color:"#0d1117", fontFamily:"'Jost',sans-serif", border:"none" }}>
                  ✓ Ya, lanjut
                </button>
              </div>
            </div>
          )}
        </div>

        <p style={{ color:"rgba(201,168,76,0.3)", fontSize:"0.65rem", textAlign:"center", marginTop:16, fontFamily:"'Jost',sans-serif" }}>
          Hanya untuk Bapak/Ibu Guru &amp; Karyawan SMKN 1 Adiwerna
        </p>
      </div>
    </div>
  );
}

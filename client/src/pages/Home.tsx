/* ============================================================
 * DESIGN: Neon Vinyl Lounge — Retro-futuristic jukebox
 * Dark background, neon accents per genre, vinyl animations
 * Font: Righteous (display) + Space Grotesk (body)
 * ============================================================ */
import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Sparkles, Heart, PartyPopper } from "lucide-react";
import TrackCard from "@/components/TrackCard";
import NowPlaying from "@/components/NowPlaying";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { tracks, THEMES, getTracksByTheme } from "@/lib/musicData";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/MzFEzFo2637twJ2OjGzEFt/sandbox/oCPHhJcDVNScV7gFzBxif8-img-1_1770710055000_na1fn_anVrZWJveC1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTXpGRXpGbzI2Mzd0d0oyT2pHekVGdC9zYW5kYm94L29DUEhoSmNEVk5TY1Y3Z0Z6QnhpZjgtaW1nLTFfMTc3MDcxMDA1NTAwMF9uYTFmbl9hblZyWldKdmVDMW9aWEp2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rOIGqfxx47eUC~8J5YffK5qfDA60DxV1S4u0jnMd47BFnKRZwEoDikrUKUbSmlMAnr2omIsc8YfhBB8mYr7xAp2ETqdSaIMeOWpti3snLC4kUMAlgzTM64giUXexvR0keoyPjiMzBpBMJNwwKBprthCmFBweuQKTzruKENtYATvdn4ilkx8NEnuWKxe6qIiizJTeeDRt1r9WqL8BqcqX0UmcqDLOmLbb91PA6552hfSkSOm15iHTlGKxmodr1aUajb9YLLNa-VOfG2PCKePzbo~xrB0iCdDiClGCmLsctI67h9GwFLxcaexh4yg69eCd~qh279y3KyBRUmyQnWttZw__";
const WORLD_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/MzFEzFo2637twJ2OjGzEFt/sandbox/oCPHhJcDVNScV7gFzBxif8-img-3_1770710049000_na1fn_d29ybGQtbXVzaWMtbmVvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTXpGRXpGbzI2Mzd0d0oyT2pHekVGdC9zYW5kYm94L29DUEhoSmNEVk5TY1Y3Z0Z6QnhpZjgtaW1nLTNfMTc3MDcxMDA0OTAwMF9uYTFmbl9kMjl5YkdRdGJYVnphV010Ym1WdmJnLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=eZaN0UyM2nyj6HdXMtd8LxB7kig~kKWf6YPkWv4-CzUz6HVEY41gghxl26o6Cm-UQxCeXFdAppRx4GXziqEN7f4WRTEKu2dkc3CBFs2kAS7CsGfzhS~br9BiAGgi1gTjf3bEn9t0d-sInA6RZKlkAdHjjpbAOx4Q3VW8y8X2RAaSWIO2gKNLVSRMDkZCzs74joedYAjFtmqMAwcO3QTco0h9XH3oyitFFhmlc0mAoIVfcYpo4OGxSF5Y59gdS0DCMst5z1kJCuotln6xrdLxCgrC6sqyKVxfukiPGj5ywvDjyLhIorX~kbwFnHp3K1jzXGC3hfJ6WCjG9bnXD2qwHg__";
const EQ_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/MzFEzFo2637twJ2OjGzEFt/sandbox/oCPHhJcDVNScV7gFzBxif8-img-4_1770710055000_na1fn_bmVvbi1lcXVhbGl6ZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTXpGRXpGbzI2Mzd0d0oyT2pHekVGdC9zYW5kYm94L29DUEhoSmNEVk5TY1Y3Z0Z6QnhpZjgtaW1nLTRfMTc3MDcxMDA1NTAwMF9uYTFmbl9ibVZ2YmkxbGNYVmhiR2w2WlhJLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=GatUm9yK04UdYlS0d5Y2HCzbnKrM6~UQR2qMLtCoPDdcc7k7unfWbWeMNEbVaGbXF6hxJMFOl3FJiFdTCfK4jCTR9vDQslSY5pS13nbpSKtTydbgKR4~T9zPevcFCKkeqcVpmp0rF0LEIqppf9jHaSIkwt6y3dD1Z9lJRHT-3reYxRtih0n4CopGFD4q8CV8ya9GJ70awASUc0q6m0xeFAl1rP3nIXzudfYfE7z9yZhtF7ztVh-3A-5TatjLI-TETfXiDoy-MkAOOY3kbykIPH241gGq9rmU8cYJ0XQd8QFZieg7UNdqgJEWV~g17ku51mukLKWbrXafscQbNvQy3w__";

type ThemeId = "se-olha" | "viva";

export default function Home() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>("se-olha");
  const player = useAudioPlayer();
  const themeTracks = getTracksByTheme(activeTheme);
  const themeInfo = THEMES[activeTheme];

  return (
    <div className="min-h-screen pb-24">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        </div>

        <div className="container relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-5 h-5 text-pink-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
                Powered by AI
              </span>
            </div>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-white">Jukebox</span>{" "}
              <span
                className="neon-glow"
                style={{ color: "#ff6ec7" }}
              >
                IA
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed mb-2">
              Uma mesma mensagem de amor-próprio, cantada em{" "}
              <span className="text-cyan-400 font-semibold">10 idiomas</span> e{" "}
              <span className="text-amber-400 font-semibold">10 estilos musicais</span> diferentes.
            </p>
            <p className="text-sm text-white/40">
              Todas as músicas foram geradas por inteligência artificial. Cada uma é única.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { label: "Músicas", value: tracks.length.toString(), color: "#ff6ec7" },
                { label: "Idiomas", value: "10", color: "#00e5ff" },
                { label: "Estilos", value: "10", color: "#ffd740" },
                { label: "Temas", value: "2", color: "#69f0ae" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-bold"
                    style={{ color: stat.color, fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== WORLD MAP SECTION ===== */}
      <section className="relative py-8 overflow-hidden">
        <div className="container">
          <div className="relative rounded-2xl overflow-hidden">
            <img src={WORLD_IMG} alt="Mapa musical do mundo" className="w-full h-48 sm:h-64 object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p
                className="text-lg sm:text-2xl font-bold text-white/90 text-center px-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                10 países. 10 idiomas. 1 mensagem. <Sparkles className="inline w-5 h-5 text-amber-400" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THEME SELECTOR ===== */}
      <section className="container py-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {(Object.keys(THEMES) as ThemeId[]).map((themeId) => {
            const theme = THEMES[themeId];
            const isActive = activeTheme === themeId;
            const colors = themeId === "se-olha"
              ? { main: "#ff6ec7", rgb: "255, 110, 199" }
              : { main: "#ffd740", rgb: "255, 215, 64" };

            return (
              <motion.button
                key={themeId}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTheme(themeId)}
                className={`flex-1 relative overflow-hidden rounded-xl p-5 text-left transition-all duration-300`}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, rgba(${colors.rgb}, 0.15) 0%, rgba(${colors.rgb}, 0.05) 100%)`
                    : "rgba(255,255,255,0.03)",
                  border: `2px solid ${isActive ? colors.main + "50" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isActive ? `0 0 30px rgba(${colors.rgb}, 0.1)` : "none",
                }}
              >
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${colors.main}, transparent)` }}
                  />
                )}
                <div className="flex items-center gap-3 mb-2">
                  {themeId === "se-olha" ? (
                    <Heart className="w-5 h-5" style={{ color: colors.main }} />
                  ) : (
                    <PartyPopper className="w-5 h-5" style={{ color: colors.main }} />
                  )}
                  <h2
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: isActive ? colors.main : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {theme.title}
                  </h2>
                  <span className="text-xl">{theme.icon}</span>
                </div>
                <p className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1">
                  {theme.subtitle}
                </p>
                <p className="text-sm text-white/40 leading-relaxed">
                  {theme.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ===== TRACK LIST ===== */}
      <section className="container pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-1 h-8 rounded-full"
            style={{
              background: activeTheme === "se-olha" ? "#ff6ec7" : "#ffd740",
              boxShadow: `0 0 10px ${activeTheme === "se-olha" ? "rgba(255,110,199,0.5)" : "rgba(255,215,64,0.5)"}`,
            }}
          />
          <h2
            className="text-2xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: activeTheme === "se-olha" ? "#ff6ec7" : "#ffd740",
            }}
          >
            {themeInfo.title}
          </h2>
          <span className="text-xs text-white/30 ml-2">
            {themeTracks.length} faixas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {themeTracks.map((track, i) => (
            <TrackCard
              key={track.id}
              track={track}
              isActive={player.currentTrack?.id === track.id}
              isPlaying={player.currentTrack?.id === track.id && player.isPlaying}
              onPlay={player.play}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ===== EQUALIZER FOOTER ===== */}
      <section className="relative overflow-hidden py-4">
        <img src={EQ_IMG} alt="" className="w-full h-24 sm:h-32 object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xs text-white/20 text-center">
            Criado com IA · Kie.ai Suno API · Jukebox IA Multilíngue
          </p>
        </div>
      </section>

      {/* ===== NOW PLAYING BAR ===== */}
      <NowPlaying
        track={player.currentTrack}
        isPlaying={player.isPlaying}
        progress={player.progress}
        currentTime={player.currentTime}
        duration={player.duration}
        useAlt={player.useAlt}
        onPlayPause={() => {
          if (player.currentTrack) {
            player.play(player.currentTrack);
          }
        }}
        onSeek={player.seek}
        onToggleVersion={player.toggleVersion}
      />
    </div>
  );
}

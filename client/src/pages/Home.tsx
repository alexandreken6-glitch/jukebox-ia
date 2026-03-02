/* ============================================================
 * DESIGN: Neon Vinyl Lounge — Retro-futuristic jukebox
 * Dark background, neon accents per genre, vinyl animations
 * Font: Righteous (display) + Space Grotesk (body)
 * ============================================================ */
import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Sparkles, ArrowLeft } from "lucide-react";
import TrackCard from "@/components/TrackCard";
import NowPlaying from "@/components/NowPlaying";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { tracks, THEMES, getTracksByTheme, ThemeId } from "@/lib/musicData";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/MzFEzFo2637twJ2OjGzEFt/sandbox/oCPHhJcDVNScV7gFzBxif8-img-1_1770710055000_na1fn_anVrZWJveC1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTXpGRXpGbzI2Mzd0d0oyT2pHekVGdC9zYW5kYm94L29DUEhoSmNEVk5TY1Y3Z0Z6QnhpZjgtaW1nLTFfMTc3MDcxMDA1NTAwMF9uYTFmbl9hblZyWldKdmVDMW9aWEp2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rOIGqfxx47eUC~8J5YffK5qfDA60DxV1S4u0jnMd47BFnKRZwEoDikrUKUbSmlMAnr2omIsc8YfhBB8mYr7xAp2ETqdSaIMeOWpti3snLC4kUMAlgzTM64giUXexvR0keoyPjiMzBpBMJNwwKBprthCmFBweuQKTzruKENtYATvdn4ilkx8NEnuWKxe6qIiizJTeeDRt1r9WqL8BqcqX0UmcqDLOmLbb91PA6552hfSkSOm15iHTlGKxmodr1aUajb9YLLNa-VOfG2PCKePzbo~xrB0iCdDiClGCmLsctI67h9GwFLxcaexh4yg69eCd~qh279y3KyBRUmyQnWttZw__";
const WORLD_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/MzFEzFo2637twJ2OjGzEFt/sandbox/oCPHhJcDVNScV7gFzBxif8-img-3_1770710049000_na1fn_d29ybGQtbXVzaWMtbmVvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTXpGRXpGbzI2Mzd0d0oyT2pHekVGdC9zYW5kYm94L29DUEhoSmNEVk5TY1Y3Z0Z6QnhpZjgtaW1nLTNfMTc3MDcxMDA0OTAwMF9uYTFmbl9kMjl5YkdRdGJYVnphV010Ym1WdmJnLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=eZaN0UyM2nyj6HdXMtd8LxB7kig~kKWf6YPkWv4-CzUz6HVEY41gghxl26o6Cm-UQxCeXFdAppRx4GXziqEN7f4WRTEKu2dkc3CBFs2kAS7CsGfzhS~br9BiAGgi1gTjf3bEn9t0d-sInA6RZKlkAdHjjpbAOx4Q3VW8y8X2RAaSWIO2gKNLVSRMDkZCzs74joedYAjFtmqMAwcO3QTco0h9XH3oyitFFhmlc0mAoIVfcYpo4OGxSF5Y59gdS0DCMst5z1kJCuotln6xrdLxCgrC6sqyKVxfukiPGj5ywvDjyLhIorX~kbwFnHp3K1jzXGC3hfJ6WCjG9bnXD2qwHg__";
const EQ_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/MzFEzFo2637twJ2OjGzEFt/sandbox/oCPHhJcDVNScV7gFzBxif8-img-4_1770710055000_na1fn_bmVvbi1lcXVhbGl6ZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTXpGRXpGbzI2Mzd0d0oyT2pHekVGdC9zYW5kYm94L29DUEhoSmNEVk5TY1Y3Z0Z6QnhpZjgtaW1nLTRfMTc3MDcxMDA1NTAwMF9uYTFmbl9ibVZ2YmkxbGNYVmhiR2w2WlhJLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=GatUm9yK04UdYlS0d5Y2HCzbnKrM6~UQR2qMLtCoPDdcc7k7unfWbWeMNEbVaGbXF6hxJMFOl3FJiFdTCfK4jCTR9vDQslSY5pS13nbpSKtTydbgKR4~T9zPevcFCKkeqcVpmp0rF0LEIqppf9jHaSIkwt6y3dD1Z9lJRHT-3reYxRtih0n4CopGFD4q8CV8ya9GJ70awASUc0q6m0xeFAl1rP3nIXzudfYfE7z9yZhtF7ztVh-3A-5TatjLI-TETfXiDoy-MkAOOY3kbykIPH241gGq9rmU8cYJ0XQd8QFZieg7UNdqgJEWV~g17ku51mukLKWbrXafscQbNvQy3w__";

// Cor neon por tema para os botões do seletor
const THEME_COLORS: Record<ThemeId, { main: string; rgb: string }> = {
  "se-olha":       { main: "#ff6ec7", rgb: "255, 110, 199" },
  "viva":          { main: "#ffd740", rgb: "255, 215, 64" },
  "ser-feliz":     { main: "#ffeb3b", rgb: "255, 235, 59" },
  "resiliencia":   { main: "#ff5722", rgb: "255, 87, 34" },
  "forca-interior":{ main: "#f44336", rgb: "244, 67, 54" },
  "esperanca":     { main: "#4caf50", rgb: "76, 175, 80" },
  "luz-interior":  { main: "#ffc107", rgb: "255, 193, 7" },
  "transformacao": { main: "#9c27b0", rgb: "156, 39, 176" },
  "liberdade":     { main: "#00bcd4", rgb: "0, 188, 212" },
  "conexao":       { main: "#2196f3", rgb: "33, 150, 243" },
  "evolucao":      { main: "#e91e63", rgb: "233, 30, 99" },
  "harmonia":      { main: "#8bc34a", rgb: "139, 195, 74" },
};

export default function Home() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>("se-olha");
  const player = useAudioPlayer();
  const themeTracks = getTracksByTheme(activeTheme);
  const themeInfo = THEMES[activeTheme];
  const colors = THEME_COLORS[activeTheme];
  const allThemeIds = Object.keys(THEMES) as ThemeId[];

  return (
    <div className="min-h-screen pb-24">
      {/* ===== LÚMEN HUB BACK LINK ===== */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2.5"
           style={{ background: "rgba(5,5,14,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(168,85,247,0.15)" }}>
        <a href="https://lumen-hub.manus.space" target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-2 text-xs font-semibold tracking-wider transition-colors hover:text-purple-400"
           style={{ color: "rgba(168,85,247,0.8)" }}>
          <ArrowLeft className="w-3.5 h-3.5" />
          LÚMEN HUB
        </a>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>光 · 一期一会</span>
      </div>
      <div className="h-10" />

      {/* ===== HERO SECTION ===== */
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
              Músicas geradas por IA em{" "}
              <span className="text-cyan-400 font-semibold">múltiplos idiomas</span> e{" "}
              <span className="text-amber-400 font-semibold">estilos musicais</span> diferentes.
            </p>
            <p className="text-sm text-white/40">
              Todas as músicas foram geradas por inteligência artificial. Cada uma é única.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { label: "Músicas", value: tracks.length.toString(), color: "#ff6ec7" },
                { label: "Estilos", value: "12+", color: "#ffd740" },
                { label: "Idiomas", value: "10+", color: "#00e5ff" },
                { label: "Temas", value: allThemeIds.length.toString(), color: "#69f0ae" },
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
                Múltiplos países. Múltiplos idiomas. Múltiplas mensagens. <Sparkles className="inline w-5 h-5 text-amber-400" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THEME SELECTOR ===== */}
      <section className="container py-8">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
          Escolha um tema
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {allThemeIds.map((themeId) => {
            const theme = THEMES[themeId];
            const isActive = activeTheme === themeId;
            const tc = THEME_COLORS[themeId];
            const trackCount = getTracksByTheme(themeId).length;

            return (
              <motion.button
                key={themeId}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTheme(themeId)}
                className="relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, rgba(${tc.rgb}, 0.18) 0%, rgba(${tc.rgb}, 0.06) 100%)`
                    : "rgba(255,255,255,0.03)",
                  border: `2px solid ${isActive ? tc.main + "60" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isActive ? `0 0 24px rgba(${tc.rgb}, 0.15)` : "none",
                }}
              >
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${tc.main}, transparent)` }}
                  />
                )}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{theme.icon}</span>
                  <h3
                    className="text-sm font-bold truncate"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: isActive ? tc.main : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {theme.title}
                  </h3>
                </div>
                <p className="text-xs text-white/40 leading-snug line-clamp-2">
                  {theme.subtitle}
                </p>
                {trackCount > 0 && (
                  <span
                    className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: `rgba(${tc.rgb}, 0.15)`,
                      color: tc.main,
                    }}
                  >
                    {trackCount} faixa{trackCount !== 1 ? "s" : ""}
                  </span>
                )}
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
              background: colors.main,
              boxShadow: `0 0 10px rgba(${colors.rgb}, 0.5)`,
            }}
          />
          <span className="text-2xl">{themeInfo.icon}</span>
          <h2
            className="text-2xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: colors.main,
            }}
          >
            {themeInfo.title}
          </h2>
          <span className="text-xs text-white/30 ml-2">
            {themeTracks.length} faixa{themeTracks.length !== 1 ? "s" : ""}
          </span>
        </div>

        <p className="text-sm text-white/40 mb-6 -mt-3">{themeInfo.description}</p>

        {themeTracks.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <p className="text-4xl mb-3">🎵</p>
            <p className="text-sm">Músicas em breve para este tema.</p>
          </div>
        ) : (
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
        )}
      </section>

      {/* ===== EQUALIZER FOOTER ===== */}
      <section className="relative overflow-hidden py-4">
        <img src={EQ_IMG} alt="" className="w-full h-24 sm:h-32 object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-white/20 mb-1">Criado com IA · Suno AI · Jukebox IA Multilíngue</p>
            <a href="https://lumen-hub.manus.space" target="_blank" rel="noopener noreferrer"
               className="text-xs font-semibold tracking-widest transition-colors hover:text-purple-300"
               style={{ color: "rgba(168,85,247,0.6)" }}>
              光 LÚMEN HUB →
            </a>
          </div>
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

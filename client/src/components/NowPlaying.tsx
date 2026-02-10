/* DESIGN: Neon Vinyl Lounge — Bottom player bar with vinyl animation */
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Shuffle } from "lucide-react";
import type { Track } from "@/lib/musicData";

interface NowPlayingProps {
  track: Track | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  useAlt: boolean;
  onPlayPause: () => void;
  onSeek: (pct: number) => void;
  onToggleVersion: () => void;
}

function formatTime(s: number): string {
  if (!s || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function NowPlaying({
  track,
  isPlaying,
  progress,
  currentTime,
  duration,
  useAlt,
  onPlayPause,
  onSeek,
  onToggleVersion,
}: NowPlayingProps) {
  if (!track) return null;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    onSeek(Math.max(0, Math.min(100, pct)));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: `linear-gradient(180deg, rgba(10,10,25,0.95) 0%, rgba(10,10,25,0.99) 100%)`,
          backdropFilter: "blur(20px)",
          borderTop: `1px solid rgba(${track.neonColorRgb}, 0.2)`,
        }}
      >
        {/* Progress bar */}
        <div
          className="h-1 cursor-pointer relative group"
          onClick={handleSeek}
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div
            className="h-full transition-all duration-100 relative"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${track.neonColor}80, ${track.neonColor})`,
              boxShadow: `0 0 10px rgba(${track.neonColorRgb}, 0.5)`,
            }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: track.neonColor,
                boxShadow: `0 0 8px rgba(${track.neonColorRgb}, 0.8)`,
              }}
            />
          </div>
        </div>

        <div className="container flex items-center gap-4 py-3">
          {/* Vinyl disc */}
          <div className="relative w-12 h-12 shrink-0">
            <div
              className={`w-full h-full rounded-full ${isPlaying ? "vinyl-spinning" : ""}`}
              style={{
                background: `conic-gradient(from 0deg, rgba(${track.neonColorRgb},0.1), rgba(${track.neonColorRgb},0.3), rgba(${track.neonColorRgb},0.1), rgba(${track.neonColorRgb},0.3), rgba(${track.neonColorRgb},0.1))`,
                border: `2px solid ${track.neonColor}40`,
                boxShadow: `0 0 15px rgba(${track.neonColorRgb}, 0.2)`,
              }}
            >
              <div
                className="absolute inset-[35%] rounded-full"
                style={{ background: track.neonColor + "60" }}
              />
            </div>
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">{track.flag}</span>
              <h4
                className="font-semibold text-sm truncate"
                style={{ color: track.neonColor, fontFamily: "var(--font-body)" }}
              >
                {track.title}
              </h4>
            </div>
            <p className="text-xs text-white/40 truncate">
              {track.style} · {track.language} · {track.country}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-white/40 hidden sm:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Toggle version button */}
            <button
              onClick={onToggleVersion}
              className="p-2 rounded-full transition-all hover:scale-110"
              style={{
                background: useAlt ? `rgba(${track.neonColorRgb}, 0.2)` : "rgba(255,255,255,0.05)",
                color: useAlt ? track.neonColor : "rgba(255,255,255,0.5)",
              }}
              title={useAlt ? "Versão B (ativa)" : "Versão A (ativa) — clique para trocar"}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={onPlayPause}
              className="p-3 rounded-full transition-all hover:scale-110"
              style={{
                background: `rgba(${track.neonColorRgb}, 0.2)`,
                color: track.neonColor,
                boxShadow: `0 0 15px rgba(${track.neonColorRgb}, 0.3)`,
              }}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

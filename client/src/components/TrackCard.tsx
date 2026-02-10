/* DESIGN: Neon Vinyl Lounge — Each card glows with genre-specific neon color */
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import type { Track } from "@/lib/musicData";

interface TrackCardProps {
  track: Track;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: (track: Track) => void;
  index: number;
}

export default function TrackCard({ track, isActive, isPlaying, onPlay, index }: TrackCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      onClick={() => onPlay(track)}
      className="group relative cursor-pointer"
    >
      <div
        className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
          isActive
            ? "scale-[1.02]"
            : "hover:scale-[1.02]"
        }`}
        style={{
          background: isActive
            ? `linear-gradient(135deg, rgba(${track.neonColorRgb}, 0.2) 0%, rgba(${track.neonColorRgb}, 0.05) 100%)`
            : `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
          border: `1px solid ${isActive ? track.neonColor + "60" : "rgba(255,255,255,0.06)"}`,
          boxShadow: isActive
            ? `0 0 20px rgba(${track.neonColorRgb}, 0.15), 0 0 40px rgba(${track.neonColorRgb}, 0.05)`
            : "none",
        }}
      >
        {/* Neon accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${track.neonColor}, transparent)`,
            opacity: isActive ? 1 : 0,
          }}
        />

        <div className="flex items-center gap-4">
          {/* Play button / vinyl disc */}
          <div
            className="relative flex items-center justify-center w-14 h-14 rounded-full shrink-0 transition-all duration-300"
            style={{
              background: isActive
                ? `radial-gradient(circle, rgba(${track.neonColorRgb}, 0.3) 0%, rgba(${track.neonColorRgb}, 0.1) 70%)`
                : "rgba(255,255,255,0.05)",
              boxShadow: isActive
                ? `0 0 15px rgba(${track.neonColorRgb}, 0.3)`
                : "none",
            }}
          >
            {/* Vinyl grooves */}
            <div
              className={`absolute inset-1 rounded-full border border-white/10 ${
                isActive && isPlaying ? "vinyl-spinning" : ""
              }`}
              style={{
                background: "conic-gradient(from 0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06), rgba(255,255,255,0.02), rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              }}
            >
              <div className="absolute inset-[35%] rounded-full" style={{ background: track.neonColor + "40" }} />
            </div>
            {/* Play/Pause icon */}
            <div className="relative z-10">
              {isActive && isPlaying ? (
                <Pause className="w-5 h-5" style={{ color: track.neonColor }} />
              ) : (
                <Play className="w-5 h-5 ml-0.5" style={{ color: isActive ? track.neonColor : "rgba(255,255,255,0.6)" }} />
              )}
            </div>
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl leading-none">{track.flag}</span>
              <span
                className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  color: track.neonColor,
                  background: `rgba(${track.neonColorRgb}, 0.15)`,
                }}
              >
                {track.style}
              </span>
            </div>
            <h3
              className="font-semibold text-sm truncate transition-colors duration-300"
              style={{
                fontFamily: "var(--font-body)",
                color: isActive ? track.neonColor : "rgba(255,255,255,0.9)",
              }}
            >
              {track.title}
            </h3>
            <p className="text-xs text-white/40 mt-0.5">
              {track.language} · {track.country}
            </p>
          </div>

          {/* Audio bars indicator */}
          {isActive && isPlaying && (
            <div className="flex items-end gap-[2px] h-6 shrink-0">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    background: track.neonColor,
                    animation: `audio-bar ${0.5 + i * 0.15}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                    height: "100%",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

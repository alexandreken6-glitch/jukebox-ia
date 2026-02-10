import { useState, useRef, useEffect, useCallback } from "react";
import type { Track } from "@/lib/musicData";

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [useAlt, setUseAlt] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => { setIsPlaying(false); setProgress(0); setCurrentTime(0); };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack?.id === track.id) {
      if (audio.paused) audio.play();
      else audio.pause();
      return;
    }

    audio.pause();
    audio.src = useAlt ? track.audioUrlAlt : track.audioUrl;
    audio.load();
    audio.play().catch(() => {});
    setCurrentTrack(track);
    setProgress(0);
    setCurrentTime(0);
  }, [currentTrack, useAlt]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (pct / 100) * audio.duration;
  }, []);

  const toggleVersion = useCallback(() => {
    setUseAlt((prev) => {
      const next = !prev;
      if (currentTrack && audioRef.current) {
        const wasPlaying = !audioRef.current.paused;
        const time = audioRef.current.currentTime;
        audioRef.current.src = next ? currentTrack.audioUrlAlt : currentTrack.audioUrl;
        audioRef.current.load();
        audioRef.current.currentTime = time;
        if (wasPlaying) audioRef.current.play().catch(() => {});
      }
      return next;
    });
  }, [currentTrack]);

  return { currentTrack, isPlaying, progress, duration, currentTime, useAlt, play, pause, seek, toggleVersion };
}

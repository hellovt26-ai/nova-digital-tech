"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { playClick } from "@/lib/sounds";

function VideoCard({
  videoId,
  title,
  label,
  delay = 0,
  isShort = false,
}: {
  videoId: string;
  title: string;
  label: string;
  delay?: number;
  isShort?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  const embedUrl = isShort
    ? `https://www.youtube.com/shorts/${videoId}?autoplay=1`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="relative w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl overflow-hidden glass-strong glow-cyan"
    >
      {!playing ? (
        <button
          onClick={() => { setPlaying(true); playClick(); }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-black/40 via-black/20 to-black/40 group cursor-pointer"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-nova-cyan to-nova-blue flex items-center justify-center group-hover:shadow-lg group-hover:shadow-nova-cyan/30 transition-all group-hover:scale-110 active:scale-95">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
          <span className="text-sm text-white/80 font-medium">{label}</span>
        </button>
      ) : null}

      {playing ? (
        <div className="absolute inset-0">
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      )}
    </motion.div>
  );
}

export default function VideoSection() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
            See What We Do
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Watch NOVA in{" "}
            <span className="text-gradient">Action</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 justify-items-center">
          <VideoCard
            videoId="_qvnFgRrFqU"
            title="NOVA DIGITAL TECH Promo"
            label="Watch Our Story"
            isShort
          />
          <VideoCard
            videoId="m3Iud33T6Dc"
            title="NOVA DIGITAL TECH"
            label="Watch Now"
            delay={0.15}
            isShort
          />
        </div>
      </div>
    </section>
  );
}

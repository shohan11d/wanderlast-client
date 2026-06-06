"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const slides = [
  {
    tag: "Expert Tutors",
    title: "Learn from the",
    highlight: "very best minds",
    body: "Connect with verified subject experts across 50+ disciplines. Every tutor is rigorously vetted — so you always learn from someone who truly knows their field.",
    stat: "2,400+",
    statLabel: "Expert tutors ready now",
    cta: "Browse Tutors",
  },
  {
    tag: "Flexible Scheduling",
    title: "Study on your",
    highlight: "own schedule",
    body: "Book 1-on-1 sessions anytime — morning, night, or weekend. Sessions from 30 minutes to full-day intensives. Your learning, your pace, your time zone.",
    stat: "98%",
    statLabel: "Session satisfaction rate",
    cta: "Book a Session",
  },
  {
    tag: "Proven Results",
    title: "Results you can",
    highlight: "actually measure",
    body: "Track your progress with personalised learning dashboards. Most students see grade improvements within the first 3 sessions.",
    stat: "87%",
    statLabel: "Students improved grades in 30 days",
    cta: "View Tutors Page",
  },
];

const DURATION = 5000;

export default function BannerCarousel() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/3`);
        const data = await res.json();
        setTutors(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTutors();
  }, []);

  console.log("tutors in banner", tutors);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  const goTo = (n) => {
    setCurrent((n + slides.length) % slides.length);
  };

  useEffect(() => {
    setProgress(0);
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => goTo(current + 1), DURATION);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [current]);

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden bg-[#0f1c2e] min-h-[420px] flex flex-col select-none">
      {/* Slide Content */}
      <div className="flex-1 flex items-center px-12 py-14">
        <div className="max-w-lg">
          <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-teal-300 border border-teal-300/30 rounded-full px-3 py-1 mb-5">
            {slide.tag}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-[#f0ece3] mb-4">
            {slide.title}
            <br />
            <em className="italic text-teal-300">{slide.highlight}</em>
          </h2>
          <p className="text-[15px] font-light text-[#f0ece3]/70 leading-relaxed mb-6 max-w-md">
            {slide.body}
          </p>
          <div className="inline-flex items-center gap-3 bg-teal-300/10 border border-teal-300/20 rounded-lg px-4 py-2 mb-7">
            <span className="font-serif text-2xl font-bold text-teal-300">
              {slide.stat}
            </span>
            <span className="text-xs text-[#f0ece3]/50 leading-snug">
              {slide.statLabel}
            </span>
          </div>
          <br />
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 bg-teal-300 text-[#0a1a2e] text-sm font-medium px-6 py-3 rounded hover:bg-teal-200 transition-all"
          >
            {slide.cta} →
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-[2px] bg-white/10">
        <div
          className="h-full bg-teal-300 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-8 flex items-center gap-5">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-[6px] h-[6px] rounded-full transition-all ${
                i === current ? "bg-teal-300 scale-125" : "bg-white/25"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => goTo(current - 1)}
            className="w-8 h-8 rounded-full bg-white/8 border border-white/15 text-white/70 hover:bg-white/15 flex items-center justify-center text-sm"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="w-8 h-8 rounded-full bg-white/8 border border-white/15 text-white/70 hover:bg-white/15 flex items-center justify-center text-sm"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
<div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto my-20 gap-6">
  {tutors.map((tutor) => (
    <div
      key={tutor._id}
      className="bg-white rounded-lg shadow-md w-60 p-5 border"
    >
      <h3 className="text-xl font-semibold mb-2">
        {tutor.tutorName}
      </h3>

      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Subject:</span>{" "}
          {tutor.subject}
        </p>

        <p>
          <span className="font-medium">Location:</span>{" "}
          {tutor.location}
        </p>

        <p>
          <span className="font-medium">Mode:</span>{" "}
          {tutor.mode}
        </p>

        {tutor.hourlyRate && (
          <p>
            <span className="font-medium">Rate:</span> ৳
            {tutor.hourlyRate}/hr
          </p>
        )}
      </div>

      <Link href={`/tutors/${tutor._id}`}>
        <button className="mt-4 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
          Book Session
        </button>
      </Link>
    </div>
  ))}
</div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Users, BadgeCheck, Heart, Globe } from "lucide-react";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

const counters = [
  { label: "Telugu Profiles", target: 1000, icon: Users, suffix: "+", color: "text-orange-500" },
  { label: "Kannada Profiles", target: 1000, icon: Users, suffix: "+", color: "text-red-500" },
  { label: "Marathi Profiles", target: 1000, icon: Users, suffix: "+", color: "text-blue-500" },
  { label: "Verified Matches", target: 500, icon: BadgeCheck, suffix: "+", color: "text-green-500" },
];

export function TrustCounters() {
  return (
    <section className="py-8 sm:py-12 bg-muted/30 border-y border-border/50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {counters.map((c) => (
            <CounterItem key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterItem({ label, target, icon: Icon, suffix, color }: typeof counters[0]) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} className="flex flex-col items-center text-center space-y-2 group">
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card border border-border shadow-sm flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <div className="text-2xl sm:text-3xl font-black text-foreground tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-xs sm:text-sm font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}

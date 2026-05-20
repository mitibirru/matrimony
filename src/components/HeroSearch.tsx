"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

export function HeroSearch({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const router = useRouter();
  const [lookingFor, setLookingFor] = useState("");
  const [community, setCommunity] = useState("");
  const [ageRange, setAgeRange] = useState([22, 30]);

  return (
    <div className="w-full max-w-4xl bg-background rounded-2xl sm:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border/60 p-2 flex flex-col md:flex-row items-stretch hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-shadow duration-300 relative">
      
      {/* Looking For - Popover */}
      <div className="flex-1 w-full md:border-r border-border">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full h-full border-none shadow-none focus:outline-none bg-transparent py-3 px-4 sm:px-6 rounded-xl sm:rounded-full hover:bg-muted/50 transition-colors cursor-pointer data-[state=open]:bg-muted/50 text-left flex flex-col gap-0.5 items-start">
              <div className="text-xs font-bold text-foreground">Looking for</div>
              <div className="text-[13px] sm:text-[14px] text-muted-foreground">
                {lookingFor ? (lookingFor === "bride" ? "Bride (Female)" : "Groom (Male)") : "Select Gender"}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] sm:w-[320px] rounded-2xl sm:rounded-[2rem] p-4 shadow-[0_12px_40px_rgb(0,0,0,0.12)] border-border/50" align="start" sideOffset={16}>
            <div className="flex flex-col">
              <button 
                onClick={() => setLookingFor("bride")} 
                className={`flex items-center justify-between py-3 sm:py-4 px-4 rounded-2xl transition-colors text-left ${lookingFor === 'bride' ? 'bg-muted/50' : 'hover:bg-muted/30'}`}
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-bold text-[15px] text-foreground">Bride</span>
                  <span className="text-sm text-muted-foreground">Female profiles</span>
                </div>
              </button>
              <div className="h-[1px] w-full bg-border/40 my-1" />
              <button 
                onClick={() => setLookingFor("groom")} 
                className={`flex items-center justify-between py-3 sm:py-4 px-4 rounded-2xl transition-colors text-left ${lookingFor === 'groom' ? 'bg-muted/50' : 'hover:bg-muted/30'}`}
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-bold text-[15px] text-foreground">Groom</span>
                  <span className="text-sm text-muted-foreground">Male profiles</span>
                </div>
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Divider on mobile */}
      <div className="md:hidden h-[1px] w-full bg-border/40 mx-2" />

      {/* Age Range - Popover & Slider */}
      <div className="flex-1 w-full md:border-r border-border">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full h-full border-none shadow-none focus:outline-none bg-transparent py-3 px-4 sm:px-6 rounded-xl sm:rounded-full hover:bg-muted/50 transition-colors cursor-pointer data-[state=open]:bg-muted/50 text-left flex flex-col gap-0.5 items-start">
              <div className="text-xs font-bold text-foreground">Age</div>
              <div className="text-[13px] sm:text-[14px] text-muted-foreground">
                {ageRange[0]} - {ageRange[1]} Years
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] sm:w-[320px] rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 shadow-[0_12px_40px_rgb(0,0,0,0.12)] border-border/50" align="center" sideOffset={16}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm">Select Age Range</h4>
                <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {ageRange[0]} - {ageRange[1]}
                </span>
              </div>
              <Slider
                min={18}
                max={70}
                step={1}
                value={ageRange}
                onValueChange={setAgeRange}
                className="my-4"
              />
              <div className="flex justify-between text-xs font-medium text-muted-foreground">
                <span>18</span>
                <span>70</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Divider on mobile */}
      <div className="md:hidden h-[1px] w-full bg-border/40 mx-2" />

      {/* Community - Popover */}
      <div className="flex-1 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full h-full border-none shadow-none focus:outline-none bg-transparent py-3 px-4 sm:px-6 rounded-xl sm:rounded-full hover:bg-muted/50 transition-colors cursor-pointer data-[state=open]:bg-muted/50 text-left flex flex-col gap-0.5 items-start">
              <div className="text-xs font-bold text-foreground">Community</div>
              <div className="text-[13px] sm:text-[14px] text-muted-foreground">
                {community ? community.charAt(0).toUpperCase() + community.slice(1) : "Select Community"}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] sm:w-[320px] rounded-2xl sm:rounded-[2rem] p-4 shadow-[0_12px_40px_rgb(0,0,0,0.12)] border-border/50" align="start" sideOffset={16}>
            <div className="flex flex-col">
              {[
                { value: "telugu", label: "Telugu", desc: "Telugu speaking profiles" },
                { value: "kannada", label: "Kannada", desc: "Kannada speaking profiles" },
                { value: "marathi", label: "Marathi", desc: "Marathi speaking profiles" },
              ].map((item, i) => (
                <div key={item.value}>
                  {i > 0 && <div className="h-[1px] w-full bg-border/40 my-1" />}
                  <button
                    onClick={() => setCommunity(item.value)}
                    className={`flex items-center justify-between py-3 sm:py-4 px-4 rounded-2xl transition-colors text-left w-full ${community === item.value ? 'bg-muted/50' : 'hover:bg-muted/30'}`}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-bold text-[15px] text-foreground">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.desc}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Button */}
      <div className="px-2 py-2 w-full md:w-auto flex justify-center md:justify-end">
        <button
          onClick={() => {
            if (!isLoggedIn) { router.push("/register"); return; }
            const params = new URLSearchParams();
            if (lookingFor) params.set("lookingFor", lookingFor);
            if (community) params.set("community", community);
            params.set("ageMin", String(ageRange[0]));
            params.set("ageMax", String(ageRange[1]));
            const qs = params.toString();
            router.push(`/discover${qs ? `?${qs}` : ""}`);
          }}
          className="w-full md:w-auto bg-secondary text-white p-3 sm:p-4 rounded-xl sm:rounded-full flex items-center justify-center gap-2 hover:bg-secondary/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
        >
          <Search className="h-5 w-5" />
          <span className="md:hidden font-bold text-sm">Search Profiles</span>
        </button>
      </div>
    </div>
  );
}

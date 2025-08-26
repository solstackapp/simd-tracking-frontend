"use client";

import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/solstack-nobg.png"
              alt="SolStack"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="flex items-baseline space-x-2">
              <span className="font-qurova text-2xl font-semibold text-foreground">
                SolStack
              </span>
              <span className="text-lg text-muted-foreground">
                SIMD Vote Tracker
              </span>
            </div>
          </Link>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
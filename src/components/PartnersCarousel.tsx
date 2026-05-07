"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Partner {
  _id: string;
  name: string;
  logo: string;
  website?: string;
  order?: number;
  active?: boolean;
}

export default function PartnersCarousel({
  partners,
}: {
  partners: Partner[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const parent = scrollRef.current;
      const viewCenter = parent.scrollLeft + parent.clientWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(parent.children).forEach((childNode, index) => {
        const child = childNode as HTMLElement;
        if (child.tagName === "STYLE") return;

        const childCenter =
          child.offsetLeft - parent.offsetLeft + child.clientWidth / 2;
        const distance = Math.abs(viewCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }
  };

  if (!partners || partners.length === 0) {
    return (
      <div className="flex justify-center items-center h-32 text-gray-500">
        No partners added yet.
      </div>
    );
  }

  return (
    <div className="relative group max-w-6xl mx-auto px-12">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-400/50 hover:bg-gray-500 shadow-xl p-2 rounded-full transition-all text-white opacity-80 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {partners.map((partner) => (
          <div
            key={partner._id}
            className="min-w-[200px] md:min-w-[250px] snap-center shrink-0"
          >
            <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-8 h-32 flex items-center justify-center grayscale hover:grayscale-0 hover:bg-white hover:shadow-lg transition-all duration-500 cursor-pointer">
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name || "Partner"}
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
            </div>
          </div>
        ))}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-400/50 hover:bg-gray-500 shadow-xl p-2 rounded-full transition-all text-white opacity-80 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        {partners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (scrollRef.current) {
                const elements = Array.from(scrollRef.current.children).filter(
                  (child) => child.tagName !== "STYLE",
                );
                const child = elements[index] as HTMLElement;
                if (child) {
                  scrollRef.current.scrollTo({
                    left:
                      child.offsetLeft -
                      scrollRef.current.offsetLeft -
                      scrollRef.current.clientWidth / 2 +
                      child.clientWidth / 2,
                    behavior: "smooth",
                  });
                }
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 bg-[#800000]"
                : "w-2.5 bg-gray-500 hover:bg-gray-700"
            }`}
            aria-label={`Go to partner slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

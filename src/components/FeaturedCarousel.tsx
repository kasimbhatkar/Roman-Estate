"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedCarousel({
  properties,
}: {
  properties: any[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const parent = scrollRef.current;
      const viewCenter = parent.scrollLeft + parent.clientWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(parent.children).forEach((child: any, index) => {
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

  if (!properties || properties.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">
        No featured properties available.
      </p>
    );
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur shadow-xl p-3 rounded-full hover:bg-white hover:scale-110 transition-all text-gray-800"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 pt-4 px-4 -mx-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {properties.map((property) => (
          <div
            key={property._id}
            className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-center shrink-0"
          >
            <Link
              href={`/properties/${property._id}`}
              className="block group/card bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <Image
                  src={
                    property.images && property.images.length > 0
                      ? property.images[0]
                      : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
                  }
                  alt={property.title || "Property"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                  Featured
                </div>
                <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm capitalize">
                  {property.status || "For Sale"}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-bold text-gray-900 group-hover/card:text-blue-600 transition-colors line-clamp-1">
                    {property.title}
                  </h4>
                  <p className="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">
                    ₹{property.price?.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1 shrink-0" />
                  <span className="line-clamp-1">
                    {property.location?.address ||
                      property.location?.city ||
                      property.location?.type ||
                      "Mumbai"}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-gray-600 text-sm">
                  <span>{property.bedrooms || 0} BHK</span>
                  <span>{property.size || 0} Sq.Ft.</span>
                  <div className="flex items-center text-orange-500">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    4.9
                  </div>
                </div>
              </div>
            </Link>
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
        className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur shadow-xl p-3 rounded-full hover:bg-white hover:scale-110 transition-all text-gray-800"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center space-x-2 mt-2">
        {properties.map((_, index) => (
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
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

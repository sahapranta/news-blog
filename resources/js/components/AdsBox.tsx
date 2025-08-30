"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

type AdsBoxProps = {
  image: string;
  title: string;
  body?: string;
  ctaText?: string;
  ctaLink?: string;
  dismissible?: boolean;
  height?: string; // e.g. "h-40", "h-64"
};

const AdsBox: React.FC<AdsBoxProps> = ({
  image,
  title,
  body,
  ctaText = "Learn More",
  ctaLink = "#",
  dismissible = true,
  height = "h-48",
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden rounded-lg shadow-lg",
        height
      )}
    >
      {/* Background image */}
      <img
        src={image}
        alt="Ad background"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 z-20 text-white hover:text-gray-300"
        >
          <X size={18} />
        </button>
      )}

      {/* Ad content */}
      <div className="relative z-10 flex h-full flex-col justify-center gap-2 p-5 text-white md:max-w-xl">
        <h3 className="text-lg font-bold md:text-xl">{title}</h3>
        {body && <p className="text-sm text-white/90">{body}</p>}
        {ctaLink && (
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block w-max rounded-md bg-white px-4 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 transition"
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
};

export default AdsBox;
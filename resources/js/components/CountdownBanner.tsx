import React, { useEffect, useState } from "react";
import { QuotationProps } from "@/types/model";
import { bannerStyles } from "@/components/bannerStyles";
import clsx from "clsx";

const Banner: React.FC<{ quote: QuotationProps | null }> = ({ quote }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!quote || !bannerStyles[quote.type]) return null;

  const style = bannerStyles[quote.type];

  return (
    <div className={clsx("relative overflow-hidden rounded-lg p-6 shadow-lg", style.wrapper)}>
      <div className="absolute inset-0 opacity-20">{style.decorations}</div>

      <div className="relative z-10 flex flex-col items-center md:flex-row md:justify-between text-left space-y-5 md:space-y-0">
        <div
          className={clsx("transition-all duration-700", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
        >
          <div className={style.title}>{quote.title ?? "উক্তি"}</div>
          <h2 className={style.author}>{quote.author ?? "শ্রীল প্রভুপাদ"}</h2>
          <p className={clsx("mt-3", style.body)}>{quote.body}</p>
          {quote.source && <p className={style.source}>{quote.source}</p>}
        </div>
      </div>
    </div>
  );
};

export default Banner;

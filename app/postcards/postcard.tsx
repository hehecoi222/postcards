import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PolaroidSection from "./polaroidsection";

interface Post {
    post: string;
    image: string;
}

interface Data {
    name: string;
    pages: Post[];
}

interface PostcardProps {
    data: Data
}

function useSnapScroll(sectionRefs: React.RefObject<HTMLDivElement | null>[]) {
  useEffect(() => {
    let isThrottled = false;
    let current = 0;
    const mq = window.matchMedia("(min-width: 768px)");

    const onWheel = (e: WheelEvent) => {
      if (!mq.matches) return; // Only apply snap on md+
      if (isThrottled) return;
      isThrottled = true;

      if (e.deltaY > 0 && current < sectionRefs.length - 1) {
        current++;
      } else if (e.deltaY < 0 && current > 0) {
        current--;
      } else {
        isThrottled = false;
        return;
      }
      sectionRefs[current].current?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        isThrottled = false;
      }, 800);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [sectionRefs]);
}

export function Postcard({data}: PostcardProps) {
    const SECTIONS = data.pages.map(page => ({
        text: page.post,
        image: page.image
    }));

    const sectionRefs = SECTIONS.map(() => useRef<HTMLDivElement>(null));
    useSnapScroll(sectionRefs);
    console.log(data)
    return (
        <>
            <div className="bg-white">
            {SECTIONS.map((section, i) => (
                <div
                ref={sectionRefs[i]}
                key={i}
                className="flex items-stretch md:min-h-screen min-h-[70vh] w-full border-4 border-black overflow-hidden"
                >
                <PolaroidSection text={section.text} animate={i === 0} />
                </div>
            ))}
            </div>
        </>
    )
}
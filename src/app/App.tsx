import { useEffect, useState } from "react";
import Container from "../imports/Container/index";
import BackgroundVerticalBorder from "../imports/BackgroundVerticalBorder/index";

export default function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Calculate scale factor based on 1920px design width
      const width = window.innerWidth || document.documentElement.clientWidth || 1920;
      const newScale = width > 0 ? width / 1920 : 1;
      setScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
      className="bg-[#2a2a2a] min-h-screen overflow-hidden flex items-start justify-start"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        className="relative shrink-0 flex flex-col"
        style={{
          width: "1920px",
          height: `calc(100vh / ${scale})`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Container />
        <div className="absolute right-0 top-[245px] w-[460px] bottom-[34px]">
          <BackgroundVerticalBorder />
        </div>
      </div>
    </div>
  );
}

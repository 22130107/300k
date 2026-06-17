import Container from "../imports/Container/index";
import BackgroundVerticalBorder from "../imports/BackgroundVerticalBorder/index";

export default function App() {
  return (
    <div className="relative min-w-[1920px] min-h-screen bg-[#2a2a2a] overflow-auto flex flex-col">
      <Container />
      <div className="absolute right-0 top-[245px] w-[420px] bottom-[34px]">
        <BackgroundVerticalBorder />
      </div>
    </div>
  );
}

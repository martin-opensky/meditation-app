import Image from "next/image";
import MeditationApp from "../components/MeditationApp";

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid place-items-center">
          <div className="py-1">
            <Image src="/icons/flower-of-life.png" width={128} height={128} />
          </div>
        </div>
        <MeditationApp />
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import PlayIcon from "../components/PlayIcon";
import StopIcon from "../components/StopIcon";

export default function MeditationApp({ onClick }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("00:00");
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [meditationLength, setMeditationLength] = useState(30);
  const [meditationFinishTime, setMeditationFinishTime] = useState(0);
  const [meditationFinished, setMeditationFinished] = useState(false);
  const timerRef = useRef<any>();

  useEffect(() => {
    const func = () => {
      if (isPlaying) {
        // Update the seek position
        calculateTimeRemaining();

        // Recall the animation frame function
        timerRef.current = requestAnimationFrame(func);
      }
    };

    // initialize the animation frame
    timerRef.current = requestAnimationFrame(func);

    // Cancel the animation frame when the component unmounts
    return () => cancelAnimationFrame(timerRef.current);
  }, [isPlaying]);

  useEffect(() => {
    setAudio(new Audio("/audio/singing-pyramid-77.mp3"));
  }, []);

  const stopMediation = () => {
    setIsPlaying(false);
    setMeditationFinishTime(0);
    // setMeditationFinished(false);
    cancelAnimationFrame(timerRef.current);
    audio?.pause();
    if (audio) {
      audio.currentTime = 0;
    }
  };

  const startMediation = () => {
    // Set finish time based on meditation length
    const finishTime = new Date().getTime() + meditationLength * 60000 + 1000;
    // const finishTime = new Date().getTime() + 36000;

    setMeditationFinishTime(finishTime);
    setIsPlaying(true);
    audio?.play();
  };

  const finishMeditation = () => {
    cancelAnimationFrame(timerRef.current);
    audio?.play();

    setInterval(() => {
      if (isPlaying) {
        setIsPlaying(false);
        setMeditationFinishTime(0);
        setMeditationFinished(false);
      }
    }, 30000);
  };

  const calculateTimeRemaining = () => {
    const now = new Date().getTime();

    const distance = meditationFinishTime - now;

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes: number = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    let seconds: number = Math.floor((distance % (1000 * 60)) / 1000);

    if (hours == 0 && minutes == 0 && seconds == 0) {
      console.log("finished - all 0");
      setMeditationFinished(true);
      finishMeditation();
      return;
    }

    let minutesStr = "";
    let secondsStr = "";

    if (minutes.toString().length == 1) {
      minutesStr = `0${minutes}`;
    } else {
      minutesStr = `${minutes}`;
    }

    if (seconds.toString().length == 1) {
      secondsStr = `0${seconds}`;
    } else {
      secondsStr = `${seconds}`;
    }

    if (hours > 0) {
      setTimeRemaining(`${hours}:${minutesStr}:${secondsStr}`);
    } else {
      setTimeRemaining(`${minutesStr}:${secondsStr}`);
    }
  };

  // TODO:
  // Create GIT repo to deploy
  // Deploy on Vercel
  // Install PWA on phone

  return (
    <div>
      ​
      {isPlaying ? (
        <div className="grid place-items-center">
          {meditationFinished ? (
            <>...</>
          ) : (
            <>
              <div className="py-5 text-center font-bold text-3xl">
                {timeRemaining}
              </div>
              <StopIcon onClick={() => stopMediation()} />
            </>
          )}
        </div>
      ) : (
        <>
          <div className="py-5 text-center font-bold text-3xl">
            <input
              type="number"
              value={meditationLength}
              onChange={(e) => setMeditationLength(parseInt(e.target.value))}
              className="w-14 text-center"
            />
            minutes
          </div>
          <div className="flex justify-center">
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(20)}
              >
                20 mins
              </span>
            </div>
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(30)}
              >
                30 mins
              </span>
            </div>
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(45)}
              >
                45 mins
              </span>
            </div>
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(60)}
              >
                60 mins
              </span>
            </div>
          </div>
          <div className="grid place-items-center py-5">
            <PlayIcon onClick={() => startMediation()} />
          </div>
        </>
      )}
    </div>
  );
}

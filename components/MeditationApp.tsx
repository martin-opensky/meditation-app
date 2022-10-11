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
  const [currentAudioFileName, setCurrentAudioFileName] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);
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
    // random selection from array
    const audioFiles = ["77", "124", "200", "280", "444", "555", "666"];
    const randomAudioFile =
      audioFiles[Math.floor(Math.random() * audioFiles.length)];

    setCurrentAudioFileName(randomAudioFile);

    const tempAudio = new Audio(`/audio/${randomAudioFile}.mp3`);
    setAudio(tempAudio);

    tempAudio.addEventListener("loadeddata", function () {
      setAudioDuration(this.duration);
      console.log("audioDuration", this.duration);
    });
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
    // const finishTime = new Date().getTime() + meditationLength * 60000 + 1000;
    const finishTime = new Date().getTime() + 35000;

    setMeditationFinishTime(finishTime);
    setIsPlaying(true);
    audio?.play();
  };

  const finishMeditation = () => {
    if (!meditationFinished) {
      cancelAnimationFrame(timerRef.current);
      audio?.play();
    }

    setTimeout(() => {
      console.log("finishMeditation setTimeout");

      if (isPlaying) {
        setIsPlaying(false);
        setMeditationFinishTime(0);
        setMeditationFinished(false);
      }
    });
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

    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
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

  return (
    <div>
      ​
      {isPlaying ? (
        <div className="grid place-items-center">
          {meditationFinished ? (
            <>...</>
          ) : (
            <>
              <div className="text-center font-bold text-3xl py-5">
                {timeRemaining}
              </div>

              <StopIcon onClick={() => stopMediation()} />
            </>
          )}
        </div>
      ) : (
        <>
          <div className="text-center font-bold text-3xl">
            <input
              type="number"
              value={meditationLength}
              onChange={(e) => setMeditationLength(parseInt(e.target.value))}
              className="w-14 text-center"
            />
            minutes
          </div>
          <div className="flex justify-center py-5">
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(10)}
              >
                10
              </span>
            </div>
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(20)}
              >
                20
              </span>
            </div>
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(30)}
              >
                30
              </span>
            </div>
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(45)}
              >
                45
              </span>
            </div>
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(60)}
              >
                60
              </span>
            </div>
            <div className="p-1">
              <span
                className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 cursor-pointer"
                onClick={() => setMeditationLength(60)}
              >
                90
              </span>
            </div>
          </div>
          <div className="grid place-items-center ">
            <PlayIcon onClick={() => startMediation()} />
          </div>
        </>
      )}
      <div className="grid place-items-center py-5">
        <em className="text-gray-400">{currentAudioFileName}</em>
      </div>
      <div className="grid place-items-center py-48">
        <em className="text-gray-200">v0.2</em>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { LogOut, Pause, Play } from "lucide-react";
import {
  frequencyToMidi,
  isCorrectNote,
  isValidFrequency,
  midiToNote,
} from "../../../lib/audio";
import { YIN } from "pitchfinder";
import { cn } from "../../../lib/utils";
import { useFretNinja } from "../providers/FretNinjaProvider";
import { useMic } from "../../../hooks/useMic";

const GameScene = ({
  showConfirmationQuitModal,
}: {
  showConfirmationQuitModal: () => void;
}) => {
  const {
    time,
    note,
    nextNote,
    correctNotesCount,
    incrementCorrectNotesCount,
    endGame,
    pauseGame,
    resumeGame,
    decrementTime,
    gameState,
  } = useFretNinja();

  // getting the audio stream using useMic() hook
  const { stream } = useMic();

  // --- States ---

  // current note is correct or not
  // idle meaning not correct, or not played
  // correct meaning played note matched the current note
  const [status, setStatus] = useState<"idle" | "correct">("idle");

  // --- Refs ---

  // This ensures note is not changed multiple times when correct note is played.
  // Because animation frame updates like 60 times per second
  // It causes multiple detect method calls and if note is correct it will set status to correct multiple times and increment correct notes multiple times
  const noteRef = useRef(note);

  // This ref is used to lock the game, to prevent spamming, better UX.
  const lockedRef = useRef(false);

  const gameStateRef = useRef<GameState>(gameState);

  // --- Effects ---

  useEffect(() => {
    noteRef.current = note;
  }, [note]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // uses audio stream
  // analyses the audio data and detects the pitch using YIN algorithm
  // after that, the frequency is converted to MIDI note
  // and then the musical note is figured out from the musical note
  // the musical note is compared with the current note
  useEffect(() => {
    if (!stream) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    const detectPitch = YIN({
      sampleRate: audioContext.sampleRate,
    });

    source.connect(analyser);

    const buffer = new Float32Array(analyser.fftSize);
    let animationId: number;

    const detect = () => {
      analyser.getFloatTimeDomainData(buffer);

      const frequency = detectPitch(buffer);

      if (!lockedRef.current && frequency && isValidFrequency(frequency)) {
        const midi = frequencyToMidi(frequency);
        const currentNote = midiToNote(midi);

        if (isCorrectNote(noteRef.current, currentNote)) {
          setStatus("correct");
          lockedRef.current = true;
          incrementCorrectNotesCount();
        }
      }
      animationId = requestAnimationFrame(detect);
    };
    detect();
    // clearing the memory
    return () => {
      cancelAnimationFrame(animationId);
      audioContext.close();
    };
  }, [stream]);

  // On change in status, the game will lock for 1 second
  // to give some time current played note (on the instrument) to fade out and also to prevent spamming and make better UX
  // This also makes sure status changes back to idle after 1 second
  useEffect(() => {
    if (status !== "correct") return;
    const timeout = setTimeout(() => {
      setStatus("idle");
      lockedRef.current = false;
      nextNote();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [status]);

  // This effect updates the time using setInterval method
  // It calls decrementTime() every second
  // It basically decreases 1 time in 1 second
  // so for time 120 it will last for 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStateRef.current === "paused") return;
      decrementTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // if time value has reached 0 or less, it will end the game
  useEffect(() => {
    if (time <= 0) {
      endGame();
    }
  }, [time]);

  return (
    <>
      <div className="w-full flex flex-col items-center gap-8">
        <span className="uppercase text-primary-200 font-bold tracking-widest text-sm">
          play the note
        </span>

        <span
          className={cn(
            "leading-48 text-[140px] xl:text-[160px] 2xl:text-[192px] font-space-grotesk",
            status === "correct"
              ? "text-green-400 soft-glow-green-text"
              : "text-neutral-100 soft-glow-white-text",
          )}
        >
          {note}
        </span>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2 p-8 rounded-2xl border-2 border-primary-200/10 bg-green-500/5">
          <span className="uppercase font-bold text-sm">Notes Played</span>

          <span className="text-green-500 title-lg">{correctNotesCount}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="bg-primary-500/5 text-primary-500 rounded-2xl border-2 border-primary-200/10 p-8 flex flex-col items-center justify-center gap-2"
            onClick={gameState === "paused" ? resumeGame : pauseGame}
          >
            {gameState === "paused" ? (
              <>
                <Play strokeWidth={3} className="size-5" />
                <span className="uppercase font-space-grotesk font-semibold text-sm">
                  Resume
                </span>
              </>
            ) : (
              <>
                <Pause strokeWidth={3} className="size-5" />
                <span className="uppercase font-space-grotesk font-semibold text-sm">
                  Pause
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            className="btn-destructive flex flex-col gap-2 justify-center items-center p-8"
            onClick={showConfirmationQuitModal}
          >
            <LogOut strokeWidth={3} className="size-5" />

            <span className="uppercase font-space-grotesk font-semibold text-sm">
              End Game
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export { GameScene };

import { Play } from "lucide-react";
import { useFretNinja } from "../providers/FretNinjaProvider";

const StartScene = () => {
  const { startGame } = useFretNinja();

  return (
    <>
      <div className="text-center max-w-md">
        <h2 className="mb-3 title-lg text-primary-500 font-bold">
          Ready to play?
        </h2>
        <span className="text-base">Master guitar fretboard notes with Fret Ninja.</span>
      </div>
      <button
        type="button"
        className="cursor-pointer flex items-center justify-center size-32 bg-linear-to-br from-primary-400 to-accent-400 rounded-full soft-glow-blue hover:scale-110 transition-transform duration-300"
        onClick={startGame}
      >
        <Play fill="white" className="size-12 text-white" />
      </button>
      <div className="space-y-3">
        {[
          "Find the note on your fretboard",
          "Play it on your instrument",
          "Earn points!",
        ].map((text, index) => (
          <div key={index} className="flex items-center gap-4 text-base">
            <div className="text-primary-500/80 size-8 bg-neutral-100/10 rounded-md flex items-center justify-center">
              {index + 1}
            </div>
            {text}
          </div>
        ))}
      </div>
    </>
  );
};
export { StartScene };

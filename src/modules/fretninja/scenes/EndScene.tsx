import { LogOut, Music, RotateCcw } from "lucide-react";
import { useFretNinja } from "../providers/FretNinjaProvider";
import { Link } from "react-router-dom";

const EndScene: React.FC = () => {
  const { correctNotesCount, startGame } = useFretNinja();

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex items-center flex-col gap-3">
        <h2 className="title-lg text-primary-500">Game Over, Ninja!</h2>
        <p className="text-base">Great session, Ninja! Check your results below.</p>
      </div>
      <div className="w-full font-bold font-space-grotesk flex items-center gap-8">
        <div className="flex-1 flex flex-col gap-2 rounded-2xl border-2 border-primary-200/10 p-8 bg-primary-500/5">
          <span className="tracking-widest uppercase text-sm">Final Score</span>
          <span className="title-lg text-primary-500">{correctNotesCount}</span>
        </div>
        <div className="flex-1 flex flex-col gap-2 tracking-widest rounded-2xl border-2 border-accent-200/10 p-8 bg-accent-500/5">
          <span className="uppercase text-sm">High Score</span>
          {/* update later */}
          <span className="title-lg text-accent-500">{50}</span>
        </div>
      </div>
      <span className="flex items-center gap-2 font-bold text-neutral-100 text-base">
        Keep practicing, you'll get better!
        <Music className="text-primary-500 size-4" />
      </span>
      <div className="flex items-center gap-8">
        <button
          onClick={startGame}
          type="button"
          className="btn-primary flex items-center gap-2"
        >
          <RotateCcw strokeWidth={3} className="size-5" />
          Play Again
        </button>
        <Link to="/" className="btn-destructive flex items-center gap-2">
          <LogOut strokeWidth={3} className="size-5" />
          exit game
        </Link>
      </div>
    </div>
  );
};

export { EndScene };

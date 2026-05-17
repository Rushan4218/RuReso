import { cn } from "../../lib/utils";
import { ArrowLeft, Clock, Mic } from "lucide-react";
import { useFretNinja } from "./providers/FretNinjaProvider";
import { StartScene } from "./scenes/StartScene";
import { useMic } from "../../hooks/useMic";
import { GameScene } from "./scenes/GameScene";
import { EndScene } from "./scenes/EndScene";
import { TimeDisplay } from "./components/TimeDisplay";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ConfirmationModal } from "../../components/general/ConfirmationModal";

const FretNinjaContent = () => {
  const { gameState, time, endGame } = useFretNinja();
  const { status } = useMic();
  // to show confirmation modal when user tries to quit game in middle of session
  const [showConfirmationQuitModal, setShowConfirmationQuitModal] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
    if (gameState !== "idle" && gameState !== "ended") {
      setShowConfirmationQuitModal(true);
      return;
    }
    navigate("/");
  };
  return (
    <div className="w-full max-w-7xl flex flex-col gap-12">
      <div className="flex items-center justify-between gap-8 h-full">
        <div className="flex flex-col gap-3">
          <h1 className="flex items-center gap-2 text-primary-500 title-lg">
            <ArrowLeft
              strokeWidth={3}
              className="size-6 cursor-pointer"
              onClick={handleBackClick}
            />
            Fret Ninja
          </h1>
          <span>Train to memorize your fretboard</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="border-2 border-primary-200/10 rounded-2xl px-4 font-bold flex items-center gap-4 font-space-grotesk h-22">
            <Clock className="size-5 text-primary-500/80" />
            <div className="flex flex-col">
              <span className="uppercase text-sm">Time</span>
              <TimeDisplay
                time={time}
                className="text-lg text-primary-500/80"
              />
            </div>
          </div>
          <div className="font-bold flex items-center gap-4 border-2 border-primary-200/10 px-4 rounded-2xl h-22 bg-green-500/5">
            <Mic
              className={cn(
                status === "active" ? "text-green-500" : "",
                "size-5",
              )}
            />
            <div className="uppercase flex flex-col font-space-grotesk">
              <span className="text-sm">Mic</span>
              {status === "active" ? (
                <span className="text-green-500">Active</span>
              ) : (
                <span className="">Inactive</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="self-center w-full max-w-4xl 2xl:max-w-5xl border-2 border-primary-200/10 rounded-2xl flex flex-col gap-16 items-center p-8">
        {gameState === "idle" ? (
          <StartScene />
        ) : gameState === "ended" ? (
          <EndScene />
        ) : (
          <GameScene
            showConfirmationQuitModal={() => setShowConfirmationQuitModal(true)}
          />
        )}
      </div>
      <ConfirmationModal
        open={showConfirmationQuitModal}
        onOpenChange={setShowConfirmationQuitModal}
        title="End Game?"
        description="Are you sure you want to end the game."
        confirmButtonText="End Game"
        confirmButtonClassName="bg-red-400 text-red-900"
        onConfirm={endGame}
      />
    </div>
  );
};

export { FretNinjaContent };

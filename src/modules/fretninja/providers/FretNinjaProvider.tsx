import { createContext, ReactNode, useContext, useState } from "react";
import { useMic } from "../../../hooks/useMic";
import { generateRandomNote, Note } from "../../../lib/audio";

type FretNinjaContextType = {
  // states
  gameState: GameState;
  time: number;
  correctNotesCount: number;
  note: Note;

  //actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  decrementTime: () => void;
  nextNote: () => void;
  resetGame: () => void;
  incrementCorrectNotesCount: () => void;
};

const FretNinjaContext = createContext<FretNinjaContextType | null>(null);

export const FretNinjaProvider = ({ children }: { children: ReactNode }) => {
  // States
  const { startMic, stopMic } = useMic();
  const [gameState, setGameState] = useState<GameState>("idle");
  const [time, setTime] = useState<number>(120);
  const [note, setNote] = useState<Note>(generateRandomNote());
  const [correctNotesCount, setCorrectNotesCount] = useState<number>(0);

  // Setters
  // to start the game
  const startGame = async () => {
    await startMic();
    resetGame();
    setGameState("running");
  };

  // to pause the game
  const pauseGame = () => {
    stopMic();
    setGameState("paused");
  };

  // to resume the game
  const resumeGame = () => {
    startMic();
    setGameState("running");
  };

  // to end the game
  const endGame = async () => {
    stopMic();
    setGameState("ended");
  };

  // to reset game to a new state
  const resetGame = () => {
    setGameState("idle");
    setTime(120);
    setCorrectNotesCount(0);
    setNote(generateRandomNote());
  };

  // to decrease the time by 1
  const decrementTime = () => {
    setTime((prev) => {
      if (prev <= 1) return 0;
      return prev - 1;
    });
  };

  // to generate a new random note
  const nextNote = async () => setNote(generateRandomNote());

  // increase currentNotesCount/score
  const incrementCorrectNotesCount = () =>
    setCorrectNotesCount((prev) => prev + 1);

  return (
    <FretNinjaContext.Provider
      value={{
        gameState,
        time,
        note,
        correctNotesCount,
        startGame,
        pauseGame,
        resumeGame,
        endGame,
        resetGame,
        decrementTime,
        nextNote,
        incrementCorrectNotesCount,
      }}
    >
      {children}
    </FretNinjaContext.Provider>
  );
};

export const useFretNinja = () => {
  const context = useContext(FretNinjaContext);
  if (!context) {
    throw new Error("useFretNinja must be used within a FretNinjaProvider");
  }
  return context;
};

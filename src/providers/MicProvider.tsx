import {
  createContext,
  useCallback,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from "react";

type MicStatus = "idle" | "active" | "error";

type MicContextType = {
  stream: MediaStream | null;
  status: MicStatus;
  error: string | null;
  startMic: () => Promise<void>;
  stopMic: () => void;
};

export const MicContext = createContext<MicContextType | null>(null);

export const MicProvider = ({ children }: { children: ReactNode }) => {
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<MicStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const startMic = useCallback(async () => {
    if (streamRef.current) {
      setStatus("active");
      return;
    }

    try {
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      setStatus("active");
    } catch (err) {
      setStatus("error");
      setError("Failed to access microphone");
    }
  }, []);

  const stopMic = useCallback(() => {
    if (!streamRef.current) return;

    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStatus("idle");
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <MicContext.Provider
      value={{
        stream: streamRef.current,
        status,
        error,
        startMic,
        stopMic,
      }}
    >
      {children}
    </MicContext.Provider>
  );
};

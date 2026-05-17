import { useContext } from "react";
import { MicContext } from "../providers/MicProvider";

export function useMic() {
  const context = useContext(MicContext);

  if (!context) {
    throw new Error("useMic must be used inside MicProvider");
  }

  return context;
}

import { YIN } from "pitchfinder";

export const NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type Note = (typeof NOTES)[number];

// functions here

// generate a random note from the notes array
export const generateRandomNote = () => {
  const randomIndex = Math.floor(Math.random() * NOTES.length);
  return NOTES[randomIndex];
};

// get volume from a buffer of audio data
export const getVolume = (buffer: Float32Array) => {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  return Math.sqrt(sum / buffer.length);
};

// convert a frequency to a note name with octave
export const frequencyToNote = (frequency: number) => {
  const noteNumber = 12 * Math.log2(frequency / 440) + 69;
  const rounded = Math.round(noteNumber);

  const note = NOTES[rounded % 12];
  const octave = Math.floor(rounded / 12) - 1;

  return `${note}${octave}`;
};

export const frequencyToMidi = (frequency: number) => {
  return Math.round(69 + 12 * Math.log2(frequency / 440));
};

export const midiToNote = (midi: number) => {
  return NOTES[((midi % 12) + 12) % 12];
};
// check if the frequency is valid
export const isValidFrequency = (frequency: number) => {
  return frequency > 50 && frequency < 2000;
};

export const createPitchDetector = (sampleRate: number) => {
  const detectPitch = YIN({ sampleRate });

  return (buffer: Float32Array) => {
    return detectPitch(buffer);
  };
};

export const isCorrectNote = (targetNote: Note, note: Note) => {
  return targetNote === note;
};

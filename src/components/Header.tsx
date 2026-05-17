import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary-900/40 backdrop-blur-2xl z-50 sticky top-0 left-0 flex items-center justify-between px-8 py-2 h-20 shadow-md">
      <div className="flex flex-col">
        <h1 className="text-2xl text-primary-500 font-bold">RuReso</h1>
        <span className="text-sm tracking-widest">Music Training</span>
      </div>
      <nav className="font-space-grotesk font-medium flex items-center gap-4">
        <span className="cursor-pointer border-b-2 border-primary-500 text-primary-500 py-2 ">
          Training
        </span>
        <span className="cursor-pointer flex flex-col items-center">
          Library
          <span className="text-xs text-neutral-500 ml-1">Coming Soon</span>
        </span>
        <span className=" flex flex-col cursor-pointer items-center">
          Stats
          <span className="text-xs text-neutral-500 ml-1">Coming Soon</span>
        </span>
      </nav>
      <div>
        <Bell className="size-5 cursor-pointer" />
      </div>
    </header>
  );
};

export { Header };

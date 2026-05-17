import { Guitar, Headphones, LucideIcon, Music2 } from "lucide-react";
import MenuCard from "../components/MenuCard";

export type MenuItem = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
  comingSoon?: boolean;
};

const menuItems: MenuItem[] = [
  {
    name: "Fretboard",
    description: "Note Recognition",
    icon: Guitar,
    className: "text-primary-500",
    href: "/fretboard",
  },
  {
    name: "Chords",
    description: "Shape Memory",
    icon: Music2,
    className: "text-accent-500",
    // update later
    href: "/",
    comingSoon: true,
  },
  {
    name: "Ear Training",
    description: "Interval Mastery",
    icon: Headphones,
    className: "text-green-500",
    // upate later
    href: "/",
    comingSoon: true,
  },
];

const MenuPage = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-center">
        <h1 className="heading">
          Focus Your <span className="text-primary-500">Session</span>
        </h1>
        <span className="">
          Select a primary module to continue your progress.
        </span>
      </div>
      <div className="flex gap-8">
        {menuItems.map((item, index) => {
          return <MenuCard key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export { MenuPage };

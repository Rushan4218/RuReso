import { useNavigate } from "react-router-dom";
import { MenuItem } from "../pages/MenuPage";
import { cn } from "../lib/utils";

type MenuCardProps = {
  item: MenuItem;
};
const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(item.href)}
      className="cursor-pointer min-w-72 py-8 flex flex-col gap-8 items-center card"
    >
      <div
        className={cn(
          "p-4 bg-accent-100/5 rounded-lg text-primary-500",
          item.className,
        )}
      >
        <item.icon className="size-8" />
      </div>
      <div className="flex flex-col text-center">
        <h2 className="title-sm">{item.name}</h2>
        <span className="">{item.description}</span>
        {item.comingSoon && (
          <span className="text-xs text-neutral-500 mt-2">Coming Soon</span>
        )}
      </div>
    </div>
  );
};

export default MenuCard;

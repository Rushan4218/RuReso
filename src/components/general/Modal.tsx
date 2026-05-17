import { X } from "lucide-react";
import { cn } from "../../lib/utils";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  children,
  className,
}) => {
  if (!open) return null;
  return (
    <div className="fixed h-screen top-0 left-0 backdrop-blur-2xl w-full flex items-center justify-center ">
      <div
        className={cn(
          "border-2 border-primary-200/10 p-8 rounded-2xl bg-primary-200/20 backdrop-blur-2xl relative",
          className,
        )}
      >
        <X
          className="cursor-pointer absolute top-4 right-4"
          role="button"
          onClick={() => onOpenChange(false)}
        />
        {children}
      </div>
    </div>
  );
};

export { Modal };

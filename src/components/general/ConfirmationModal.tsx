import { cn } from "../../lib/utils";
import { Modal } from "./Modal";

type ConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmButtonText?: string;
  confirmButtonClassName?: string;
  cancelButtonText?: string;
  cancelButtonClassName?: string;
  onConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmButtonText = "confirm",
  confirmButtonClassName,
  cancelButtonText = "cancel",
  cancelButtonClassName,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="flex flex-col gap-8"
    >
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="self-end flex items-center gap-4">
        <button
          className={cn(
            "uppercase text-sm p-4 rounded-2xl border-2 border-primary-200/80 text-primary-200/80 font-bold hover:scale-105 transition-transform duration-300",
            cancelButtonClassName,
          )}
          onClick={() => onOpenChange(false)}
        >
          {cancelButtonText}
        </button>
        <button
          className={cn(
            "text-sm bg-primary-200/30 p-4 rounded-2xl uppercase hover:scale-105 transition-transform duration-300 text-primary-500/70 font-bold",
            confirmButtonClassName,
          )}
          onClick={() => {
            onConfirm();
            onOpenChange(false);
          }}
        >
          {confirmButtonText}
        </button>
      </div>
    </Modal>
  );
};

export { ConfirmationModal };

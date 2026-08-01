import { Check } from "lucide-react";

interface CheckboxCardProps {
  option: string;
  desc?: string;
  isSelected: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

export default function CheckboxCard({
  option,
  desc,
  isSelected,
  disabled,
  onSelect,
}: CheckboxCardProps) {
  return (
    <button
      role="checkbox"
      aria-checked={isSelected}
      onClick={onSelect}
      disabled={disabled}
      className={`
        relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-300
        ${
          isSelected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-border bg-card hover:border-primary/30"
        }
      `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-lg font-bold break-keep">
            {option}
          </span>

          {desc && (
            <span className="text-base text-muted-foreground">
              {desc}
            </span>
          )}
        </div>

        <div
          className={`
            w-6 h-6 rounded-md border-2 flex items-center justify-center
            transition-all
            ${
              isSelected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground/30"
            }
          `}
        >
          {isSelected && (
            <Check className="w-4 h-4" strokeWidth={3}/>
          )}
        </div>
      </div>
    </button>
  );
}
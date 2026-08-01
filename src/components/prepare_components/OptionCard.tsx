
import { Check } from "lucide-react";

interface OptionCardProps {
  option: string;
  desc?: string;
  isSelected: boolean;
  dimmed?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

export default function OptionCard({ option, desc, isSelected, dimmed, disabled, onSelect }: OptionCardProps) {
  return (
    <button
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
      disabled={disabled}
      className={`
        relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-300
        ${isSelected
          ? "border-primary bg-primary/5 shadow-sm scale-[0.98]"
          : "border-border bg-card hover:border-primary/30 hover:bg-card/80 active:scale-[0.98]"}
        ${dimmed ? "opacity-40 grayscale-[30%]" : ""}
      `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className={`text-lg font-bold transition-colors break-keep ${isSelected ? "text-primary" : "text-foreground"}`}>
            {option}
          </span>
          {desc && (
            <span className="text-base text-muted-foreground leading-relaxed break-keep">
              {desc}
            </span>
          )}
        </div>
        <div className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
          ${isSelected ? "border-primary bg-primary text-primary-foreground scale-110" : "border-muted-foreground/30 bg-transparent"}
        `}>
          {isSelected && <Check className="w-4 h-4" strokeWidth={3} />}
        </div>
      </div>
    </button>
  );
}
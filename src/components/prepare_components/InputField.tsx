interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: "text" | "tel" | "email";
  multiline?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

export default function InputField({
  label,
  value,
  placeholder,
  type = "text",
  multiline = false,
  error,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-bold text-foreground break-keep">
        {label}
      </label>

      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full min-h-[160px] p-6 rounded-2xl border-2
            border-border bg-card
            text-lg text-foreground
            placeholder:text-muted-foreground/60
            resize-none
            outline-none
            transition-all duration-300
            focus:border-primary
            focus:bg-primary/5
          "
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full p-6 rounded-2xl border-2
            border-border bg-card
            text-lg text-foreground
            placeholder:text-muted-foreground/60
            outline-none
            transition-all duration-300
            focus:border-primary
            focus:bg-primary/5
          "
        />
      )}

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
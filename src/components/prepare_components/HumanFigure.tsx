import { BodyPart } from "@/types/types";

interface HumanFigureProps {
  paralysis: BodyPart[];
  toggleParalysis: (part: BodyPart) => void;
}

export default function HumanFigure({
  paralysis,
  toggleParalysis,
}: HumanFigureProps) {
  const isSelected = (part: BodyPart) => paralysis.includes(part);

  const partKeyDown =
    (part: BodyPart) => (e: React.KeyboardEvent<SVGElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleParalysis(part);
      }
    };

  const defaultColor = "hsl(var(--primary) / 0.12)";
  const selectedColor = "hsl(var(--primary))";
  const hoverColor = "hsl(var(--primary) / 0.25)";

  return (
    <div className="relative w-full max-w-[280px] mx-auto my-6 flex justify-center">
      <svg viewBox="0 0 200 300" className="w-full h-auto drop-shadow-sm overflow-visible">
        <defs>
          <style>
            {`
              .body-part {
                transition: all 0.3s ease;
                cursor: pointer;
                stroke: hsl(var(--primary) / 0.35);
                stroke-width: 2;
              }

              .body-part:hover {
                fill: ${hoverColor};
                stroke: hsl(var(--primary) / 0.6);
              }

              .body-part.selected {
                fill: ${selectedColor};
                stroke: hsl(var(--primary));
              }

              .torso {
                fill: hsl(var(--primary) / 0.06);
                stroke: hsl(var(--primary) / 0.25);
                stroke-width: 2;
              }
            `}
          </style>
        </defs>

        {/* 몸통 */}
        <path
          d="M 65 95 C 65 80, 135 80, 135 95 L 130 170 C 130 185, 70 185, 70 170 Z"
          className="torso"
        />

        {/* 얼굴 */}
        <circle
          cx="100"
          cy="50"
          r="25"
          className={`body-part ${isSelected("얼굴") ? "selected" : ""}`}
          style={{
            fill: isSelected("얼굴") ? selectedColor : defaultColor,
          }}
          onClick={() => toggleParalysis("얼굴")}
          onKeyDown={partKeyDown("얼굴")}
          tabIndex={0}
          role="button"
          aria-pressed={isSelected("얼굴")}
          aria-label="얼굴"
        />

        {/* 오른팔 (사용자 기준) */}
        <path
          d="M 60 95 C 40 100, 30 130, 35 160 C 40 190, 55 190, 55 160 C 50 130, 60 110, 65 105 Z"
          className={`body-part ${isSelected("오른팔") ? "selected" : ""}`}
          style={{
            fill: isSelected("오른팔") ? selectedColor : defaultColor,
          }}
          onClick={() => toggleParalysis("오른팔")}
          onKeyDown={partKeyDown("오른팔")}
          tabIndex={0}
          role="button"
          aria-pressed={isSelected("오른팔")}
          aria-label="오른팔"
        />

        {/* 왼팔 */}
        <path
          d="M 140 95 C 160 100, 170 130, 165 160 C 160 190, 145 190, 145 160 C 150 130, 140 110, 135 105 Z"
          className={`body-part ${isSelected("왼팔") ? "selected" : ""}`}
          style={{
            fill: isSelected("왼팔") ? selectedColor : defaultColor,
          }}
          onClick={() => toggleParalysis("왼팔")}
          onKeyDown={partKeyDown("왼팔")}
          tabIndex={0}
          role="button"
          aria-pressed={isSelected("왼팔")}
          aria-label="왼팔"
        />

        {/* 오른다리 */}
        <path
          d="M 70 170 C 70 230, 65 270, 75 285 C 85 285, 95 280, 95 270 C 95 220, 95 180, 95 170 Z"
          className={`body-part ${isSelected("오른다리") ? "selected" : ""}`}
          style={{
            fill: isSelected("오른다리") ? selectedColor : defaultColor,
          }}
          onClick={() => toggleParalysis("오른다리")}
          onKeyDown={partKeyDown("오른다리")}
          tabIndex={0}
          role="button"
          aria-pressed={isSelected("오른다리")}
          aria-label="오른다리"
          strokeLinejoin="round"
        />

        {/* 왼다리 */}
        <path
          d="M 130 170 C 130 230, 135 270, 125 285 C 115 285, 105 280, 105 270 C 105 220, 105 180, 105 170 Z"
          className={`body-part ${isSelected("왼다리") ? "selected" : ""}`}
          style={{
            fill: isSelected("왼다리") ? selectedColor : defaultColor,
          }}
          onClick={() => toggleParalysis("왼다리")}
          onKeyDown={partKeyDown("왼다리")}
          tabIndex={0}
          role="button"
          aria-pressed={isSelected("왼다리")}
          aria-label="왼다리"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
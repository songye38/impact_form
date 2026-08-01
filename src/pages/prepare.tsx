import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Check, X, MapPin, Clock, Users, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveBooking } from "@/lib/booking";

const TOTAL_STEPS = 5;

const DIAGNOSIS_OPTIONS = [
  "뇌졸중",
  "파킨슨병",
  "척수손상",
  "기타",
];

const RECOVERY_OPTIONS = [
  {
    num: "①",
    title: "🌱 거의 움직이기 어려운 단계",
    desc: "팔이나 다리를 스스로 움직이기 어려워요.",
  },
  {
    num: "②",
    title: "🌿 움직임이 조금씩 시작되는 단계",
    desc: "조금씩 움직일 수 있지만 아직 어렵고 힘이 들어요.",
  },
  {
    num: "③",
    title: "🚶 기본 움직임을 연습하는 단계",
    desc: "기본적인 움직임을 반복해서 연습하고 있어요.",
  },
  {
    num: "④",
    title: "💪 다양한 움직임을 연습하는 단계",
    desc: "조금 더 자연스럽게 여러 동작을 시도할 수 있어요.",
  },
  {
    num: "⑤",
    title: "🏡 일상 동작을 회복하는 단계",
    desc: "옷 입기, 식사하기 등 일상생활을 연습하고 있어요.",
  },
  {
    num: "⑥",
    title: "✨ 일상생활 복귀를 준비하는 단계",
    desc: "거의 대부분의 움직임이 가능하며 더 자연스럽게 사용하는 연습을 하고 있어요.",
  },
];

const EXPERIENCE_OPTIONS = [
  {
    title: "👋 처음이에요",
    desc: "재활 보조가 처음이라 도움이 필요해요.",
  },
  {
    title: "🏥 병원에서 배워봤어요",
    desc: "기본적인 보조 방법을 배운 경험이 있어요.",
  },
  {
    title: "💪 집에서 계속 도와왔어요",
    desc: "재활 보조 경험이 있어요.",
  },
];

const CONCERN_OPTIONS = [
  "👐 어떻게 잡고 도와야 할지 모르겠어요.",
  "🏃 운동 방법이 맞는지 걱정돼요.",
  "⚠️ 다칠까 봐 걱정돼요.",
  "😥 보호하는 과정이 힘들어요.",
];

const LEARN_OPTIONS = [
  "🧍 안전하게 움직임 보조하기",
  "🏠 집에서 할 수 있는 재활 방법",
  "🪑 일상생활 동작 돕기",
  "💬 환자와 함께 동기 유지하기",
];

type BodyPart = "얼굴" | "오른팔" | "왼팔" | "오른다리" | "왼다리";

const BODY_PARTS: { id: BodyPart; label: string }[] = [
  { id: "얼굴", label: "얼굴" },
  { id: "오른팔", label: "오른팔" },
  { id: "왼팔", label: "왼팔" },
  { id: "오른다리", label: "오른다리" },
  { id: "왼다리", label: "왼다리" },
];

interface OptionCardProps {
  option: string;
  desc?: string;
  isSelected: boolean;
  dimmed?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

function OptionCard({ option, desc, isSelected, dimmed, disabled, onSelect }: OptionCardProps) {
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

export default function Prepare() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [paralysis, setParalysis] = useState<BodyPart[]>([]);
  const [recovery, setRecovery] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [concern, setConcern] = useState<string | null>(null);
  const [learn, setLearn] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAdvanceTimer = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  useEffect(() => clearAdvanceTimer, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);

  const autoAdvance = (nextStep: number) => {
    setIsAdvancing(true);
    // Brief gentle transition before advancing
    clearAdvanceTimer();
    advanceTimer.current = setTimeout(() => {
      setStep(nextStep);
      setIsAdvancing(false);
    }, 600);
  };

  const handleSelectDiagnosis = (option: string) => {
    setDiagnosis(option);
    autoAdvance(2);
  };

  const toggleParalysis = (part: BodyPart) => {
    setParalysis(prev => 
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const canProceed =
    step === 1 ? !!diagnosis :
    step === 2 ? paralysis.length > 0 :
    step === 3 ? !!recovery :
    step === 4 ? !!experience && !!concern && !!learn :
    true;

  const handleNext = () => {
    if (!canProceed) return;
    if (step >= TOTAL_STEPS) {
      saveBooking({ group: "🌱 기초 회복반", time: "화요일 오전 10:00" });
      setBooked(true);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    clearAdvanceTimer();
    setIsAdvancing(false);
    setStep(step + 1);
  };

  const handleBack = () => {
    clearAdvanceTimer();
    setIsAdvancing(false);
    if (booked) {
      setBooked(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (step === 1) {
      setLocation("/");
    } else {
      setStep(step - 1);
    }
  };

  const renderHumanFigure = () => {
    const isSelected = (part: BodyPart) => paralysis.includes(part);
    const partKeyDown = (part: BodyPart) => (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleParalysis(part);
      }
    };
    
    // Front view: Left arm is on viewer's right. Right arm is on viewer's left.
    // Colors: muted for default, primary for selected.
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

          {/* Torso (Not interactive, just background) */}
          <path 
            d="M 65 95 C 65 80, 135 80, 135 95 L 130 170 C 130 185, 70 185, 70 170 Z" 
            className="torso"
            rx="10"
          />

          {/* Head - 얼굴 */}
          <circle 
            cx="100" cy="50" r="25" 
            className={`body-part ${isSelected("얼굴") ? "selected" : ""}`}
            style={{ fill: isSelected("얼굴") ? selectedColor : defaultColor }}
            onClick={() => toggleParalysis("얼굴")}
            onKeyDown={partKeyDown("얼굴")}
            tabIndex={0}
            role="button"
            aria-pressed={isSelected("얼굴")}
            aria-label="얼굴"
          />

          {/* Right Arm - 오른팔 (Viewer's Left) */}
          <path 
            d="M 60 95 C 40 100, 30 130, 35 160 C 40 190, 55 190, 55 160 C 50 130, 60 110, 65 105 Z" 
            className={`body-part ${isSelected("오른팔") ? "selected" : ""}`}
            style={{ fill: isSelected("오른팔") ? selectedColor : defaultColor }}
            onClick={() => toggleParalysis("오른팔")}
            onKeyDown={partKeyDown("오른팔")}
            tabIndex={0}
            role="button"
            aria-pressed={isSelected("오른팔")}
            aria-label="오른팔"
          />

          {/* Left Arm - 왼팔 (Viewer's Right) */}
          <path 
            d="M 140 95 C 160 100, 170 130, 165 160 C 160 190, 145 190, 145 160 C 150 130, 140 110, 135 105 Z" 
            className={`body-part ${isSelected("왼팔") ? "selected" : ""}`}
            style={{ fill: isSelected("왼팔") ? selectedColor : defaultColor }}
            onClick={() => toggleParalysis("왼팔")}
            onKeyDown={partKeyDown("왼팔")}
            tabIndex={0}
            role="button"
            aria-pressed={isSelected("왼팔")}
            aria-label="왼팔"
          />

          {/* Right Leg - 오른다리 (Viewer's Left) */}
          <path 
            d="M 70 170 C 70 230, 65 270, 75 285 C 85 285, 95 280, 95 270 C 95 220, 95 180, 95 170 Z" 
            className={`body-part ${isSelected("오른다리") ? "selected" : ""}`}
            style={{ fill: isSelected("오른다리") ? selectedColor : defaultColor }}
            onClick={() => toggleParalysis("오른다리")}
            onKeyDown={partKeyDown("오른다리")}
            tabIndex={0}
            role="button"
            aria-pressed={isSelected("오른다리")}
            aria-label="오른다리"
            strokeLinejoin="round"
          />

          {/* Left Leg - 왼다리 (Viewer's Right) */}
          <path 
            d="M 130 170 C 130 230, 135 270, 125 285 C 115 285, 105 280, 105 270 C 105 220, 105 180, 105 170 Z" 
            className={`body-part ${isSelected("왼다리") ? "selected" : ""}`}
            style={{ fill: isSelected("왼다리") ? selectedColor : defaultColor }}
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
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background flex justify-center pb-24">
      <div className="w-full max-w-md flex flex-col min-h-[100dvh] animate-in fade-in slide-in-from-bottom-8">
        
        {/* Header & Progress */}
        <header className="px-6 pt-12 pb-6 flex flex-col gap-6 sticky top-0 bg-background/90 backdrop-blur-md z-10">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full w-12 h-12 -ml-3 text-muted-foreground hover:text-foreground"
              onClick={handleBack}
              aria-label="이전 단계"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            
            {/* Numeric & Dot Progress */}
            {!booked && (
            <div
              className="flex items-center gap-3"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={TOTAL_STEPS}
              aria-valuenow={step}
              aria-label={`${TOTAL_STEPS}단계 중 ${step}단계`}
            >
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_STEPS }, (_, idx) => idx + 1).map((i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                      i === step 
                        ? "bg-primary" 
                        : i < step 
                          ? "bg-primary/40" 
                          : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-muted-foreground tabular-nums">
                {step} / {TOTAL_STEPS}
              </span>
            </div>
            )}
            
            {/* Empty space for flex alignment balance */}
            <div className="w-12 h-12" />
          </div>
        </header>

        {/* Content Area */}
        <main className="px-6 flex-1 flex flex-col">
          {step === 1 && (
            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col gap-4 mt-2">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  STEP 1 · 환자 정보
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                  환자의 병명을 알려주세요.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                  병명에 따라 알맞은 재활 프로그램을 추천해드려요.
                </p>
              </div>

              <div className="flex flex-col gap-4" role="radiogroup" aria-label="환자의 병명을 알려주세요.">
                {DIAGNOSIS_OPTIONS.map((option) => (
                  <OptionCard
                    key={option}
                    option={option}
                    isSelected={diagnosis === option}
                    dimmed={isAdvancing && diagnosis !== option}
                    disabled={isAdvancing && diagnosis !== option}
                    onSelect={() => handleSelectDiagnosis(option)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col gap-4 mt-2">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  STEP 2 · 환자 정보
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                  마비 부위를 알려주세요.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                  환자에게 맞는 운동 프로그램과 그룹을 추천하기 위해 필요한 정보입니다.
                </p>
              </div>

              {renderHumanFigure()}

              <div className="flex flex-col items-center gap-4 min-h-[80px]">
                {paralysis.length > 0 ? (
                  <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">선택됨</span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {paralysis.map((part) => (
                        <button
                          key={part}
                          onClick={() => toggleParalysis(part)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-sm active:scale-95 transition-transform"
                        >
                          {part}
                          <X className="w-4 h-4 opacity-80" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm font-medium bg-secondary/50 px-4 py-3 rounded-xl animate-in fade-in">
                    그림에서 마비된 부위를 눌러 선택해주세요.
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col gap-4 mt-2">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  STEP 3 · 환자 정보
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                  현재 회복 상태를 알려주세요.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                  가장 비슷한 상태를 선택해 주세요.<br />
                  잘 모르겠다면 병원에서 안내받은 회복 단계를 참고하거나 첫 수업에서 치료사가 함께 확인해드립니다.
                </p>
              </div>

              <div className="flex flex-col gap-4" role="radiogroup" aria-label="현재 회복 상태를 알려주세요.">
                {RECOVERY_OPTIONS.map((option) => {
                  const isSelected = recovery === option.num;
                  return (
                    <button
                      key={option.num}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setRecovery(option.num)}
                      className={`
                        relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-300
                        ${isSelected
                          ? "border-primary bg-primary/5 shadow-sm scale-[0.98]"
                          : "border-border bg-card hover:border-primary/30 hover:bg-card/80 active:scale-[0.98]"}
                      `}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                          <span className={`text-sm font-bold transition-colors ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                            {option.num}
                          </span>
                          <span className={`text-lg font-bold transition-colors break-keep ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {option.title}
                          </span>
                          <span className="text-base text-muted-foreground leading-relaxed break-keep">
                            {option.desc}
                          </span>
                        </div>
                        <div className={`
                          flex-shrink-0 w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center transition-all duration-300
                          ${isSelected ? "border-primary bg-primary text-primary-foreground scale-110" : "border-muted-foreground/30 bg-transparent"}
                        `}>
                          {isSelected && <Check className="w-4 h-4" strokeWidth={3} />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col gap-4 mt-2">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  STEP 4 · 보호자 정보
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                  함께하는 보호자에 대해 알려주세요.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                  집에서도 안전하게 재활을 이어갈 수 있도록 보호자의 경험과 어려움을 함께 확인해요.
                </p>
              </div>

              <section className="flex flex-col gap-5">
                <h2 className="text-xl font-bold text-foreground leading-snug break-keep">
                  재활을 도와본 경험이 있나요?
                </h2>
                <div className="flex flex-col gap-4" role="radiogroup" aria-label="재활을 도와본 경험이 있나요?">
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <OptionCard
                      key={option.title}
                      option={option.title}
                      desc={option.desc}
                      isSelected={experience === option.title}
                      onSelect={() => setExperience(option.title)}
                    />
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-5">
                <h2 className="text-xl font-bold text-foreground leading-snug break-keep">
                  환자를 도울 때 가장 걱정되는 부분은 무엇인가요?
                </h2>
                <div className="flex flex-col gap-4" role="radiogroup" aria-label="환자를 도울 때 가장 걱정되는 부분은 무엇인가요?">
                  {CONCERN_OPTIONS.map((option) => (
                    <OptionCard
                      key={option}
                      option={option}
                      isSelected={concern === option}
                      onSelect={() => setConcern(option)}
                    />
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-5">
                <h2 className="text-xl font-bold text-foreground leading-snug break-keep">
                  수업에서 가장 배우고 싶은 것은 무엇인가요?
                </h2>
                <div className="flex flex-col gap-4" role="radiogroup" aria-label="수업에서 가장 배우고 싶은 것은 무엇인가요?">
                  {LEARN_OPTIONS.map((option) => (
                    <OptionCard
                      key={option}
                      option={option}
                      isSelected={learn === option}
                      onSelect={() => setLearn(option)}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

          {step === 5 && !booked && (
            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col items-center text-center gap-4 mt-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in duration-500">
                  <Check className="w-8 h-8 text-primary" strokeWidth={3} />
                </div>
                <h1 className="text-2xl font-bold text-foreground leading-snug break-keep">
                  환자 정보 확인 완료
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                  입력해주신 정보를 바탕으로 알맞은 그룹을 찾았어요.
                </p>
              </div>

              <section className="flex flex-col gap-5">
                <h2 className="text-xl font-bold text-foreground leading-snug break-keep">
                  추천 그룹
                </h2>
                <div className="rounded-3xl border-2 border-primary/30 bg-card shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-7 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-2xl font-bold text-foreground break-keep">
                        🌱 기초 회복반
                      </span>
                      <span className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
                        <HeartHandshake className="w-4 h-4" />
                        보호자 참여 필수
                      </span>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-lg font-medium text-foreground">서울 서부</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-lg font-medium text-foreground">화/목 10:00</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-lg font-medium text-foreground">6명 정원</span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-secondary/50 p-5 flex flex-col gap-3">
                      <span className="text-sm font-bold text-primary">추천 이유</span>
                      <ul className="flex flex-col gap-2.5">
                        {[
                          "현재 회복 단계와 비슷한 환자 그룹",
                          "보호자와 함께 안전한 움직임 연습",
                          "기초 균형과 일상 동작 중심",
                        ].map((reason) => (
                          <li key={reason} className="flex items-start gap-2.5">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span className="text-base text-foreground leading-relaxed break-keep">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {booked && (
            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col items-center text-center gap-4 mt-4">
                <span className="text-5xl animate-in zoom-in duration-500" aria-hidden="true">🎉</span>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                  첫 수업 준비 완료
                </h1>
              </div>

              <div className="rounded-3xl border-2 border-primary/30 bg-card shadow-sm p-7 flex flex-col items-center text-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="text-base font-semibold text-primary">화요일 오전 10:00</span>
                <span className="text-2xl font-bold text-foreground break-keep">🌱 기초 회복반</span>
              </div>

              <section className="flex flex-col gap-5">
                <h2 className="text-xl font-bold text-foreground leading-snug break-keep">
                  준비물
                </h2>
                <div className="rounded-2xl bg-secondary/50 p-5">
                  <ul className="flex flex-col gap-2.5">
                    {[
                      "안정적인 의자",
                      "편한 복장",
                      "보호자 함께 참여",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-base text-foreground leading-relaxed break-keep">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-1.5">
                <span className="text-sm font-bold text-primary">첫 수업 전</span>
                <p className="text-base text-foreground leading-relaxed break-keep">
                  치료사가 환자의 상태를 다시 확인합니다.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Bottom Actions */}
        <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent flex justify-center pointer-events-none z-20">
          <div className="w-full max-w-md flex gap-3 pointer-events-auto">
            {booked ? (
              <>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setLocation("/")}
                  className="flex-1 h-16 rounded-2xl text-lg font-bold bg-white border-2 hover:bg-secondary/50"
                >
                  홈으로 돌아가기
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => setLocation("/pre-class")}
                  className="flex-[1.2] h-16 rounded-2xl text-lg font-bold shadow-sm"
                >
                  수업 전 준비 보기
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleBack}
                  className="flex-1 h-16 rounded-2xl text-lg font-bold bg-white border-2 hover:bg-secondary/50"
                >
                  이전
                </Button>
                <Button 
                  size="lg" 
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex-[2] h-16 rounded-2xl text-lg font-bold shadow-sm"
                >
                  {step === TOTAL_STEPS ? "예약하기" : "다음"}
                </Button>
              </>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

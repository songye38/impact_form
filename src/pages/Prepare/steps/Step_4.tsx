import { useState } from "react";
import InputField from "@/components/prepare_components/InputField";
import CheckboxCard from "@/components/prepare_components/CheckboxCard";

const HARD_OPTIONS = [
    "오른팔",
    "왼팔",
    "오른손",
    "왼손",
    "오른다리",
    "왼다리",
    "몸통",
    "얼굴"
];


interface Step4Props {
    diagnosis: string | null;
    handleSelectDiagnosis: (option: string) => void;
    isAdvancing: boolean;
}

export default function Step4({
    diagnosis,
    handleSelectDiagnosis,
    isAdvancing,
}: Step4Props) {
    const [description, setDescription] = useState("");
    const [symptoms, setSymptoms] = useState<string[]>([]);

    const toggleSymptom = (option: string) => {
        setSymptoms((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col gap-4 mt-2">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                    STEP 4 · 운동 가능 범위와 안전
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                    환자의 병명을 알려주세요.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                    병명에 따라 알맞은 재활 프로그램을 추천해드려요.
                </p>
            </div>
            <div>
                {HARD_OPTIONS.map((option) => (
                    <CheckboxCard
                        key={option}
                        option={option}
                        isSelected={symptoms.includes(option)}
                        onSelect={() => toggleSymptom(option)}
                    />
                ))}
            </div>

            <div>
                <InputField
                    label="운동 프로그램 진행 시 치료사가 미리 알아야 할 사항이 있다면 적어주세요."
                    placeholder="최근 수술  /  골절 /  심한 통증 /  골다공증 /  기타"
                    value={description}
                    multiline
                    onChange={setDescription}
                />
            </div>
        </div>

    );
}

import { useState } from "react";
import InputField from "@/components/prepare_components/InputField";
import CheckboxCard from "@/components/prepare_components/CheckboxCard";
import { SafetyInfo } from "@/types/types";

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
    safetyInfo: SafetyInfo;
    setSafetyInfo: (value: SafetyInfo) => void;
}

export default function Step4({
    safetyInfo,
    setSafetyInfo,
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
        <div className="flex flex-col gap-14 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
            <div className="flex flex-col gap-2 mt-2">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                    STEP 4 · 운동 상태 및 안전 확인
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                    현재 움직임 상태를 확인해주세요.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                    안전하고 효과적인 운동 프로그램을 제공하기 위해 현재 상태를 확인해요.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <label className="text-lg font-semibold text-foreground leading-relaxed break-keep">
                    현재 움직임이 불편한 부위를 선택해주세요.
                </label>
                {HARD_OPTIONS.map((option) => (
                    <CheckboxCard
                        key={option}
                        option={option}
                        isSelected={safetyInfo.affectedParts.includes(option)}
                        onSelect={() =>
                            setSafetyInfo({
                                ...safetyInfo,
                                affectedParts: safetyInfo.affectedParts.includes(option)
                                    ? safetyInfo.affectedParts.filter(
                                        (item) => item !== option
                                    )
                                    : [...safetyInfo.affectedParts, option],
                            })
                        }
                    />
                ))}
            </div>

            <div>
                <label className="text-lg font-semibold text-foreground leading-relaxed break-keep">
                    치료사가 미리 알아야 할 사항이 있다면 알려주세요.
                </label>
                <InputField
                    label="치료사가 미리 알아야 할 사항이 있다면 알려주세요."
                    placeholder="최근 수술 / 골절 / 심한 통증 / 골다공증 / 기타"
                    value={safetyInfo.description}
                    multiline
                    onChange={(value) =>
                        setSafetyInfo({
                            ...safetyInfo,
                            description: value,
                        })
                    }
                />
            </div>
        </div>

    );
}

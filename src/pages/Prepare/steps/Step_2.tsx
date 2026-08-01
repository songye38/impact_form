import OptionCard from "@/components/prepare_components/OptionCard";
import { useState } from "react";
import InputField from "@/components/prepare_components/InputField";


const FOR_WHO_OPTIONS = [
    "뇌졸중 환자 본인",
    "보호자(환자와 함께 참여)",
];

const RELATIONSHIP_OPTIONS = [
    "배우자",
    "자녀",
    "형제/자매",
    "부모",
];

interface Step2Props {
    diagnosis: string | null;
    handleSelectDiagnosis: (option: string) => void;
    isAdvancing: boolean;
}

export default function Step2({
    diagnosis,
    handleSelectDiagnosis,
    isAdvancing,
}: Step2Props) {

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col gap-4 mt-2">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                    STEP 2 · 참가 대상 확인
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                    환자의 병명을 알려주세요.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                    병명에 따라 알맞은 재활 프로그램을 추천해드려요.
                </p>
            </div>

            <div
                className="flex flex-col gap-4"
                role="radiogroup"
                aria-label="누구를 위해 신청"
            >
                <label className="text-base font-bold text-foreground break-keep">
                    {"  누구를 위한 신청인가요?  "}
                </label>
                {FOR_WHO_OPTIONS.map((option) => (
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
            <div
                className="flex flex-col gap-4"
                role="radiogroup"
                aria-label="환자의 병명을 알려주세요."
            >
                <label className="text-base font-bold text-foreground break-keep">
                    {"  환자의 관계를 알려주세요.  "}
                </label>
                {RELATIONSHIP_OPTIONS.map((option) => (
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

    );
}
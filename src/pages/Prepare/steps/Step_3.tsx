
import { BodyPart } from "@/types/types";
import OptionCard from "@/components/prepare_components/OptionCard";
import { useState } from "react";
import InputField from "@/components/prepare_components/InputField";
import CheckboxCard from "@/components/prepare_components/CheckboxCard";


//  온라인 화상 참여가 가능하신가요?  
const OPTIONS_1 = [
    "가능합니다.",
    "보호자의 도움이 필요합니다.",
    "잘 모르겠습니다."
];

//뇌졸중 진단을 받은 지 얼마나 되었나요?
const OPTIONS_2 = [
    "3개월 미만",
    "3개월 ~ 6개월",
    "6개월 ~ 1년",
    "1년 이상",
];

//  현재 재활운동은 어떻게 하고 계신가요?  
const OPTIONS_3 = [
    "병원에서 치료 중",
    "집에서 혼자 운동",
    "현재 하지 않고 있음",
];

//  스마트폰 또는 태블릿 사용이 가능하신가요?  
const OPTIONS_4 = [
    "혼자 가능합니다.",
    "보호자의 도움이 필요합니다.",
    "어렵습니다.",
];



interface Step3Props {
    diagnosis: string | null;
    handleSelectDiagnosis: (option: string) => void;
    isAdvancing: boolean;
}

export default function Step3({
    diagnosis,
    handleSelectDiagnosis,
    isAdvancing,
}: Step3Props) {

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col gap-4 mt-2">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                    STEP 3 · 프로그램 참여 가능 여부
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                    환자의 병명을 알려주세요.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                    병명에 따라 알맞은 재활 프로그램을 추천해드려요.
                </p>
            </div>
            {/* options 1 */}
            <div
                className="flex flex-col gap-4"
                role="radiogroup"
                aria-label="환자의 병명을 알려주세요."
            >
                <label className="text-base font-bold text-foreground break-keep">
                    {"  환자의 관계를 알려주세요.  "}
                </label>
                {OPTIONS_1.map((option) => (
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

            {/* options2 */}
            <div
                className="flex flex-col gap-4"
                role="radiogroup"
                aria-label="환자의 병명을 알려주세요."
            >
                <label className="text-base font-bold text-foreground break-keep">
                    {"  환자의 관계를 알려주세요.  "}
                </label>
                {OPTIONS_2.map((option) => (
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

            {/* options3 */}
            <div
                className="flex flex-col gap-4"
                role="radiogroup"
                aria-label="환자의 병명을 알려주세요."
            >
                <label className="text-base font-bold text-foreground break-keep">
                    {"  환자의 관계를 알려주세요.  "}
                </label>
                {OPTIONS_3.map((option) => (
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
            {/* options4 */}
            <div
                className="flex flex-col gap-4"
                role="radiogroup"
                aria-label="환자의 병명을 알려주세요."
            >
                <label className="text-base font-bold text-foreground break-keep">
                    {"  환자의 관계를 알려주세요.  "}
                </label>
                {OPTIONS_4.map((option) => (
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

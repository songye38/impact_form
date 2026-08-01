import OptionCard from "@/components/prepare_components/OptionCard";
import { useState } from "react";
import InputField from "@/components/prepare_components/InputField";
import { ParticipantInfo } from "@/types/types";


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
    participantInfo: ParticipantInfo;
    setParticipantInfo: (value: ParticipantInfo) => void;
}

export default function Step2({
    participantInfo,
    setParticipantInfo,
}: Step2Props) {

    return (
        <div className="flex flex-col gap-14 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
            <div className="flex flex-col gap-2 mt-2">
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
                aria-label="온라인 화상 참여 가능 여부"
            >
                <label className="text-lg font-semibold text-foreground leading-relaxed break-keep">
                    온라인 화상 참여가 가능하신가요?
                </label>
                {FOR_WHO_OPTIONS.map((option) => (
                    <OptionCard
                        key={option}
                        option={option}
                        isSelected={participantInfo.forWho === option}
                        onSelect={() =>
                            setParticipantInfo({
                                ...participantInfo,
                                forWho: option
                            })
                        }
                    />
                ))}
            </div>
            <div
                className="flex flex-col gap-4"
                role="radiogroup"
                aria-label="온라인 화상 참여 가능 여부"
            >
                <label className="text-lg font-semibold text-foreground leading-relaxed break-keep">
                    온라인 화상 참여가 가능하신가요?
                </label>

                {RELATIONSHIP_OPTIONS.map((option) => (
                    <OptionCard
                        key={option}
                        option={option}
                        isSelected={participantInfo.relationship === option}
                        onSelect={() =>
                            setParticipantInfo({
                                ...participantInfo,
                                relationship: option
                            })
                        }
                    />
                ))}
            </div>
        </div>

    );
}
import OptionCard from "@/components/prepare_components/OptionCard";
import { useState } from "react";
import InputField from "@/components/prepare_components/InputField";
import { PatientInfo } from "@/types/types";


const AGE_OPTIONS = [
    "20대",
    "30대",
    "40대",
    "50대",
    "60대",
    "70대",
    "80대 이상"
];

interface Step1Props {
    patientInfo: PatientInfo;
    setPatientInfo: (value: PatientInfo) => void;
}

export default function Step1({
    patientInfo,
    setPatientInfo,
}: Step1Props) {

    return (
        <div className="flex flex-col gap-14 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
            <div className="flex flex-col gap-2 mt-2">
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

            <div>
                <InputField
                    label="이름"
                    placeholder="이름을 입력해주세요"
                    value={patientInfo.name}
                    onChange={(value) =>
                        setPatientInfo({
                            ...patientInfo,
                            name: value,
                        })
                    }
                />
            </div>
            <div>
                <InputField
                    label="전화번호"
                    placeholder="010-0000-0000"
                    type="tel"
                    value={patientInfo.phone}
                    onChange={(value) =>
                        setPatientInfo({
                            ...patientInfo,
                            phone: value
                        })
                    }
                />
            </div>
            <div
                className="flex flex-col gap-4"
                role="radiogroup"
                aria-label="환자의 병명을 알려주세요."
            >
                <label className="text-lg font-semibold text-foreground leading-relaxed break-keep">
                    {"환자의 병명을 알려주세요."}
                </label>


                {AGE_OPTIONS.map((option) => (
                    <OptionCard
                        key={option}
                        option={option}
                        isSelected={patientInfo.age === option}
                        onSelect={() =>
                            setPatientInfo({
                                ...patientInfo,
                                age: option
                            })
                        }
                    />
                ))}
            </div>
        </div>

    );
}
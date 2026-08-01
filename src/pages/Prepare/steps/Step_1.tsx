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
                    STEP 1 · 환자 정보 확인
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-snug break-keep">
                    환자의 기본 정보를 알려주세요.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed break-keep">
                    현재 상태에 맞는 재활 프로그램을 안내해드리기 위해 필요한 정보를 확인해요.
                </p>
            </div>

            <div>
                <InputField
                    label="이름을 알려주세요."
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
                    label="연락 가능한 전화번호를 입력해주세요."
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
                    {"환자의 연령대를 선택해주세요."}
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
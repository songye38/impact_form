import { useEffect, useState } from "react";
import Step1 from "./steps/Step_1";
import Step2 from "./steps/Step_2";
import Step3 from "./steps/Step_3";
import Step4 from "./steps/Step_4";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PrepareData } from "@/types/types";


export default function Prepare() {
    const [step, setStep] = useState(1);
    const [diagnosis, setDiagnosis] = useState<string | null>(null);
    const [isAdvancing, setIsAdvancing] = useState(false);

    const [formData, setFormData] = useState<PrepareData>({
        patient: {
            name: "",
            phone: "",
            age: null,
        },

        participant: {
            forWho: null,
            relationship: null,
        },

        participation: {
            onlineAvailable: null,
            diagnosisPeriod: null,
            rehabilitationStatus: null,
            deviceAvailable: null,
        },

        safety: {
            affectedParts: [],
            description: "",
        }
    });

    useEffect(() => {
        console.log("현재 입력 데이터:", formData);
    }, [formData]);

    const setPatientInfo = (value: PrepareData["patient"]) => {
        setFormData((prev) => ({
            ...prev,
            patient: value,
        }));
    };

    const setParticipantInfo = (value: PrepareData["participant"]) => {
        setFormData((prev) => ({
            ...prev,
            participant: value,
        }));
    };

    const setParticipationInfo = (value: PrepareData["participation"]) => {
        setFormData((prev) => ({
            ...prev,
            participation: value,
        }));
    };

    const setSafetyInfo = (value: PrepareData["safety"]) => {
        setFormData((prev) => ({
            ...prev,
            safety: value,
        }));
    };


    const autoAdvance = (nextStep: number) => {
        setIsAdvancing(true);

        setTimeout(() => {
            setStep(nextStep);
            setIsAdvancing(false);
        }, 600);
    };


    // const handleSelectDiagnosis = (option: string) => {
    //     setDiagnosis(option);
    //     autoAdvance(2);
    // };

    const handleNext = () => {
        const isValid = validateStep();

        if (!isValid) {
            alert("필수 항목을 모두 입력해주세요.");
            return;
        }

        if (step < 4) {
            setStep((prev) => prev + 1);
        } else {
            console.log("최종 제출 데이터", formData);
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep((prev) => prev - 1);
        }
    };

    const handleBack = () => {
        print();
    };

    const validateStep = () => {
        switch (step) {
            case 1:
                return (
                    formData.patient.name.trim() !== "" &&
                    formData.patient.phone.trim() !== "" &&
                    formData.patient.age !== null
                );

            case 2:
                return (
                    formData.participant.forWho !== null &&
                    formData.participant.relationship !== null
                );

            case 3:
                return (
                    formData.participation.onlineAvailable !== null &&
                    formData.participation.diagnosisPeriod !== null &&
                    formData.participation.rehabilitationStatus !== null &&
                    formData.participation.deviceAvailable !== null
                );

            case 4:
                return (
                    formData.safety.affectedParts.length > 0 &&
                    formData.safety.description.trim() !== ""
                );

            default:
                return false;
        }
    };

    return (



        <div className="w-full min-h-screen bg-background flex justify-center pb-24">
            <div className="w-full max-w-md flex flex-col">

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


                        {/* Empty space for flex alignment balance */}
                        <div className="w-12 h-12" />
                    </div>
                </header>

                {/* Content Area */}
                <main className="px-6 flex-1 flex flex-col">

                    {step === 1 && (
                        <Step1
                            patientInfo={formData.patient}
                            setPatientInfo={setPatientInfo}
                        />
                    )}

                    {step === 2 && (
                        <Step2
                            participantInfo={formData.participant}
                            setParticipantInfo={setParticipantInfo}
                        />
                    )}

                    {step === 3 && (
                        <Step3
                            participationInfo={formData.participation}
                            setParticipationInfo={setParticipationInfo}
                        />
                    )}

                    {step === 4 && (
                        <Step4
                            safetyInfo={formData.safety}
                            setSafetyInfo={setSafetyInfo}
                        />
                    )}

                </main>

                {/* Bottom Actions */}
                <footer className="
                        fixed bottom-0 left-0 right-0
                        px-6 pt-6 pb-8
                        bg-background/95
                        backdrop-blur-md
                        flex justify-center
                        pointer-events-none
                        z-20
                    ">
                    <div className="w-full max-w-md px-6 flex gap-3 pointer-events-auto">
                        {step > 1 && (
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex-1 h-16 rounded-2xl text-lg font-bold"
                                onClick={handlePrevious}
                            >
                                이전
                            </Button>
                        )}

                        <Button
                            size="lg"
                            disabled={!validateStep()}
                            className="flex-[2] h-16 rounded-2xl text-lg font-bold"
                            onClick={handleNext}
                        >
                            {step === 4 ? "완료" : "다음"}
                        </Button>
                    </div>
                </footer>
            </div>
        </div>
    );
}
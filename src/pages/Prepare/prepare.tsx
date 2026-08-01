import { useState } from "react";
import Step1 from "./steps/Step_1";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


export default function Prepare() {
    const [diagnosis, setDiagnosis] = useState<string | null>(null);
    const [isAdvancing, setIsAdvancing] = useState(false);

    const handleBack = () => {
        print();
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
                    <Step1
                        diagnosis={diagnosis}
                        handleSelectDiagnosis={setDiagnosis}
                        isAdvancing={isAdvancing}
                    />



                </main>

                {/* Bottom Actions */}
                <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent flex justify-center pointer-events-none z-20">
                    <div className="w-full max-w-md flex gap-3 pointer-events-auto">
                    </div>
                </footer>
            </div>
        </div>
    );
}
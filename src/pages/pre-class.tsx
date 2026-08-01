import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PreClass() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[100dvh] w-full bg-background flex justify-center pb-24">
      <div className="w-full max-w-md flex flex-col min-h-[100dvh] animate-in fade-in slide-in-from-bottom-8">
        <header className="px-6 pt-12 pb-6 flex items-center sticky top-0 bg-background/90 backdrop-blur-md z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-12 h-12 -ml-3 text-muted-foreground hover:text-foreground"
            onClick={() => window.history.length > 1 ? window.history.back() : setLocation("/")}
            aria-label="뒤로 가기"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </header>

        <main className="px-6 flex-1 flex flex-col justify-center pb-20">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-2">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold text-foreground leading-snug break-keep">
                수업 전 준비 화면을 준비 중이에요
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed break-keep max-w-[260px] mx-auto">
                수업 전 준비 안내는 곧 업데이트될 예정입니다.
              </p>
            </div>
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent flex justify-center pointer-events-none z-20">
          <div className="w-full max-w-md flex pointer-events-auto">
            <Button
              size="lg"
              onClick={() => setLocation("/")}
              className="flex-1 h-16 rounded-2xl text-lg font-bold shadow-sm"
            >
              홈으로 돌아가기
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}

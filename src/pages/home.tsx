import { Link } from "wouter";
import { ShieldCheck, Users, Clock, ArrowRight, CalendarCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBooking } from "@/lib/booking";

export default function Home() {
  const booking = getBooking();

  return (
    <div className="min-h-[100dvh] w-full bg-background flex justify-center pb-20">
      <div className="w-full max-w-md px-6 pt-16 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8">
        
        {/* Header Section */}
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground" data-testid="text-greeting">
            안녕하세요, 김OO님 <span className="inline-block origin-bottom-right hover:rotate-12 transition-transform cursor-default">👋</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed" data-testid="text-subtitle">
            오늘도 꾸준한 재활을<br />시작해볼까요?
          </p>
        </header>

        {/* Booked Class Card or Main CTA Card */}
        {booking ? (
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border-2 border-primary/30 flex flex-col gap-6 relative overflow-hidden group transition-all duration-300 hover:shadow-md" data-testid="card-booking">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-110" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary">
                <CalendarCheck className="w-5 h-5" />
                <span className="text-sm font-bold" data-testid="text-booking-label">예약된 수업</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground break-keep" data-testid="text-booking-group">{booking.group}</h2>
                <p className="text-lg font-semibold text-primary" data-testid="text-booking-time">{booking.time}</p>
                <span className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  <HeartHandshake className="w-4 h-4" />
                  보호자 참여 필수
                </span>
              </div>
            </div>

            <Link href="/pre-class" className="w-full block" data-testid="link-pre-class">
              <Button 
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-sm group-hover:shadow-md transition-all active:scale-[0.98]"
                size="lg"
              >
                수업 전 준비 보기
                <ArrowRight className="w-5 h-5 ml-2 opacity-80 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-border/50 flex flex-col gap-6 relative overflow-hidden group transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-110" />
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground" data-testid="text-cta-title">첫 수업 준비하기</h2>
                <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold">
                  <Clock className="w-4 h-4" />
                  <span data-testid="text-cta-time">약 3분</span>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed" data-testid="text-cta-desc">
                환자와 보호자의 상태를 확인하고 가장 적합한 그룹을 추천해드려요.
              </p>
            </div>

            <Link href="/prepare" className="w-full block" data-testid="link-prepare">
              <Button 
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-sm group-hover:shadow-md transition-all active:scale-[0.98]"
                size="lg"
              >
                시작하기
                <ArrowRight className="w-5 h-5 ml-2 opacity-80 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}

        {/* Info Cards */}
        <div className="flex flex-col gap-4 mt-2">
          
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 border border-border/40 flex gap-4 items-start transition-colors hover:bg-white">
            <div className="bg-blue-50 text-blue-500 p-3 rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-foreground text-lg" data-testid="text-info1-title">왜 준비가 필요한가?</h3>
              <p className="text-muted-foreground leading-relaxed text-sm" data-testid="text-info1-desc">
                환자의 현재 상태와 보호자의 경험을 함께 고려해 가장 안전한 그룹을 추천합니다.
              </p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 border border-border/40 flex gap-4 items-start transition-colors hover:bg-white">
            <div className="bg-green-50 text-green-600 p-3 rounded-2xl shrink-0">
              <Users className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="font-bold text-foreground text-lg" data-testid="text-info2-title">온라인 그룹 재활의 장점</h3>
              <ul className="flex flex-col gap-2 mt-1">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span data-testid="text-info2-point1">기존 방문 재활 대비 약 1/3 비용</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span data-testid="text-info2-point2">보호자도 함께 교육 가능</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

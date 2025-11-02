import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AttendancePage() {
  // 입력 상태
  const [minute, setMinute] = useState("");
  const [seconds, setSeconds] = useState("");
  const navigate = useNavigate();

  // 생성된 코드, 남은 시간
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // 랜덤으로 000~999 코드 생성
  const generateRandomCode = () => {
    const newCode = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    setCode(newCode);
  };

  // 코드 생성 버튼 클릭 시
  const handleGenerateCode = () => {
    if (!minute || !seconds) {
      alert("분과 초를 모두 선택해주세요.");
      return;
    }

    const totalSeconds = Number(minute) * 60 + Number(seconds);
    setTimeLeft(totalSeconds);
    generateRandomCode();

    alert(`출석 코드 생성: ${minute}분 ${seconds}초`);
  };

  const handleStopAutoAttendance = () => {
    setTimeLeft(null); //카운트 다운 끊기
    setCode(""); //코드도 숨기기

    //minute,seconds는 그대로 두면 이전 값으로 다시 시작 가능
  };

  // 카운트다운
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      const resetTimer = setTimeout(() => {
        setTimeLeft(null);
        setCode("");
      }, 1000); // 1초 뒤 자동 초기화
      return () => clearTimeout(resetTimer);
    }
  }, [timeLeft]);

  // 00:00 형식
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 지금 카운트다운 중인지
  const isRunning = timeLeft !== null && timeLeft > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      {/* 제목 */}
      <h1 className="text-xl font-semibold text-gray-800 mb-8 self-start">
        출석
      </h1>

      {/* 흰 박스 */}
      <div className="bg-white w-full max-w-3xl flex items-center justify-between p-8 shadow-sm rounded-md">
        {/* 왼쪽: 입력 or 코드 */}
        {isRunning ? (
          <div className="flex items-center gap-10">
            {/* 남은시간 */}
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-gray-700">
                남은시간:
              </span>
              <span className="text-xl font-semibold text-[#284876] tabular-nums">
                {timeLeft !== null ? formatTime(timeLeft) : "00:00"}
              </span>
            </div>

            {/* 인증번호 */}
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-gray-700">
                인증번호:
              </span>
              <span className="text-2xl font-semibold text-[#8B392B] tracking-widest">
                {code}
              </span>
            </div>
          </div>
        ) : (
          // 기본 입력 화면
          <div className="flex items-center gap-2 text-gray-700 text-lg">
            <label htmlFor="minute">시간</label>
            <input
              id="minute"
              type="number"
              min="0"
              max="59"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-20 border border-blue-300 focus:border-blue-600 outline-none rounded-md px-2 py-1 text-center"
            />
            <span>분</span>
            <input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="w-20 border border-blue-300 focus:border-blue-600 outline-none rounded-md px-2 py-1 text-center"
            />
            <span>초</span>
          </div>
        )}

        {/* 오른쪽 버튼 */}

        {isRunning ? (
          //카운트다운 중일 때: 빨간버튼
          <button
            onClick={handleStopAutoAttendance}
            className="bg-[#C65A46] hover:bg-[#B14E3C] text-white px-6 py-2 rounded-sm font-medium trasition active:scale-[.98] cursor-pointer"
          >
            자동 출결 종료
          </button>
        ) : (
          //평소: 파란 코드 생성버튼
          <button
            onClick={handleGenerateCode}
            className="bg-[#325694] hover:bg-[#284876] text-white px-6 py-2 rounded-sm font-medium trasition active:scale-[.98] cursor-pointer"
          >
            코드 생성
          </button>
        )}
      </div>
    </div>
  );
}

import { useState, type FormEvent } from "react";
import watermark from "../assets/images/watermark_converted.png";

export default function LoginPage() {
  //입력값 관리
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  //로그인 버튼 클릭 시 실행
  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); //페이지 새로고침 막기

    //입력 검증(순서 중요)
    if (!id.trim()) {
      alert("[사용자 아이디] 반드시 입력(선택)하셔야 합니다.");
      return;
    }

    if (!pw.trim()) {
      alert("[비밀번호] 반드시 입력(선택)하셔야 합니다.");
      return;
    }

    //여기에 실제 로그인 요청(API) 나중에 추가 가능
    console.log("로그인 시도: ", { id, pw });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative w-full max-w-2xl border-2 border-green-200/70 rounded-lg p-12 md:0-16 overflow-hidden">
        <img
          src={watermark}
          alt="워터마크 배경"
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 m-auto w-[300px] opacity-20"
        />

        <h1 className="relative text-center font-extrabold tracking-wide text-[#325694] opacity-100">
          <span className="block text-7xl leading-none ">INHA SW</span>
          <span className="block text-7xl mt-2 leading-none">4bit</span>
        </h1>

        <form
          onSubmit={onSubmit}
          className="relative mt-16 space-y-10 max-w-sm mx-auto"
        >
          <div>
            <label className="block text-sm text-gray-500 text-xl">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)} //입력값 저장
              className="mt-1 w-full bg-transparent border-b-3 border-[#325694] focus:border-[#08457E] outline-none py-2"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 text-xl">PW</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)} //입력값 저장
              className="mt-1 w-full bg-transparent border-b-3 border-[#325694] focus:border-[#08457E] outline-none py-2"
              placeholder=""
            />
          </div>
          <button
            type="submit"
            className="mx-auto block w-44 rounded-2xl bg-[#325694] hover:bg-[#08457E] active:scale-[.99] text-white py-3 font-medium shadow-sm transition cursor-pointer"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

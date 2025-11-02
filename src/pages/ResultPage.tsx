import { useState } from "react";

export default function ResultPage() {
  //더미데이터(나중에 백엔드 연동 시 여기만 교체)

  const AttendanceData = [
    {
      major: "컴퓨터공학과",
      grade: 4,
      studentNo: "1222****",
      name: "손하은",
      engName: "Son Ha Eun",
    },
    {
      major: "컴퓨터공학과",
      grade: 2,
      studentNo: "1224****",
      name: "민채원",
      engName: "Min Chae Won",
    },
  ];

  const absenceData = [
    {
      major: "컴퓨터공학과",
      grade: 3,
      studentNo: "1222****",
      name: "김영신",
      engName: "Kim Yeong Sin",
    },
    {
      major: "컴퓨터공학과",
      grade: 2,
      studentNo: "1222****",
      name: "오민기",
      engName: "Oh Min Gi",
    },
  ];

  //현재 탭 상태(기본: 결석자)
  const [activeTab, setActiveTab] = useState<"attend" | "absent">("absent");
  //현재 선택된 데이터
  const currentData = activeTab === "attend" ? AttendanceData : absenceData;

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">출석 결과</h1>

      <div className="flex gap-2 mb-4 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("attend")}
          className={`px-6 py-2 font-medium rounded-t-md cursor-pointer ${
            activeTab === "attend"
              ? "bg-[#325694] text-white border-b-2 border-[#325694]"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          출석자
        </button>
        <button
          onClick={() => setActiveTab("absent")}
          className={`px-6 py-2 font-medium rounded-t-md cursor-pointer ${
            activeTab === "absent"
              ? "bg-[#325694] text-white border-b-2 border-[#325694]"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          결석자
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-md overflow-hidden">
        <div className="h-[3px] bg-gray-900" />

        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-[#325694]">
              <th className="py-3 px-4 text-center border border-gray-200 w-1/5">
                학과(전공)
              </th>
              <th className="py-3 px-4 text-center border border-gray-200 w-16">
                학년
              </th>
              <th className="py-3 px-4 text-center border border-gray-200 w-32">
                학번
              </th>
              <th className="py-3 px-4 text-center border border-gray-200 w-32">
                이름
              </th>
              <th className="py-3 px-4 text-center border border-gray-200">
                영문명
              </th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sm text-center text-gray-800 border border-gray-200">
                    {row.major}
                  </td>
                  <td className="py-3 px-4 text-sm text-center text-gray-800 border border-gray-200">
                    {row.grade}
                  </td>
                  <td className="py-3 px-4 text-sm text-center text-gray-800 font-mono border border-gray-200">
                    {row.studentNo}
                  </td>
                  <td className="py-3 px-4 text-sm text-center border border-gray-200">
                    <span className="text-[#325694] font-medium hover:underline cursor-pointer">
                      {row.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-center text-gray-800 border border-gray-200">
                    {row.engName}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-gray-400 text-sm border border-gray-200"
                >
                  표시할 데이터가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

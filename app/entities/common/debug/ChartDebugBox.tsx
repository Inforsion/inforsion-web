import React from "react";
import { ChartDataItem } from "@/app/types/Revenue";
import Link from "next/link";
import { InventoryConsumedChartDataItem } from "@/app/types/Inventory";

interface DebugBoxProps {
  hasUrlData: boolean;
  chartData: ChartDataItem[] | InventoryConsumedChartDataItem[];
  totalSales: number;
  demoUrl: string;
}

const DebugBox = ({
  hasUrlData,
  chartData,
  totalSales,
  demoUrl,
}: DebugBoxProps) => {
  return (
    <div className="flex flex-col gap-2 p-4 text-sm text-gray-600">
      <p>디버깅 용</p>
      <p>query string으로 timeframe과 data가 있어야 렌더링됩니다.</p>
      <Link href={demoUrl}>
        <button className={"bg-primary text-white px-4 py-2 rounded-md"}>
          예시 데이터로 보기
        </button>
      </Link>
      <p className={"font-bold"}>예시 URL:</p>
      <p>{demoUrl}</p>
      <p>데이터 소스: {hasUrlData ? "URL 파라미터" : "가짜 데이터"}</p>
      <p>총 데이터 수: {chartData.length}개</p>
      <p>총 revenue: {totalSales.toLocaleString()}만원</p>
    </div>
  );
};
export default DebugBox;

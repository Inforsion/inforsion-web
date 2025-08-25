"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "@/app/entities/common/CustomTooltip";
import { RevenueChartProps } from "@/app/types/Revenue";
import { TriangleAlert } from "lucide-react";

// 매출 데이터 인터페이스 정의
interface RawRevenueData {
  날짜: string; // YYYY-MM-DD 형식
  매출: number;
}

// 차트용 데이터 인터페이스
interface ChartDataItem {
  name: string;
  date: string;
  매출: number;
  isToday?: boolean;
  isCurrentWeek?: boolean;
  isCurrentMonth?: boolean;
  isCurrentYear?: boolean;
}

type DailyRevenueChart = RevenueChartProps<"일">;

// 날짜 포맷팅 유틸리티 함수들
const formatDateForDaily = (dateString: string): string => {
  const date = new Date(dateString);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}.${date.getDate()}(${dayNames[date.getDay()]})`;
};

const formatDateForWeekly = (weekIndex: number): string => {
  return `${weekIndex + 1}주차`;
};

const formatDateForMonthly = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}월`;
};

const formatDateForYearly = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년`;
};

// 오늘 날짜 확인 함수
const isToday = (dateString: string): boolean => {
  const today = new Date();
  const targetDate = new Date(dateString);
  return today.toDateString() === targetDate.toDateString();
};

// 현재 주/월/년 확인 함수들
const isCurrentWeek = (dateString: string): boolean => {
  const today = new Date();
  const targetDate = new Date(dateString);
  const todayWeek = getWeekNumber(today);
  const targetWeek = getWeekNumber(targetDate);
  return (
    todayWeek === targetWeek && today.getFullYear() === targetDate.getFullYear()
  );
};

const isCurrentMonth = (dateString: string): boolean => {
  const today = new Date();
  const targetDate = new Date(dateString);
  return (
    today.getMonth() === targetDate.getMonth() &&
    today.getFullYear() === targetDate.getFullYear()
  );
};

const isCurrentYear = (dateString: string): boolean => {
  const today = new Date();
  const targetDate = new Date(dateString);
  return today.getFullYear() === targetDate.getFullYear();
};

// 주차 계산 함수
const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// 데이터 파싱 및 변환 함수
const parseUrlData = (dataParam: string): RawRevenueData[] => {
  try {
    return JSON.parse(decodeURIComponent(dataParam));
  } catch (error) {
    console.error("데이터 파싱 오류:", error);
    return [];
  }
};

// 기간별 데이터 변환 함수들
const transformDataForPeriod = (
  rawData: RawRevenueData[],
  period: string,
): ChartDataItem[] => {
  switch (period) {
    case "일":
      return rawData.map((item) => ({
        name: formatDateForDaily(item.날짜),
        date: item.날짜,
        매출: item.매출,
        isToday: isToday(item.날짜),
      }));

    case "주":
      // 주별로 데이터 그룹핑 및 합계 계산
      const weeklyData = new Map<
        number,
        { 매출: number; 날짜: string; isCurrentWeek: boolean }
      >();

      rawData.forEach((item) => {
        const date = new Date(item.날짜);
        const weekNum = getWeekNumber(date);

        if (weeklyData.has(weekNum)) {
          weeklyData.get(weekNum)!.매출 += item.매출;
        } else {
          weeklyData.set(weekNum, {
            매출: item.매출,
            날짜: item.날짜,
            isCurrentWeek: isCurrentWeek(item.날짜),
          });
        }
      });

      return Array.from(weeklyData.entries()).map(([weekNum, data]) => ({
        name: formatDateForWeekly(weekNum - 1),
        date: data.날짜,
        매출: data.매출,
        isCurrentWeek: data.isCurrentWeek,
      }));

    case "월":
      // 월별로 데이터 그룹핑 및 합계 계산
      const monthlyData = new Map<
        string,
        { 매출: number; 날짜: string; isCurrentMonth: boolean }
      >();

      rawData.forEach((item) => {
        const date = new Date(item.날짜);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

        if (monthlyData.has(monthKey)) {
          monthlyData.get(monthKey)!.매출 += item.매출;
        } else {
          monthlyData.set(monthKey, {
            매출: item.매출,
            날짜: item.날짜,
            isCurrentMonth: isCurrentMonth(item.날짜),
          });
        }
      });

      return Array.from(monthlyData.values()).map((data) => ({
        name: formatDateForMonthly(data.날짜),
        date: data.날짜,
        매출: data.매출,
        isCurrentMonth: data.isCurrentMonth,
      }));

    case "년":
      // 연도별로 데이터 그룹핑 및 합계 계산
      const yearlyData = new Map<
        number,
        { 매출: number; 날짜: string; isCurrentYear: boolean }
      >();

      rawData.forEach((item) => {
        const date = new Date(item.날짜);
        const year = date.getFullYear();

        if (yearlyData.has(year)) {
          yearlyData.get(year)!.매출 += item.매출;
        } else {
          yearlyData.set(year, {
            매출: item.매출,
            날짜: item.날짜,
            isCurrentYear: isCurrentYear(item.날짜),
          });
        }
      });

      return Array.from(yearlyData.values()).map((data) => ({
        name: formatDateForYearly(data.날짜),
        date: data.날짜,
        매출: data.매출,
        isCurrentYear: data.isCurrentYear,
      }));

    default:
      return [];
  }
};

// 가짜 데이터 생성 함수들 (데이터가 없을 때 대체용)
const generateDailyData = (): ChartDataItem[] => {
  const data = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const sales = Math.floor(Math.random() * 20) + 15;
    data.push({
      name: formatDateForDaily(date.toISOString().split("T")[0]),
      date: date.toISOString().split("T")[0],
      매출: sales,
      isToday: i === 0,
    });
  }
  return data;
};

const generateWeeklyData = (): ChartDataItem[] => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    const sales = Math.floor(Math.random() * 50) + 80;
    data.push({
      name: formatDateForWeekly(i),
      date: new Date().toISOString().split("T")[0],
      매출: sales,
      isCurrentWeek: i === 3,
    });
  }
  return data;
};

const generateMonthlyData = (): ChartDataItem[] => {
  const data = [];
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const sales = Math.floor(Math.random() * 100) + 200;
    data.push({
      name: formatDateForMonthly(date.toISOString().split("T")[0]),
      date: date.toISOString().split("T")[0],
      매출: sales,
      isCurrentMonth: i === 0,
    });
  }
  return data;
};

const generateYearlyData = (): ChartDataItem[] => {
  const data = [];
  const currentYear = new Date().getFullYear();
  for (let i = 4; i >= 0; i--) {
    const sales = Math.floor(Math.random() * 500) + 2000;
    const date = new Date(currentYear - i, 0, 1);
    data.push({
      name: formatDateForYearly(date.toISOString().split("T")[0]),
      date: date.toISOString().split("T")[0],
      매출: sales,
      isCurrentYear: i === 0,
    });
  }
  return data;
};

const RevenueChart = () => {
  const [activeTab, setActiveTab] = useState("일");
  const [selectedPeriod, setSelectedPeriod] = useState("7일");
  const [selectedBar, setSelectedBar] = useState<string | null>(null);
  const [urlData, setUrlData] = useState<RawRevenueData[]>([]);
  const [hasUrlData, setHasUrlData] = useState(false);

  const chartData = useMemo((): ChartDataItem[] => {
    // URL에서 받은 데이터가 있으면 사용, 없으면 에러 화면 출력
    if (hasUrlData && urlData.length > 0) {
      return transformDataForPeriod(urlData, activeTab);
    }
    return [];
  }, [activeTab, urlData, hasUrlData]);

  const totalSales = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.매출, 0);
  }, [chartData]);

  const avgSales = useMemo(() => {
    return Math.round(totalSales / chartData.length);
  }, [chartData, totalSales]);

  const maxSales = useMemo(() => {
    return Math.max(...chartData.map((item) => item.매출));
  }, [chartData]);

  const getBarColor = (entry: ChartDataItem) => {
    if (
      entry.isToday ||
      entry.isCurrentWeek ||
      entry.isCurrentMonth ||
      entry.isCurrentYear
    ) {
      return "#006FFD"; // primary-500
    }
    return "#B4DBFF"; // primary-100
  };

  const periodOptions = {
    일: ["7일", "14일", "30일"],
    주: ["4주", "8주", "12주"],
    월: ["6개월", "12개월"],
    년: ["3년", "5년"],
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const timeframe = params.get("timeframe");
    const dataParam = params.get("data");

    // timeframe 설정
    if (timeframe && ["일", "주", "월", "년"].includes(timeframe)) {
      setActiveTab(timeframe);
      switch (timeframe) {
        case "일":
          setSelectedPeriod("7일");
          break;
        case "주":
          setSelectedPeriod("4주");
          break;
        case "월":
          setSelectedPeriod("6개월");
          break;
        case "년":
          setSelectedPeriod("3년");
          break;
      }
    }

    // data 파싱 및 설정
    if (dataParam) {
      try {
        const parsedData = parseUrlData(dataParam);
        setUrlData(parsedData);
        setHasUrlData(true);
        console.log("URL에서 받은 데이터:", parsedData);
      } catch (error) {
        console.error("데이터 파싱 실패:", error);
        setHasUrlData(false);
      }
    } else {
      setHasUrlData(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background-primary dark:bg-background-dark-primary">
      {hasUrlData ? (
        <div className="chart-container focus:outline-none">
          <ResponsiveContainer
            className={"focus:outline-none"}
            width="100%"
            height={250}
          >
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: 10, bottom: 40 }}
              className={"focus:outline-none"}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#666" }}
                tickLine={false}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis hide={true} domain={[0, "dataMax + 10"]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="매출" radius={[8, 8, 0, 0]} maxBarSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          className={"chart-container flex items-center justify-center h-64"}
        >
          <div className={"text-red-400 inline-flex gap-2 items-center"}>
            <TriangleAlert />
            매출 데이터가 올바르지 않습니다. 다시 시도해주세요.
          </div>
        </div>
      )}
      <div className="p-4 text-sm text-gray-600">
        <p>데이터 소스: {hasUrlData ? "URL 파라미터" : "가짜 데이터"}</p>
        <p>총 데이터 수: {chartData.length}개</p>
        <p>총 매출: {totalSales.toLocaleString()}만원</p>
      </div>
    </div>
  );
};

export default RevenueChart;

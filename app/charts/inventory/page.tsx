"use client";
import ChartLoadingBox from "@/app/entities/common/loading/ChartLoadingBox";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "@/app/entities/common/CustomTooltip";
import ChartDebugBox from "@/app/entities/common/debug/ChartDebugBox";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  formatDateForDaily,
  formatDateForMonthly,
  formatDateForWeekly,
  getWeekNumber,
  isCurrentMonth,
  isCurrentWeek,
  isToday,
} from "@/app/lib/utils/format/date";
import ErrorBox from "@/app/entities/common/error/ErrorBox";
import {
  BaseInventoryConsumeData,
  InventoryConsumedChartDataItem,
} from "@/app/types/Inventory";

// 데이터 파싱 및 변환 함수
const parseUrlData = (dataParam: string): InventoryConsumedChartDataItem[] => {
  try {
    return JSON.parse(decodeURIComponent(dataParam));
  } catch (error) {
    console.error("데이터 파싱 오류:", error);
    return [];
  }
};

// 기간별 데이터 변환 함수들
const transformDataForPeriod = (
  rawData: BaseInventoryConsumeData[],
  period: string,
): InventoryConsumedChartDataItem[] => {
  switch (period) {
    case "일":
      return rawData.map((item) => ({
        name: formatDateForDaily(item.date),
        date: item.date,
        inventoryConsumed: item.inventoryConsumed,
        isToday: isToday(item.date),
      }));
    case "주":
      // 주별로 데이터 그룹핑 및 합계 계산
      const weeklyData = new Map<
        number,
        { inventoryConsumed: number; date: string; isCurrentWeek: boolean }
      >();

      rawData.forEach((item) => {
        const date = new Date(item.date);
        const weekNum = getWeekNumber(date);

        if (weeklyData.has(weekNum)) {
          weeklyData.get(weekNum)!.inventoryConsumed += item.inventoryConsumed;
        } else {
          weeklyData.set(weekNum, {
            inventoryConsumed: item.inventoryConsumed,
            date: item.date,
            isCurrentWeek: isCurrentWeek(item.date),
          });
        }
      });

      return Array.from(weeklyData.entries()).map(([weekNum, data]) => ({
        name: formatDateForWeekly(weekNum - 1),
        date: data.date,
        inventoryConsumed: data.inventoryConsumed,
        isCurrentWeek: data.isCurrentWeek,
      }));

    case "월":
      // 월별로 데이터 그룹핑 및 합계 계산
      const monthlyData = new Map<
        string,
        { inventoryConsumed: number; date: string; isCurrentMonth: boolean }
      >();

      rawData.forEach((item) => {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

        if (monthlyData.has(monthKey)) {
          monthlyData.get(monthKey)!.inventoryConsumed +=
            item.inventoryConsumed;
        } else {
          monthlyData.set(monthKey, {
            inventoryConsumed: item.inventoryConsumed,
            date: item.date,
            isCurrentMonth: isCurrentMonth(item.date),
          });
        }
      });

      return Array.from(monthlyData.values()).map((data) => ({
        name: formatDateForMonthly(data.date),
        date: data.date,
        inventoryConsumed: data.inventoryConsumed,
        isCurrentMonth: data.isCurrentMonth,
      }));
    default:
      return [];
  }
};

const InventoryChartPage = () => {
  const [activeTab, setActiveTab] = useState("일");
  const [selectedPeriod, setSelectedPeriod] = useState("7일");
  const [selectedBar, setSelectedBar] = useState<string | null>(null);
  const [urlData, setUrlData] = useState<InventoryConsumedChartDataItem[]>([]);
  const [hasUrlData, setHasUrlData] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const exampleData = [
    {
      date: "2024-06-01",
      inventoryConsumed: 100,
    },
    { date: "2024-06-02", inventoryConsumed: 200 },
    { date: "2024-06-03", inventoryConsumed: 150 },
    { date: "2024-06-04", inventoryConsumed: 300 },
    { date: "2024-06-05", inventoryConsumed: 250 },
    { date: "2024-06-06", inventoryConsumed: 400 },
    { date: "2024-06-07", inventoryConsumed: 350 },
  ];

  const demoUrl =
    "/charts/inventory?timeframe=일&data=" + JSON.stringify(exampleData);

  const chartData = useMemo((): InventoryConsumedChartDataItem[] => {
    // URL에서 받은 데이터가 있으면 사용, 없으면 에러 화면 출력
    if (hasUrlData && urlData.length > 0) {
      const transformedData = transformDataForPeriod(urlData, activeTab);
      setSelectedBar(transformedData.at(-1)?.name || null);
      return transformedData;
    }
    return [];
  }, [activeTab, urlData, hasUrlData]);

  const totalConsumedInventory = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.inventoryConsumed, 0);
  }, [chartData]);

  const handleBarClick = (data: any, index: number) => {
    setSelectedBar(selectedBar === data.name ? null : data.name);
  };

  const getBarColor = (entry: InventoryConsumedChartDataItem) => {
    if (selectedBar === entry.name) {
      return "#006FFD";
    }
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

  useEffect(() => {
    const timeframe = searchParams.get("timeframe");
    const dataParam = searchParams.get("data");
    if (
      timeframe &&
      ["일", "주", "월", "년"].includes(decodeURIComponent(timeframe))
    ) {
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
    setLoading(false);
  }, [searchParams, selectedPeriod]);

  return (
    <div className="min-h-screen bg-background-primary dark:bg-background-dark-primary">
      {loading && <ChartLoadingBox />}
      {!loading && hasUrlData ? (
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
              <Tooltip content={<CustomTooltip unit={"개"} />} />
              <Bar
                dataKey="inventoryConsumed"
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
                onClick={handleBarClick}
                style={{ cursor: "pointer" }}
              >
                {chartData.map((entry, index) => {
                  return (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <ErrorBox />
      )}
      <ChartDebugBox
        hasUrlData={hasUrlData}
        chartData={chartData}
        totalSales={totalConsumedInventory}
        demoUrl={demoUrl}
      />
    </div>
  );
};

export default InventoryChartPage;

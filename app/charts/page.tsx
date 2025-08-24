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
  TooltipProps,
} from "recharts";

// 가짜 데이터 생성 함수들
const generateDailyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const sales = Math.floor(Math.random() * 20) + 15;
    data.push({
      name: `${date.getMonth() + 1}.${date.getDate()}(${["일", "월", "화", "수", "목", "금", "토"][date.getDay()]})`,
      date: date.toISOString().split("T")[0],
      매출: sales,
      isToday: i === 0,
    });
  }
  return data;
};

const generateWeeklyData = () => {
  const data = [];
  const weeks = ["1주차", "2주차", "3주차", "4주차", "5주차"];
  for (let i = 0; i < 5; i++) {
    const sales = Math.floor(Math.random() * 50) + 80;
    data.push({
      name: weeks[i],
      매출: sales,
      isCurrentWeek: i === 3,
    });
  }
  return data;
};

const generateMonthlyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const sales = Math.floor(Math.random() * 100) + 200;
    data.push({
      name: `${date.getMonth() + 1}월`,
      매출: sales,
      isCurrentMonth: i === 0,
    });
  }
  return data;
};

const generateYearlyData = () => {
  const data = [];
  const currentYear = new Date().getFullYear();
  for (let i = 4; i >= 0; i--) {
    const sales = Math.floor(Math.random() * 500) + 2000;
    data.push({
      name: `${currentYear - i}년`,
      매출: sales,
      isCurrentYear: i === 0,
    });
  }
  return data;
};

const SalesChart = () => {
  const [activeTab, setActiveTab] = useState("일");
  const [selectedPeriod, setSelectedPeriod] = useState("7일");

  const chartData = useMemo(() => {
    switch (activeTab) {
      case "일":
        return generateDailyData();
      case "주":
        return generateWeeklyData();
      case "월":
        return generateMonthlyData();
      case "년":
        return generateYearlyData();
      default:
        return generateDailyData();
    }
  }, [activeTab]);

  const totalSales = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.매출, 0);
  }, [chartData]);

  const avgSales = useMemo(() => {
    return Math.round(totalSales / chartData.length);
  }, [chartData, totalSales]);

  const maxSales = useMemo(() => {
    return Math.max(...chartData.map((item) => item.매출));
  }, [chartData]);

  const getBarColor = (entry: {
    isToday?: boolean;
    isCurrentWeek?: boolean;
    isCurrentMonth?: boolean;
    isCurrentYear?: boolean;
  }) => {
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

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xs text-text-secondary mb-1">{label}</p>
          <p className="text-sm font-semibold text-text-primary">
            {`${payload[0].value.toLocaleString()}만원`}
          </p>
        </div>
      );
    }
    return null;
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
    if (timeframe && ["일", "주", "월", "년"].includes(timeframe)) {
      setActiveTab(timeframe);
      // timeframe에 따라 selectedPeriod 기본값 설정
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
  }, []);

  return (
    <div className="min-h-screen bg-background-primary dark:bg-background-dark-primary">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 40 }}
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
    </div>
  );
};

export default SalesChart;

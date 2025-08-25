// 기본 매출 데이터 인터페이스
export interface BaseRevenueData {
  매출: number;
  date: Date;
}

export type Period = "일" | "주" | "월" | "년";

export type PeriodDataMap = {
  일: DailyData;
  주: WeeklyData;
  월: MonthlyData;
  년: YearlyData;
};

export interface DailyData {
  data: BaseRevenueData[];
  isToday?: boolean;
}

export interface WeeklyData {
  data: BaseRevenueData[];
  isCurrentWeek?: boolean;
}

export interface MonthlyData {
  data: BaseRevenueData[];
  isCurrentMonth?: boolean;
}

export interface YearlyData {
  data: BaseRevenueData[];
  isCurrentYear?: boolean;
}

export type RevenueDataByPeriod<T extends Period> = PeriodDataMap[T];

export interface RevenueKinds<T extends Period> {
  storeId: number;
  storeName: string;
  data: RevenueDataByPeriod<T>[];
}

export interface RevenueChartProps<T extends Period> {
  data: RevenueKinds<T>[];
  kind: T;
}

// // 사용 예시
// type DailyRevenueChart = RevenueChartProps<"일">;
// type WeeklyRevenueChart = RevenueChartProps<"주">;
// type MonthlyRevenueChart = RevenueChartProps<"월">;
// type YearlyRevenueChart = RevenueChartProps<"년">;

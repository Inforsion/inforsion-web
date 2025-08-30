export interface DailyData {
  data: BaseInventoryConsumeData[];
  isToday?: boolean;
}
export interface WeeklyData {
  data: BaseInventoryConsumeData[];
  isCurrentWeek?: boolean;
}

export interface MonthlyData {
  data: BaseInventoryConsumeData[];
  isCurrentMonth?: boolean;
}

export interface BaseInventoryConsumeData {
  inventoryConsumed: number;
  date: string; // YYYY-MM-DD 형식
}
export interface InventoryConsumedChartDataItem {
  name: string;
  date: string;
  inventoryConsumed: number;
  isToday?: boolean;
  isCurrentWeek?: boolean;
  isCurrentMonth?: boolean;
  isCurrentYear?: boolean;
}

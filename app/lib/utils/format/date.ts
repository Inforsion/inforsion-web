// date 포맷팅 유틸리티 함수들
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

// 주차 계산 함수
const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// 오늘 date 확인 함수
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

export {
  formatDateForDaily,
  formatDateForWeekly,
  formatDateForMonthly,
  formatDateForYearly,
  isToday,
  isCurrentWeek,
  isCurrentMonth,
  isCurrentYear,
  getWeekNumber,
};

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

export {
  generateDailyData,
  generateWeeklyData,
  generateMonthlyData,
  generateYearlyData,
};

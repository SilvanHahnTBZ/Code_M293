const weekDays = ['1', '2', '3', '4', '5'];

const getCurrentWeekday = (): string => {
  const todayIndex = new Date().getDay();

  return weekDays[todayIndex - 1];
};

export default getCurrentWeekday;

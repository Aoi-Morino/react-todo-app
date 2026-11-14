const DeadlineIsComing = (date: Date): boolean => {
  const now = new Date();
  const howLongDays = 1; // 期限が迫っているとみなす日数（1日単位）
  const remainingTime = date.getTime() - now.getTime();

  return remainingTime <= howLongDays * 24 * 60 * 60 * 1000;
};

export default DeadlineIsComing;
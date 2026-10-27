const DeadlineIsComing = (date: Date): boolean => {
  const now = new Date();
  const remainingTime = date.getTime() - now.getTime();

  return remainingTime <= 24 * 60 * 60 * 1000;
};

export default DeadlineIsComing;
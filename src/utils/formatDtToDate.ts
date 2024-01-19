export const formatDtToDate = (date: number) => {
  if (!date) return;

  return new Date(date * 1000).toLocaleDateString('en', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
};
const FormatDtToHour = (date: number) => {
  if (!date) return;

  return new Date(date * 1000).toLocaleDateString('en', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default FormatDtToHour;

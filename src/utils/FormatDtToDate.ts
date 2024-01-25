const formatDtToDate = (date: number) => {
  if (!date) return;

  return new Date(date * 1000).toLocaleDateString('en', {
    day: '2-digit',
    month: 'short',
  });
};

export default formatDtToDate;

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'unknown';

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(dateString));
};
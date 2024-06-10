export const getTimeFromISO = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert hour 0 to 12
  const strTime = `${formattedHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  return strTime;
};

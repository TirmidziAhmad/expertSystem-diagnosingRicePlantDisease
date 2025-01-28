// function parsing 2025-01-28T12:12:21.823Z to dd/mm/yyyy

export default function parseDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

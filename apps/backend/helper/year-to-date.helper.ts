export const yearToDate = (year: number | string | undefined): Date | null => {
  if (typeof year === "string") {
    year = parseInt(year, 10);
  }

  if (year && Number.isInteger(year) && year >= 1000 && year <= 9999) {
    return new Date(year, 0, 1);
  }

  console.error("Invalid year provided");
  return null;
};

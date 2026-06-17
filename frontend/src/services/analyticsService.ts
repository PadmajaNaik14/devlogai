import api from "./api";

export const getDashboardStats = async () => {

  const response = await api.get(
    "/analytics/dashboard"
  );

  return response.data;
};

export const getMonthlyCount = async () => {

  const response = await api.get(
    "/analytics/monthly-count"
  );

  return response.data;
};

export const getCalendarDays = async (
  month: number,
  year: number
) => {

  const response = await api.get(
    `/analytics/calendar?month=${month}&year=${year}`
  );

  return response.data;
};
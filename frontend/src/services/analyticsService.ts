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

export const getHeatmapData = async () => {

  const response = await api.get(
    "/analytics/heatmap"
  );

  return response.data;

};

export const getActivityCalendar = async () => {

  const response = await api.get(
    "/analytics/activity-calendar"
  );

  return response.data;

};
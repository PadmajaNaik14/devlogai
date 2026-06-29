import api from "./api";

export const createJournal = async (data: any) => {

  const token =
    localStorage.getItem("token");

  const response = await api.post(
    "/journals/",
    data,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const getJournals = async () => {

  const token =
    localStorage.getItem("token");

  const response = await api.get(
    "/journals",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

  return response.data;
};
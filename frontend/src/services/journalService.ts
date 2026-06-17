import api from "./api";

export const createJournal = async (data: any) => {
  const response = await api.post(
    "/journals",
    data
  );

  return response.data;
};

export const getJournals = async () => {
  const response = await api.get(
    "/journals"
  );

  return response.data;
};
import api from "./api";

export const optimizeJournal = async (
  content: string
) => {

  const response = await api.post(
    "/ai/optimize",
    {
      content
    }
  );

  return response.data;
};
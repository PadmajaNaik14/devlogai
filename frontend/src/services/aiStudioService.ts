import api from "./api";

export const askAI = async (
  question: string
) => {

  const response = await api.post(
    "/ai/chat",
    {
      question
    }
  );

  return response.data;
};

export const getChatHistory = async () => {

  const response = await api.get(
    "/ai/chat/history"
  );

  return response.data;
};

export const clearChat = async () => {

  const response = await api.delete(
    "/ai/chat/history"
  );

  return response.data;
};
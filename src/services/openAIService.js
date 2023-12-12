import app from "./config";

export const getDrawings = async (arr) => {
  try {
    const { data } = await app.post(`/drawing`, {
      lines: arr,
    });
    return data
  } catch (error) {
    console.error(error);
  }
};

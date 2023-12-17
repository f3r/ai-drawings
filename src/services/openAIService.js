import axios from 'axios'

const app = axios.create({ baseURL: "http://localhost:3000/api" })

export const getStory = async (idea) => {
  try {
    const response = await app.post(`/story`, { idea });
    return JSON.parse(response.data.message.content);
  } catch (error) {
    console.error(error);
  }
}

export const getDrawings = async (arr) => {
  try {
    const { data } = await app.post(`/drawing`, {
      lines: arr,
    });
    return data
  } catch (error) {
    console.error(error)
  }
}

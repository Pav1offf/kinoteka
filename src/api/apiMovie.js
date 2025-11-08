import axios from "axios";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_API = import.meta.env.VITE_MOVIE_BASE_API_URL;

export const getMovie = async (id = 303) => {
  try {
    const response = await axios.get(`${BASE_API}v2.2/films/${id}`, {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      params: {},
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovies = async (type = "TOP_POPULAR_ALL", page = 1) => {
  try {
    const response = await axios.get(`${BASE_API}v2.2/films/collections`, {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      params: {
        type,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchMovies = async ({ keyword, page = 1 }) => {
  try {
    const response = await axios.get(
      `${BASE_API}v2.1/films/search-by-keyword`,
      {
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
        params: {
          keyword,
          page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

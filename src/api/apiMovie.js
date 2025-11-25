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

export const getCountryId = async () => {
  try {
    const response = await axios.get(`${BASE_API}v2.2/films/filters`, {
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

export const getMoviesFilters = async ({
  order = "RATING",
  type = "ALL",
  yearFrom = 1000,
  yearTo = 2025,
  genres,
  countries,
  page,
  ratingFrom,
  ratingTo,
}) => {
  try {
    const response = await axios.get(`${BASE_API}v2.2/films`, {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      params: {
        order,
        type,
        yearFrom,
        yearTo,
        genres,
        countries,
        page,
        ratingFrom,
        ratingTo,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovies = async ({ type = "TOP_POPULAR_ALL", page = 1 }) => {
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

export const getPerson = async (id = 66539) => {
  try {
    const response = await axios.get(`${BASE_API}v1/staff/${id}`, {
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

export const getStaff = async (filmId = 301) => {
  try {
    const response = await axios.get(`${BASE_API}v1/staff`, {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      params: {
        filmId,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSequels = async (id = 66539) => {
  try {
    const response = await axios.get(
      `${BASE_API}v2.1/films/${id}/sequels_and_prequels`,
      {
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
        params: {},
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSimilars = async (id = 66539) => {
  try {
    const response = await axios.get(`${BASE_API}v2.2/films/${id}/similars`, {
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

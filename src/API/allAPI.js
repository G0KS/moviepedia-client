import { baseURL } from "./base_URL";

import { commonRequest } from "./commonRequest";

export const getMoviesOrShows = async (type) => {
   return await commonRequest("GET", `${baseURL}/get?type=${type}`, {});
};

export const searchMoviesOrShows = async (query) => {
   return await commonRequest("GET", `${baseURL}/search?query=${query}`, {});
};

export const viewMovieOrShow = async (type, id) => {
   return await commonRequest("GET", `${baseURL}/view/${id}?type=${type}`, {});
};

export const getVideos = async (type, id) => {
   return await commonRequest(
      "GET",
      `${baseURL}/videos/${id}?type=${type}`,
      {}
   );
};

export const userRegister = async (body, header) => {
   return await commonRequest(
      "POST",
      `${baseURL}/users/register`,
      body,
      header
   );
};

export const userLogin = async (body) => {
   return await commonRequest("POST", `${baseURL}/users/login`, body);
};

export const deleteUser = async (id) => {
   return await commonRequest("DELETE", `${baseURL}/users/delete/${id}`, {});
};

export const addToFavorites = async (id, body) => {
   return await commonRequest(
      "POST",
      `${baseURL}/user/favorites/add/${id}`,
      body
   );
};

export const getAllFavorites = async (id) => {
   return await commonRequest("GET", `${baseURL}/user/favorites/${id}`, {});
};

export const updateFavorites = async (id, body) => {
   return await commonRequest(
      "PUT",
      `${baseURL}/user/favorites/update/${id}`,
      body
   );
};

export const addReview = async (id, body) => {
   console.log(id, body);
   return await commonRequest(
      "POST",
      `${baseURL}/movies/reviews/add/${id}`,
      body
   );
};

export const getAllReviews = async (id) => {
   return await commonRequest("GET", `${baseURL}/movies/reviews/${id}`, {});
};

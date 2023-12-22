const baseUrl = "http://127.0.0.1:8080/api";
const token = localStorage.getItem("token");

export const getMovies = async (page = 1) => {
  const response = await fetch(`${baseUrl}/movies?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getMovie = async (id) => {
  const response = await fetch(`${baseUrl}/movies/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getMovieByQuery = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(`${baseUrl}/movies/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getGenres = async () => {
  const response = await fetch(`${baseUrl}/movies/genres/list`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getMovieImages = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(`${baseUrl}/movies/${id}/images`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getMovieReviews = async (id) => {
  const responseMongo = await fetch(`${baseUrl}/reviews/${id}/mongodb`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "get",
  });
  const mongoData = await responseMongo.json();

  const responseTmdb = await fetch(`${baseUrl}/reviews/${id}/tmdb`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "get",
  });
  const tmdbData = await responseTmdb.json();

  return [...mongoData, ...tmdbData];
};

export const createReview = async (username, id, content) => {
  const response = await fetch(`${baseUrl}/reviews/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "post",
    body: { author: username, movie_id: id, content: content },
  });
  const data = await response.json();
  return data;
};

export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(`${baseUrl}/movies/upcoming/list?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getMovieCredits = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(`${baseUrl}/movies/${id}/credits`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getActorDetails = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(`${baseUrl}/movies/actor/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getActorMovieCredits = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(`${baseUrl}/movies/actor/${id}/movie_credits`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getActorImages = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(`${baseUrl}/movies/actor/${id}/images`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getSimilarMovies = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(`${baseUrl}/movies/${id}/similar`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "get",
  });
  const data = await response.json();
  return data;
};

export const getTrendingMovies = async (args, page) => {
  const [, timeWindowPart] = args.queryKey;
  const { timeWindow } = timeWindowPart;
  const response = await fetch(
    `${baseUrl}/movies/trending/${timeWindow}/?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "get",
    }
  );
  const data = await response.json();
  return data;
};

export const getMoviesByKeyword = async (keyword, page) => {
  const response = await fetch(
    `${baseUrl}/movies/search/${keyword}/?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "get",
    }
  );
  const data = await response.json();
  return data;
};

export const getFavorites = async () => {
  const response = await fetch(`${baseUrl}/favorites`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "get",
  });
  const data = await response.json();
  console.log("Data: " + JSON.stringify(data));
  return data;
};

export const addToFavorites = async (userId, movieId) => {
  const response = await fetch(`${baseUrl}/favorites/${movieId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "post",
    body: JSON.stringify({ user_id: userId, movie_id: movieId }),
  });
  const data = await response.json();
  console.log("Data: " + data);
  return data;
};

export const deleteFromFavorites = async (userId, movieId) => {
  const response = await fetch(`${baseUrl}/favorites/${movieId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "delete",
    body: JSON.stringify({ user_id: userId, movie_id: movieId }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const login = async (username, password) => {
  const response = await fetch(`${baseUrl}/users`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ username: username, password: password }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const signup = async (username, password) => {
  const response = await fetch(`${baseUrl}/users?action=register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ username: username, password: password }),
  });
  return response.json();
};

export const reset = async (username, password) => {
  const response = await fetch(`${baseUrl}/users/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "put",
    body: JSON.stringify({ username: username, password: password }),
  });
  return response.json();
};

export const getUser = async (username) => {
  const response = await fetch(`${baseUrl}/users/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
  });
  const data = await response.json();
  console.log("getUser: " + JSON.stringify(data));
  return data;
};

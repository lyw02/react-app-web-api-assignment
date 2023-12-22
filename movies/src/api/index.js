const baseUrl = "http://127.0.0.1:8080/api";
const apiKey = process.env.REACT_APP_TMDB_KEY;

export const getMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`${baseUrl}/movies/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(`${baseUrl}/movies/genres/list`)
    .then((response) => {
      console.log(response.body);
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id) => {
  const records = [];
  fetch(
    // from tmdb
    `${baseUrl}/movies/${id}/tmdb`
  )
    .then((res) => res.json())
    .then((json) => {
      records += json.results;
    });
  fetch(
    // from mongodb
    `${baseUrl}/movies/${id}/mongodb`
  )
    .then((res) => res.json())
    .then((json) => {
      records += json.results;
    });
  return records;
};

export const getUpcomingMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieCredits = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`${baseUrl}/movies/${id}/credits`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getActorDetails = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`${baseUrl}/movies/actor/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getActorMovieCredits = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`${baseUrl}/movies/actor/${id}/movie_credits`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getActorImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getSimilarMovies = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`${baseUrl}/movies/${id}/similar`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTrendingMovies = (args, page) => {
  const [, timeWindowPart] = args.queryKey;
  const { timeWindow } = timeWindowPart;
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}&language=en-U&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMoviesByKeyword = (keyword, page) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-U&query=${keyword}&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getFavorites = () => {
  return fetch(`${baseUrl}/favorites`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
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

export const reset = async (_id, username, password) => {
  const response = await fetch(`${baseUrl}/users/${_id}`, {
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
  return response.json();
}

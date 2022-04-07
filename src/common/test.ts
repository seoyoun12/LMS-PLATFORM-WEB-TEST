import axios from 'axios';

const API_KEY = 'f14d909bd5b9daee0e3e7b68e05f848a';

const result = await axios(
  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
);

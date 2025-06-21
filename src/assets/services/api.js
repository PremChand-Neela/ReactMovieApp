const API_KEY = '56f6456a2929c5660926bd3736a0fafd';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch popular movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export const getTrendingMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch trending movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

export const getTopRatedMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch top rated movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        return [];
    }
}

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch upcoming movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        return [];
    }
}

export const getLatestMovie = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/latest?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch latest movie');
        }
        const data = await response.json();
        return data; // Returns single movie object, not array
    } catch (error) {
        console.error('Error fetching latest movie:', error);
        return null;
    }
}

export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to search movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

// Get movie genres
export const getMovieGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie genres');
        }
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error('Error fetching movie genres:', error);
        return [];
    }
}

// Get TV genres
export const getTVGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch TV genres');
        }
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error('Error fetching TV genres:', error);
        return [];
    }
}

// Get movies by genre
export const getMoviesByGenre = async (genreId, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`);
        if (!response.ok) {
            throw new Error('Failed to fetch movies by genre');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        return [];
    }
}

// Get movies by multiple genres
export const getMoviesByMultipleGenres = async (genreIds, page = 1) => {
    try {
        const genreString = genreIds.join(',');
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreString}&page=${page}&sort_by=popularity.desc`);
        if (!response.ok) {
            throw new Error('Failed to fetch movies by genres');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies by genres:', error);
        return [];
    }
}
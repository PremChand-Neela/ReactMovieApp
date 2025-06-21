// Common Movie Genres with their TMDB IDs
export const MOVIE_GENRES = {
    ACTION: { id: 28, name: 'Action' },
    ADVENTURE: { id: 12, name: 'Adventure' },
    ANIMATION: { id: 16, name: 'Animation' },
    COMEDY: { id: 35, name: 'Comedy' },
    CRIME: { id: 80, name: 'Crime' },
    DOCUMENTARY: { id: 99, name: 'Documentary' },
    DRAMA: { id: 18, name: 'Drama' },
    FAMILY: { id: 10751, name: 'Family' },
    FANTASY: { id: 14, name: 'Fantasy' },
    HISTORY: { id: 36, name: 'History' },
    HORROR: { id: 27, name: 'Horror' },
    MUSIC: { id: 10402, name: 'Music' },
    MYSTERY: { id: 9648, name: 'Mystery' },
    ROMANCE: { id: 10749, name: 'Romance' },
    SCIENCE_FICTION: { id: 878, name: 'Science Fiction' },
    TV_MOVIE: { id: 10770, name: 'TV Movie' },
    THRILLER: { id: 53, name: 'Thriller' },
    WAR: { id: 10752, name: 'War' },
    WESTERN: { id: 37, name: 'Western' }
};

// Array format for easy mapping
export const MOVIE_GENRES_ARRAY = Object.values(MOVIE_GENRES);

// Popular genre combinations
export const POPULAR_GENRE_COMBINATIONS = [
    { name: 'Action & Adventure', genreIds: [28, 12] },
    { name: 'Horror & Thriller', genreIds: [27, 53] },
    { name: 'Comedy & Romance', genreIds: [35, 10749] },
    { name: 'Sci-Fi & Action', genreIds: [878, 28] },
    { name: 'Crime & Drama', genreIds: [80, 18] },
    { name: 'Family & Animation', genreIds: [10751, 16] }
];

// TV Genres (for future use)
export const TV_GENRES = {
    ACTION_ADVENTURE: { id: 10759, name: 'Action & Adventure' },
    ANIMATION: { id: 16, name: 'Animation' },
    COMEDY: { id: 35, name: 'Comedy' },
    CRIME: { id: 80, name: 'Crime' },
    DOCUMENTARY: { id: 99, name: 'Documentary' },
    DRAMA: { id: 18, name: 'Drama' },
    FAMILY: { id: 10751, name: 'Family' },
    KIDS: { id: 10762, name: 'Kids' },
    MYSTERY: { id: 9648, name: 'Mystery' },
    NEWS: { id: 10763, name: 'News' },
    REALITY: { id: 10764, name: 'Reality' },
    SCIENCE_FICTION_FANTASY: { id: 10765, name: 'Sci-Fi & Fantasy' },
    SOAP: { id: 10766, name: 'Soap' },
    TALK: { id: 10767, name: 'Talk' },
    WAR_POLITICS: { id: 10768, name: 'War & Politics' },
    WESTERN: { id: 37, name: 'Western' }
};

// Helper functions
export const getGenreNameById = (genreId) => {
    const genre = MOVIE_GENRES_ARRAY.find(g => g.id === genreId);
    return genre ? genre.name : 'Unknown Genre';
};

export const getGenresByIds = (genreIds) => {
    return genreIds.map(id => MOVIE_GENRES_ARRAY.find(g => g.id === id)).filter(Boolean);
};
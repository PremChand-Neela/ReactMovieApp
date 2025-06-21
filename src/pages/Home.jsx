import React from 'react';
import MovieCard from '../assets/components/MovieCard';
import GenreFilter from '../assets/components/GenerFilter.jsx';
import QuickGenre from '../assets/components/QuickGener.jsx';
import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { searchMovies, getPopularMovies, getTrendingMovies, getTopRatedMovies, getLatestMovie, getUpcomingMovies, getMoviesByMultipleGenres } from '../assets/services/api';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [popularMovies, setPopularMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [latestMovie, setLatestMovie] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isFilteringByGenre, setIsFilteringByGenre] = useState(false);

    // Consolidate all API calls into one useEffect to improve performance
    useEffect(() => {
        const loadAllMovies = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                
                // Load all movie data in parallel
                const [
                    popular,
                    trending,
                    topRated,
                    upcoming,
                    latest
                ] = await Promise.all([
                    getPopularMovies(),
                    getTrendingMovies(),
                    getTopRatedMovies(),
                    getUpcomingMovies(),
                    getLatestMovie()
                ]);

                setPopularMovies(popular || []);
                setTrendingMovies(trending || []);
                setTopRatedMovies(topRated || []);
                setUpcomingMovies(upcoming || []);
                setLatestMovie(latest);
                
            } catch (error) {
                setError("Failed to fetch movies");
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAllMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (isSearching) return;

        setIsSearching(true);
        setError(null); // Reset error state
        
        try {
            const results = await searchMovies(searchQuery);
            setSearchResults(results || []);
        } catch (err) {
            setError("Failed to search movies");
            console.error("Error searching movies:", err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setError(null); // Clear any search-related errors
    };

    const handleGenreSelect = async (genres) => {
        setSelectedGenres(genres);
        setError(null); // Reset error state
        
        if (genres.length === 0) {
            setGenreMovies([]);
            setIsFilteringByGenre(false);
            return;
        }

        setIsFilteringByGenre(true);
        try {
            const genreIds = genres.map(g => g.id);
            const movies = await getMoviesByMultipleGenres(genreIds);
            setGenreMovies(movies || []);
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            setError('Failed to fetch movies by genre');
            setGenreMovies([]);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.home}>
            <div className={styles.searchContainer}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton} disabled={isSearching}>
                        {isSearching ? 'Searching...' : 'Search'}
                    </button>
                    {searchQuery && (
                        <button 
                            type="button" 
                            onClick={handleClearSearch}
                            className={styles.clearButton}
                        >
                            Clear
                        </button>
                    )}
                </form>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {/* Quick Genre Selection */}
            <QuickGenre onQuickGenreSelect={handleGenreSelect} />

            {/* Genre Filter */}
            <GenreFilter 
                onGenreSelect={handleGenreSelect}
                selectedGenres={selectedGenres}
            />

            {/* Show search results when searching */}
            {searchResults.length > 0 && (
                <div className={styles.moviesSection}>
                    <h2>Search Results ({searchResults.length})</h2>
                    <div className={styles.moviesGrid}>
                        {searchResults.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            )}

            {/* Show genre filtered movies */}
            {isFilteringByGenre && searchResults.length === 0 && (
                <div className={styles.moviesSection}>
                    <h2>
                        {selectedGenres.length === 1 
                            ? `${selectedGenres[0].name} Movies` 
                            : `Movies (${selectedGenres.map(g => g.name).join(', ')})`
                        }
                    </h2>
                    <div className={styles.moviesGrid}>
                        {genreMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    {genreMovies.length === 0 && (
                        <p className={styles.noResults}>No movies found for selected genres.</p>
                    )}
                </div>
            )}

            {/* Show all movie categories when not searching or filtering by genre */}
            {searchResults.length === 0 && !isFilteringByGenre && (
                <>
                    {popularMovies.length > 0 && (
                        <div className={styles.moviesSection}>
                            <h2>Popular Movies</h2>
                            <div className={styles.moviesGrid}>
                                {popularMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </div>
                    )}

                    {trendingMovies.length > 0 && (
                        <div className={styles.moviesSection}>
                            <h2>Trending Movies</h2>
                            <div className={styles.moviesGrid}>
                                {trendingMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </div>
                    )}

                    {topRatedMovies.length > 0 && (
                        <div className={styles.moviesSection}>
                            <h2>Top Rated Movies</h2>
                            <div className={styles.moviesGrid}>
                                {topRatedMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </div>
                    )}

                    {upcomingMovies.length > 0 && (
                        <div className={styles.moviesSection}>
                            <h2>Upcoming Movies</h2>
                            <div className={styles.moviesGrid}>
                                {upcomingMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Latest Movie Section - Handle single movie differently */}
                    {latestMovie && (
                        <div className={styles.moviesSection}>
                            <h2>Latest Movie</h2>
                            <div className={styles.moviesGrid}>
                                <MovieCard key={latestMovie.id} movie={latestMovie} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;
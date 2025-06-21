import React from 'react';
import styles from './Favorites.module.css';
import { useMovieContext } from '../assets/contexts/MovieContext';
import MovieCard from '../assets/components/MovieCard'; // Added missing import

function Favorites() { // Fixed typo in function name
    const { favorites } = useMovieContext();

    // Fixed condition - check length instead of just existence
    if (favorites && favorites.length > 0) {
        return (
            <>
                <h2 className={styles.favoritesTitle}>Your Favorite Movies</h2>
                <div className={styles.movieList}>
                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            <div className={styles.favoritesEmpty}> {/* Fixed typo */}
                <h2>No favorite movies yet</h2> {/* Fixed typo */}
                <p>Start adding movies to your favorites and they will appear here</p> {/* Fixed typo */}
            </div>
        </>
    )
}

export default Favorites; // Fixed export name
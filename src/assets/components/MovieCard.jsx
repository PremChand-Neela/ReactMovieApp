import React from 'react';
import styles from './MovieCard.module.css';
import { useMovieContext } from '../contexts/MovieContext';

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    return (
        <div className={styles.movieCard}>
            <div className={styles.moviePoster}>
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                    className={styles.posterImage}
                />
                <div className={styles.movieOverlay}>
                    <button 
                        className={`${styles.favoriteBtn} ${favorite ? styles.active : ''}`}
                        onClick={onFavoriteClick}
                    >
                        ❤
                    </button>
                </div>
            </div>
            <div className={styles.movieInfo}>
                <div className={styles.movieTitle}>
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
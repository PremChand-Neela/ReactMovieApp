import React from 'react';
import styles from '../components/GenerFilter.module.css';
import { MOVIE_GENRES } from '../components/genreConstants';

function QuickGenre({ onQuickGenreSelect }) {
    const popularGenres = [
        MOVIE_GENRES.ACTION,
        MOVIE_GENRES.COMEDY,
        MOVIE_GENRES.HORROR,
        MOVIE_GENRES.ROMANCE,
        MOVIE_GENRES.THRILLER,
        MOVIE_GENRES.SCIENCE_FICTION,
        MOVIE_GENRES.DRAMA,
        MOVIE_GENRES.ANIMATION
    ];

    const handleQuickSelect = (genre) => {
        onQuickGenreSelect([genre]);
    };

    return (
        <div className={styles.quickGenre}>
            <h3>🎬 Quick Genre Selection</h3>
            <div className={styles.quickGenreGrid}>
                {popularGenres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => handleQuickSelect(genre)}
                        className={styles.quickGenreButton}
                    >
                        <span className={styles.genreEmoji}>
                            {getGenreEmoji(genre.name)}
                        </span>
                        <span className={styles.genreName}>{genre.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// Helper function to get emoji for genres
const getGenreEmoji = (genreName) => {
    const emojiMap = {
        'Action': '💥',
        'Comedy': '😂',
        'Horror': '👻',
        'Romance': '💕',
        'Thriller': '😱',
        'Science Fiction': '🚀',
        'Drama': '🎭',
        'Animation': '🎨',
        'Adventure': '🗺️',
        'Crime': '🔫',
        'Fantasy': '🧙‍♂️',
        'Mystery': '🔍',
        'War': '⚔️',
        'Western': '🤠',
        'Family': '👨‍👩‍👧‍👦',
        'Documentary': '📹',
        'Music': '🎵',
        'History': '📚'
    };
    
    return emojiMap[genreName] || '🎬';
};

export default QuickGenre;
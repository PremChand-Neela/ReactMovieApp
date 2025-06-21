import React, { useState, useEffect } from 'react';
import styles from './GenerFilter.module.css';
import { getMovieGenres } from '../services/api';

function GenreFilter({ onGenreSelect, selectedGenres = [] }) {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const genreList = await getMovieGenres();
                setGenres(genreList);
            } catch (error) {
                console.error('Error loading genres:', error);
            } finally {
                setLoading(false);
            }
        };

        loadGenres();
    }, []);

    const handleGenreClick = (genreId, genreName) => {
        const isSelected = selectedGenres.some(g => g.id === genreId);
        
        if (isSelected) {
            // Remove genre from selection
            const updatedGenres = selectedGenres.filter(g => g.id !== genreId);
            onGenreSelect(updatedGenres);
        } else {
            // Add genre to selection
            const updatedGenres = [...selectedGenres, { id: genreId, name: genreName }];
            onGenreSelect(updatedGenres);
        }
    };

    const clearAllGenres = () => {
        onGenreSelect([]);
    };

    const displayGenres = showAll ? genres : genres.slice(0, 8);

    if (loading) {
        return <div className={styles.loading}>Loading genres...</div>;
    }

    return (
        <div className={styles.genreFilter}>
            <div className={styles.genreHeader}>
                <h3>Filter by Genre</h3>
                {selectedGenres.length > 0 && (
                    <button 
                        onClick={clearAllGenres}
                        className={styles.clearButton}
                    >
                        Clear All
                    </button>
                )}
            </div>
            
            <div className={styles.genreList}>
                {displayGenres.map((genre) => {
                    const isSelected = selectedGenres.some(g => g.id === genre.id);
                    return (
                        <button
                            key={genre.id}
                            onClick={() => handleGenreClick(genre.id, genre.name)}
                            className={`${styles.genreButton} ${isSelected ? styles.selected : ''}`}
                        >
                            {genre.name}
                        </button>
                    );
                })}
            </div>

            {genres.length > 8 && (
                <button 
                    onClick={() => setShowAll(!showAll)}
                    className={styles.showMoreButton}
                >
                    {showAll ? 'Show Less' : `Show All (${genres.length})`}
                </button>
            )}

            {selectedGenres.length > 0 && (
                <div className={styles.selectedGenres}>
                    <p>Selected: {selectedGenres.map(g => g.name).join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default GenreFilter;
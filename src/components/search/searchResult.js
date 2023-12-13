import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MovieCard, SearchByIdWithCard, FindId } from './searchMovie';
import { NewRating, GetRatingById } from '../rated/rated';
import './searchPage.css';

function SearchResultCard({ movieData }) {
    const [expandedCard, setExpandedCard] = useState(null);
    const [searchDBID, setSearchDBID] = useState('');
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [showRatingWindow, setShowRatingWindow] = useState(false);
    const [showGetRated, setShowGetRated] = useState(false);
    const [rating, setRating] = useState(0);
    const [ratingText, setRatingText] = useState('');
    const [showArvostelut, setShowArvostelut] = useState(false);
    const [username, setUsername] = useState('');

    console.log('asdasdas', movieData);
    const handleCardClick = (id) => {
        setExpandedCard((prevId) => (prevId === id ? null : id));
    };
    const handleRatingSubmit = async () => {
        console.log(`${searchFindID}Rating: ${rating}, Rating Text: ${ratingText}, Username: ${username}`);
        try {
            const result = await NewRating(searchFindID, rating, ratingText, username);
            console.log('Result:', result);
        } catch (error) {
            console.error('Error:', error.message);
        }
        setShowRatingWindow(false);
    }

    function handleArvostele(searchDBID) {
        console.log('SDBID:', searchDBID);
        setSelectedMovieId(searchDBID);
        setShowRatingWindow(true);


    }
    function handleArvostelu(searchFindID) {
        console.log('asdasd', searchFindID);
        setSelectedMovieId(searchFindID);
        setShowGetRated(prevState => !prevState);
        setShowGetRated(!showGetRated);
    }
    const handleCloseRatingWindow = () => {
        setShowRatingWindow(false);
    }

    const searchFindID = FindId(searchDBID);

    return (
        <div class='search-container'>
            {showGetRated && (
                <button className='add-watchlist-btn' onClick={handleArvostelu}>
                    - Sulje Arvostelut
                </button>
            )}
            <div class='search-results'>

                {showGetRated ? (

                    <GetRatingById RatingById={searchFindID} />
                ) : (

                    <p></p>
                )}
            </div>

            <div className='search-results'>

                {Array.isArray(movieData) ? (
                    movieData.map((searchdata, index) => (
                        <div key={index} className="search-result">
                            <div
                                className={`movie-card ${expandedCard === searchdata.id ? 'expanded' : ''}`}
                                key={searchdata.id}
                                onClick={() => handleCardClick(searchdata.id)}
                            >
                                {expandedCard === searchdata.id ? (
                                    <>

                                        <p><strong></strong> {searchdata.overview}</p>
                                    </>
                                ) : (
                                    <>
                                        {searchdata.poster_path && (
                                            <img
                                                src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`}
                                                alt={`Poster for ${searchdata.title}`}
                                            />
                                        )}
                                        <p>
                                            <strong>{searchdata.original_title}</strong>
                                        </p>
                                        <p><strong>Release Date:</strong> {searchdata.release_date}</p>
                                        <p><strong>Media type:</strong> {searchdata.media_type}</p>
                                    </>

                                )}
                                                                {showRatingWindow && selectedMovieId === searchdata.id && (
                                    <div className="rating-window">
                                        <h3>{searchdata.original_title}</h3>
                                        <label>
                                            Arvosana
                                            <input
                                                type="number"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            />
                                        </label>
                                        <label>
                                            Arvostelu
                                            <input
                                                type="text"
                                                value={ratingText}
                                                onChange={(e) => setRatingText(e.target.value)}
                                            />
                                        </label>
                                        <label>
                                            Username:
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </label>
                                        <button onClick={handleRatingSubmit}>Arvostele</button>
                                        <button onClick={handleCloseRatingWindow}>Sulje</button>
                                    </div>
                                )}
                            </div>
                            <div className="additional-card">
                                <button className='add-watchlist-btn'>+ Watchlist</button>
                                <button className='add-watchlist-btn' onClick={() => { setSearchDBID(searchdata.id); handleArvostele(searchdata.id); }}>+ Arvostele</button>
                                <button className='add-watchlist-btn' onClick={() => { setSearchDBID(searchdata.id); handleArvostelu(searchFindID); }}>+ Arvostelut</button>
                                
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}

            </div>
        </div>
    );
};


export { SearchResultCard };
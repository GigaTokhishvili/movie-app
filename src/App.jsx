import react, { useEffect, useState } from 'react';
import './index.css';
import SearchIcon from '../public/search.svg';
import MovieCard from './components/MovieCard';
import { nanoid } from 'nanoid';

//    2af778db

const API_URL = 'http://www.omdbapi.com?apikey=2af778db';

function App () {

    const [movies, setMovies] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
        console.log(data);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, [])
    
    function handleSubmit () {
        searchMovies(searchWord)
    }
    
    function handleKeyDown (e) {
        e.key == 'Enter'? searchMovies(searchWord) : null;
    }
    
    
    function handleChange(e) {
        {setSearchWord(e.target.value)};
    }
    return (

        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input 
                    placeholder='Search for movies'
                    value={searchWord}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
                <img
                    className='search-button'
                    src={SearchIcon}
                    alt='search'
                    onClick={handleSubmit}
                />
            </div>

            {
                movies?.length>0 ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={nanoid()} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found, try to be more specific.</h2>
                    </div>
                )
            }

        </div>
    )
}


export default App;
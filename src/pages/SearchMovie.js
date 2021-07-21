import React, { useState,useEffect } from "react";
import MovieComponent from '../components/Movie';

const MOVIE_API_URL = 'http://localhost:5000/movie'

const SearchMovie = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
          console.log("jsonResponse",jsonResponse)
          if(jsonResponse.Response==="True"){
            setMovies(jsonResponse.Search);
          }
        
        setLoading(false);
      });
  }, []);

  
  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    setSearchValue(searchValue)
    fetch(MOVIE_API_URL+`?search=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  	};


  return (
    <div className="App">
      <form className="search">
        <input
          value={searchValue}
          onChange={(e)=>{search(e.target.value)}}
          placeholder="Search Movie"
          type="text"
        />
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <MovieComponent key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
      </form>
      </div>
    );
}

export default SearchMovie;
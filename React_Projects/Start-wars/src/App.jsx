

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Add this for your custom styling

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCharacter, setExpandedCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState({});

  const fetchCharacters = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
      console.log(response.data);
      setCharacters(response.data.results);
      setError(null);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const fetchHomeworld = async (url) => {
    try {
      const response = await axios.get(url);
      setHomeworld((prevState) => ({
        ...prevState,
        [url]: response.data,
      }));
    } catch (err) {
      setError('Error fetching homeworld data');
    }
  };

  const toggleCharacterExpansion = (character) => {
    if (expandedCharacter === character.name) {
      setExpandedCharacter(null); 
    } else {
      setExpandedCharacter(character.name); 
      if (!homeworld[character.homeworld]) {
        fetchHomeworld(character.homeworld);
      }
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="app">
      <h1>Star Wars Characters</h1>
      <div className="character-grid">
        {characters.map((character) => (
          <div
            key={character.name}
            className={`character-card ${character.species.length > 0 ? 'green' : 'blue'}`}
            onClick={() => toggleCharacterExpansion(character)}
          >
            <img
              src={`https://picsum.photos/200?random=${character.name}`}
              alt={character.name}
            />
            <h3>{character.name}</h3>

            {expandedCharacter === character.name && (
              <div className="character-details">
                <p>Height: {(character.height / 100).toFixed(2)} meters</p>
                <p>Mass: {character.mass} kg</p>
                <p>Date Added: {new Date(character.created).toLocaleDateString('en-GB')}</p>
                <p>Films Appeared: {character.films.length}</p>
                <p>Birth Year: {character.birth_year}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default App;
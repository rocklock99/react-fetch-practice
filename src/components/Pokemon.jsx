"use client";
import { useEffect, useState } from "react";

export default function Pokemon() {
  // state variables
  const [pokemonName, setPokemonName] = useState("ditto");
  const [pokemon, setPokemon] = useState({});

  // fetches a pokemon based on API docs
  async function fetchPokemon() {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonObject = await response.json();
    setPokemon(pokemonObject);
  }

  // as a user inputs data, save the changes to pokemonName
  function handleInputChanges(event) {
    setPokemonName(event.target.value);
  }

  // when a user clicks the search button, fetch the pokemon
  function handleSubmitForm(event) {
    event.preventDefault();
    fetchPokemon();
    setPokemonName("");
  }

  // fetch the default pokemon when the component mounts
  useEffect(() => {
    fetchPokemon();
  }, []);

  // debugging statement to observe all changes in pokemon state variable
  // useEffect(() => {
  //   console.log(pokemon);
  // }, [pokemon]);

  // render section
  return (
    <div id="pokemon-section">
      <h2>Pokemon</h2>
      <p>
        Here's a pokemon api:{" "}
        <a href="https://pokeapi.co/api/v2/pokemon/ditto" target="_blank">
          https://pokeapi.co/api/v2/pokemon/ditto
        </a>
      </p>
      <p>
        You have to replace the text "ditto" with the name of the pokemon you
        want to search for.
      </p>
      <div id="pokemon-container">
        <form id="pokemon-form" onSubmit={handleSubmitForm}>
          <input
            id="name-input"
            type="text"
            value={pokemonName}
            placeholder="Enter pokemon name here..."
            onChange={handleInputChanges}
          />
          <button id="search-button" type="submit">
            Search
          </button>
        </form>
        <h3>{pokemon.name}</h3>
        {pokemon?.sprites?.front_default && (
          <img src={pokemon.sprites.front_default} alt="pokemon image" />
        )}
      </div>
      <hr />
    </div>
  );
}

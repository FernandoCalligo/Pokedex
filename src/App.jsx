import React, { useState, useEffect } from 'react';
import "./App.css"

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [PokemonList, setPokemonList] = useState([])
  const [Shiny, setShiny] = useState(false)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=150`)
    .then(response => response.json())
    .then(data => {
      setPokemonList(data);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [pokemonId]);

  if (!pokemonData) {
    return <div>Cargando...</div>;
  }

  if(!PokemonList) {
    console.log("No Pokemon")
  } else {
    var list = PokemonList.results.map((poke, idx) => {
      return (
        <option key={idx} value={poke.name}>{poke.name}</option>
      );
     })
  }

  return (
  <>
    <div className='cont'>
      <select onChange={(e) => setPokemonId(e.target.value)}>
        {list}
      </select>
      <h1>{pokemonData.name}</h1>
      <h2>ID:{pokemonData.id}</h2>
      
      <div className='imgcont'>
        <img src={Shiny ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default } alt={pokemonData.name} />
        <img src={Shiny ? pokemonData.sprites.back_shiny : pokemonData.sprites.back_default } alt={pokemonData.name} />
      </div>

      <button className={Shiny ? "btn actived" : "btn desactived"} onClick={() => setShiny(!Shiny)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
          <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
        </svg>
      </button>

      <div className='infocont'> 
        <span>Abilities</span>
        <hr/>
        <div className="contAbilities">
          {pokemonData.abilities.map(ability => (
            <div className='abilities' key={ability.ability.name}>{ability.ability.name}</div>
          ))}
        </div>
        <span>Stats Base</span>
        <hr/>
        <div className="stats"> 
          <div className="stat">
            <div className="statName">{pokemonData.stats[0].stat.name}</div>
            <div className="statValue">{pokemonData.stats[0].base_stat}</div>
          </div>
          <div className="stat">
            <div className="statName">{pokemonData.stats[1].stat.name}</div>
            <div className="statValue">{pokemonData.stats[1].base_stat}</div>
          </div>
          <div className="stat">
            <div className="statName">{pokemonData.stats[2].stat.name}</div>
            <div className="statValue">{pokemonData.stats[2].base_stat}</div>
          </div>
          <div className="stat">
            <div className="statName">{pokemonData.stats[3].stat.name}</div>
            <div className="statValue">{pokemonData.stats[3].base_stat}</div>
          </div>
          <div className="stat">
            <div className="statName">{pokemonData.stats[4].stat.name}</div>
            <div className="statValue">{pokemonData.stats[4].base_stat}</div>
          </div>
          <div className="stat">
            <div className="statName">{pokemonData.stats[5].stat.name}</div>
            <div className="statValue">{pokemonData.stats[5].base_stat}</div>
          </div>

        </div>
      </div>
    </div>
  </>
  );
}

export default App;
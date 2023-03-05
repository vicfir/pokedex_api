import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export const Selected = (props) => {
  const [pokemonData, setPokemonData]=useState([]);
  useEffect(() => {
    const getAllPokemons = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.selectedPok}`);
        const responseData = response.data;
        setPokemonData(responseData);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllPokemons();
  }, []);
  
  return (
    <div>    
      <Link to={"/"}>go back</Link>

      <div className='flex'>
        <p>No. {pokemonData.id}</p>
        <p>{pokemonData.name}</p>
      </div>

      <div>
        <div className='flex'>
          <p>Height:</p>
          <p>{pokemonData.height}'</p>
        </div>
        <div className='flex'>
          <p>Weight:</p>
          <p>{pokemonData.weight} lbs.</p>
        </div>
      </div>

      <div className='flex'>
        {pokemonData.types && pokemonData.types.map((type, index)=>{
          return(
            <p key={index}>{type.type.name}</p>
          )
        })} 
      </div>

      <div className='flex'>
        <div>
          <p>front sprite</p>
          <img src={pokemonData.sprites && pokemonData.sprites.front_default} alt="" />
        </div>
        <div>
          <p>back sprite</p>
          <img src={pokemonData.sprites && pokemonData.sprites.back_default} alt="" />
        </div>
      </div>
    </div>
  )
}

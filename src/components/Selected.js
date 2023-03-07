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
      } catch (error) {
        console.log(error);
      }
    }
    getAllPokemons();
  }, []);
  
  return (
    <div id='selected' className='flex h-full justify-between items-center'>    
      <div className='flex'>
        <Link to={"/"} className='bg-orange-500 text-white h-12 p-3 shadow-[2px_5px_0px_0px_black]'>go back</Link>

        {pokemonData.sprites && pokemonData.sprites.other && 
        <img src={pokemonData.sprites.other["official-artwork"].front_default} className='artwork' alt="" />
        }

      </div>

      <div>
        <div className='numName flex justify-center mb-10 text-white shadow-[2px_5px_0px_0px_black]'>
          <p>No. {pokemonData.id}</p>
          <p className='z-10'>{pokemonData.name}</p>
          <div className='nameSquare'></div>
        </div>

        <div className='tabHW shadow-[2px_5px_0px_0px_black]'>
          <div className='flex text-center'>
            <p className='pGray'>Height:</p>
            <p className='pWhite'>{pokemonData.height}'</p>
          </div>
          <div className='flex text-center'>
            <p className='pGray'>Weight:</p>
            <p className='pWhite'>{pokemonData.weight} lbs.</p>
          </div>
        </div>

        <div className='flex justify-center'>
          {pokemonData.types && pokemonData.types.map((type, index)=>{
            return(
              <p key={index} className='type shadow-[2px_5px_0px_0px_black]'>{type.type.name}</p>
            )
          })} 
        </div>

        <div className='flex justify-around mt-5'>
          <div className='flex flex-col items-center'>
            <p>front sprite</p>
            <img src={pokemonData.sprites && pokemonData.sprites.front_default} alt="" />
          </div>
          <div className='flex flex-col items-center'>
            <p>back sprite</p>
            <img src={pokemonData.sprites && pokemonData.sprites.back_default} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

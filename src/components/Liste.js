import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Liste = () => {

    const [allPokemons, setAllPokemons]=useState([]);

    useEffect(() => {
        const getAllPokemons = async () => {
          try {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
            const urls = response.data.results.map(pokemon => pokemon.url);
            const pokemonDataArray = await Promise.all(urls.map(url => axios.get(url)));
      
            const allPokemonData = pokemonDataArray.map(response => response.data);
            setAllPokemons(allPokemonData);
          } catch (error) {
            console.log(error);
          }
        }
        getAllPokemons();
      }, []);
      
      console.log(allPokemons);

    // useEffect(() => {
    //     const getAllPokemons = async () => {
    //       try {
    //         const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
    //         console.log(response.data.results);

    //         const data = response.data.results;
           
    //         data.map(async(pokemon) => {
    //             const res = await  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                
    //             // console.log(res.data);

    //             setAllPokemons((allPokemons) => [...allPokemons, res.data]);
    //         });
    //         console.log(allPokemons);
    //         // setAllPokemons(response.data.results);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //     getAllPokemons();
    //   }, []);



  

  return (
    <>
        <div className='flex justify-between'>
            <h1 className='text-2xl'>Pokedex</h1>
            <nav className='flex flex-col items-center'>
                <div className='flex text-2xl'>
                    <button>&lt;-</button>
                    <h1 className='mx-3 '>all</h1> 
                    <button>-&gt;</button>
                </div>
                <p className='text-xs'>use left and right arrow to switch region</p>
                {/* {allPokemons.results && allPokemons.results.map((pok, index) => {
                    
                    return(
                        <div key={index}>
                            <p>{pok.name}</p>
                            <p>{pokemon.wight}</p>
                        </div>
                    )
                })} */}
            </nav>
        </div>
    </>
  )
}

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Liste = (props) => {

    // const [allPokemons, setAllPokemons]=useState([]);
    const [pokedexByRegion, setPokedexByRegion]=useState([]);
    const [indexRegion, setIndexRegion]=useState(0);

    const [pokemonImg, setPokemonImg]=useState('');

    
    //TEST
    // const [regions, setRegions]=useState([
    //   {name : 'johto', values : []},
    //   {name : 'kanto', values : []},
    //   {name : 'hoenn', values : []},
    //   {name : 'sinnoh', values : []},
    //   {name : 'unova', values : []},
    //   {name : 'kalos', values : []},
    //   {name : 'alola', values : []},
    //   {name : 'galar', values : []},
    //   {name : 'hisui', values : []},
    //   {name : 'paldea', values : []},
    // ]);

    // useEffect(()=>{
    //   const getRegionsLocations = async () => {
    //     try {
    //       const requests = regions.map((region, index) => axios.get(`https://pokeapi.co/api/v2/region/${index+1}`));
    //       const responses = await Promise.all(requests);
    //       const data = responses.map(response => response.data.locations);
    //       const newRegions = regions.map((region, index) => ({ ...region, values: data[index] }));
    //       setRegions(newRegions);
    //       console.log(newRegions);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   getRegionsLocations();
    // }, []);

    // useEffect(() => {
    //   const getAllPokemons = async () => {
    //     try {
    //       const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1015");
    //       const urls = response.data.results.map(pokemon => pokemon.url);
    //       const pokemonDataArray = await Promise.all(urls.map(url => axios.get(url)));
    
    //       const allPokemonData = pokemonDataArray.map(response => response.data);
    //       setAllPokemons(allPokemonData);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   getAllPokemons();
    // }, []);
    // console.log(allPokemons);

    useEffect(()=> {
      const getAllRegions = async () => {
        try {
          //get all regions
          const regions = await axios.get("https://pokeapi.co/api/v2/region");
          //array of region urls
          const regionsUrls = regions.data.results.map(region => region.url);

          //get all datas from urls
          const regionData = await Promise.all(regionsUrls.map(url => axios.get(url)));
          //array of pokedex by region urls
          const pokedexesUrls = regionData.map(regionData => regionData.data.pokedexes[0].url);

          //get all datas from urls
          const pokedexesByRegion = await Promise.all(pokedexesUrls.map(url => axios.get(url)));
          //take just .data from objects
          const pokedexesByRegionData = pokedexesByRegion.map(pokedexesByRegion=> pokedexesByRegion.data);

          //array of pokemons entries by region 
          const pokemonsByRegion = pokedexesByRegionData.map(pokedexesByRegionData => pokedexesByRegionData.pokemon_entries);

          //array of pokemons urls ATTENTION double map array dans array
          // const pokemonsUrls = pokemonsByRegion.map(arr => arr.map(obj => obj.pokemon_species.name));


          //get all datas from urls PROBLEME TROP DE DATA
          // const pokemonsDataByRegion = await Promise.all(pokemonsUrls.map(arr => Promise.all (arr.map(name => axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)))));

          setPokedexByRegion(pokedexesByRegionData);
          console.log(pokemonsByRegion);
        } catch (error) {
          console.log(error);
        }
      }
      getAllRegions();
    }, []);

    // console.log(pokedexByRegion[indexRegion] && pokedexByRegion[indexRegion].pokemon_entries);

    //FUNCTIONS ONCLICK
    const nextRegion = () => {
      if(indexRegion > 8){
        setIndexRegion(0);
      } else {
        setIndexRegion(indexRegion+1)
      }
    }
    const previousRegion = () => {
      if(indexRegion > 0){
        setIndexRegion(indexRegion-1)
      } else {
        setIndexRegion(9)
      }
    }

    const displayPokemon = (pokemon) => {
      const pokemonData = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      pokemonData.then(response => {setPokemonImg(response.data.sprites.other['official-artwork'].front_default)})

      // setPokemonName(pokemon);
    }
       
  return (
    <>
      <div className='flex justify-between w-full'>
          <h1 className='text-2xl'>Pokedex</h1>
          <img src={pokemonImg} alt="" className='imgPokemonList' />
          <nav className='flex flex-col items-center'>
              <div className='lex text-2xl text-white flex my-4'>
                <div className='regionSquare'></div>
                <button onClick={previousRegion} className='pt-2'>&lt;-</button>

                {pokedexByRegion[indexRegion] && <h1 className='mx-3 pt-2'>{pokedexByRegion[indexRegion].name}</h1>}

                <button onClick={nextRegion} className='pt-2'>-&gt;</button>
              </div>
              <p className='text-xs'>use left and right arrow to switch region</p>

              <div className='list'>
                {pokedexByRegion[indexRegion] && pokedexByRegion[indexRegion].pokemon_entries.map((pokemon, index) => { 

                return(
                  <div key={index} className='flex w-full justify-end items-center'>
                    
                    
                    {/* <p onClick={()=>{props.selectPok(pokemon.pokemon_species.name)}}>{pokemon.pokemon_species.name}</p> */}
                    <Link onClick={()=>{props.selectPok(pokemon.pokemon_species.name)}} onMouseOver={()=>{displayPokemon(pokemon.pokemon_species.name)}} to={"pokemon"} className='pokemonInList py-3'>{pokemon.pokemon_species.name}</Link>

                  </div>
                )
                })}
              </div>
              

              {/* {allPokemons && allPokemons.map((pokemon, index) => {      
                return(
                  <div key={index} className='flex w-full justify-between items-center'>
                    
                    <div className='flex items-center'>
                      <img src={pokemon.sprites.front_default} alt="" />
                      <p>No. {pokemon.id.toString().length < 2 ? "00"+pokemon.id : pokemon.id.toString().length < 3 ? "0"+pokemon.id : pokemon.id}</p>
                    </div>
                    <p>{pokemon.name}</p>

                  </div>
                )
              })} */}
          </nav>
      </div>
    </>
  )
}

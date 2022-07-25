import { useQuery } from "@apollo/client";
import { ALL_POKEMON } from "../Query/qraph";
import Card from "../Components/Card";
import { useContext, useEffect, useRef, useState } from "react";
import { globalContext } from "../App";
import { Link } from "react-router-dom";

export default function Home(){

     const {loading, error, data} = useQuery(ALL_POKEMON);
     let fave = []; 
     if(localStorage.getItem('favourites') !== null){
          fave = JSON.parse(localStorage.getItem('favourites'));
     }

     const [fav, setFav] = useState(fave);
     const [search, setSearch] = useState("");
     
     const searchRef = useRef();
     const inputSearch = () =>{
          let searchValue = searchRef.current.value;
          setSearch(searchValue.toLowerCase())
          console.log(searchValue)
     }
     
     const Searching= (Name)=>{
          return Name.toLowerCase().includes(search)
     }

     const setFavorite = ((pokemonId) =>{
          let newArr = [...fav];
          let search = fav.indexOf(pokemonId)
          if(search === -1){
               newArr.push(pokemonId);
               localStorage.setItem('favourites', JSON.stringify(newArr));
          } else {
               newArr.splice(search, 1);
               localStorage.setItem('favourites', JSON.stringify(newArr));
          }
          setFav(newArr);
     })

    if(loading) return <p style={{
         fontSize:"40px",
         fontFamily:"cursive",
         color:"blue",
         textAlign:"center"
    }}>Loading</p>
    else {
     const pokemons = data.pokemons.results;
     return <div>
          <div id="searchBar">
               <input id="searchInput" type="text" placeholder="Type here" ref={searchRef}/>
               <button id="btnSearch" onClick={()=>{
                    inputSearch();
               }}>Search</button>
          </div>
          <div id="listPokemons">
          {pokemons.map( (pokemon) => {
               let isFav = fav.includes(pokemon.id);
               let correct = true;
               if(search !== "") correct = Searching(pokemon.name);
               if(correct) return <div key={pokemon.id}>
                    <Card src={pokemon.artwork} name={pokemon.name} id={pokemon.id}>
                    <div id="nameNHeart">
                    <div style={
                    {
                         fontFamily: "cursive",
                         textDecoration: "none",
                         color:"black"
                    }
                    }
                    >{pokemon.name}</div>
                    <img 
                    onClick={()=>{
                         setFavorite(pokemon.id)
                    }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ei-heart.svg/800px-Ei-heart.svg.png" alt="" height="30" 
                    style={
                         !isFav ? {backgroundColor: "white"} : 
                         {
                              backgroundColor:"red"
                         }
                         
                         }/>
                    </div>     
                    </Card>
                    
               </div>
               
          })}
          </div>
     </div>
}
}
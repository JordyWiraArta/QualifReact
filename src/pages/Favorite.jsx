import { useQuery } from "@apollo/client";
import { ALL_POKEMON } from "../Query/qraph";
import { useState } from "react";
import Card from "../Components/Card";

export default function Favorite(){
    

    const {loading, error, data} = useQuery(ALL_POKEMON);


    let fave = []; 
     if(localStorage.getItem('favourites') !== null){
          fave = JSON.parse(localStorage.getItem('favourites'));
     }
    const [fav, setFav] = useState(fave);

    const setFavorite = ((pokemonId) =>{
        let newArr = [...fav];
        let search = fav.indexOf(pokemonId)
        newArr.splice(search, 1);
        localStorage.setItem('favourites', JSON.stringify(newArr));
        setFav(newArr);
   })

    if(loading) return <p style={{
        fontSize:"40px",
        fontFamily:"cursive",
        color:"blue",
        textAlign:"center"
   }}>Loading</p>
    else
    {
        const pokemons = data.pokemons.results;
        if(localStorage.getItem('favourites') !== null){
        
        return <div id="listPokemons">
            {pokemons.map( (pokemon) => {
               let isFav = fav.includes(pokemon.id);
               if(isFav) return <div key={pokemon.id}>
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
                              {backgroundColor:"red"}
                         }/>
                    </div>     
                    </Card>
                    
               </div>
               
          })}
        </div>
        }
    }
}
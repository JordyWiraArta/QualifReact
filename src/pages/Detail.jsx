import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { globalContext } from "../App";
import { ALL_POKEMON, POKEMON_Detail } from "../Query/qraph";

export default function Detail(){

    const {name} = useParams();
    const detailImageContext = useContext(globalContext);
    const {loading, error, data} = useQuery(POKEMON_Detail, {
        variables:{
            name: name
        }
    });
    const image = detailImageContext.image[0];
    if(loading) return <p style={{
        fontSize:"40px",
        fontFamily:"cursive",
        color:"blue",
        textAlign:"center"
    }}>Loading</p>
    else {
        console.log(data)
        const stats = data.pokemon.stats;
        const abilities = data.pokemon.abilities;
        return <div>
        <div style={{
                display:"flex",
                width:"100%",
                justifyContent:"center"
                }}>
             <img src={image} alt="" height="200" style={{
                 border:"solid",
                 borderWidth:"4px"
             }}/>
        </div>

        <div id="row">
            <p className="alignRight">Name:</p>
            <p className="ldGreen">{name}</p>
        </div>

        <div id="row">
            <p className="alignRight">Hp:</p>
            <p className="blueFont">{stats[0].base_stat}</p>
        </div>

        <div id="row">
            <p className="alignRight">Attack:</p>
            <p className="blueFont">{stats[1].base_stat}</p>
        </div>

        <div id="row">
            <p className="alignRight">Defense:</p>
            <p className="blueFont">{stats[2].base_stat}</p>
        </div>

        <div id="row">
            <p className="alignRight">Special-attack:</p>
            <p className="blueFont">{stats[3].base_stat}</p>
        </div>

        <div id="row">
            <p className="alignRight">Special-defense:</p>
            <p className="blueFont">{stats[4].base_stat}</p>
        </div>

        <div id="row">
            <p className="alignRight">Speed:</p>
            <p className="blueFont">{stats[5].base_stat}</p>
        </div>

        <p className="alignRight" 
        style={{
            textAlign:"center"
        }}>Abilities</p>
        <div id="row">
            {abilities.map((ability)=>{
                return <p 
                className="blueFont"
                style={
                    {
                        fontFamily: "cursive",
                        fontSize: "15px",
                        fontWeight: "800",
                        border: "solid",
                        padding:"2%",
                        borderRadius: "50px",
                        borderColor: "#F78764"
                    }
                }>{ability.ability.name}</p>
            })}
        </div>

   </div> }
        
}
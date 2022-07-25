import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { globalContext } from "../App";

export default function Header(){

    const path = window.location.pathname;
    return <div>
        {path === "/"? <Link 
        to="/favorite"
        id="btnFavorite"
        >
            Favorites
        </Link> : <Link 
        to="/"
        id="btnBack"
        >
            Back to Home
        </Link>}

        <div id="title">
            <img src="https://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png" alt="" height={40}/>
            <p>Pokemon List</p>
        </div>
        <hr />
    </div>
}
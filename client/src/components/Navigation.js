import React from "react"
import { NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"
//import {Filters} from "./Filters"
export const NavBar = () => {

    
    return (
        <nav>

            <NavLink to="/home">
                Home
            </NavLink>           

            {/* //<Filters /> */}
            <NavLink to="/home/create">
                Create videogame
            </NavLink>

        </nav>
    )
}


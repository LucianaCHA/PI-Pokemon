import React from "react";
import {Link} from 'react-router-dom'

export default function LandingPage(){
    return(
        <React.Fragment>
            <h1>Welcome to Henry Pokemon</h1>
            <Link to = '/home'>GO!</Link>
        </React.Fragment>
    )
}
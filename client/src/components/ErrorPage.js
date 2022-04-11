import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';



export const ErrorPage =({error}) => {
    
    
    return (
        <>{error}</>
    )

}
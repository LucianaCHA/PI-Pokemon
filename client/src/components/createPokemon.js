import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPokeTypes, postPokemon  } from './actions/index.js'


export function CreatePokemon() {

    const dispatch = useDispatch()
    const poketypes = useSelector((state) => state.poketypes)

    const [form, setForm] = React.useState({name:'', hp:0, attack:0, defense:0, speed:0, weigth: 0, heigth: 0, image: '', types:[]})


    useEffect(()=>{
        dispatch(getPokeTypes())
    },[dispatch])

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(postPokemon(form))
        setForm({name:'', hp:0, attack:0, defense:0, speed:0, weigth: 0, heigth: 0, image: '', types:[]})
    }
    const handleOnChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
  
    return (
        <form onSubmit={onSubmit}>
            <label >Name</label>
            <input value={form.name} onChange={handleOnChange} name='name' type="text" />
            <label >Stats</label>
            <input value={form.hp} onChange={handleOnChange} name='hp' type='number'/>
            <input value={form.attack} onChange={handleOnChange} name='attack' type='number'/>
            <input value={form.defense} onChange={handleOnChange} name='defense' type='number'/>
            <input value={form.speed} onChange={handleOnChange} name='speed' type='number'/>
            <label>Others</label>
            <input value={form.weigth} onChange={handleOnChange} name='weigth' type='number'/>
            <input value={form.heigth} onChange={handleOnChange} name='heigth' type='number'/>
            <input value={form.image} onChange={handleOnChange} name='image' type='text'/>
            <label>Types</label>
            <select value={form.types} onChange={handleOnChange} name='types' multiple>
            <option value=''>Select</option>
            {poketypes?.map(type => <option key={type.id} value={type.name}>{type.name}</option>)}
            </select>
            <input type="submit" value="Create"/>
           
        </form>
    )
}


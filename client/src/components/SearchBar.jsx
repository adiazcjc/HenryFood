import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchName } from '../actions'
import styles from './SearchBar.module.css'

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(searchName(name))
        setName('')
    }

    return (
        <div className={styles.SearchBar}>
            <input
                type="text"
                placeholder="Busca una receta"
                onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>🔍︎</button>
        </div>
    )

}
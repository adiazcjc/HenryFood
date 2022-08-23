import React from 'react'
import styles from './Loading.module.css'
import imagen from "../images/cooking.gif"

export default function LoadingPage() {
    return (
        <div className={styles.loading}>
            <img src={imagen}></img>
            <h1>CARGANDO...</h1>
        </div>
    )
}
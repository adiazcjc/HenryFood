import React from "react"; 
import styles from './Cards.module.css' 

export default function Cards({id, name, image, diets, healthScore}) {
    return (
        <div className={styles.card}>
                    <div className={styles.front}>
                        <img src={image} alt='Image not found' width='200px' height='250px'></img>
                        <h3>{name}</h3>
                    </div>
                    <div className={styles.back}>
                        <h3>Diets: {diets.map(el=>{return el.name + " - "})}</h3>
                        <h3>Health Score: {healthScore + "%"}</h3>
                    </div>
        </div>
    )
}
import React from "react"; 
import { Link } from 'react-router-dom';
import styles from './Cards.module.css' 

export default  function Cards({id, name, image, diets}) {
    return (
        <div className={styles.card}>
          
               
                    <div className={styles.front}>
                        <img src={image} alt='Image not found' width='200px' height='250px'></img>
                        <h3>{name}</h3>
                    </div>
                
                
                    <div className={styles.back}>
                        <h3>Diets: {diets.map(el=>{return el + " - "})}</h3>
                    </div>
                     
                
        </div>
    )
}
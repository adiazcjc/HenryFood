import React from "react";
import styles from './Landing.module.css'
import imagen from "../images/comida.png"

export default function Landing(){
    return(
        <div className={styles.container}>
            <header>
            <div className={styles.page}>
                <div className={styles.texts}>
                    <h1>#HenryFood</h1>
                    <h2></h2>
                    <a href='/Home'>Comenzar</a>
                </div>
                <img src={imagen}></img>
            </div>
            </header>
            <div className={styles.wave}>
                <div style={{height: '80px', overflow: 'hidden'}}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%'}}>
                        <path d="M0.00,49.99 C150.00,150.00 349.21,-49.99 500.00,49.99 L500.00,150.00 L0.00,150.00 Z"></path>
                    </svg>
                </div>
            </div>
        </div>
        
        
            
        
    )
}
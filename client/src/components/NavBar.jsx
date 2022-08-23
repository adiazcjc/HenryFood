import React from 'react';
import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar() {

  return (
    <nav>
      <div className={styles.navBar}>
        <h1>#HenryFood</h1>
        <div>
          <ul>
            {/* <Link to='./home'>
              <li><a href='/home'></a>Home</li>
            </Link> */}
            <Link to='/recipes'>
              <li><a href="/recipes"></a>Crear Receta</li>
            </Link>
          </ul>
        </div>
          <SearchBar/>
      </div>
    </nav>
  )
}

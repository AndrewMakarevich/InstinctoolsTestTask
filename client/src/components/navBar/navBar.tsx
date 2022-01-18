import { useState } from "react";
import { Link } from "react-router-dom";
import { publicRoutes } from "../../routes/routes";
import './navBar.css';
const NavBar = () => {
  const [burgerState, setBurgerState] = useState(false);
  return (
    <header>
      <nav className="nav-bar">
        <button className="burger-menu__btn" onClick={() => setBurgerState(!burgerState)}>
          <span className={`burger-line ${burgerState}BurgerLine`}></span>
          <span className={`burger-line ${burgerState}BurgerLine`}></span>
          <span className={`burger-line ${burgerState}BurgerLine`}></span>
        </button>
        <ul className={`nav-bar__links-list ${burgerState}Burger`}>
          {
            publicRoutes.map(({ name, path }) =>
              <li key={path} className="nav-bar__link-item">
                <Link className="nav-bar__link" to={path}>{name}</Link>
              </li>
            )
          }
        </ul>
      </nav>
    </header>

  )
}
export default NavBar;
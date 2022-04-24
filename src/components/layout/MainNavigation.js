import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css'
function MainNavigation(){
    return(
        <header className={classes.header}>
            <div className={classes.logo}>
                Library Route Finder
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to = '/'>Home</Link>
                    </li>
                    <li>
                        <Link to = 'add'>Add Books</Link>
                    </li>
                    <li>
                        <Link to = '/book-list'>List of Books</Link>
                    </li>
                </ul>
            </nav>

        </header>
    )
}


export default MainNavigation;
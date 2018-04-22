import React from 'react';
import scss from '../scss/main.css';
import {
    NavLink
} from 'react-router-dom';

class Header extends React.Component {
    render() {
        const activeStyle = {
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'rgba(192, 159, 11, 0.7)'
        }
        return (
            <nav className='header'>
                <ul className='container'>
                    <li className='shadow'>
                        <NavLink activeStyle={activeStyle} exact to='/'>Home</NavLink>
                    </li>
                    <li className='shadow'>
                        <NavLink activeStyle={activeStyle} to='/section1'>Section1</NavLink>
                    </li>
                    <li className='shadow'>
                        <NavLink activeStyle={activeStyle} to='/section2'>Section2</NavLink>
                    </li>
                    <li className='shadow'> 
                        <NavLink activeStyle={activeStyle} to='/section3'>Section3</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header;
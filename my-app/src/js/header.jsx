import React from 'react';
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
                        <NavLink activeStyle={activeStyle} exact to='/'>React</NavLink>
                    </li>
                    <li className='shadow'>
                        <NavLink activeStyle={activeStyle} to='/section1'>Local Storage</NavLink>
                    </li>
                    <li className='shadow'>
                        <NavLink activeStyle={activeStyle} to='/section2'>JSON Server</NavLink>
                    </li>
                    <li className='shadow'> 
                        <NavLink activeStyle={activeStyle} to='/section3'>NASA API</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header;
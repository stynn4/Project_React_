import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route
} from 'react-router-dom';
import animate from 'animate.css';
import scss from '../scss/main.css';
import Header from './header.jsx';
import Home from './home.jsx';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';
import Footer from './footer.jsx'; 

class App extends React.Component{
    render(){
        return (
            <div>
                <HashRouter>
                    <div className='window'>
                        <Header/>
                        <Content/>
                        <Footer/> 
                    </div>
                </HashRouter>
            </div>
        )       
    }
}

class Content extends React.Component {
    render(){
        return (
            <div>
                <Route exact path='/' component={Home}/>
                <Route path='/Section1' component={Section1}/>
                <Route path='/Section2' component={Section2}/>
                <Route path='/Section3' component={Section3}/>
            </div>
        )
    }
}
/*
class NotFound extends React.Component {
    render(){
        return <h1>not found</h1>
    }
}
*/


export default App;


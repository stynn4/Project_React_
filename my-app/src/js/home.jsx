import React from 'react';
import scss from '../scss/main.css';



class Home extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            line: 1 
        }
    }
    render(){
        return (
            <div className='container home'>
                <h1>Home</h1>
                <Underline/>
            </div>
        )
    }
}

class Underline extends React.Component {
    render(){
        return (
            <div className='underline'>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
            </div>
        )
    }
}


export default Home;
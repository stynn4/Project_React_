import React from 'react';
import scss from '../scss/main.css';





class Underline extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            borderBottom: 'rgb(100, 30, 30)' 
        }
    }

    componentDidMount(){

        this.firstLine = setTimeout(() => {
            this.setState({
                borderBottom: '5px solid rgb(100, 30, 30)'
            })
        }, this.props.firstLineTime * 1000)

        this.secondLine = setTimeout(() => {
            this.setState({
                borderBottom: '5px solid rgb(100, 30, 30)'
            })
        }, (this.props.firstLineTime + this.props.secondLineTime) * 1000)
        
    }

    render(){
        
        return (
            <div className='underline'>
                    <div style={{borderBottom: this.state.borderBottom}}>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
            </div>
        )
    }
}

class Home extends React.Component {
    render(){
        return (
            <div className='container home'>
                <h1>Home</h1>
                <Underline firstLineTime={1} 
                secondLineTime={2} 
                thirdLineTime={1} 
                fourthTimeLine={1}
                fifthLineTime={1}
                sixthLineTime={1}
                />
            </div>
        )
    }
}

export default Home;
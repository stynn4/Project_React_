import React from 'react';
import scss from '../scss/main.css';


class Section2 extends React.Component {
    render(){

        const text = 'to jest tekst texttyper'

        return (
            <section className='container section'>
                    <TextTyper  text={text}/>
                    <EventBox/>
            </section>
        )
    }
}

class TextTyper extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            currentText: this.props.text[0]
        }
    }

    componentDidMount(){
        this.interval = setInterval(()=>{
            let propsText = this.props.text
            let stateText = this.state.currentText

            this.setState({
                currentText: stateText + propsText[stateText.length]
            }, ()=> {
                if(propsText.length <= this.state.currentText.length)
                    clearInterval(this.interval)
            })

        }, 100)

    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }
    render(){
        return (
            <div className='textTyper'>
                {this.state.currentText}
            </div>
        )
    }
}

class EventBox extends React.Component {
    render(){
        return (
            <div className='eventBox'>EventBox</div>
        )

        
    }
}

export default Section2;
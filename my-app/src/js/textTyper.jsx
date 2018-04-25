import React from 'react';
import scss from '../scss/main.css';


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
        clearTimeout(this.interval)
    }
    render(){
        return (
            <div className='textTyper'>
                {this.state.currentText}
            </div>
        )
    }
}

export default TextTyper;
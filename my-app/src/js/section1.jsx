import React from 'react';
import scss from '../scss/main.css';

class Section1 extends React.Component {
    render(){

        const text = '=> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

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

        }, 50)

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
    constructor(props){
        super(props)

        this.default = {
            backgroundColor: 'rgb(70, 70, 70)',
            border: '3px dotted rgb(120, 250, 220)',
            width: '350px',
            height: '200px',
            buttonText: 'Button'
        }

        this.state = {...this.default}
    }

    mouseEnter = () => {
        this.setState({
            backgroundColor: 'rgb(100, 100, 100)',
            border: '5px dashed rgb(120, 120, 170',
            buttonText: 'onMouseEnter'
        })
    }

    mouseLeave = () => {
        this.setState({
            ...this.default,
            buttonText: 'onMouseLeave'

        })
    }

    click = () => {
        this.setState({
            backgroundColor: 'orange',
            border: '3px double rbg(100, 100, 100)',
            buttonText: 'onClick'
        })
    }

    render(){
    
        const code = 'Pellentesque facilisis. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus.  '

        return (
            
            <div className='eventBox'>
                <div>
                    <div className='event' 
                    style={{...this.state}}
                    onMouseEnter={this.mouseEnter} 
                    onMouseLeave={this.mouseLeave}
                    onClick={this.click}
                    onDoubleClick={this.dblClick}>
                    {this.state.buttonText}
                    </div>
                </div>
                <div>{code}
                </div>
            </div>
            
        )
    }
}

export default Section1;

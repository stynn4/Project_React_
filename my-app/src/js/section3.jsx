import React from 'react';
import scss from '../scss/main.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/styles/hljs';
import { Scrollbars } from 'react-custom-scrollbars';

class Section3 extends React.Component {
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

class TextBox extends React.Component {
    render(){
        const codeString = `import React from 'react';
        import scss from '../scss/main.css';
        import SyntaxHighlighter from 'react-syntax-highlighter';
        import { atelierSavannaDark } from 'react-syntax-highlighter/styles/hljs';
        
        
        
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
        }`

        return <SyntaxHighlighter language='javascript' style={atelierSavannaDark}>{codeString}</SyntaxHighlighter>;  
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
    constructor(props){
        super(props)

        this.default = {
            backgroundColor: '',
            buttonText: 'Button'
        }

        this.state = {...this.default}
    }

    mouseEnter = () => {
        this.setState({
            backgroundColor: 'rgb(40, 40, 40)'
        })
    }

    mouseLeave = () => {
        this.setState({
            ...this.default

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

        return (
            
            <div className='eventBox'>
                <div>
                </div>
                <div>
                    <TextBox/>   
                </div>
            </div>
            
        )
    }
}
/*
class ApiBox extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            loading: false
        }
    }

    componentDidMount(){
        
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${this.props.key}`).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            
            // data wynik zwrotu z serwera przeobionego na obiekt
            this.setState({
                data:data
                //aktualizacja stanu
            }).catch(err => {
                console.log(err)
            })
        })
    }

    render(){
        // musi byc warunek, czy mamy juz te dane
        if(this.state.data === false){
            return <h1>pobieram dane ...</h1>
        } else {
            return <div>{this.state.data}</div>
        }
     }
}
*/

export default Section3;
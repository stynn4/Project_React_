import React from 'react';
import scss from '../scss/main.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/styles/hljs';
import { Scrollbars } from 'react-custom-scrollbars';


class Section3 extends React.Component {
    render(){

        const text = 'to jest tekst texttyper'

        return (
            <section className='container section3'>
                    <TextTyper  text={text}/>
                    <EventBox/>
            </section>
        )
    }
}

class CodeBox extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            className: 'fullCodeHide'
        }
    }

    showCode = () => {
        this.setState({
            className: 'fullCodeShow'
            })
    }

    hideCode = () => {
        this.setState({
            className: 'fullCodeHide'
        })
    }

    render(){
        const codeStringBroken = `
        class Section3 extends React.Component {
            render(){
        
                const text = 'to jest tekst texttyper'
        
                return (
                    <section className='container section3'>`

        const codeStringFull = `
        class Section3 extends React.Component {
            render(){
        
                const text = 'to jest tekst texttyper'
        
                return (
                    <section className='container section3'>
                            <TextTyper  text={text}/>
                            <EventBox/>
                    </section>
                )
            }
        }`

        return (
            <div>
                <SyntaxHighlighter  
                language='javascript' 
                style={atelierSavannaDark}>
                    {codeStringBroken}
                </SyntaxHighlighter>
                <button onClick={this.showCode}>zobacz kod</button>
                <div className={this.state.className}>
                    <SyntaxHighlighter 
                    className='syntaxHighlighter'
                    language='javascript' 
                    style={atelierSavannaDark}>
                        {codeStringFull}
                    </SyntaxHighlighter>
                    <button onClick={this.hideCode}>ukryj kod</button>
                </div>
                </div>
        )
    }   
}

/*
class ButtonToShow extends React.Component {
    handleClick = () => {
        if(typeof this.props.clickFunction === 'function') {
            this.props.clickFunction()
        }
    }

    render(){
        return <button onClick={this.handleClick}>zobacz kod</button>
    }
}
*/

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
    //key HcI9D0bdacVk9icon6WnwhapN5GAhXM28Rx9YuH3
    render(){

        return (
            
            <div className='eventBox'>
                <div className='react'>
                    <ApiBox/>
                </div>
                <div className='codeBox'>
                    <CodeBox/>   
                </div>
            </div> 
            
        )
    }
}

class ApiBox extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: false
        }
    }
 
    componentDidMount(){
        
        fetch(`https://api.nasa.gov/planetary/apod?api_key=HcI9D0bdacVk9icon6WnwhapN5GAhXM28Rx9YuH3`).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            
            this.setState({
                data:data
            })/*.catch(err => {
                console.log(err)
            })*/
        })
    }

    mouseEnter = () => {
        this.setState({
            text: 'powiększ zdjęcie'
        })
    }

    mouseLeave = () => {
        this.setState({
            text: ''
        })
    }
        

    render(){

        

        if(this.state.data === false){
            return <h1 style={{color: 'rgba(45, 130, 130, 0.5)'}}>pobieram dane ...</h1>
        } else {
            return (
                <div className='apiBox'>
                    <p>Tytuł zdjęcia: {this.state.data.title}</p>
                    <div>
                        <a href={this.state.data.url}
                        onMouseEnter={this.mouseEnter} 
                        onMouseLeave={this.mouseLeave}>
                            <img src={this.state.data.url} alt='nasaImageOfTheDay'/>
                        </a>
                        <p style={this.state} className='textBeforeImg'>{this.state.text}</p>
                        <h4>Zdjęcie dnia: </h4>
                        <p>{this.state.data.date}</p>
                        <h4>Copyright: </h4>
                        <p>{this.state.data.copyright}</p>
                        </div>
                    <div>
                        <h4>Opis: </h4>
                        <Scrollbars style={{height: 255}}>
                            <p>{this.state.data.explanation}</p>
                        </Scrollbars>
                    </div>
                </div>
		    )         
        }
    }
}     


export default Section3;
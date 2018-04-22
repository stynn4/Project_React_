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
    //key HcI9D0bdacVk9icon6WnwhapN5GAhXM28Rx9YuH3
    render(){

        return (
            
            <div className='eventBox'>
                <div className='react'>
                    <ApiBox key="HcI9D0bdacVk9icon6WnwhapN5GAhXM28Rx9YuH3"/>
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

    render(){
        const {data}= this.state 

        if(this.state.data === false){
            return <h1>pobieram dane ...</h1>
        } else {
            return (
                <div className='apiBox'>
                    <p>Tytuł zdjęcia: {this.state.data.title}</p>
                    <div>
                        <a href={this.state.data.url}><img src={this.state.data.url} alt='nasaImageOfTheDay'/></a>
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
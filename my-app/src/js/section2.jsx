import React from 'react';
import CodeBox from './codeBox.jsx';
import TextTyper from './textTyper.jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/styles/hljs';

//section2  =>       TextTyper + EventBox
//          =>       TextTyper
//          =>       EventBox => =>  + CodeBox
//          => =>    
//          => =>    CodeBox



class Section2 extends React.Component {
    render(){

        const text = 'to jest tekst texttyper'

        return (
            <section className='container section2'>
                    <TextTyper  text={text}/>
                    <EventBox/>
            </section>
        )
    }
}


class EventBox extends React.Component {
    render(){
        return (
            <div className='eventBox'>
                <div className='react'>
                    <AddressBook/>
                </div>
                <div className='codeBox'>
                    <CodeBox brokenCode={codeStringBroken} fullCode={codeStringFull}/>   
                </div>
            </div>
        )
    }
}

class AddressBook extends React.Component {
    render(){
        return (
            <div>
                <AddressBookForm/>
                <AddressBookList/>
            </div>
        )
    }  
}

class AddressBookForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            dataFromInputs:{
                name: '',
                surname: '',
                phoneNumber: '',
                email: ''
            }
        }
    }

    handleInput = (e) => {
        
        let dataFromInputs = this.state.dataFromInputs

        let name = e.target.name
        let surname = e.target.surname
        let phoneNumber = e.target.phoneNumber
        let email = e.target.email
        let value = e.target.value

        dataFromInputs[name] = value;

        this.setState({
            dataFromInputs
        })
    }



    handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(this.state.dataFromInputs)
        
        let people = []
        people.push(this.state.dataFromInputs)
        const obj = {
            "name": people[0].name,
            "surname": people[0].surname,
            "phoneNumber": people[0].phoneNumber,
            "email": people[0].email
        }
        
        fetch('http://localhost:3000/addressBook', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(obj) 
        }).then(function (data) {  
            console.log('Request success: ', data);  
          })  
          .catch(function (error) {  
            console.log('Request failure: ', error);  
          });
    }

    
    render(){
        return (
            <div className='addressBookForm'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Imię: 
                        <input type='text'
                        value={this.state.name}
                        onChange={this.handleInput}
                        id='name'
                        name='name'
                        placeholder='podaj imię'/>
                    </label>

                    <label>
                        Nazwisko: 
                        <input type='text'
                        value={this.state.surname}
                        onChange={this.handleInput}
                        id='surname'
                        name='surname'
                        placeholder='podaj nazwisko'/>
                    </label>

                    <label>
                        Numer telefonu: 
                        <input type='text'
                        value={this.state.phoneNumber}
                        onChange={this.handleInput}
                        id='phoneNumber'
                        name='phoneNumber'
                        placeholder='podaj numer telefonu'/>
                    </label>

                    <label>
                        Adres mailowy: 
                        <input type='text'
                        value={this.state.email}
                        onChange={this.handleInput}
                        id='email'
                        name='email'
                        placeholder='podaj email'/>
                    </label>

                    <input type='submit' value='submit'/>
                </form>
               
            </div>
            
        )
    }
}

class AddressBookList extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: false
        }
    }
    
   
    
    render(){
        return (
            <div className='addressBookList'>
            <p></p>
            </div>
        )
    }
}


// brokenCode for CodeBox
let codeStringBroken = `
class ApiBox extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: false
        }`


//fullCode for CodeBox
let codeStringFull = `
class ApiBox extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: false
        }
    }
 
    componentDidMount(){
        
        fetch('https://api.nasa.gov/planetary/apod?api_key=HcI9D0bdacVk9icon6WnwhapN5GAhXM28Rx9YuH3').then(response => {
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
                            <img src={this.state.data.url} 
                            alt='nasaImageOfTheDay'/>
                        </a>

                        <p className='textBeforeImg'>{this.state.text}</p>
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
}`
    

export default Section2;
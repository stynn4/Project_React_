import React from 'react';
import scss from '../scss/main.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/styles/hljs';
import { Scrollbars } from 'react-custom-scrollbars';



// bottom section of eventBox with code
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

        return (
            <div>

                <SyntaxHighlighter  
                language='javascript' 
                style={atelierSavannaDark}
                customStyle={{background: 'rgb(30, 30, 30)'}}
                showLineNumbers={true}
                lineNumberStyle={{color: 'rgba(120, 120, 120, 0.3)',
                margin: '0 15px'}}>
                    {this.props.brokenCode}
                </SyntaxHighlighter>

                <button onClick={this.showCode}>
                    zobacz kod
                </button>

                <div className={this.state.className}>
                    <Scrollbars>
                    <SyntaxHighlighter 
                    className='syntaxHighlighter'
                    language='javascript' 
                    style={atelierSavannaDark} 
                    customStyle={{overflowX: 'none', 
                    background: 'rgb(40, 40, 40)'}}
                    showLineNumbers={true}
                    lineNumberStyle={{color: 'rgba(120, 120, 120, 0.3)', margin: '0 15px'}}>
                        {this.props.fullCode}
                    </SyntaxHighlighter>
                    </Scrollbars>

                    
                    <button onClick={this.hideCode}>
                        ukryj kod
                    </button>
                
                </div>

            </div>
        )
    }   
}

export default CodeBox;
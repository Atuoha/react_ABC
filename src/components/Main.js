import React, { Component } from 'react'
import alphabets from '../alphabets.json'

 class Main extends Component {

    constructor(props){
        super(props);

        this.state = {
            alphabets: alphabets,
            currentPostion: 0,
            soundState: '',
            randomWords: false

        }
        this.previousMotion = this.previousMotion.bind(this);
        this.repeatMotion = this.repeatMotion.bind(this);
        this.nextMotion = this.nextMotion.bind(this);
        this.randomizeWords = this.randomizeWords.bind(this)

    }

    randomizeWords(e){
        let res =  e.target.checked
        this.setState({
            randomWords:res
        })
    }

    previousMotion(){

        if(this.state.randomWords !== true){
            if(this.state.currentPostion !== 0){
                this.setState({
                    currentPostion: this.state.currentPostion - 1
                })
            }else{
                this.setState({
                    currentPostion: 25
                })
            }
        }
        
    }

    repeatMotion(){

    }

    random(max){
        return Math.floor(Math.random() * (max))
    }

    nextMotion(){
        if(this.state.randomWords !== true){
            if(this.state.currentPostion !== 25){
                this.setState({
                    currentPostion: this.state.currentPostion + 1
                })
            }else{
                this.setState({
                    currentPostion: 0
                })
            }
        }else{
            let number = this.random(25)
            this.setState({
                currentPostion: number
            })
        }
        
    }

    render() {
    console.log(alphabets)
        return (
            <div>

                <div className="container text-center">
                    <p className="upperText">Random Letters <input onChange={this.randomizeWords} type="checkbox" />   Sound <input type="checkbox" /></p> 

                    <div className="top_fill_container mx-auto">
                        <h1 className="alphabet text-white animate__animated animate__bounce animate__repeat-2">{this.state.alphabets[this.state.currentPostion].letter}</h1>
                    </div>

                    <div>
                        <button onClick={this.previousMotion} className="btn"><i className="fa fa-fast-backward"></i> Previous</button> 
                        <button onClick={this.repeatMotion} className="btn btn-info">Repeat <i className="fa fa-repeat"></i> </button>
                        <button onClick={this.nextMotion} className="btn">Next <i className="fa fa-fast-forward"></i> </button>
                    </div>

                    <div className="fill_container mx-auto mt-2 ">
                        <div className="row p-4">
                            <div className="col-md-6 mt-2 text-white text-center">
                                <img className="animate__animated animate__fadeInRight" src={this.state.alphabets[this.state.currentPostion].image} width="100px" alt="word_capture" />

                            </div>

                            <div className="col-md-6 mt-2 text-white text-center">
                                <h1 className="text-white  animate__animated animate__fadeInLeft" id="word">{this.state.alphabets[this.state.currentPostion].word}</h1>
                            </div>
                            <audio className="mx-auto mt-2" controls src={this.state.alphabets[this.state.currentPostion].wordSound}></audio>

                        </div>
                    </div>
                </div>

                <footer className="footer text-center mt-5"><a rel="noreferrer" className="anchor-link" target="_blank" href="https://bit.ly/fb_atutechs">Developed by Atutechs Corp<br /> Using React</a></footer>



            </div>
        )
    }
}

export default Main
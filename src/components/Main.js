import React, { Component } from 'react'
import alphabets from '../alphabets.json'
import classNames from 'classnames'

 class Main extends Component {

    constructor(props){
        super(props);

        this.state = {
            alphabets: alphabets,
            currentPostion: 0,
            soundState: '',
            randomWords: false,
            currentTick: 0,
            sound: true
            

        }
        this.previousMotion = this.previousMotion.bind(this);
        this.nextMotion = this.nextMotion.bind(this);
        this.randomizeWords = this.randomizeWords.bind(this)
        this.playsound = this.playsound.bind(this)
        this.toggleSound =  this.toggleSound.bind(this)

    }

    toggleSound(e){
        let res =  e.target.checked
        this.setState({
            sound:res
        })
    }

    playsound(){
        if(this.state.sound === true){
            let letterSound = document.querySelector(`audio[data-key = "letter"]`);
            letterSound.play()
        }   
    }

    randomizeWords(e){
        let res =  e.target.checked
        this.setState({
            randomWords:res
        })
    }

    previousMotion(){

         // Resetting current tick
            this.setState({
                currentTick: 0
            })

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


    random(max){
        return Math.floor(Math.random() * (max))
    }

    nextMotion(){
    console.log(this.state.currentTick)

        // Resetting current tick
        if(this.state.currentTick === 2){
            this.setState({
                currentTick: 0
            })
        }


        if(this.state.randomWords !== true){
            if(this.state.currentTick < 2){
                this.setState({
                    currentTick: this.state.currentTick + 1
                })
            }else{
                if(this.state.currentPostion !== 25){
                    this.setState({
                        currentPostion: this.state.currentPostion + 1
                    })
                }else{
                    this.setState({
                        currentPostion: 0
                    })
                }
            }

        }else{
            let number = this.random(25)
            if(this.state.currentTick < 2){
                this.setState({
                    currentTick: this.state.currentTick + 1
                })
            }else{
                this.setState({
                    currentPostion: number
                })
            }    
        }

        
        
    }

    



    render() {
        let showImage = this.state.currentTick !== 0 ? true : false
        let showSpelling = this.state.currentTick === 2 ? true : false
        console.log(this.state.currentTick, showImage, showSpelling)
        console.log(alphabets)
        return (
            <div>

                <div className="container text-center">
                    <p className="upperText">Random Letters <input onChange={this.randomizeWords} type="checkbox" />   Sound <input type="checkbox" checked={this.state.sound} onChange={this.toggleSound} /></p> 

                    <div className="top_fill_container mx-auto">
                        <h1 className="alphabet text-white animate__animated animate__bounce animate__repeat-2">{this.state.alphabets[this.state.currentPostion].letter}</h1>

                        <audio autoPlay={this.state.sound} data-key="letter" src={this.state.alphabets[this.state.currentPostion].letterSound}  />
                    </div>

                    <div>
                        <button onClick={this.previousMotion} className="btn"><i className="fa fa-fast-backward"></i> Previous</button> 
                        <button onClick={this.playsound} className="btn btn-info">Repeat <i className="fa fa-repeat"></i> </button>
                        <button onClick={this.nextMotion} className="btn">Next <i className="fa fa-fast-forward"></i> </button>
                    </div>

                    <div className="fill_container mx-auto mt-2">
                        <div className="row p-4">
                            <div className="col-md-6 mt-2 text-white text-center">
                                <p className={classNames('text-white', {hide: showImage})}>Click <b>Next</b> to view image</p>
                                <img className={classNames('animate__animated animate__fadeInRight', {hide: !showImage})} src={this.state.alphabets[this.state.currentPostion].image} width="100px" alt="word_capture" />

                            </div>


                            <div className="col-md-6 mt-2 text-white text-center">
                                <p className={classNames('text-white', {hide: showSpelling})}>Click <b>Next</b> to show spellings</p>
                                <h1 className={classNames('text-white animate__animated animate__fadeInLeft', {hide: !showSpelling})} id="word">{this.state.alphabets[this.state.currentPostion].word.toUpperCase()}</h1>

                                <p className={classNames('text-white animate__animated animate__fadeInUp', {hide: !showSpelling})} >{this.state.alphabets[this.state.currentPostion].sentence}</p>
                            </div>
                            
                            <audio className={classNames('"mx-auto mt-2', {hide: !showSpelling})} controls src={this.state.alphabets[this.state.currentPostion].wordSound}></audio>

                        </div>
                    </div>
                </div>

                <footer className="footer text-center mt-5"><a rel="noreferrer" className="anchor-link" target="_blank" href="https://bit.ly/fb_atutechs">Developed by Atutechs Corp<br /> Using React</a></footer>



            </div>
        )
    }
}

export default Main
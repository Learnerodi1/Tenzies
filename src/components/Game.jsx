import React,{Component, useState, useRef} from "react";
import { Cube } from "./cube";
import { useEffect } from "react";
import audio1 from "../assets/audio/vic.mp3"
// import { useWindowSize } from '../../node_modules/r'
import Confetti from "react-confetti"


const Game = () =>{
    // let {width, height} = useWindowSize()
    // Beginning
    const update = ()=>{
        return [1,2,3,4,5, 6, 7, 8, 9, 10].map((data)=>{
            return(
                {
                    key : data,
                    number : Math.floor(Math.random()*6 + 1),
                    id : crypto.randomUUID(),
                    IsClassActive : false
                }
            )
        })
    }
    // Items
    let date = new Date()
    const newDate = date.getFullYear()
    // const [gameWon, updateGame] = React.useState(false)
    const [Data, setData] = useState(()=> update())
    // UseRef ......very Important part of react ----It is used to access DOMNode
    let buttonRef = useRef(null)

    const Activate = (id) =>{
        setData(prevData => {
            return (
                prevData.map((data)=>{
                    return id === data.id ? {...data , IsClassActive : !data.IsClassActive} : data
                })
            )
        })
    }
    const RollingDice = ()=>{
        setData( prevData => {
            return(
                prevData.map(data=>{
                    return !data.IsClassActive ? {...data, number : Math.floor(Math.random() * 6 + 1)} : data
                })
            )
        })
    }
    const gameWon = Data.every(data=> data.IsClassActive) && Data.every(data => data.number === Data[0].number)
    const ResetGame=  ()=>{
        setData(() => update())
    }
    useEffect(()=>{
        if(gameWon){
            buttonRef.current.focus()
            let audio = new Audio()
            audio.src = audio1
            audio.currentTime = 0 
            audio.play()
        }
    },[gameWon])
    return (
        <>
        {gameWon &&  <Confetti gravity={0.5}/>}
        <div className="Tenzies">   
            {/* Header */}
            <header>
                <h1>Tenzies</h1>
                <p>Rol the until all the dice the same. Click each dice to freeze at its current value</p>
            </header>
            {/* Main */}
            <main>
                {/* Group of dice */}
                <section className="groupOfDice">
                        {
                            Data.map((data)=>{
                                return(
                                    <Cube id = {data.id} IsClassActive = {data.IsClassActive} number = {data.number} key={data.key} Activate = {Activate}/>
                                )
                            })
                        }
                </section>
                {/* Controls */}
                <section className="controls">
                    <button ref={buttonRef} className="btn" onClick={() => gameWon ? ResetGame() : RollingDice()}>
                        {gameWon ? "New Game" : "Roll Dice"}
                    </button>
                </section>
            </main>
            <footer>Built by Learner @{newDate}</footer>
        </div>
        </>
    )
}
export {Game}
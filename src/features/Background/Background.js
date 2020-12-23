import React from 'react'
import starburst from "../../starburst.png"
import "./Background.css"

const Background = () => {
    

    const renderBackground = () => {

        function getRandomNumber(min, max) {
    
            return Math.random() * (max - min) + min;
              
        }

        let i = 0
        const starbursts = []
        while (i < 50){
            starbursts.push(
                <img 
                className="Background-item"
                src={starburst} 
                alt='background-starbursts'
                style={{
                    position:"absolute",
                    top:`${getRandomNumber(0, window.innerHeight)}px`,
                    left:`${getRandomNumber(0, window.innerWidth)}px`,
                    width: "25px"
                }}
                />
            )
            i++
        }
        return starbursts
    }

    return (
        <div className="Background" >
        {renderBackground()}
        </div>
    )
}

export default Background
import React from 'react'
import Confetti from 'react-dom-confetti'
import { useSelector } from 'react-redux'
import { selectNominees } from '../NomineeList/nomineeListSlice'
import "./ConfettiContainer.css"

const ConfettiContainer = () => {
    const nominees = useSelector(selectNominees)
    const config = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 150,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: "10px",
        height: "10px",
        perspective: "1000px",
        colors: ["#1d3557", "#457b9d", "#a8dadc", "#e63946", "#f1faee"]
      };
      
    return (
        <div className="ConfettiContainer">
            <div 
            className="ConfettiContainer_wrapper" 
            style={{left: `${window.innerWidth/2}px` }}
            >
                <Confetti 
                className="ConfettiContainer_confetti" 
                active={ nominees.length === 5 } 
                config={ config }
                />
            </div>
        </div>
    )
}

export default ConfettiContainer
import React from 'react'
import { useSelector } from 'react-redux'
import { selectNominees } from '../NomineeList/nomineeListSlice'

const Banner = () => {
    const nominees = useSelector(selectNominees)
    
    return (
        nominees.length !== 5 
        ? <div className='emptyBanner'></div> 
        : <div className='successBanner'>Success</div>
    )
}

export default Banner
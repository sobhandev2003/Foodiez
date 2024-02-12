import React from 'react'
import error_500_cb8336 from '../photo/error-500_cb8336.png'
import { useNavigate } from 'react-router-dom'
import '../css/Error.css'
export default function Error({navigateTo , navigatePath}) {
    const navigate=useNavigate()
    return (
        <div className='error-div'> <img src={error_500_cb8336} alt="Error" />
            <h3>Oops! Something went wrong. Please try again later</h3>
            <button onClick={()=>navigate(navigatePath)}>{navigateTo}</button>
            </div>
    )
}

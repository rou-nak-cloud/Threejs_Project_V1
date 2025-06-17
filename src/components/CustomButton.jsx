import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio'

const CustomButton = ({ title, type, handleClick, customStyles }) => {
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        if (type === 'filled'){
            return {
                backgroundColor: snap.color,
                color: '#fff',
            }
        }
    }
  return (
    <button className={`px-2 py-1.6 rounded flex-1 cursor-pointer ${customStyles}`}
    style={generateStyle(type)}
    onClick={handleClick}  // it will go from the home page to the customization page.. DAMM!!!! 
    >
        {title}
    </button>
  )
}

export default CustomButton

import React from 'react'


function Button({label, clickFunction, cssClass}) {
  return (
    <div>
        <button onClick={clickFunction} className={cssClass}>{label}</button>
    </div>
  )
}

export default Button
import React from 'react'
import PropTypes from 'prop-types'

export default function Die(props) {
    const style1 = {backgroundColor: 'white'}
    const style2 = {backgroundColor: '#59E391'}
    return (
        <div
        onClick={props.isHeldFunction} 
        style={props.isHeld? style1 : style2}
        className="die-face">
            <h2
            className="die-num">{props.value}</h2>
        </div>
    )
}
Die.propTypes = {
value: PropTypes.number,
isHeld: PropTypes.bool
}
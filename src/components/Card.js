import React from 'react'
import PropTypes from 'prop-types'
import { fetchUserDetails } from '../utils/api'

function Card({ header, avatar, href }) {

    return (
        <div className='card'>
            <h4 className='header-lg center-text'>
                {header}
            </h4>
            <img
                className='avatar'
                src={avatar}
                alt={`Avatar for ${header}`}
            />
            <h2 className='center-text'>
                <a className='link' href={href}
                    
                />
            </h2>
            <div>
                {href}
            </div>
        </div>
    )
}

export default Card

// Card.propTypes = {
//     user: PropTypes.string.isRequired
// }
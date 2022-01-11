import React from 'react'
import PropTypes from 'prop-types'

function Card({ header, avatar, subheader, href }) {

    return (
        <div className='card'>
            <a className='plain-text' href={href} target='_blank' rel="noreferrer">
                <h4 className='header-lg center-text'>
                    {header}
                </h4>
                {avatar &&
                    <img
                        className='avatar'
                        src={avatar}
                        alt={`Avatar for ${header}`}
                    />
                }
            </a>
            {subheader &&
                <h2 className='center-text'>
                    {subheader}
                </h2>
            }
        </div>
    )
}

export default Card

Card.propTypes = {
    header: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    subheader: PropTypes.string,
    href: PropTypes.string
}
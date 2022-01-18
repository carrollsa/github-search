import React from 'react'
import PropTypes from 'prop-types'

function Card({ header, avatar, subheader, href }) {

    return (
        <div className='card'>
            <a className='plain-text' href={href} target='_blank' rel="noreferrer">
                <h4 className='header-lg center-text'>
                    {header}
                </h4>
            </a>
            {subheader &&
                <div className='header-md'>
                    {subheader}
                </div>
            }
            <a href={href} target='_blank' rel="noreferrer">
                {avatar &&
                    <img
                        className='avatar'
                        src={avatar}
                        alt={`Avatar for ${header}`}
                    />
                }
            </a>

        </div>
    )
}

export default Card

Card.propTypes = {
    header: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    subheader: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    href: PropTypes.string
}
import React from 'react'
import PropTypes from 'prop-types'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

function Pagination({ postsPerPage = 10, totalPosts, onPageChange }) {
    const totalPageCount = Math.ceil(totalPosts / postsPerPage)
    const pageNumbers = []
    for (let i = 1; i <= totalPageCount; i++ ) {
        pageNumbers.push(i)
    }

    return (
        <nav className='flex-center'>
            <ul className='pagination row'>
                <li key='left'>
                    <FaArrowAltCircleLeft 
                        onClick={() => onPageChange('left')} 
                        color='#8859B6' 
                        size={40} 
                        cursor='pointer' 
                    />
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className='pagination-item'>
                        <a onClick={() => onPageChange(number)} href='!#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
                <li key='right'>
                    <FaArrowAltCircleRight 
                        onClick={() => onPageChange('right')} 
                        color='#8859B6' 
                        size={40} 
                        cursor='pointer' 
                    />
                </li>
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    postsPerPage: PropTypes.number,
    totalPosts: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination
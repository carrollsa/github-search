import React from 'react'
import PropTypes from 'prop-types'
import usePagination from '../hooks/usePagination'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

//  Combination of a FreeCodeCamp tutorial and some concepts from a YouTube tutorial from TraversyMedia, as well as a few written sources
function Pagination({ postsPerPage = 10, totalPosts, onPageChange, siblingCount = 1, currentPage, className }) {
    const paginationRange = usePagination({
        currentPage: currentPage,
        totalCount: totalPosts,
        siblingCount: siblingCount,
        itemsPerPage: postsPerPage
    })

    const totalPageCount = Math.ceil(totalPosts / postsPerPage)

    // Do not render component if there are less than 2 items in pagination range
    if (totalPageCount < 2) {
        return null
    }

    return (
        <nav className='flex-center'>
            <ul className={`pagination row ${className}`}>
                <li key='left' className={`${currentPage === 1 ? 'disabled' : ''}`}>
                    <FaArrowAltCircleLeft
                        onClick={() => onPageChange('left')}
                        color='#674172'
                        size={40}
                    />
                </li>
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === '...') {
                        return (
                            <li key={index} className='pagination-item dots'>
                                &#8230;
                            </li>
                        )
                    }
                    return (
                        <li
                            key={index}
                            className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''}`}
                            onClick={() => onPageChange(pageNumber)}>
                            {pageNumber}
                        </li>
                    )
                })}
                <li key='right' className={`${currentPage === totalPageCount ? 'disabled' : ''}`}>
                    <FaArrowAltCircleRight
                        onClick={() => onPageChange('right')}
                        color='#674172'
                        size={40}
                    />
                </li>
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    postsPerPage: PropTypes.number,
    totalPosts: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    siblingCount: PropTypes.number,
    currentPage: PropTypes.number.isRequired,
    className: PropTypes.string
}

export default React.memo(Pagination)
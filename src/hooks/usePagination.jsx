import React from 'react'


//  Heavily borrowed from a FreeCodeCamp tutorial 
export default function usePagination ({ totalCount, itemsPerPage, siblingCount = 1, currentPage }) {
    function range(start, end) {
        let output = []
        for (let i = start; i <= end; i++) {
            output.push(i)
        }
        return output
    }
    
    const paginationRange = React.useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / itemsPerPage)
        const totalPageNumbers = siblingCount + 5

        // Show all pages
        if(totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

        const showLeftDots = leftSiblingIndex > 2
        const showRightDots = rightSiblingIndex < totalPageCount - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        // Show only right dots
        if (!showLeftDots && showRightDots) {
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = range(1, leftItemCount)

            return [...leftRange, '...', totalPageCount]
        }

        // Show only left dots
        if (showLeftDots && !showRightDots) {
            let rightItemCount = 3 + 2 * siblingCount
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

            return [firstPageIndex, '...', ...rightRange]
        }

        // Show both left and right dots
        if (showLeftDots && showRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
        }
    }, [totalCount, itemsPerPage, siblingCount, currentPage])

    return paginationRange
}
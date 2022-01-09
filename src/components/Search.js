import React from 'react'
import Posts from './Posts'
import Pagination from './Pagination'
import { fetchMultipleUsersGQL } from '../utils/api'

function Search() {
    const [username, setUsername] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const [postsPerPage, setPostsPerPage] = React.useState(12)
    
    const [state, dispatch] = React.useReducer(
        searchReducer,
        {
            results: null,
            loading: false,
            error: null
        }
    )

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = state.results ? state.results.slice(indexOfFirstPost, indexOfLastPost) : null

    // Change page
    const onPageChange = (pageNumber) => {
        if (pageNumber === 'left') {
            if (currentPage !== 1) {
                setCurrentPage((currentPage) => currentPage -= 1)
            }
        } else if (pageNumber === 'right') {
            if (currentPage !== Math.ceil(state.returnCount/postsPerPage)) {
                setCurrentPage((currentPage) => currentPage += 1)
            }  
        } else {
            setCurrentPage(pageNumber)
        }
    }

    // Handle change in input value
    const handleInputChange = (event) => setUsername(event.target.value)

    const handleSearchClick = (e) => {
        e.preventDefault()

        fetchMultipleUsersGQL(username)
            .then((data) => dispatch({ type: 'success', data }))
            .catch((error) => dispatch({ type: 'error', error }))
    }

    function searchReducer(state, action) {
        switch (action.type) {
            case 'fetch':
                return {
                    ...state,
                    loading: true
                }
            case 'success':
                return {
                    results: action.data.data.search.edges,
                    returnCount: action.data.data.search.userCount,
                    loading: false,
                    error: null
                }
            case 'error':
                return {
                    ...state,
                    error: 'Fetch failed.',
                    loading: false
                }
        }
    }

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && username.length !== 0) {
            handleSearchClick(e)
        }
    }

    return (
        <React.Fragment>
            <div className="App">
                <input
                    type='text'
                    id='username'
                    className='input'
                    placeholder='Search GitHub'
                    autoComplete='off'
                    value={username}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                />
                <button
                    className='btn'
                    type='button'
                    disabled={!username}
                    onClick={handleSearchClick}
                >
                    Search
                </button>
            </div>
            {state.error &&
                <div className='error'>
                    {state.error}
                </div>
            }
            {state.returnCount &&
                <div>
                    {state.returnCount} users found!
                </div>
            }
            {state.results &&
                <div>
                    <Posts posts={currentPosts} />
                    <Pagination 
                        postsPerPage={postsPerPage} 
                        totalPosts={state.returnCount} 
                        onPageChange={onPageChange} />
                </div>
            }
        </React.Fragment>
    );
}

export default Search;
import React from 'react'
import Posts from './Posts'
import Pagination from './Pagination'
import Loading from './Loading'
import { fetchMultipleUsersGQL } from '../utils/api'
import { GoMarkGithub } from 'react-icons/go'

function Search() {
    const [username, setUsername] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const [postsPerPage, setPostsPerPage] = React.useState(10)

    const [state, dispatch] = React.useReducer(
        searchReducer,
        {
            results: null,
            loading: false,
            error: null
        }
    )

    // Get currently rendered posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = state.results ? state.results.slice(indexOfFirstPost, indexOfLastPost) : null

    // Change page in paginated search results
    const onPageChange = (pageNumber) => {
        if (pageNumber === 'left') {
            if (currentPage !== 1) {
                setCurrentPage((currentPage) => currentPage -= 1)
            }
        } else if (pageNumber === 'right') {
            if (currentPage !== Math.ceil(state.returnCount / postsPerPage)) {
                setCurrentPage((currentPage) => currentPage += 1)
            }
        } else {
            setCurrentPage(pageNumber)
        }
    }

    const handleInputChange = (event) => setUsername(event.target.value)

    const handleSearchClick = (e) => {
        e.preventDefault()

        dispatch({ type: 'fetch' })

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
                    error: action.errors.message,
                    loading: false
                }
            default:
                throw new Error(`Action ${action.type} is not supported.`)
        }
    }

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && username.length !== 0) {
            handleSearchClick(e)
        }
    }

    const PaginationComponent =
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={state.returnCount > 100 ? 100 : state.returnCount}
            onPageChange={onPageChange}
            currentPage={currentPage}
        />

    return (
        <React.Fragment>
            <div className='app'>
                <div className='row search'>
                    <GoMarkGithub size={50} color='FFFFFF' />
                    <span>
                        Search for users via the <a href='https://docs.github.com/en/graphql' target='_blank'>Github API</a>
                    </span>
                    <input
                        type='text'
                        id='username'
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
                {state.loading
                    ? <div>
                        <Loading />
                    </div>
                    : state.returnCount &&
                    <React.Fragment>
                        <div className='center-text header-lg'>
                            {state.returnCount} users found! {state.returnCount > 100 && 'Displaying first 100 results.'}
                        </div>
                        <div>
                            {PaginationComponent}
                            <Posts posts={currentPosts} />
                            {PaginationComponent}
                        </div>
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    );
}

export default Search;
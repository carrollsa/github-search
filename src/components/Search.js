import React from 'react'
import PropTypes from 'prop-types'
import Posts from './Posts'
import { fetchMultipleUsersGQL } from '../utils/api'

function Search() {
    const [username, setUsername] = React.useState('')

    const [state, dispatch] = React.useReducer(
        searchReducer,
        {
            users: null,
            loading: false,
            error: null
        }
    )

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
                    users: action.data.data.search.edges,
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
            {state.users &&
                <Posts posts={state.users} />
            }
        </React.Fragment>
    );
}

export default Search;
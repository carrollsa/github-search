import React from 'react'
import PropTypes from 'prop-types'
import { fetchMultipleUsersGQL } from '../utils/api'
import Card from './Card'

function DisplayUsers({ users }) {
    console.log(users)
    return (
        <ul className='grid space-around'>
            {users.map((user) => {
                if (user.node.login) {
                    // Is this a little wonky? Do you think there's a way to do this more cleanly?
                    const { login, avatarUrl, url, name, location, bio, twitterUsername } = user.node
                    const followers = user.node.followers.totalCount
                    const following = user.node.following.totalCount
                    const starredRepos = user.node.starredRepositories.totalCount

                    return (
                        <li key={user.id}>
                            <Card
                                header={login}
                                avatar={avatarUrl}
                                href={url}
                            />
                            <ul className='card-list'>
                                <li>
                                    <a href={url}>
                                        {login}
                                    </a>
                                </li> 
                                {location &&
                                    <li>
                                        {location}
                                    </li>
                                }
                                {bio && 
                                    <li>
                                        {bio}
                                    </li>
                                }
                                <li>
                                    {followers}{following}
                                </li>
                                {twitterUsername &&
                                    <li>
                                        {twitterUsername}
                                    </li>
                                }
                            </ul>
                        </li>
                    )
                }
            })}
        </ul>
    )
}

DisplayUsers.propTypes = {
    users: PropTypes.array.isRequired
}

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

    const handleChange = (event) => setUsername(event.target.value)

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
                    onChange={handleChange}
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

            {state.users &&
                <DisplayUsers users={state.users} />
            }

            {state.error &&
                <div className='error'>
                    {state.error}
                </div>
            }
        </React.Fragment>
    );
}

export default Search;
import React from 'react'
import PropTypes from 'prop-types'
import { fetchMultipleUsersGQL } from '../utils/api'
import Card from './Card'
import { FaUser, FaCompass, FaBriefcase, FaBook, FaUserFriends, FaUserPlus, FaTwitter } from 'react-icons/fa'

function DisplayUsers({ users }) {
    console.log(users)
    return (
        <ul className='grid space-around'>
            {users.map((user) => {
                if (user.node.login) {
                    // Is this a little wonky? Do you think there's a way to do this more cleanly?
                    const { login, avatarUrl, url, name, company, location, bio, twitterUsername } = user.node
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
                                {name &&
                                    <li>
                                        <FaUser color='rgb(239, 115, 115)' size={22} />
                                        {name}
                                    </li>
                                }
                                {company &&
                                    <li>
                                        <FaBriefcase color='#795548' size={22} />
                                        {company}
                                    </li>
                                }
                                {location &&
                                    <li>
                                        <FaCompass color='rgb(144, 115, 255)' size={22} />
                                        {location}
                                    </li>
                                }
                                {bio &&
                                    <li>
                                        <FaBook color='rgb(172, 209, 175)' size={22} />
                                        {bio}
                                    </li>
                                }
                                <li>
                                    <FaUserFriends color='#E0D1A6' size={22}/>{followers}
                                    <FaUserPlus color='#7AD7F0' size={22}/>{following}
                                </li>
                                {twitterUsername &&
                                    <li>
                                        <FaTwitter color='rgb(0, 191, 255)' size={22} />
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

    const handleKeyDown = (e) => {
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
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
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
                <DisplayUsers users={state.users} />
            }
        </React.Fragment>
    );
}

export default Search;
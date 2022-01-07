import React from 'react'
import PropTypes from 'prop-types'
import { fetchUserProfile } from '../utils/api'

// function searchReducer (state, action) {
//     switch (action.type) {
//         case 'fetch':
//             return {
//                 ...state,
//                 loading: true
//             }
//         case 'success':
//             return {
//                 users: action.data,
//                 loading: false,
//                 error: null
//             }
//         case 'error':
//             return {
//                 ...state,
//                 error: 'Fetch failed.',
//                 loading: false
//             }
//     }
// }

function Search() {
    const [username, setUsername] = React.useState('')
    const [userDetails, setUserDetails] = React.useState(null)
    
    // const [state, dispatch] = React.useReducer(
    //     searchReducer,
    //     { 
    //         users: [],
    //         loading: true,
    //         error: null
    //     }
    // )

    const handleChange = (event) => setUsername(event.target.value)

    const makeFetch = (e) => {
        e.preventDefault()
        
        fetchUserProfile(username)
            .then((data) => setUserDetails(data))
            .catch((e) => console.log('fetch failed'))
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
                    onClick={makeFetch}
                >
                    Search
                </button>
            </div>

            {userDetails &&
                <div>
                    {console.log(userDetails)}
                </div>
            }
        </React.Fragment>
    );
}

export default Search;
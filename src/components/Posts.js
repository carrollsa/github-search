import React from 'react'
import Card from './Card'
import PropTypes from 'prop-types'
import Tooltip from './Tooltip'
import { FaUser, FaCompass, FaBriefcase, FaBook, FaUserFriends, FaUserPlus, FaTwitter, FaStar } from 'react-icons/fa'

function Posts({ posts }) {
    return (
        <ul className='grid space-around'>
            {posts.map((post) => {
                if (post.node.login) {
                    const { login, avatarUrl, url, name, company, location, bio, twitterUsername } = post.node
                    const followers = post.node.followers.totalCount
                    const following = post.node.following.totalCount
                    const starredRepos = post.node.starredRepositories.totalCount

                    return (
                        <li key={post.id}>
                            <Card
                                header={login}
                                avatar={avatarUrl}
                                href={url}
                            />
                            <div className='post-details'>
                                <ul className='post-list'>
                                    <div className='row followers'>
                                        <Tooltip text="Number of followers">
                                            <li key='followers'>
                                                <FaUserFriends color='#E0D1A6' size={22} />{followers}
                                            </li>
                                        </Tooltip>
                                        <Tooltip text="Number followed">
                                            <li key='following'>
                                                <FaUserPlus color='#7AD7F0' size={22} />{following}
                                            </li>
                                        </Tooltip>
                                    </div>
                                    {name &&
                                        <li key={name}>
                                            <FaUser color='rgb(239, 115, 115)' size={22} />
                                            {name}
                                        </li>
                                    }
                                    {company &&
                                        <Tooltip text="Workplace">
                                            <li key={company}>
                                                <FaBriefcase color='#795548' size={22} />
                                                {company}
                                            </li>
                                        </Tooltip>
                                    }
                                    {location &&
                                        <Tooltip text='Location'>
                                            <li key={location}>
                                                <FaCompass color='rgb(144, 115, 255)' size={22} />
                                                {location}
                                            </li>
                                        </Tooltip>
                                    }
                                    {bio &&
                                        <Tooltip text='Bio' >
                                            <li key={bio}>
                                                <FaBook className='bio-icon' color='172, 209, 175' size={22} />
                                                {bio.length > 75 ? bio.slice(0, 75) + '...' : bio}
                                            </li>
                                        </Tooltip>
                                    }
                                    {twitterUsername &&
                                        <Tooltip text='Twitter username'>
                                            <li key={twitterUsername}>
                                                <FaTwitter color='rgb(0, 191, 255)' size={22} />
                                                {twitterUsername}
                                            </li>
                                        </Tooltip>
                                    }
                                    <Tooltip text='Starred repos'>
                                        <li key='starred-repos'>
                                            <FaStar color='#AA8F00' size={22} />
                                            {starredRepos}
                                        </li>
                                    </Tooltip>
                                </ul>
                            </div>
                        </li>
                    )
                }
            })}
        </ul >
    )
}

Posts.propTypes = {
    users: PropTypes.array
}

export default Posts
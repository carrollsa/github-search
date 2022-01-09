import React from 'react'
import Card from './Card'
import PropTypes from 'prop-types'
import { FaUser, FaCompass, FaBriefcase, FaBook, FaUserFriends, FaUserPlus, FaTwitter, FaStar } from 'react-icons/fa'

function Posts ({ posts }) {
    console.log(posts)
    return (
        <ul className='grid space-around'>
            {posts.map((post) => {
                if (post.node.login) {
                    // Is this a little wonky? Do you think there's a way to do this more cleanly?
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
                                <li>
                                    <FaStar color='#AA8F00' size={22} />
                                    {starredRepos}
                                </li>
                            </ul>
                        </li>
                    )
                }
            })}
        </ul>
    )
}

Posts.propTypes = {
    users: PropTypes.array.isRequired
}

export default Posts
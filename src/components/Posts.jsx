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

                    const subheader =
                        <div className='row followers m-2 space-around'>
                            <Tooltip text="Number of followers">
                                <FaUserFriends className='mr-1' color='#008000' size={30} /><span>{followers}</span>
                            </Tooltip>
                            <Tooltip text="Number followed">
                                <FaUserPlus className='mr-1' color='#AA5D00' size={30} /><span>{following}</span>
                            </Tooltip>
                        </div>

                    return (
                        <li key={login}>
                            <Card
                                header={login}
                                subheader={subheader}
                                avatar={avatarUrl}
                                href={url}
                            />
                            <div className='post-details space-top'>
                                <ul className='post-list'>
                                    {name &&
                                        <li key={`${login}-${name}`}>
                                            <FaUser color='#DC143C' size={22} />
                                            {name}
                                        </li>
                                    }
                                    {company &&
                                        <Tooltip text="Workplace">
                                            <li key={`${login}-${company}`}>
                                                <FaBriefcase color='#914F15' size={22} />
                                                {company}
                                            </li>
                                        </Tooltip>
                                    }
                                    {location &&
                                        <Tooltip text='Location'>
                                            <li key={`${login}-${location}`}>
                                                <FaCompass color='#886288' size={22} />
                                                {location}
                                            </li>
                                        </Tooltip>
                                    }
                                    {bio &&
                                        <Tooltip text='Bio' >
                                            <li key={`${login}-${bio}`}>
                                                <FaBook className='bio-icon' color='172, 209, 175' size={22} />
                                                {bio.length > 75 ? bio.slice(0, 75) + '...' : bio}
                                            </li>
                                        </Tooltip>
                                    }
                                    {twitterUsername &&
                                        <Tooltip text='Twitter username'>
                                            <li key={`${login}-${twitterUsername}`}>
                                                <FaTwitter color='rgb(0, 191, 255)' size={22} />
                                                {twitterUsername}
                                            </li>
                                        </Tooltip>
                                    }
                                    <Tooltip text='Starred repos'>
                                        <li key={`${login}-starred-repos`}>
                                            <FaStar color='#AA8F00' size={22} />
                                            {starredRepos}
                                        </li>
                                    </Tooltip>
                                </ul>
                            </div>
                        </li>
                    )
                }
                //  Only reached for odd return from Github API that contains an empty node
                return null
            })}
        </ul >
    )
}

Posts.propTypes = {
    users: PropTypes.array
}

export default Posts
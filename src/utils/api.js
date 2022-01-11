const GQL_API_KEY = process.env.GQL_API_KEY

/*  Currently only pulls first 100 results, but I included page info to allow for cycling through paginated
    results in the future by modifying query to accept "after: [endcursor]" as a param to search */
export function fetchMultipleUsersGQL(username) {   
    const query = `
        query fetchUsers($name: String!) {
            search(query: $name, type: USER, first:100) {
                userCount
                pageInfo {
                    startCursor,
                    endCursor,
                    hasNextPage
                }
                            edges {
                    node {
                        ...on User {
                            login
                            name
                            company
                            avatarUrl
                            url
                            location
                            bio
                            starredRepositories {
                                totalCount
                            }
                            followers {
                                totalCount
                            }
                            following {
                                totalCount
                            }
                            twitterUsername
                        }
                    }
                    textMatches {
                        fragment
                        property
                        highlights {
                            text
                        }
                    }
                }
            }
        }`
    return (
        queryFetch(query, {name: username})
    )
}

function queryFetch(query, variables) {
    console.log(GQL_API_KEY)
    return fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${GQL_API_KEY}`
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    }).then((res) => res.json())
}
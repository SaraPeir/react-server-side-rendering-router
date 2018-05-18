import fetch from 'isomorphic-fetch'

export function fetchPopularRepos (language = 'all') {
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.warn(error)
      return null
    });
}

// if language is all, the request will be sent to: https://api.github.com/search/repositories?q=stars:>1+language:all&sort=stars&order=desc&type=Repositories

// If language is javascript, the request will be sent to:
//https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories

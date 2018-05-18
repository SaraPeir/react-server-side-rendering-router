import Home from './Home'
import Grid from './Grid'
import { fetchPopularRepos } from './api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes

//we add a fetchInitialData method, we pass it the current path, asi que le pasamos the specific information (in our case it is a language) which will be passes to fetchPopularRepos

//el array router contains all what we have to know about the spicific route

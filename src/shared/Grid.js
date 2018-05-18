import React, { Component } from 'react'

class Grid extends Component {
  constructor(props) {
    super(props)

    let repos
    if (__isBrowser__) { // si se renderiza en el browser:
      repos = window.__INITIAL_DATA__  //repose is coming from window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__  //se borra lo de antes??
    } else {
      repos = this.props.staticContext.data //repos is coming from props.staticContext.data
    }

    this.state = {
      repos,
      loading: repos ? false : true,
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }
  componentDidMount () {
    if (!this.state.repos) {  // if we dont't already have the this.state.repor, we didn't get any repos from the window.__INITIAL_DATA__, so we are not rendering in the server
      this.fetchRepos(this.props.match.params.id)  //we will call the fetchRepos and we will pass it the URL parameter
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
//SI no ponemos componentDidUpdate, el componente una vez cambiado la primera vez, no va mas a actualizarse, pues si vamos a elegir una otra ruta, esra no cambiará mas

  fetchRepos (lang) {  //lang is the language parameter
    this.setState(() => ({
      loading: true
    }))
    this.props.fetchInitialData(lang)
      .then((repos) => this.setState(() => ({
        repos,
        loading: false,
      })))
  }

// When our component mounts, If we don't have already the repos we will never invoke the promise (server/index.html). So we have to invoke in componentDidMount. So, we will get information and we will cause a re-render

  render() {
    const { loading, repos } = this.state

    if (loading === true) {
      return <p>LOADING</p>
    }

    return (
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        {repos.map(({ name, owner, stargazers_count, html_url }) => (
          <li key={name} style={{margin: 30}}>
            <ul>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}

export default Grid

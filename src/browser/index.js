import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'
import { BrowserRouter } from 'react-router-dom'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);


//BrowserRouter is only for the Browser. For the Server, we need the StaticRouter

//CLient and server must be aware of the routes. For this reason we will use the BrowserRouter for the browser and StaticRouter for the server

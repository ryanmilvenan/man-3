import React from 'react';
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';
import configureStore from './configureStore.dev.js'
import Root from './Root.dev.js';

export default function handleRender(req, res) {
  const store = configureStore()
  const preloadedState = store.getState()

  const html = renderToString(
    <Root store={store} />
  )
  res.send(renderFullPage(html, preloadedState))
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Carnival In Paradise</title>
      </head>
      <body>
				<script src="/socket.io/socket.io.js"></script>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
    `
}



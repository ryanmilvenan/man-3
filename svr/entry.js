import React from 'react';
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore.js'
import Root from '../common/components/Root.js';

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
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
    `
}



import React from 'react';
import { renderToString } from 'react-dom/server'
import { Provider, createStore } from 'react-redux';
import Root from '../common/containers/Root.js';

export function handleRender(req, res) {
  const store = createStore({})

  const html = renderToString(
    <Provider store={store}>
      <Root />
    </Provider>
  )

  const preloadedState = store.getState()

  res.send(renderFullPage(html, preloadedState))
}

export function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
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



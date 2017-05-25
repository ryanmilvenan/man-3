import React from 'react';
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';
import db from './lib/db/index.js';
import NewsStand from './lib/db/schema/NewsStandSchema.js';
import configureStore from '../common/store/configureStore.js'
import Root from '../common/components/Root.js';

export default function handleRender(req, res) {

  if (!db.connection.readyState) {
    db.mongoose.connect('mongodb://localhost/mangrove');
  }

  NewsStand.fetchNewsContainers().then((newsContainers) => {
    let state = {
      newsContainers
    };

    const store = configureStore(state)
    const preloadedState = store.getState();

    const html = renderToString( <
      Root store = { store }
      />
    )

    res.send(renderFullPage(html, preloadedState))

  });

}



const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Carnival In Paradise</title>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0">
        <meta name="theme-color" content="#db5945">
        <link rel="stylesheet" type="text/css" href="/stylesheets/sass-bundle.css"/>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/vendor.bundle.js"></script>
        <script src="/client.bundle.js"></script>
        <script>
          if('serviceWorker' in navigator) {
            navigator.serviceWorker
              .register('/sw.js')
              .then(function() { console.log("Service Worker Registered"); });
          }
        </script>
      </body>
    </html>
    `
}
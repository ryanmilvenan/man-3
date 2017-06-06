import React from 'react';
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import db from './lib/db/index.js';
import NewsStand from './lib/db/schema/NewsStandSchema.js';
import configureStore from '../common/store/configureStore.js'
import Root from '../common/components/Root.js';

export default function handleRender(req, res) {
  const secret = new Buffer('0Jf2Q60m7BvhJ6Zd8Bf55GanUZ1cqwi4ZcvPbYgOSxlp93kGXh0K8amu88gdrjze', 'base64')

  if (!db.connection.readyState) {
    db.mongoose.connect('mongodb://localhost/mangrove');
  }

  const idToken = req.cookies && req.cookies.id_token;
  const profile = req.cookies && req.cookies.profile;

  let data, verifyError;
  if(idToken) {
    try{
      const decoded = jwt.verify(idToken, secret);
      data = {user: decoded.email};
    } catch(e) {
      console.log("JWT ERROR")
      data = {}
      verifyError = e;
    }
  } else {
    data = {};
  }

  NewsStand.fetchNewsContainers(data).then((newsContainers) => {
    let state = {
      newsContainers
    };

    const store = configureStore(state)
    const preloadedState = store.getState();
    if(idToken && !verifyError) {
      preloadedState.auth.idToken = idToken;
      preloadedState.auth.profile = profile;
    }

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
        <link rel=icon href=carnival.png sizes="16x16" type="image/png">
        <link rel="apple-touch-icon" href="carnival.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0">
        <meta name="theme-color" content="#db5945">
        <link rel="stylesheet" type="text/css" href="/stylesheets/sass-bundle.css"/>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script>
          if('serviceWorker' in navigator) {
            navigator.serviceWorker
              .register('/sw.js')
          }
        </script>
        <script src="/vendor.bundle.js"></script>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
    `
}

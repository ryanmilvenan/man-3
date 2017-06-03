export default class Api {

  static refreshSource(state) {
    return fetch(API + `/refresh/${encodeURIComponent(state.url)}`)
      .then(response => response.json())
      .then((response) => {
        const { feed, err } = response.data;
        if (err) {
          console.error(`Error Refreshing Sources: ${err}`);
        }
        return Object.assign({}, state, { feed, err });
      });
  }

  static persistSource(state, idToken) {
    return fetch(API + `/persist`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}` 
      },
      body: JSON.stringify({ state })
    });
  }

  static fetchStateFromCache(idToken) {
    caches.match('/state').then((response) => {
      if(!response) throw Error("No data");
      return response.json();
    }).then((state) => {
      return state;
    }).catch(() => null);
  }

  static fetchState(idToken) {
    return fetch(API + `/state`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}` 
      }
    })
    .then(response => response.json())
    .then((response) => {
      const { state, err } = response.data;
      if (err) {
        console.error(`Error Fetching Sources: ${err}`);
      }
      console.log("REMOTE FETCH", state)
      return state;
    });
  }

  static fetchStateNoAuth() {
    return fetch(API + `/default-state`)
    .then(response => response.json())
    .then((response) => {
      const { state, err } = response.data;
      if (err) {
        console.error(`Error Fetching Sources: ${err}`);
      }
      return state;
    });
  }

  static deleteSource(id, idToken) {
    return fetch(API + `/delete`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}` 
      },
      body: JSON.stringify({ id })
    });
  }

  static rearrangeSources(id, direction, idToken) {
    return fetch(API + `/rearrange`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}` 
      },
      body: JSON.stringify({ id, direction })
    });
  }

}
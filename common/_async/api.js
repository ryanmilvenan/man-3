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

  static persistSource(state) {
    return fetch(API + `/persist`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ state })
    });
  }

  static fetchState() {
    return fetch(API + `/state`)
      .then(response => response.json())
      .then((response) => {
        const { state, err } = response.data;
        if (err) {
          console.error(`Error Fetching Sources: ${err}`);
        }
        return state;
      });
  }

  static deleteSource(id) {
    return fetch(API + `/delete`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
  }

  static rearrangeSources(id, direction) {
    return fetch(API + `/rearrange`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, direction })
    });
  }

}
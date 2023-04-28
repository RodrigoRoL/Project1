let artist = JSON.parse(localStorage.getItem("userInput"));
let nameEl = document.querySelector("#artist");
let followersEl = document.querySelector("#followers");
let genreEl = document.querySelector("#genre");

//Spotify Auth
const clientId = '083ca6c5e35e4936a1e52a1611cf4516';
const clientSecret = 'e97063521a0348f085cf54408a747090';
const base64ClientIdSecret = btoa(`${clientId}:${clientSecret}`);
const tokenUrl = 'https://accounts.spotify.com/api/token';


function getToken() { //retorna un fetch ejecutado 
  return fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${base64ClientIdSecret}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      return data.access_token;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function artistSearch(accessToken) {
  const apiUrl = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;

  fetch(apiUrl, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      console.log("data artist", data)
      const name = data.artists.items[0].name;
      const followers = data.artists.items[0].followers.total;
      const genres = data.artists.items[0].genres[0];
      const id = data.artists.items[0].id;

      nameEl.textContent = name;
      followersEl.textContent = followers + " followers";
      genreEl.textContent = genres;

      localStorage.setItem("id", JSON.stringify(id));
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function artistAlbums(accessToken) {
  let artistId = JSON.parse(localStorage.getItem("id"));
  const albumURL = `https://api.spotify.com/v1/artists/${artistId}/albums`;

  fetch(albumURL, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {

      for (var i = 0; i <= 3; i++) {
        const albumName = data.items[i].name;
        const date = data.items[i].release_date;
        const year = dayjs(date).format("YYYY");
        const image = data.items[i].images[2].url;
        const spotify = data.items[i].external_urls.spotify;

        let newEl = document.createElement("article");
        newEl.innerHTML += `<figure class="media-left"><p class="image is-64x64"><img src=${image}></p></figure><div class="media-content"><div class="content"><p><strong>${albumName}</strong><small> ${year}</small><br><a href=${spotify} >Listen now on Spotify</a></p></div></div>`;
        newEl.className = "media";
        document.getElementById("top-albums").append(newEl);
      }

    })
    .catch(error => {
      console.error('Error:', error);
    });

}

function relatedArtists(accessToken) {
  let artistId = JSON.parse(localStorage.getItem("id"));
  const relatedURL = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;

  fetch(relatedURL, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {

      for (var i = 0; i <= 2; i++) {
        const relatedArtist = data.artists[i].name;
        const relatedFollowers = data.artists[i].followers.total;
        const relatedSpotify = data.artists[i].external_urls.spotify;
        const relatedImage = data.artists[i].images[2].url;

        let newEl = document.createElement("article");
        newEl.innerHTML += `<figure class="media-left"><p class="image is-64x64"><img class="is-rounded" src=${relatedImage}></p></figure><div class="media-content"><div class="content"><p><strong>${relatedArtist}</strong><small> ${relatedFollowers} Followers </small><br><a href=${relatedSpotify}>Explore</a></p></div></div>`;
        newEl.className = "media";
        document.getElementById("related-artists").append(newEl);
      }

    })
    .catch(error => {
      console.error('Error:', error);
    });

}

var accessToken = getToken().then(function (token) { // se hace un .then porque fetch nos da una promesa
  artistSearch(token);
  console.log("func",artistSearch(token) )
  artistAlbums(token);
  relatedArtists(token);
})



//Revisar concepto asincronia 
//Se esta controlando el flujo, get token devuelve promesa, .then para acceder - nos aseugramos que entramos a la resolución de esa promesa. Al pasar esa funcion en .then me aseguro que el token lo puedo acceder hasta tener la respuesta, - nos aseguramos de que el token existe. 





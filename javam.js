// Replace with your own client ID and client secret
const clientId = '083ca6c5e35e4936a1e52a1611cf4516';
const clientSecret = 'e97063521a0348f085cf54408a747090';

// Encode client ID and client secret in base64 format as requested by spotify
//Codifica los strings a base 64 (hacer la prueba con un decoder de base 64) Es un filtro más de seguridad
const base64ClientIdSecret = btoa(`${clientId}:${clientSecret}`);

// Define the endpoint URL

const tokenUrl = 'https://accounts.spotify.com/api/token';

// variable to hold the token, token will change as the token only last one hour
let accessToken;

// this will be replace by the user search
let artist = 'reyno';

// Create the fetch request to get the access token
// objeto con método de llamada 
// REVISAR DOCUMENTACIÓN DE COMO DAR LAS CREDENCIALES 
fetch(tokenUrl, {
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
  //then(function(data){}) - Abajo arrow function (REVISAR)
  .then(data => {
    accessToken = data.access_token;
  })
  .catch(error => {
    console.error('Error:', error);
  }); //hasta aqui termina la auth


  function artistSearch() {
    const apiUrl = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;
  
    fetch(apiUrl, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${accessToken}`} //Esto de la documentación de auth
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed');
        }
      })
      .then(data => { //usar esta data para ver
        //Usar data para llevar la info al front
        const {followers}=data
        console.log("artists", followers)
        console.log('API response:', data.artists);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const button = document.getElementById('btn');
  button.addEventListener('click', () => {
    artistSearch();
  });
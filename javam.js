// Replace with your own client ID and client secret
const clientId = 'your client id';
const clientSecret = 'your client secret';

// Encode client ID and client secret in base64 format as requested by spotify
const base64ClientIdSecret = btoa(`${clientId}:${clientSecret}`);

// Define the endpoint URL
const tokenUrl = 'https://accounts.spotify.com/api/token';

// variable to hold the token, token will change as the token only last one hour
let accessToken;

// this will be replace by the user search
let artist = 'floating points';

// Create the fetch request to get the access token
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
  .then(data => {
    accessToken = data.access_token;
  })
  .catch(error => {
    console.error('Error:', error);
  });


  function artistSearch() {
    const apiUrl = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;
  
    fetch(apiUrl, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${accessToken}`}
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed');
        }
      })
      .then(data => {
        // 
        console.log('API response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const button = document.getElementById('btn');
  button.addEventListener('click', () => {
    artistSearch();
  });
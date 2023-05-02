const apiKey = '5fK7ZriTD9B3gmtu7wd0JF2PQy7iY6WQZhw74u3Q9Slb8Dtjln';
let artist = JSON.parse(localStorage.getItem("userInput"));
const limit = 20;
const tumblrUrl = `https://api.tumblr.com/v2/tagged?api_key=${apiKey}&tag=${searchedArtist}&limit=${limit}&filter=photo`;

console.log("Artist: ", (searchedArtist));

function getMedia(){
  fetch(tumblrUrl)
    .then(response => response.json())
    .then(data => {
      // Do something with the retrieved data
      console.log(data);
      const posts = data.response;
      const media = posts.filter(post => post.type === 'photo' || post.type === 'video' || post.type === 'gif');
      const imageMedia = [];
        while  (imageMedia.length < 5 && media.length > 0){
          const index = Math.floor(Math.random() * media.length);
          imageMedia.push(media[index]);
          media.splice(index,1);
        }
      const textMedia = posts.filter(post => post.type === 'text' || post.type === 'quote');
      const texts = [];
        while (texts.length < 2 && textMedia.length > 0){ 
          const indexText = Math.floor(Math.random() * textMedia.length);
          texts.push(textMedia[indexText]);
          textMedia.splice(indexText,1);
        }
        console.log(imageMedia);
        console.log(texts);
        const container = document.querySelector('#media-1');
        const textContainer = document.querySelector('#media-text');
        for (let i = 0; i < imageMedia.length; i++) {
          container.innerHTML += `<img src="${imageMedia[i].photos[0].original_size.url}" alt="random media" class="media-item-${i+1}" >`;
        }
      
        for (let i = 0; i < texts.length; i++) {
          textContainer.innerHTML += `<p> ${texts[i].summary} </p>`;
        }
       })
       };

    getMedia();

/*
   if (imageMedia.includes('.jpg') || imageMedia.includes('.png') || imageMedia.includes('.gif')) {
          container.innerHTML = `<img src="${imageMedia[i]}" alt="random media">`;
         }
        if (textMedia.includes('.txt') || textMedia.includes('.')) {
          container.innerHTML = `<p>${textMedia[i]}</p>`;
        }

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if (post.type === 'photo') {
          imageMedia.push(post.photos[0].original_size.url);
        } else if (post.type === 'video') {
          imageMedia.push(post.thumbnail_url);
        } else if (post.type === 'gif') {
          imageMedia.push(post.original_size.url);
       }}

        // Loop through posts and add photos, gifs, and quotes to media array
        // Select a random media item and display it

        const randomMedia = imageMedia[Math.floor(Math.random() * imageMedia.length)];// length = amount of space in the UI
        const container = document.querySelector('#media-1');
        console.log(randomMedia)
        if (randomMedia.includes('.jpg') || randomMedia.includes('.png') || randomMedia.includes('.gif')) {
          container.innerHTML = `<img src="${randomMedia}" alt="random media">`;
        } else {
          container.innerHTML = `<p>${randomMedia}</p>`;
       }
       
      });
}


getMedia();
console.log("Artist: ", (searchedArtist));

/*    .catch(error => {
      // Handle any errors that occur during the API request
      console.error(error);
    })
      */
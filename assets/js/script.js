const apiKey = '5fK7ZriTD9B3gmtu7wd0JF2PQy7iY6WQZhw74u3Q9Slb8Dtjln';
const limit = 20;
const tumblrUrl = `https://api.tumblr.com/v2/tagged?api_key=${apiKey}&tag=${artist}&limit=${limit}&filter=photo`;

function getMedia(){
  fetch(tumblrUrl)
    .then(response => response.json())
    .then(data => {
      // Do something with the retrieved data
      console.log(data);
      const posts = data.response;
      const media = posts.filter(post => post.type === 'photo' || post.type === 'video' || post.type === 'gif');
      const imageMedia = [];
         // Select only 5 items from the data
        while  (imageMedia.length < 5 && media.length > 0){
          const index = Math.floor(Math.random() * media.length);
          imageMedia.push(media[index]);   // Add elements to the array 
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
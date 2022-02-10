// API Token: 2deddf8527e54e0386eb34b875d5ee21

// const { Client } = require('podcast-api');

document.addEventListener('DOMContentLoaded', recommendPodcasts);

function recommendPodcasts() {
  // Get the title of the Wikipedia page. 
  const pageTitle = document.querySelector('#firstHeading');
  
  // When the user mouses over the page title, display relevant podcasts. <-- NEED TO IMPLEMENT
  pageTitle.addEventListener('mouseover', () => {
    console.log(pageTitle.innerText);
    pageTitle.style.setProperty('background', 'lightgreen');
  });
  // When the user's mouses leaves the page title, remove podcasts display. <-- NEED TO IMPLEMENT
  pageTitle.addEventListener('mouseleave', () => {
    pageTitle.style.removeProperty('background');
  });

  // Search the ListenNotes podcast database for podcasts that match the Wikipedia page title. 
  // Display the first five search results on the page. 
  //create a DOM div to hold podcast episodes 
  let cleanInput = pageTitle.innerText.replaceAll(' ', '%20');
  const optionsObject = {
    headers: {'X-ListenAPI-Key': '2deddf8527e54e0386eb34b875d5ee21'},
    }

  fetch(`https://listen-api.listennotes.com/api/v2/search?q=%22${cleanInput}%22&`, optionsObject) 
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let container = document.createElement('div')
        for(let i = 0; i < 10; i++) {
            if (data.results[i].link) {
                console.log(data.results[i].link);
                container.textContent += data.results[i].link;
            }
            else {
                console.log(data.results[i].listennotes_url);
                container.textContent += data.results[i].listennotes_url;
            }
        }
        // let wikiBody = document.querySelector('body');
        document.body.appendChild(container);
    });
}

// const pageTitle = document.querySelector('#firstHeading').innerText;


// const client = Client({
//     apiKey: '2deddf8527e54e0386eb34b875d5ee21',
//   });
  
//   client.search({
//     q: pageTitle.innerText,
//   }).then((response) => {
      
//     //iterating through the first five results objects 
//     //create a DOM div to hold podcast episodes 
//     let container = document.createElement('div')
//     for(let i = 0; i < 5; i++) {
//         console.log(response.data.results[i].listennotes_url)
//         container.textContent += response.data.results[i].listennotes_url
//     }
//     let wikiBody = document.querySelector(body)
//     wikiBody.appendChild(container)
//   }).catch((error) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 404:
//           // Endpoint not exist or podcast / episode not exist
//           break;
//         case 401:
//           // Wrong API key, or your account is suspended
//           break;
//         case 400:
//           // Invalid parameters
//           break;
//         case 500:
//           // Server-side error
//           break;
//         default:
//           // Unknown errors
//           break;
//       }
//     } else {
//       // Failed to connect to Listen API servers
//     }
//     console.log(error);
//   });
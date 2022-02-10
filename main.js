// API Token: 2deddf8527e54e0386eb34b875d5ee21

(function recommendPodcasts() {
  console.log('Im in the function')
  // Get the title of the Wikipedia page. 
  const pageTitle = document.querySelector('#firstHeading');
  
  // Search the ListenNotes podcast database for podcasts that match the Wikipedia page title. 
  // Display ten search results on the page.
  let cleanInput = pageTitle.textContent.replaceAll(' ', '%20');
  const optionsObject = {
    headers: {'X-ListenAPI-Key': '2deddf8527e54e0386eb34b875d5ee21'},
  }
  
  fetch(`https://listen-api.listennotes.com/api/v2/search?q=%22${cleanInput}%22&type=podcast`, optionsObject) 
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let container = document.createElement('div');
    container.id = 'search-results';
    container.classList.add('hide');
    
    // When the user mouses over the page title, display relevant podcasts.
    pageTitle.addEventListener('mouseover', () => {
      container.classList.remove('hide');
      container.classList.add('shown');
    });
    
    // When the user's mouses leaves the page title, remove podcasts display.
    container.addEventListener('mouseleave', () => {
      container.classList.remove('shown');
      container.classList.add('hide');
    });

    if(!data.results.length) {
      container.textContent = "Wow, there are no podcasts for this topic. Go start one!";
    }
    else {
      for(let i = 0; i < data.results.length; i++) {
        // Each podcast gets its own div. 
        const podcastEntry = document.createElement('div');
        podcastEntry.classList.add('podcast-entry');
  
        // The div contains the podcast's thumbnail.
        const podcastThumbnail = document.createElement('img')
        podcastThumbnail.classList.add('thumbnail')
        podcastThumbnail.setAttribute('src', data.results[i].thumbnail)
  
        // And the podcast's title, as a hyperlink to the episode's webpage. 
        const podcastTitle = document.createElement('a');
        podcastTitle.textContent = data.results[i].title_original;
        podcastTitle.setAttribute('href', data.results[i].link || data.results[i].listennotes_url);
        
        // Put it all together and render to the DOM. 
        podcastEntry.appendChild(podcastThumbnail)
        podcastEntry.appendChild(podcastTitle)
        container.appendChild(podcastEntry);
      }
    }
    // let wikiBody = document.querySelector('body');
    pageTitle.after(container);
    });
})();

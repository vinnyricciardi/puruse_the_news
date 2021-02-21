// Get the query input form
const gdeltQuery = document.getElementById('gdeltQuery');

// Listen for submissions on query input form
gdeltQuery.addEventListener('submit', (e) => {
    
    // Prevent default form submission action
    e.preventDefault();

    // Get the query input field on the DOM
    let queryInput = document.getElementById('queryInput');

    // Get the value of the query input field
    let queryValue = queryInput.value;  

    // Get the timespan input field on the DOM
    let timespanInput = document.getElementById('timespanInput');

    // Get the value of the query input field
    let timespanValue = timespanInput.value;          

    // Run API functions, passing in the query
    requestGDELTQuery(queryValue, timespanValue);

})


function requestGDELTQuery(query, timespan){

    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // API endpoint
    const url = `https://api.gdeltproject.org/api/v2/doc/doc?format=json&timespan=${timespan}&query=${query}&mode=Artlist&SORT=HybridRel&sourcecountry:US&sourcelang:english`;
   
    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);
    
    // When request is received
    // Process it here
    xhr.onload = function () {

        // Parse API data into JSON
        const data = JSON.parse(this.response);

        embedVolline(query, timespan)
        embedToneline(query, timespan)
        embedPhotoWall(query, timespan);
        listArticles(data);

    }
    
    // Send the request to the server
    xhr.send();
    
}

function embedVolline(query, timespan) {

    // Remove previous results if any
    var ul = document.getElementById('volLine');
      if (ul) {
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      }

    // Update iframe
    const urlGallery = `https://api.gdeltproject.org/api/v2/doc/doc?format=html&timespan=${timespan}&query=${query}&mode=TimelineVolInfo&TIMELINESMOOTH=5&sourcecountry:US&sourcelang:english`
    let ulGallery = document.getElementById('volLine');
    let liGallery = document.createElement('li');
    liGallery.classList.add('list-group-item');

    liGallery.innerHTML = (`
        <iframe src="${urlGallery}" title="test" width="100%" height="400px" frameborder="0" scrolling="yes"></iframe>
    `);
    ulGallery.appendChild(liGallery);
}

function embedToneline(query, timespan) {

    // Remove previous results if any
    var ul = document.getElementById('toneLine');
      if (ul) {
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      }

    // Update iframe
    const urlGallery = `https://api.gdeltproject.org/api/v2/doc/doc?format=html&timespan=${timespan}&query=${query}&mode=TimelineTone&TIMELINESMOOTH=5&sourcecountry:US&sourcelang:english`
    let ulGallery = document.getElementById('toneLine');
    let liGallery = document.createElement('li');
    liGallery.classList.add('list-group-item');

    liGallery.innerHTML = (`
        <iframe src="${urlGallery}" title="test" width="100%" height="400px" frameborder="0" scrolling="yes"></iframe>
    `);
    ulGallery.appendChild(liGallery);
}

function embedPhotoWall(query, timespan) {

    // Remove previous results if any
    var ul = document.getElementById('photoWall');
      if (ul) {
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      }

    // Update iframe
    const urlGallery = `https://api.gdeltproject.org/api/v2/doc/doc?format=html&timespan=${timespan}&query=${query}&mode=ArtGallery&SORT=HybridRel&sourcecountry:US&sourcelang:english`;
    let ulGallery = document.getElementById('photoWall');
    let liGallery = document.createElement('li');
    liGallery.classList.add('list-group-item');

    liGallery.innerHTML = (`
        <iframe src="${urlGallery}" title="test" width="100%" height="1000px" frameborder="0" scrolling="yes"></iframe>
    `);
    ulGallery.appendChild(liGallery);
}


function listArticles(data) {

    // Remove previous results if any
    var ul = document.getElementById('queryResult');
      if (ul) {
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      }
    
    // Loop over each object in data array
    for (let i in data.articles) {

        // Get the ul with id of results
        let ul = document.getElementById('queryResult');

        // Create variable that will create li's to be added to ul
        let li = document.createElement('li');
        
        // Add Bootstrap list item class to each li
        li.classList.add('list-group-item');
    
        // Create the html markup for each li
        li.innerHTML = (`
            <p><strong>Repo:</strong> ${data.articles[i].domain}</p>
            <p><strong>Description:</strong> ${data.articles[i].title}</p>
            <p><strong>URL:</strong> <a href="${data.articles[i].url}">${data.articles[i].url}</a></p>
        `);
        
        // Append each li to the ul
        ul.appendChild(li);
    
    }
}



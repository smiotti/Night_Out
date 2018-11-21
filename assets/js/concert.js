//this file is making a call to the songkick api to find a concert

//`https://api.songkick.com/api/3.0/events.json?apikey={your_api_key}`

//use link like this
//https://api.songkick.com/api/3.0/events.json?apikey=qBsUS3hUl7a3u4q6&artist_name=lindsey+Stirling&location=sk:4120
//https://api.songkick.com/api/3.0/events.json?apikey=qBsUS3hUl7a3u4q6&location=sk:4120&min_date=2018-11-13&max_date=2018-12-30

//var concertName = '';

const createEventCard = function(link, name) {
    const eventLink = link;
    const displayName = name;
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBh4-bZlSMiUlrYoHtSA8qQKR77emlzxmSyn4Jz4ZfcKn3tkR9Cg";
    // Creating a div to hold the event card
    const colWrapper = $('<div>').addClass('col-sm-4');
    const cardWrapper = $('<div>').addClass('card cardStyle concerts');
    const cardBodyWrapper = $('<div>').addClass('card-body');
    const cardBodyImage = $('<img />')
                            .addClass('card-img-top rounded-circle')
                            .attr('src', image)
                            .attr('alt', displayName);
    const cardLink = $('<a>').attr('href', eventLink).html(`<h6> ${displayName}</h6>`);
    const ytVid = $('<a>').attr('href', "#").attr('data-toggle',"modal").attr('data-name', displayName).attr('data-target',"#exampleModal").text('Video');
    //<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Video</button>
    cardBodyWrapper.append(cardBodyImage).append(cardLink);
    cardWrapper.append(cardBodyWrapper);
    colWrapper.append(cardWrapper);
    cardBodyWrapper.append(ytVid);

    return colWrapper;
}

const displayEvent = function () {
    var city = $('#search-location').val();
    const minDate = $('#start-date').val();//yyyy-mm-dd
    const maxDate = $('#end-date').val();//yyy-mm-dd
    const songKey = config.songKey;
    const cityURL = `https://api.songkick.com/api/3.0/search/locations.json?query=${city}&apikey=${songKey}`;

    $.get(cityURL, function (response) {
        //get the city and find the metro id
        var metroID = response.resultsPage.results.location[0].metroArea.id;
        var queryURL = `https://api.songkick.com/api/3.0/events.json?apikey=${songKey}&location=sk:${metroID}&min_date=${minDate}&max_date=${maxDate}`;//&min_date=${minDate}&max_date=${maxDate}

        // Creating an AJAX call for the specific stock button being clicked
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            for (let i = 0; i < response.resultsPage.results.event.length; i++) {
                const eventLink = response.resultsPage.results.event[i].uri;
                const displayName = response.resultsPage.results.event[i].displayName;
                
                
                // ytVideoSnippet(displayName);
                // $('#concerts').append(`<ul>
                // <li><a href="${response.resultsPage.results.event[i].uri}" target="_blank"> ${response.resultsPage.results.event[i].displayName}</a></li>
                // </ul>`);

                // const eventLink = response.resultsPage.results.event[i].uri;
                // const displayName = response.resultsPage.results.event[i].displayName;
                // const image = "https://images.sk-static.com/images/media/profile_images/artists/115039/huge_avatar";
                // // Creating a div to hold the event card
                // const colWrapper = $('<div>').addClass('col-sm-3');
                // const cardWrapper = $('<div>').addClass('card cardStyle concerts col-sm-3');
                // const cardBodyWrapper = $('<div>').addClass('card-body');
                // const cardBodyImage = $('<img />')
                //                         .addClass('card-img-top rounded-circle')
                //                         .attr('src', image)
                //                         .attr('alt', displayName);
                // const cardLink = $('<a>').attr('href', eventLink).html(`<h6> ${displayName}</h6>`);

                // cardBodyWrapper.append(cardBodyImage).append(cardLink);
                // cardWrapper.append(cardBodyWrapper);
                // colWrapper.append(cardWrapper);

                //build the card
                const eventColumn = createEventCard(eventLink, displayName);

                $('#concerts').append(eventColumn);
                
                //get video in the modal by listening for the click
                eventColumn.click(function(e) {
                    e.preventDefault();
                    const dataVal = $(e.target).data('name');
           
                    ytVideoSnippet(dataVal);
                });

                

            }
            
        });
        $('#concerts').empty();
    });
    $('#search-location').val('');
    $('#start-date').val('');
    $('#end-date').val('');
    
    
}

$('#button-location').on('click', displayEvent);


//this file is making a call to the songkick api to find a concert

//`https://api.songkick.com/api/3.0/events.json?apikey={your_api_key}`

//use link like this
//https://api.songkick.com/api/3.0/events.json?apikey=qBsUS3hUl7a3u4q6&artist_name=lindsey+Stirling&location=sk:4120
//https://api.songkick.com/api/3.0/events.json?apikey=qBsUS3hUl7a3u4q6&location=sk:4120&min_date=2018-11-13&max_date=2018-12-30


const displayEvent = function () {
    var city = $('#search-location').val();
    const minDate = $('#start-date').val();//yyyy-mm-dd
    const maxDate = $('#end-date').val();//yyy-mm-dd
    const songKey = config.songKey;
    const cityURL = `https://api.songkick.com/api/3.0/search/locations.json?query=${city}&apikey=${songKey}`;

    $.get(cityURL, function (response) {
        //get the city and find the metro id
        var metroID = response.resultsPage.results.location[0].metroArea.id;
        var queryURL = `https://api.songkick.com/api/3.0/events.json?apikey=${songKey}&location=sk:${metroID}`;//&min_date=${minDate}&max_date=${maxDate}

        // Creating an AJAX call for the specific stock button being clicked
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            for (let i = 0; i < response.resultsPage.results.event.length; i++) {
                $('#concerts').append(`<ul>
                <li><a href="${response.resultsPage.results.event[i].uri}" target="_blank"> ${response.resultsPage.results.event[i].displayName}</a></li>
                </ul>`);
            }

        });

    });
    $('#search-location').val('');
}

$('#button-location').on('click', displayEvent);

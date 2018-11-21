const ytVideoSnippet = function(concertName){

    var key = config.YOUTUBEKEY;
    //var searchName = concertName;
    //var playlistId = 'RDEMHf2wypPGss7s18zIoO3rxQ';
    var URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${concertName}&key=${key}`;   //https://www.googleapis.com/youtube/v3/playlistItems;

    $.ajax({
        url: URL,
        method: 'GET'
    }).then(function (response) {
        //console.log(response);
        const name = response.items[0].id.videoId;
        $('#video').html(`
        <iframe width="460" height="315" src="https://www.youtube.com/embed/${name}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `);


    });
}
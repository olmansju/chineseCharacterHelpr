//google analytics code
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-93502866-1', 'auto');
ga('send', 'pageview');

$(document).ready(function () {
    $("input.chinese-input").chineseInput({
        debug: false, // print debug messages
        input: {
            initial: 'simplified', // or 'traditional'
            allowChange: false // allow transition between traditional and simplified
        },
        allowHide: false, // allow the chinese input to be switched off
        active: true // whether or not the plugin should be active by default
    });
});

$(".chinese-input").keyup(function () {
    currentPinyin = $("#chinese-ime .typing").text();
    console.log(currentPinyin);
    currentChineseCharacterChoices = $.wordDatabase.words.currentPinyin.choices;

});

function myResponsiveVoice(character) {
    return responsiveVoice.speak(character, 'Chinese Female');
}



photoSet=0;

encodedCurrentChineseCharacter = encodeURIComponent('猫');
requestURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a970fbb976a06193676f88ef2722cc8&text='+encodedCurrentChineseCharacter+'&sort=relevance&privacy_filter=1&safe_search=1&per_page=5&page=1&format=json&nojsoncallback=1'
$.ajax(requestURL).done(function (data) {
    data.photos.photo.forEach(function (currentPhoto) {
        currentPhotoURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server + '/' + currentPhoto.id + '_' + currentPhoto.secret + '_m.jpg';
        console.log('currentPhotoURL');
        $("#photo-gallery").append('<div class="photo-from-flickr"><img src="'+currentPhotoURL+'" alt="'+currentPhoto.title+'"/></div>'); 
    })
})

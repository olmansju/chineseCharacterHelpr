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
    $("textarea.chinese").chineseInput({
        debug: false, // print debug messages
        input: {
            initial: 'simplified', // or 'traditional'
            allowChange: false // allow transition between traditional and simplified
        },
        allowHide: false, // allow the chinese input to be switched off
        active: true // whether or not the plugin should be active by default
    });
});

$("input").keyup(function () {
    var obj = $("#chinese-ime li");
    var arr = $.makeArray(obj);

    // var arr_list_items = $('#chinese-ime .options ul li').remove().get();
    // console.log(arr_list_items);
    alert(arr);
});

function myResponsiveVoice(character) {
    return responsiveVoice.speak(character, 'Chinese Female');
}

encodedCurrentChineseCharacter = encodeURIComponent('sampletext');
flickrApiUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d592362beec3f98703d88ff5d1d35647&text='+encodedCurrentChineseCharacter+'&sort=relevance&privacy_filter=1&safe_search=1&per_page=5&page=1&format=json&nojsoncallback=1';

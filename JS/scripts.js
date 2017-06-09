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
//end analytics code

//have the curser automatically show up in the input box
$("#chinese-input").focus();

var timer = null;
$('#chinese-input').keyup(function(){
       clearTimeout(timer); 
       timer = setTimeout(doneTyping, 1000)
});

function doneTyping() {
    if ($("#chinese-input").val().length > 0) {
        //clearing out any existing timers
        var TimeoutAudioDelay
        var TimeoutImageDelay
        clearTimeout( TimeoutAudioDelay );
        clearTimeout( TimeoutImageDelay );

        $("#output-container").empty();
        currentCharacterInput = $("#chinese-input").val().toLowerCase();
        console.log(currentCharacterInput);
        requestURL = 'https://www.google.com/inputtools/request?ime=pinyin&ie=utf-8&oe=utf-8&app=translate&num=10&text=' + currentCharacterInput;
        $.ajax(requestURL).done(function (data) {
            console.log(data[1][0][3].annotation); //this retrieves the pinyin, without tones sadly
            $("#character-list").empty();
            data[1][0][1].forEach(function (currentCharacter) {
                //Generating Character List
                $("#output-container").append('<div class="character-result" id="choice-' + currentCharacter + '"> <div class="character-text">' + currentCharacter + '</div> <div class="character-speech"></div> <div class="image-output"></div> </div>');
                TimeoutAudioDelay = setTimeout(audioDelay, 3000);
                function audioDelay() {
                    $("#choice-" + currentCharacter + " .character-speech").append('<img src="Speaker_Icon.svg" alt="play sound" height="50" width="50">');
                    $("#choice-" + currentCharacter + " .character-speech").click(function(){
                        responsiveVoice.speak(currentCharacter, 'Chinese Female')
                    });
                }
                //image retrieval
                TimeoutImageDelay= setTimeout(imageDelay, 6000);
                function imageDelay() {
                    encodedSelectedCharacter = encodeURIComponent(currentCharacter);
                    requestURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a970fbb976a06193676f88ef2722cc8&text=' + encodedSelectedCharacter + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=10&page=1&format=json&nojsoncallback=1';
                    $.ajax(requestURL).done(function (data) {
                        data.photos.photo.forEach(function (currentPhoto) {
                            currentPhotoURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server + '/' + currentPhoto.id + '_' + currentPhoto.secret + '_n.jpg';
                            console.log('currentPhotoURL');
                            $("#choice-" + currentCharacter + " .image-output").append('<div class="photo-from-flickr"><img src="' + currentPhotoURL + '" alt="' + currentPhoto.title + '"/></a></div>');
                        })
                    })
                }
            })
            //When an item is clicked
            $(".character-text").click(function () {
                //append character to compilation
                $('#chinese-output').attr('disabled', false);
                selectedCharacter = $(this).text();
                $("#chinese-output").val($("#chinese-output").val() + selectedCharacter);
                //clean site
                $("#chinese-input").val("");
                $("#chinese-input").focus();
                $("#output-container").empty();
                // setTimeout(removeHiddenAsset, 3000);
                // function removeHiddenAsset() {
                //     $(".photo-from-flickr").removeClass("hidden-asset");
                // }
            });
        })
    }
};
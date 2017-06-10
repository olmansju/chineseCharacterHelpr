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
$('#chinese-input').keyup(function (e) {
    // ignores arrow keys, list of all keys in case you want to add some more:
    // https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    var code = (e.keyCode || e.which);
    if (code == 37 || code == 38 || code == 39 || code == 40) {
        return;
    }
    clearTimeout(timer);
    timer = setTimeout(doneTyping, 2000)
});

function doneTyping() {
    if ($("#chinese-input").val().length > 0) {
        //clearing out any existing timers
        var timeoutAudioDelay
        var translationDelay
        var timeoutImageDelay
        clearTimeout(timeoutAudioDelay);
        clearTimeout(translationDelay);
        clearTimeout(timeoutImageDelay);

        $("#output-container").empty();
        currentCharacterInput = $("#chinese-input").val().toLowerCase();
        //console.log(currentCharacterInput);
        PinyinToChineseRequestURL = 'https://www.google.com/inputtools/request?ime=pinyin&ie=utf-8&oe=utf-8&app=translate&num=7&text=' + currentCharacterInput;
        $.ajax(PinyinToChineseRequestURL).done(function (data) {
            //console.log(data[1][0][3].annotation); //this retrieves the pinyin, without tones sadly
            $("#character-list").empty();
            data[1][0][1].forEach(function (currentCharacter) {
                //encodedSelectedCharacter = encodeURIComponent(currentCharacter); //apparently the character doesn't need to be encoded, flickr worked regardless
                //Generating Character List
                $("#output-container").append('<div class="character-result" id="choice-' + currentCharacter + '"> <div class="character-text">' + currentCharacter + '</div> <div class="translation-speech"></div> <div class="image-output"></div> </div>');
                
                //Genr
                timeoutAudioDelay = setTimeout(audioDelay, 3000);
                function audioDelay() {
                    $("#choice-" + currentCharacter + " .translation-speech").append('<img src="Speaker_Icon.svg" class="character-speech" alt="play sound" height="35" width="35">');
                    $("#choice-" + currentCharacter + " .character-speech").click(function () {
                        responsiveVoice.speak(currentCharacter, 'Chinese Female')
                    });
                }

                //Generating english translation
                timeoutTranslationDelay = setTimeout(translationDelay, 3000);
                function translationDelay() {
                    translateRequestURL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&q=' + currentCharacter;
                    $.ajax(translateRequestURL).done(function (data) {
                        translatedWord = data[0][0][0];
                        $("#choice-" + currentCharacter + " .translation-speech").append(translatedWord);

                    });
                }
                FlickrRequestURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a970fbb976a06193676f88ef2722cc8&text=' + currentCharacter + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=10&page=1&format=json&nojsoncallback=1';
                $.ajax(FlickrRequestURL).done(function (data) {
                    data.photos.photo.forEach(function (currentPhoto) {
                        currentPhotoURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server + '/' + currentPhoto.id + '_' + currentPhoto.secret + '_n.jpg';
                        $("#choice-" + currentCharacter + " .image-output").append('<div class="photo-from-flickr hidden-asset"><img src="' + currentPhotoURL + '" alt="' + currentPhoto.title + '"/></a></div>');
                    })
                })
                //image retrieval
                timeoutImageDelay = setTimeout(imageDelay, 11000);

                function imageDelay() {
                    $(".photo-from-flickr").removeClass("hidden-asset");
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
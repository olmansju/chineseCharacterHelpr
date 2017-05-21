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

// wanted to detect if this div is changed but .change doesn't seem to work, apparently it only works on forms.
// $(".typing").change(function () {
//     alert("something was typed");
// });
$(".chinese-input").keyup(function () {
    if ($(".chinese-input").val().length > 0) {
        currentCharacterInput = $(".chinese-input").val();
        console.log(currentCharacterInput);
        requestURL = 'https://www.google.com/inputtools/request?ime=pinyin&ie=utf-8&oe=utf-8&app=translate&num=10&text=' + currentCharacterInput;
        $.ajax(requestURL).done(function (data) {
            console.log(data[1][0][3].annotation); //this retrieves the pinyin, without tones sadly
            $("#character-list").empty();
            data[1][0][1].forEach(function (currentCharacter) {
                $("#character-list").append('<li class="' + currentCharacter + '">' + currentCharacter + '</li>');
            })
        })
    }
});


function helperChinese() {
    currentPinyin = $("#chinese-ime .typing").text();
    console.log(currentPinyin);
    currentChineseCharacterChoices = $.wordDatabase.words[currentPinyin].choices;
    $("#output-container").empty();
    CharacterLoopIteration = 1;
    currentChineseCharacterChoices.forEach(function (currentCharacter) {
        $("#output-container").append('<div class="chinese-choice" id="choice-' + currentCharacter + '"> <div class="character-text">' + currentCharacter + '</div> <div class="character-speech"><input type="button" value="Play Sound" onclick="responsiveVoice.speak(\'' + currentCharacter + '\', \'Chinese Female\')"></div> <div class="character-images"></div> </div>');

        $(".character-images").empty();
        //image retrieval
        encodedCurrentChineseCharacter = encodeURIComponent(currentCharacter);
        requestURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a970fbb976a06193676f88ef2722cc8&text=' + encodedCurrentChineseCharacter + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=5&page=1&format=json&nojsoncallback=1';
        $.ajax(requestURL).done(function (data) {
            data.photos.photo.forEach(function (currentPhoto) {
                currentPhotoURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server + '/' + currentPhoto.id + '_' + currentPhoto.secret + '_m.jpg';
                console.log('currentPhotoURL');
                $("#choice-" + currentCharacter + " .character-images").append('<div class="photo-from-flickr"><img src="' + currentPhotoURL + '" alt="' + currentPhoto.title + '"/></div>');
            })
        })

        CharacterLoopIteration++;
    });
    $('.character-text').click(function () {
        ChosenChineseCharacter = $(this).text();
        //$('input.chinese-input').val($('input.chinese-input').val() + ChosenChineseCharacter);
        // $('.chinese-checkbox input').attr('checked', false); 
        // $('.chinese-checkbox input').attr('checked', true);
        //$('#chinese-ime .typing').empty();
        TextLength = $('#chinese-ime .typing').text().length;

        $("#output-container").empty();
    });

};

// function myResponsiveVoice(character) {
//     return responsiveVoice.speak(character, 'Chinese Female');
// }

//to reset the value
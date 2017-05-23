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

$(".chinese-input").keyup(function () {
    if ($(".chinese-input").val().length > 0) {
        currentCharacterInput = $(".chinese-input").val().toLowerCase();
        console.log(currentCharacterInput);
        requestURL = 'https://www.google.com/inputtools/request?ime=pinyin&ie=utf-8&oe=utf-8&app=translate&num=10&text=' + currentCharacterInput;
        $.ajax(requestURL).done(function (data) {
            console.log(data[1][0][3].annotation); //this retrieves the pinyin, without tones sadly
            $("#character-list").empty();
            data[1][0][1].forEach(function (currentCharacter) {
                //Generating Character List
                $("#character-list").append('<div class="individual-character ' + currentCharacter + '">' + currentCharacter + '</div>');

            })
            //When an item is clicked
            $(".individual-character").click(function () {
                selectedCharacter = $(this).text();
                $(".highlighted-character").removeClass("highlighted-character");
                $("." + selectedCharacter).addClass("highlighted-character");
                //$(this).css( "background-color","yellow" );
                //Generating Sound Clip
                // $(".play-sound").removeClass("play-sound");
                // $(this).addClass("play-sound");
                //have this part generate a new div to the LEFT of this that has the options to chose this one or play the sound
                console.log(selectedCharacter);
                $("#play-sound-container").empty();
                $("#play-sound-container").append('<input type="button" value="Listen to ' + selectedCharacter + '" onclick="responsiveVoice.speak(\'' + selectedCharacter + '\', \'Chinese Female\')">');
                $("#choose-character-container").empty();
                $("#choose-character-container").append('<input type="button" value="Append ' + selectedCharacter + ' to string" onclick="$(\'.chinese-output\').val($(\'.chinese-output\').val()+selectedCharacter);">');

                //image retrieval
                $("#image-output").empty();
                // $(".photo-from-flickr").hide()
                encodedSelectedCharacter = encodeURIComponent(selectedCharacter);
                requestURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a970fbb976a06193676f88ef2722cc8&text=' + encodedSelectedCharacter + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=10&page=1&format=json&nojsoncallback=1';
                $.ajax(requestURL).done(function (data) {
                    data.photos.photo.forEach(function (currentPhoto) {
                        currentPhotoURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server + '/' + currentPhoto.id + '_' + currentPhoto.secret + '_n.jpg';
                        console.log('currentPhotoURL');
                        $("#image-output").append('<div class="photo-from-flickr hidden-asset"><img src="' + currentPhotoURL + '" alt="' + currentPhoto.title + '"/></div>');
                    })
                })
                setTimeout(removeHiddenAsset, 3000);
                function removeHiddenAsset() {
                    $(".photo-from-flickr").removeClass("hidden-asset");
                }
            });
        })
    }
});
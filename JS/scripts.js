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
        PinyinToChineseRequestURL = 'https://www.google.com/inputtools/request?ime=pinyin&ie=utf-8&oe=utf-8&app=translate&num=7&text=' + currentCharacterInput;
        $.ajax(PinyinToChineseRequestURL).done(function (data) {
            $("#character-list").empty();
            data[1][0][1].forEach(function (currentCharacter) {
                currentCharacterGlobal = currentCharacter;
                //Generating Character List
                $("#output-container").append('<div class="character-result" id="choice-' + currentCharacter + '"> <div class="character-text">' + currentCharacter + '</div> <div class="translation-speech"></div> <div class="translated-text hidden-asset"></div> <div class="image-output"></div> </div>');

                //Generating audio
                timeoutAudioDelay = setTimeout(audioDelay, 3000);
                $("#choice-" + currentCharacter + " .translation-speech").append('<div class="character-speech hidden-asset"><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://web.resource.org/cc/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.0" id="layer1" width="400pt" height="400pt" viewBox="0 0 75 75"><metadata id="metadata1"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><g id="g1"><polygon id="polygon1" points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769" style="stroke:#111111;stroke-width:5;stroke-linejoin:round;fill:#111111;" /><path id="path1" d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577" style="fill:none;stroke:#111111;stroke-width:5;stroke-linecap:round"/> <path id="path2" d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076" style="fill:none;stroke:#111111;stroke-width:5;stroke-linecap:round"/> <path id="path1" d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01" style="fill:none;stroke:#111111;stroke-width:5;stroke-linecap:round"/> </g> </svg></div>');
                $("#choice-" + currentCharacter + " .character-speech").click(function () {
                    responsiveVoice.speak(currentCharacter, 'Chinese Female')
                });

                function audioDelay() {
                    $(".character-speech").removeClass("hidden-asset");
                }

                //Generating english translation
                var translatedWord = "";
                timeoutTranslationDelay = setTimeout(translationDelay, 20000);
                translateRequestURL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&q=' + currentCharacter;
                $.ajax(translateRequestURL).done(function testing(data) {
                    translatedWord = data[0][0][0];
                    $("#choice-" + currentCharacter + " .translation-speech").append('<div class="character-translation hidden-asset"><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="-1 -256 1792 1792" id="svg3025" version="1.1" inkscape:version="0.48.3.1 r9886" width="100%" height="100%" sodipodi:docname="book_font_awesome.svg"> <metadata id="metadata3035"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> </cc:Work> </rdf:RDF> </metadata> <defs id="defs3033" /> <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="640" inkscape:window-height="480" id="namedview3031" showgrid="false" inkscape:zoom="0.13169643" inkscape:cx="896" inkscape:cy="896" inkscape:window-x="0" inkscape:window-y="25" inkscape:window-maximized="0" inkscape:current-layer="svg3025" /> <g transform="matrix(1,0,0,-1,53.152542,1270.2373)" id="g3027"> <path d="m 1639,1058 q 40,-57 18,-129 L 1382,23 Q 1363,-41 1305.5,-84.5 1248,-128 1183,-128 H 260 q -77,0 -148.5,53.5 Q 40,-21 12,57 q -24,67 -2,127 0,4 3,27 3,23 4,37 1,8 -3,21.5 -4,13.5 -3,19.5 2,11 8,21 6,10 16.5,23.5 Q 46,347 52,357 q 23,38 45,91.5 22,53.5 30,91.5 3,10 0.5,30 -2.5,20 -0.5,28 3,11 17,28 14,17 17,23 21,36 42,92 21,56 25,90 1,9 -2.5,32 -3.5,23 0.5,28 4,13 22,30.5 18,17.5 22,22.5 19,26 42.5,84.5 23.5,58.5 27.5,96.5 1,8 -3,25.5 -4,17.5 -2,26.5 2,8 9,18 7,10 18,23 11,13 17,21 8,12 16.5,30.5 8.5,18.5 15,35 6.5,16.5 16,36 9.5,19.5 19.5,32 10,12.5 26.5,23.5 16.5,11 36,11.5 19.5,0.5 47.5,-5.5 l -1,-3 q 38,9 51,9 h 761 q 74,0 114,-56 40,-56 18,-130 L 1225,316 Q 1189,197 1153.5,162.5 1118,128 1025,128 H 156 Q 129,128 118,113 107,97 117,70 141,0 261,0 h 923 q 29,0 56,15.5 27,15.5 35,41.5 l 300,987 q 7,22 5,57 38,-15 59,-43 z m -1064,-2 q -4,-13 2,-22.5 6,-9.5 20,-9.5 h 608 q 13,0 25.5,9.5 12.5,9.5 16.5,22.5 l 21,64 q 4,13 -2,22.5 -6,9.5 -20,9.5 H 638 q -13,0 -25.5,-9.5 Q 600,1133 596,1120 z M 492,800 q -4,-13 2,-22.5 6,-9.5 20,-9.5 h 608 q 13,0 25.5,9.5 12.5,9.5 16.5,22.5 l 21,64 q 4,13 -2,22.5 -6,9.5 -20,9.5 H 555 q -13,0 -25.5,-9.5 Q 517,877 513,864 z" id="path3029" inkscape:connector-curvature="0" style="fill:currentColor" /> </g> </svg></div>');
                    $("#choice-" + currentCharacter + " .translated-text").html("The translation is<br /><span>" + translatedWord + "</span>");

                    $("#choice-" + currentCharacter + " .character-translation").click(function () {
                        $("#choice-" + currentCharacter + " .translated-text").removeClass("hidden-asset");
                    });
                });

                function translationDelay() {
                    $(".character-translation").removeClass("hidden-asset");
                }

                //preparing interwoven array
                setTimeout(interweavingLanguageDelay, 4000);

                function interweavingLanguageDelay() {
                    var tempChinesePhotos = []
                    var tempEnglishPhotos = []

                    //Chinse image retrieval function
                    FlickrRequestURLChinese = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a970fbb976a06193676f88ef2722cc8&text=' + currentCharacter + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=5&page=1&format=json&nojsoncallback=1';
                    $.ajax(FlickrRequestURLChinese).done(function (data) {
                        data.photos.photo.forEach(function (currentPhoto) {
                            currentPhotoEnglishURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server + '/' + currentPhoto.id + '_' + currentPhoto.secret + '_n.jpg';
                            tempEnglishPhotos.push(currentPhotoEnglishURL.toString());
                        })
                    })

                    //English image retrieval function
                    FlickrRequestURLEnglish = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a970fbb976a06193676f88ef2722cc8&text=' + translatedWord + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=5&page=1&format=json&nojsoncallback=1';
                    $.ajax(FlickrRequestURLEnglish).done(function (data) {
                        data.photos.photo.forEach(function (currentPhoto) {
                            currentPhotoChineseURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server + '/' + currentPhoto.id + '_' + currentPhoto.secret + '_n.jpg';
                            tempChinesePhotos.push(currentPhotoChineseURL.toString());
                        })
                        //After this is done the two are merged together
                        interweavingLanguageExecutionDelay = setTimeout(interweavingLanguageExecution, 2000);
                    })

                    function interweavingLanguageExecution() {
                        //preparing interwoven array
                        var arrayCombined = $.map(tempChinesePhotos, function (v, i) {
                            return [v, tempEnglishPhotos[i]];
                        });
                        arrayCombined.forEach(function (currentPhoto) {
                            $("#choice-" + currentCharacter + " .image-output").append('<div class="photo-from-flickr hidden-asset"><img src="' + currentPhoto + '" /></a></div>');
                        })

                    }
                }

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
            });
        })
    }
};
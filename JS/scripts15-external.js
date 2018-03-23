//google analytics code
//add event triggers in the functions below see google site for how to
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

//scope variable here consider javasccript promises
var collectedURLracyscoreArray = [];//this collects all imageURLs and racyscores and keeps them together
var racyThreshold = 0.169; //this sets the threshold for raciness
var myFilterCheckerVar = setInterval(myFilterChecker, 110);
var outgoingAzureFilterRequests = 0;
var returnedAzureFilterRequests = 0;
var collectedURLarray = [];
var timer = null;
var d = new Date();
var n = d.getTime();
$('#chinese-input').keyup(function (e) {
    // ignores arrow keys, list of all keys in case you want to add some more:
    // https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    var code = (e.keyCode || e.which);
    if (code == 37 || code == 38 || code == 39 || code == 40) {
        return;
    }
    if (code == 32){
        clearTimeout(timer);
        timer = setTimeout(doneTyping, 1);
        return;
        //on spacebar keyup skip the waiting period, if i don't include setTimeout and just return doneTyping() there is a flash at 2000ms
    }
    clearTimeout(timer);
    timer = setTimeout(doneTyping, 2000)
});

function processImage(imageURL) {
    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************
    //var imageDelayProcessImage;
    //clearTimeout(imageDelayProcessImage);
    //imageDelayProcessImage = setTimeout(imageDelayProcessImage, 110); //waits .11 of a second to not exceed request rate on Azure
    // Replace the subscriptionKey string value with your valid subscription key.
    var subscriptionKey = "13hc77781f7e4b19b5fcdd72a8df7156";
    var imURL = imageURL;
    // Replace or verify the region.
    //
    // You must use the same region in your REST API call as you used to obtain your subscription keys.
    // For example, if you obtained your subscription keys from the westus region, replace
    // "westcentralus" in the URI below with "westus".
    //
    // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
    // a free trial subscription key, you should not need to change this region.
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
    // Request parameters.
    var params = {
        visualFeatures: "Adult"
    };

    // Display the image.
    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + imageURL + '"}',
    })

        .done(function (data) {
            // Print
            var holder = Number(data.adult.racyScore);
            var tempURLracyscoreDict = {
                URL: imURL,
                racyscore: holder
            };
            collectedURLracyscoreArray.push(tempURLracyscoreDict);
            returnedAzureFilterRequests++;
        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            console.log(errorString);
            returnedAzureFilterRequests++;
            return [
                0
            ];
        });
}

function myFilterChecker (){
    if (collectedURLarray.length > 0){
        if ((outgoingAzureFilterRequests - returnedAzureFilterRequests)< 8){
            //var splicedArray = collectedURLarray.splice(-1,1);
            var splicedArray = collectedURLarray.splice(Math.floor(Math.random()*collectedURLarray.length), 1);
            splicedArray.forEach(function (t) {
                processImage(t);
                outgoingAzureFilterRequests++;
            })
        }
    }
}

function returnScore(imageURL) {
    //looks for the racyscore and if it finds it it returns it otherwise it returns the URL
    for(var ii in collectedURLracyscoreArray) {
        if (collectedURLracyscoreArray[ii].URL == imageURL) {
            return collectedURLracyscoreArray[ii].racyscore;
            break;
        }
    }
    return imageURL;
}

function doneTyping() {
    if ($("#chinese-input").val().length > 0) {
        outgoingAzureFilterRequests = 0;
        returnedAzureFilterRequests = 0;
        //clearing out any existing timers
        var timeoutAudioDelay
        var translationDelay
        var timeoutImageDelay
        clearTimeout(timeoutAudioDelay);
        clearTimeout(translationDelay);
        clearTimeout(timeoutImageDelay);
        $("#output-container").empty();
        currentCharacterInput = $("#chinese-input").val().toLowerCase(); //if backend then add security here
        //sends event data to google analytics Pinyin sent to server and current value of
        var p = d.getTime();
        var elapsed = (p-n)/1000;
        ga('send', {
            hitType: 'event',
            eventCategory: 'PinyinSend',
            eventAction: currentCharacterInput,
            eventLabel: $("#chinese-output").val(),
            eventValue: elapsed
        });
        PinyinToChineseRequestURL = 'https://www.google.com/inputtools/request?ime=pinyin&ie=utf-8&oe=utf-8&app=translate&num=7&text=' + currentCharacterInput;
        //this runs on jquery all the .append and $.ajax is that
        $.ajax(PinyinToChineseRequestURL).done(function (data) {
            $("#character-list").empty();
            data[1][0][1].forEach(function (currentCharacter) {
                currentCharacterGlobal = currentCharacter;
                //Generating Character List
                $("#output-container").append('<div class="character-result" id="choice-' + currentCharacter + '"> <div class="character-text">' + currentCharacter + '</div> <div class="translation-speech"></div> <div class="translated-text hidden-asset"></div> <div class="image-output"></div> </div>');

                //Generating audio
                timeoutAudioDelay = setTimeout(audioDelay, 3000);
                //copy the svg code from the svg file to here if you want them to be reflected
                $("#choice-" + currentCharacter + " .translation-speech").append('<div class="character-speech hidden-asset"><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://web.resource.org/cc/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.0" id="layer1" width="400pt" height="400pt" viewBox="0 0 75 75"><metadata id="metadata1"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><g id="g1"><polygon id="polygon1" points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769" style="stroke:none;stroke-width:5;stroke-linejoin:round;fill:#494848;" /><path id="path1" d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577" style="fill:none;stroke:#494848;stroke-width:5;stroke-linecap:round"/> <path id="path2" d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076" style="fill:none;stroke:#494848;stroke-width:5;stroke-linecap:round"/> <path id="path1" d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01" style="fill:none;stroke:none;stroke-width:5;stroke-linecap:round"/> </g> </svg></div>');
                //use this as a template for addding tts for the output box
                $("#choice-" + currentCharacter + " .character-speech").click(function () {
                    responsiveVoice.speak(currentCharacter, 'Chinese Female');
                    var p = d.getTime();
                    var elapsed = (p-n)/1000;
                    ga('send', {
                        hitType: 'event',
                        eventCategory: 'AudioPlayed',
                        eventAction: currentCharacter,
                        eventLabel: currentCharacterInput,
                        eventValue: elapsed
                    });
                });
                //setTimeout is baked in function, called after 3 seconds
                function audioDelay() {
                    $(".character-speech").removeClass("hidden-asset");
                }

                //Generating english translation
                var translatedWord = "";
                timeoutTranslationDelay = setTimeout(translationDelay, 20000);
                translateRequestURL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&q=' + currentCharacter;
                $.ajax(translateRequestURL).done(function testing(data) {
                    translatedWord = data[0][0][0];
                    $("#choice-" + currentCharacter + " .translation-speech").append('<div class="character-translation hidden-asset"><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="-1 -256 1792 1792" id="svg3025" version="1.1" inkscape:version="0.48.3.1 r9886" width="100%" height="100%" sodipodi:docname="book_font_awesome.svg"> <metadata id="metadata3035"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> </cc:Work> </rdf:RDF> </metadata> <defs id="defs3033" /> <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="640" inkscape:window-height="480" id="namedview3031" showgrid="false" inkscape:zoom="0.13169643" inkscape:cx="896" inkscape:cy="896" inkscape:window-x="0" inkscape:window-y="25" inkscape:window-maximized="0" inkscape:current-layer="svg3025" /> <g transform="matrix(1,0,0,-1,53.152542,1270.2373)" id="g3027"> <path d="m 1639,1058 q 40,-57 18,-129 L 1382,23 Q 1363,-41 1305.5,-84.5 1248,-128 1183,-128 H 260 q -77,0 -148.5,53.5 Q 40,-21 12,57 q -24,67 -2,127 0,4 3,27 3,23 4,37 1,8 -3,21.5 -4,13.5 -3,19.5 2,11 8,21 6,10 16.5,23.5 Q 46,347 52,357 q 23,38 45,91.5 22,53.5 30,91.5 3,10 0.5,30 -2.5,20 -0.5,28 3,11 17,28 14,17 17,23 21,36 42,92 21,56 25,90 1,9 -2.5,32 -3.5,23 0.5,28 4,13 22,30.5 18,17.5 22,22.5 19,26 42.5,84.5 23.5,58.5 27.5,96.5 1,8 -3,25.5 -4,17.5 -2,26.5 2,8 9,18 7,10 18,23 11,13 17,21 8,12 16.5,30.5 8.5,18.5 15,35 6.5,16.5 16,36 9.5,19.5 19.5,32 10,12.5 26.5,23.5 16.5,11 36,11.5 19.5,0.5 47.5,-5.5 l -1,-3 q 38,9 51,9 h 761 q 74,0 114,-56 40,-56 18,-130 L 1225,316 Q 1189,197 1153.5,162.5 1118,128 1025,128 H 156 Q 129,128 118,113 107,97 117,70 141,0 261,0 h 923 q 29,0 56,15.5 27,15.5 35,41.5 l 300,987 q 7,22 5,57 38,-15 59,-43 z m -1064,-2 q -4,-13 2,-22.5 6,-9.5 20,-9.5 h 608 q 13,0 25.5,9.5 12.5,9.5 16.5,22.5 l 21,64 q 4,13 -2,22.5 -6,9.5 -20,9.5 H 638 q -13,0 -25.5,-9.5 Q 600,1133 596,1120 z M 492,800 q -4,-13 2,-22.5 6,-9.5 20,-9.5 h 608 q 13,0 25.5,9.5 12.5,9.5 16.5,22.5 l 21,64 q 4,13 -2,22.5 -6,9.5 -20,9.5 H 555 q -13,0 -25.5,-9.5 Q 517,877 513,864 z" id="path3029" inkscape:connector-curvature="0" style="fill:#494848" /> </g> </svg></div>');
                    $("#choice-" + currentCharacter + " .translated-text").html("<span>" + translatedWord.toLowerCase() + "</span>");

                    $("#choice-" + currentCharacter + " .character-translation").click(function () {
                        $("#choice-" + currentCharacter + " .translated-text").removeClass("hidden-asset");
                        var p = d.getTime();
                        var elapsed = (p-n)/1000;
                        ga('send', {
                            hitType: 'event',
                            eventCategory: 'TranslationViewed',
                            eventAction: currentCharacter,
                            eventLabel: currentCharacterInput,
                            eventValue: elapsed
                        });
                    });
                });

                function translationDelay() {
                    $(".character-translation").removeClass("hidden-asset");
                }

                //preparing interwoven array -- this is in here as a safety precaution UNL image loading interrupt issues
                setTimeout(interweavingLanguageDelay, 1000);

                function interweavingLanguageDelay() {
                    var tempChinesePhotos = []
                    var tempEnglishPhotos = []

                    //Chinese image retrieval function
                    FlickrRequestURLChinese = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a970fbb976a06193676f88ef2722cc8&text=' + currentCharacter + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=5&page=1&format=json&nojsoncallback=1';
                    $.ajax(FlickrRequestURLChinese).done(function (data) {
                        data.photos.photo.forEach(function (currentPhoto) {
                            currentPhotoChineseURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server + '/' + currentPhoto.id + '_' + currentPhoto.secret + '_n.jpg';
                            //setTimeout(processImage.bind(null, currentPhotoChineseURL), 110);
                            tempChinesePhotos.push(currentPhotoChineseURL.toString());
                            collectedURLarray.push(currentPhotoChineseURL.toString());
                        })
                    })

                    //English image retrieval function
                    FlickrRequestURLEnglish = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a970fbb976a06193676f88ef2722cc8&text=' + translatedWord + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=5&page=1&format=json&nojsoncallback=1';
                    $.ajax(FlickrRequestURLEnglish).done(function (data) {
                        data.photos.photo.forEach(function (currentPhoto) {
                            currentPhotoEnglishURL = 'https://farm' + currentPhoto.farm + '.staticflickr.com/' + currentPhoto.server + '/' + currentPhoto.id + '_' + currentPhoto.secret + '_n.jpg';
                            //processImage(currentPhotoEnglishURL);
                            //setTimeout(processImage.bind(null, currentPhotoEnglishURL), 110);
                            tempEnglishPhotos.push(currentPhotoEnglishURL.toString());
                            collectedURLarray.push(currentPhotoEnglishURL.toString());
                        })
                        //After this is done the two are merged together
                        interweavingLanguageExecutionDelay = setTimeout(interweavingLanguageExecution, 7000);
                    })

                    function interweavingLanguageExecution() {
                        //preparing interwoven array
                        var arrayCombined = $.map(tempChinesePhotos, function (v, i) {
                            return [v, tempEnglishPhotos[i]];
                        });
                        //for now a tooltip later this: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_image_overlay_opacity
                        arrayCombined.forEach(function (currentPhoto) {
                            //$("#choice-" + currentCharacter + " .image-output").append('<div class="photo-from-flickr hidden-asset"><img src="' + currentPhoto + '" title="' + currentCharacter + '" alt="' + currentCharacter + '"/></a></div>');
                            var altText = currentPhoto;
                            altText = returnScore(currentPhoto);
                            if (altText !== currentPhoto){
                                if (altText < racyThreshold){
                                    $("#choice-" + currentCharacter + " .image-output").append('<div class="photo-from-flickr hidden-asset"><img src="' + currentPhoto + '" title="' + altText + '" alt="' + altText + '"/></a></div>');
                                }
                            }
                        })
                    }
                }

                //image retrieval
                timeoutImageDelay = setTimeout(imageDelay, 11000);

                function imageDelay() {
                    $(".photo-from-flickr").removeClass("hidden-asset");
                }
            })

            //When a character is clicked for input into text box
            $(".character-text").click(function () {
                //append character to compilation
                $('#chinese-output').attr('disabled', false);
                selectedCharacter = $(this).text();
                var p = d.getTime();
                var elapsed = (p-n)/1000;
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'CharacterSelected',
                    eventAction: selectedCharacter,
                    eventLabel: $("#chinese-output").val(),
                    eventValue: elapsed
                });
                //chinnese-output.val used for TTS
                //keeps the existing characters and adds them
                $("#chinese-output").val($("#chinese-output").val() + selectedCharacter);
                //clean site --do we need to call clear timeouts in a function here?
                $("#chinese-input").val("");
                $("#chinese-input").focus();
                $("#output-container").empty();
            });
        })
    }
};
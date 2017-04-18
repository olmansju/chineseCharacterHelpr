//google analytics code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-93502866-1', 'auto');
ga('send', 'pageview');

$(document).ready(function(){
    $("input.chinese").chineseInput({
        debug: false, // print debug messages
        input: {
            initial: 'traditional', // or 'simplified'
            allowChange: true // allow transition between traditional and simplified
        },
        allowHide: true, // allow the chinese input to be switched off
        active: true // whether or not the plugin should be active by default
    });
});

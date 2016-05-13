jQuery(document).ready(function(){
    console.log("script compin and run");
    $('#fullpage').fullpage({
        sectionsColor:[null,"#1BBC9B","#7E8F7C","#1BBF7C"],
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
        slidesNavigation:true,
        menu: '#mainMenu'
    });
});

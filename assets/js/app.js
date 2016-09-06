jQuery(document).ready(function(){
    console.log("script compin and run");
    $('#fullpage').fullpage({
        sectionsColor:[null,"#1BBF7C","#7E8F7C","#1BBF7C"],
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
        slidesNavigation:true,
        menu: '#mainMenu'
    });

    $('a[data-rel^=lightcase]').lightcase({
        maxHeight:1000,
        labels:{
          'errorMessage': 'Ресурс не найден...',
          'sequenceInfo.of': ' из ',
          'close': 'Закрыть',
          'navigator.prev': 'След',
          'navigator.next': 'Пред',
          'navigator.play': 'Старт',
          'navigator.pause': 'Пауза'
        },
        //
        // showSequenceInfo: false,
        // iframe: {
        //     width: 'auto',
        //     height: 'auto',
        //     frameborder: 0
        // }
    });



    $('.massonry-grid').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.grid-item',
        // use element for option
        columnWidth: '.grid-sizer',
        percentPosition: true
    })

});

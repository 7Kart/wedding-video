jQuery(document).ready(function(){
    $('#fullpage').fullpage({
        sectionsColor:[null,"#1BBF7C","#7E8F7C","#1BBF7C"],
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
        slidesNavigation:true,
        menu: '#mainMenu',
        scrollOverflow:true,
        afterLoad: function(anchorLink, index){
            if(index == 2){
                $('.massonry-grid').masonry({
                    itemSelector: '.item'
                });
            }
        }
    });

    $('a[data-rel^=lightcase]').lightcase({
        maxHeight:1600,
        labels:{
          'errorMessage': 'Ресурс не найден...',
          'sequenceInfo.of': ' из ',
          'close': 'Закрыть',
          'navigator.prev': 'След',
          'navigator.next': 'Пред',
          'navigator.play': 'Старт',
          'navigator.pause': 'Пауза'
        }
    });





});

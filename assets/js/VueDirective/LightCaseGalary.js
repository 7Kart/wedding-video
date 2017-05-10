/**
 * Created by kristofer on 11.04.17.
 */
//инициализация галерии
Vue.directive("lightcasegalery",{
    inserted: function(el, binding) {
        $(el).lightcase({
            maxHeight: 1600,
            labels: {
                'errorMessage': 'Ресурс не найден...',
                'sequenceInfo.of': ' из ',
                'close': 'Закрыть',
                'navigator.prev': 'След',
                'navigator.next': 'Пред',
                'navigator.play': 'Старт',
                'navigator.pause': 'Пауза'
            },
            iframe:{
                width : '800',
                height : '500',
                frameborder : 0,
                allowfullscreen:true,
                webkitallowfullscreen: true,
                mozallowfullscreen: true
            },
            video:{
                width : 800,
                height : 450,
                poster : 'https://player.vimeo.com/video/201188546',
                preload : 'auto',
                controls : true,
                autobuffer : true,
                autoplay : false,
                loop : false
            }
        });
    }
});
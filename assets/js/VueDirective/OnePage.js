/**
 * Created by kristofer on 11.04.17.
 */
Vue.directive("onepage",{

    inserted: function(el, binding){

        $(el).fullpage({
            sectionsColor: [null, "#1BBF7C", "#7E8F7C", "#1BBF7C"],
            anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
            slidesNavigation: true,
            // controlArrows: false,
            // lazyLoading: false,
            menu: '#mainMenu',
            scrollOverflow: true,
            offsetSections: true,
            // scrollOverflowReset: true,
            afterLoad: function (anchorLink, index) {
                if(index === 2){

                    console.log("loaded", anchorLink, index);
                    // console.log("data in directive", binding.value[1].length);
                    if(binding.value[1].length == 0){
                        getPortfolio(1, function(data){
                            console.log("data load", data);
                            if(binding.value[1].length > 0){
                                binding.value[1].splice(0, data.portfolios.length)
                            }
                            for(var i=0; i< data.portfolios.length; i++){
                                binding.value[1].push(data.portfolios[i]);
                            }
                            setTimeout(function(){
                                $.fn.fullpage.reBuild();
                                $('.massonry-grid').masonry({
                                    itemSelector: '.item',
                                    columnWidth: '.item'
                                    // percentPosition: true
                                });
                            }, 100)

                        });
                    }


                }
            },


            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
                console.log("!!!", anchorLink, index, slideAnchor, slideIndex);
                var slideIndex = slideIndex + 1;
                if(binding.value[slideIndex].length == 0){
                    getPortfolio(slideIndex, function(data){
                        console.log("data load!", data);

                        if(binding.value[slideIndex].length > 0){
                            binding.value[slideIndex].splice(0, data.portfolios.length)
                        }
                        for(var i=0; i< data.portfolios.length; i++){
                            binding.value[slideIndex].push(data.portfolios[i]);
                        }
                        $.fn.fullpage.reBuild();

                    });
                }


            }
        });
    }
});

function getPortfolio(slide, callback){
    $.ajax({
        type: "GET",
        url: "/portfolio",
        data: {
            slide:1*slide
        },
        success: function(data){
            callback(data);
        },
        error: function(){
            console.log("query error");
        }
        // dataType: dataTypek
    });
}
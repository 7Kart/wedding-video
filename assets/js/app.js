
jQuery(document).ready(function () {

    Vue.component('modalWindow',{
        template: window.template.modalWindow,
        props:['visible'],
        data: function(){
            return{
                inputType:"filePhoto",
                modalData:{}
            }
        },
        methods:{
            modalEmitWindHide:function(){
                this.$emit("hide");
            },
            changeFiletype: function(e){
                this.inputType = $(e.currentTarget).val();
            },
            serialiseForm: function(data){
                $.ajax({
                    type: "POST",
                    url: "/add",
                    data: this.modalData,
                    success: function(data){
                        console.log("data",data);
                    },
                    error: function(){
                        console.log("query error");
                    }
                    // dataType: dataTypek
                });
            },
            showFile: function(fContent){
                this.modalData["file"] = fContent
            }
        }
    });

    Vue.component('filePhoto',{
        template: window.template.inputFile,
        data:function(){
            return{
                fileUrl:null
            }
        },
        methods:{
            loadFile: function(e){
                var file = $(e.currentTarget)[0].files[0];
                var imageReq = /^image\//;
                var that = this;
                if(imageReq.test(file.type)){
                    var reader = new FileReader();
                    reader.onload = function(event){
                        var content = event.target.result;
                        that.fileUrl = content;
                        var sendFile = {
                            name:file.name,
                            type:file.type,
                            content:content
                        };
                        that.$emit("fileLoad",JSON.stringify(sendFile));
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
    });

    Vue.component('linkPhoto',{
        template: window.template.inputLink
    });

    Vue.component('fileVideo',{
        template: window.template.inputVideo
    });

    Vue.component('linkVideo',{
        template: window.template.linkVideo
    });

    Vue.directive("onepage",{
        inserted: function(el, binding){
            $(el).fullpage({
                sectionsColor: [null, "#1BBF7C", "#7E8F7C", "#1BBF7C"],
                anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
                slidesNavigation: true,
                menu: '#mainMenu',
                scrollOverflow: true,
                afterLoad: function (anchorLink, index) {
                    if (index == 2) {
                        getPortfolio(1, function(data){
                            binding.value.splice(0,binding.value.length);
                            for(var i=0; i< data.portfolios.length; i++){
                                console.log("data.portfolios[i]",data.portfolios[i]);
                                binding.value.push(data.portfolios[i]);
                                $('.massonry-grid').masonry({
                                    itemSelector: '.item'
                                });
                            }
                            console.log("binding",binding);
                        });

                    }
                },
                afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
                    console.log("!!!", anchorLink, index, slideAnchor, slideIndex);

                }
            });
        }
    });

    var app = new Vue({
        el:"#app",
        data:{
            portfolioLinks:[
                {link:"images/portfolio/firstPage/1.jpg"},
                {link:"images/portfolio/firstPage/2.jpg"},
                {link:"images/portfolio/firstPage/3.jpg"},
                {link:"https://player.vimeo.com/video/201188546"}
            ],
            modalWindowOpen:false,
            portfolioList: [1,2,3]
        },
        methods:{
            modalWindShow: function(){
                this.modalWindowOpen = !this.modalWindowOpen;
            }
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





    $('a[data-rel^=lightcase]').lightcase({
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
        }
    });


});

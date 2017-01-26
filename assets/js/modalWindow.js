var ModalWindow = function(mask, form){
    var mask = mask;
    var form = form;

    this.openModal = function(){
        mask.fadeIn(400, function(){
            form
                .css('display', 'block')
                .animate({opacity: 1, top: '25%'}, 200);
        });
    };

    this.closeModal = function(){
        form.animate({top: '5%'}, 200, function(){
            $(this).css("display","none");
            mask.fadeOut(400);
        });
    };
};
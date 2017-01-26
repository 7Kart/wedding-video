var DownLoader = function(){
    return {
        init: function(element){
            console.log("init element", element);
            element.on('change', function(e){
                var files  = $(this)[0].files;
                var imageReg = /^image\//;
                for(var i=0; i<files.length;  i++){
                    var file = files[i];
                    if(imageReg.test(file.type)){
                        var reader = new FileReader();
                        reader.onload = function(event){
                            var content = event.target.result;
                            var prevFile = "<img class='prewImg' src='" + content + "'/>";
                            $(".previewFileList").append(prevFile);
                        };
                        reader.onerror = function(event){
                            $(".previewFileList").text("fileL load error");
                        };
                        reader.readAsDataURL(file);
                    }
                }
            });
        },
        remove:function(element){
            element.off('change');
        }
    }
};
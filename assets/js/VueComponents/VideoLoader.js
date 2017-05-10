/**
 * Created by kristofer on 11.04.17.
 */
Vue.component('fileVideo',{
    template: window.template.inputVideo,
    data:function(){
        return{
            videoUrl:null,
            coverImgPath: null
        }
    },
    methods:{
        loadVideo: function(e){
            const file = $(e.currentTarget)[0].files[0];
            const URL =  window.URL || window.webkitURL;
            const videoReg = /^video\//;
            if(videoReg.test(file.type)){
                this.fileUrl = URL.createObjectURL(file);
                this.$emit("fileLoad",file);
            }
        },

        coverLoad: function(e){
            const file = $(e.currentTarget)[0].files[0];
            const URL =  window.URL || window.webkitURL;
            const imageReg = /^image\//;
            if(imageReg.test(file.type)){
                this.coverImgPath = URL.createObjectURL(file);
                this.$emit("coverLoad",file);
            }
        }
    }
});
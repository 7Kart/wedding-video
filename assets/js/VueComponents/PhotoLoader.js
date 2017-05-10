Vue.component('filePhoto',{
    template: window.template.inputFile,
    data:function(){
        return{
            fileUrl:null
        }
    },
    methods:{
        loadFile: function(e){
            const file = $(e.currentTarget)[0].files[0];
            const URL =  window.URL || window.webkitURL;
            this.fileUrl = URL.createObjectURL(file);
            const imageReg = /^image\//;
            if(imageReg.test(file.type)) {
                this.$emit("fileLoad", file);
            }
        }
    }
});
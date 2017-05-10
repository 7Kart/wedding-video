/**
 * Created by kristofer on 11.04.17.
 */
Vue.component('linkVideo', {
    data:function(){
        return{
            coverImgPath: null
        }
    },
    template: window.template.linkVideo,
    methods: {
        addFileLink: function (e) {
            this.$emit("linkInp", e.target.value);
        },
        coverLoad: function (e) {
            const file = $(e.currentTarget)[0].files[0];
            const URL = window.URL || window.webkitURL;
            const imageReg = /^image\//;
            if (imageReg.test(file.type)) {
                this.coverImgPath = URL.createObjectURL(file);
                this.$emit("coverLoad", file);
            }
        }
    }
});
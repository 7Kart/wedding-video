/**
 * Created by kristofer on 11.04.17.
 */
//компонент для загрузки ссылки на фото
Vue.component('linkPhoto',{
    template: window.template.inputLink,
    methods:{
        addFileLink: function (e) {
            this.$emit("linkInp", e.target.value);
        }
    }
});
jQuery(document).ready(function () {
    var app = new Vue({
        el:"#app",
        data:{
            modalWindowOpen:false,
            openMenu: false,
            portfolioList: {
                1:[],
                2:[],
                3:[],
                4:[]
            },
            slideCount: 4
        },
        methods:{
            setPortfolio:function(data){
                console.log("portfolios", data);
            },

            openMobileMenu:function(){
                this.openMenu = !this.openMenu;
            },

            update: function(){
                console.log("update");
            },
            
            modalWindShow: function(){
                this.modalWindowOpen = !this.modalWindowOpen;
            }
        }
    });
});

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
            delete this.modalData.file;
            delete this.modalData.cover;
            delete this.modalData.linkFile;
            this.inputType = $(e.currentTarget).val();
        },
        serialiseForm: function(data){
            console.log("data serialise", data);
            const formData = new FormData();

            for(key in data){
                formData.append(key, data[key]);
            }
            var that = this;
            $.ajax({
                type: "POST",
                url: "/add",
                processData: false,
                contentType: false,
                headers:{
                    "Content-type":undefined
                },
                data: formData,
                success: function(data){
                    //при успешном добавлении
                    if(data.status === 200){
                        that.modalEmitWindHide();
                    }

                    console.log("data",data);
                },
                error: function(){
                    console.log("query error");
                }
            });
        },
        setFile: function(fContent){
            this.modalData["file"] = fContent;
        },
        setCover: function(fCoverContent){
            this.modalData["cover"] = fCoverContent
        },
        setlinkPath: function(link){
            this.modalData["linkFile"] = link;
        }
    }
});
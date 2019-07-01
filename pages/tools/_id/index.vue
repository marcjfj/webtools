<template lang="pug">

.tool-cont
    h1 {{tool.title}} 
    button.stars(v-on:click="starThis(tool, toolStars)" v-bind:class="{starred: starred}") 
        h3 {{tool.stars.length}}
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path d="M10 1l3 6 6 .75-4.12 4.62L16 19l-6-3-6 3 1.13-6.63L1 7.75 7 7z" /><rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" /></svg>
    
    img(:src="'http://localhost:1337' + tool.image.url")
    p {{tool.description}}

    a(:href="tool.link") Visit Page
    
</template>

<script>

import axios from "axios";
import Strapi from 'strapi-sdk-javascript/build/main'
import { mapMutations } from 'vuex'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)



export default {
    
    data() {
        return {
            tool: [],
            toolStars: '',
            starred: ''
        };
    },
    async asyncData ({route}) {
        let {data} = await axios.get(`http://localhost:1337/tools/`+route.params.id)
        return {tool:data, toolStars: data.stars.length}
    },


    methods: {
       
        async starThis(tool, toolStars) {
            let user = this.$store.getters['auth/user'];
            let stars = this.tool.stars;
                

                if (!this.starred && user){
                    // let stars = tool.stars;
                    strapi.createEntry("stars", {tool: tool, user: user})
                    .then(async ()=>{
                        let data = await axios.get(`http://localhost:1337/tools/`+this.tool.id)
                        
                        this.tool = data.data
                    })

                    this.starred = true;
                }else if (user){
                    

                    let userStar = stars.find((o, i) => {
                        if (o.user === user.id){
                            strapi.deleteEntry("stars", o.id)
                            .then(async ()=>{
                                let data = await axios.get(`http://localhost:1337/tools/`+this.tool.id)
                                
                                this.tool = data.data
                            })
                            
                            this.starred = false;
                        }
                    })

                }
                
                
                
        },
        

    },
    mounted: function() {
        
            let user = this.$store.getters['auth/user'];
            let stars = this.tool.stars;
            if(user){
                this.starred = stars.some(el => el.user === user.id);
            }
            
        
    }

}


</script>

<style lang='scss'>

.tool-cont{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: rgba(17, 19, 22, 0.336);
    padding: 25px 10px;
    h1{
        margin: 50px auto 25px auto;
    }
    .stars{
        font-size: 1.2rem;
        color:#FFF;
        // color:rgb(238, 196, 81);
        margin-bottom: 20px;
        display: inline-flex;
        align-items: center;
        background: rgb(40,41,45);
        background: linear-gradient(90deg, rgb(70, 71, 78) 0%, rgb(65, 68, 97)100%);
        padding: 5px 15px;
        border:2px solid transparent;
        border-radius: 3px;
        svg{
            fill: #FFF;
            // fill: rgb(238, 196, 81);
            margin-left: 5px;
        }
        transition: all .1s ease-in;
    }
    .starred{
        color: rgb(238, 196, 81);
        svg{
            fill:rgb(238, 196, 81);
        }
    }

    .stars:hover{
        transform: scale(1.05);
        
        // background: rgb(189, 156, 64);
        box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);
        border: 2px solid rgb(189, 156, 64);


        
        
    }
    img{
        max-height: 40vh;
        max-width: 100%;
        display: block;
        box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);

    }
    p{
        color: #FFF;
        max-width: 900px;
        padding: 20px;
        text-align: center;
    }

    a{
        color:rgb(238, 196, 81);
        font-size: 1.5rem;
    }
}


</style>

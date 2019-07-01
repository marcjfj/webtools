<template lang="pug">
    .container.profile
        h1 {{user.username}}

        .user-starred
            h2 Your favorite tools
            nuxt-link.starred-tool(v-for="star in user.stars" :key="star.id" :to="'tools/'+star.tool.id")
                
                .image(:style="{'background-image': 'url(http://localhost:1337' + star.tool.image.url + ')'}")
                    .image-filter
                .desc
                    h3 {{star.tool.title}}
                        span.stars
                            span {{star.tool.stars.length}}
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path d="M10 1l3 6 6 .75-4.12 4.62L16 19l-6-3-6 3 1.13-6.63L1 7.75 7 7z" /><rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" /></svg>
                    
                    p {{star.tool.description}}
                    ul
                        li(v-for="tag in star.tool.tags" :key="tag.id") {{tag.tag}}


        
</template>

<script>
import { mapMutations } from 'vuex'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
export default {
    data() {
        return {
            
        };
    },
    async fetch ({store}) {
        let user = store.getters['auth/user'];
        console.log(user)
        const userRes = await strapi.request('post', '/graphql', {
            data: {
                query: `query{
                            user(id:${user.id}){
                                    username
                                    id
                                    stars(sort:"created_at:desc"){
                                        id
                                        created_at
                                        tool{
                                            id
                                            title
                                            description
                                            stars{
                                                id
                                            }
                                            tags{
                                                id
                                                tag
                                            }
                                            image{
                                                url
                                            }
                                            
                                            
                                        }
                                    }
                            }
                        }
                    `
                }
            })
            
            console.log(userRes.data.user)
            store.commit('userData/emptyList')
            store.commit('userData/add', {
                id: userRes.data.user.id,
                ...userRes.data.user
            })
            
        
    },
    computed: {
        user() {
            return this.$store.getters['userData/list'][0]
        }
    },
    methods:{

    },
    

}
</script>

<style lang="scss">

.profile{
    h1{
        margin-top: 50px;
    }

    .user-starred{
        max-width: 1080px;
        margin: 50px auto;
    }

    .starred-tool{
        background: rgba(91, 91, 94, 0.192);
        padding: 10px;
        overflow: hidden;
        margin: 5px;
        box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);
        display: flex;
        

        h3{
            text-align: left;
            color: rgb(238, 196, 81);
        }
        p{
            text-align: left;
            color: rgb(170, 224, 255);
        }
        .stars{
            // background: rgb(238, 196, 81);
            // color: #222;
            padding: 2px;
            display: inline-flex;
            float:right;
            margin-left: 10px;
            // align-items: center;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1;
            svg{
                fill: rgb(238, 196, 81);
                margin-left: 5px;
                padding: 0px;
            }
        }
        .image{
        
            width: 100px;
            background-size: cover;
            display: block;
            flex-grow: 0;
            flex-basis: 100px;
            flex-shrink: 0;
            margin-right: 15px;

            .image-filter{
                background: radial-gradient(circle, rgba(95, 110, 116, 0.281) 0%, rgba(35, 53, 80, 0.568) 100%);
                height: 100%;
                width: 100%;
            }
        }
        .desc{
            flex-grow: 1;
            ul{
                padding: 5px 0px;;
                text-align: left;
            }
            li{
                list-style: none;
                background: rgb(238, 196, 81);
                color: #000;
                display: inline-block;
                padding: 1px 10px;
                border-radius: 1000px;
                margin: 0px 3px;
            }
        }
    }
}


</style>

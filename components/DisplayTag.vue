<template lang="pug">
    .box
        h2 {{ tag }}
        .tools(v-for="tool in tools" :style="{'background-image': 'url(http://localhost:1337' + tool.image.url + ')'}")

            nuxt-link( :to="'tools/'+tool.id"  )
                
                h3 {{tool.title}}

                .stars
                    span {{tool.stars.length}} 
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path d="M10 1l3 6 6 .75-4.12 4.62L16 19l-6-3-6 3 1.13-6.63L1 7.75 7 7z" /><rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" /></svg>

        nuxt-link.see-all(:to="'tags/'+tag") See All
        
    
</template>

<script>
export default {
    name: "DisplayTags",
    props: ["tag", "tools"]
}
</script>

<style lang="scss">

.box{
    background: rgba(91, 91, 94, 0.192);
    // border-radius: 7px;
    overflow: hidden;
    margin: 5px;
    box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);

    .see-all{
        font-weight: 400;
        padding: 10px;
        display:inline-block;
        text-align: right;
        color:rgb(238, 196, 81);
    }

    
    h2{
        // background: rgb(56, 57, 65);
        font-weight: 400;
        padding: 10px;
        color:rgb(238, 196, 81);
        text-transform: uppercase;
    }

    .tools{
        padding: 0px;
        margin: 10px;
        position: relative;
        background-size: cover;
        // background-position: center;
        // border-radius: 5px;
        overflow: hidden;
        box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);
        
        
        
        a{
            height: 100px;
            // width: 200px;
            position: relative;
            display: block;
            background-size: cover;
            background-position: center;
            flex-direction: column;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle, rgba(95, 110, 116, 0.39) 0%, rgba(35, 53, 80, 0.726) 100%);
        }
        a:hover h3{
            transform: scale(1.1);
        }
        h3{
            transition: all .2s;
            color: #FFF;
            font-size: 1.5rem;
            text-shadow: 0px 1px 5px rgb(17, 22, 41);
            font-weight: 400;
            // letter-spacing: 1px;

        }

        .stars{
            position: absolute;
            bottom: 5px;
            right: 10px;
            display: flex;
            align-items: center;
            text-shadow: 0px 1px 5px rgb(17, 22, 41);
            span{
                color: #FFF;
                // color: rgb(238, 196, 81);
                padding: 2px;
            }

            svg{
                fill: #FFF;
                // fill: rgb(238, 196, 81);
            }
        }
        
    }
}

</style>

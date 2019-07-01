<template lang="pug">
  .container
    .intro
      h1 A collection of <span>&lt;free/&gt;</span> web development tools
    .search-box
      input(v-model="query" type="search")
      //- button.search-btn Search
      
    .search-results
      transition-group(name="slide-fade")
        nuxt-link.result(v-for="tool in filteredList" :key="tool.id" :to="'tools/'+tool.id")
          .image(:style="{'background-image': 'url(http://localhost:1337' + tool.image.url + ')'}")
            .image-filter
          .desc
            h3 {{tool.title}}
              span.stars
                span {{tool.stars.length}}
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path d="M10 1l3 6 6 .75-4.12 4.62L16 19l-6-3-6 3 1.13-6.63L1 7.75 7 7z" /><rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" /></svg>
              
            p {{tool.description}}
            ul
                li(v-for="tag in tool.tags") {{tag.tag}}
    h2.section-title Popular
    .tags
      
      DisplayTag( v-for="tag in tags" :key="tag.id" :id="tag.id" :tag="tag.tag" :tools="tag.tools")
    
</template>

<script>
import axios from "axios";
import DisplayTag from '~/components/DisplayTag.vue'


import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
export default {

  components: {
    DisplayTag
  },

  data() {
    return {
      query: ''
    }
  },
  computed: {
    filteredList() {
      if (this.query.length > 2){
        return this.tools.filter(tool => {
          let toolTags = JSON.stringify(tool.tags).replace(/"tag":/g, " ");
          return (tool.title.toLowerCase().includes(this.query.toLowerCase()) || tool.description.toLowerCase().includes(this.query.toLowerCase()) || toolTags.toLowerCase().includes(this.query.toLowerCase()))
        })
      }
    },
    tags() {
      return this.$store.getters['tags/list']
    },
    tools() {
      return this.$store.getters['tools/list']
    },
  },
  
  async fetch({ store }) {
    store.commit('tags/emptyList')
    const tagRes = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            tags {
              id
              tag
              
              tools{
                id
                title
                image{
                  url
                }
                stars{
                  id
                }
              }
            }
          }
          `
      }
    })

    tagRes.data.tags.forEach(tag => {
      
      store.commit('tags/add', {
        id: tag.id,
        ...tag
      })
    })

    store.commit('tools/emptyList')
    const toolRes = await strapi.request('post', '/graphql', {
      data: {
        query: `query{
                  tools{
                    id
                    title
                    description
                    image{
                      url
                    }
                    tags{
                      tag
                    }
                    stars{
                      id
                    }
                  }
                }
              `
      }
    })
    toolRes.data.tools.forEach(tool => {
      
      store.commit('tools/add', {
        id: tool.id,
        ...tool
      })
    })


  },


}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 90vh;
  // display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
}

.intro{
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.tags{
  margin: 0px auto;
  flex-wrap: wrap;
  // width: 100%;
  display: flex;
  justify-content:center;
  padding: 0px 5px;

  div{
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 300px;
    max-width: 500px;
  }
}

.search-box{
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 50px;
  input{
    font-size: 1.4rem;
    padding: 10px;
    width: calc(100% - 40px);
    max-width: 900px;
    background: rgb(75, 84, 100);
    border: none;
    color: rgb(170, 224, 255);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center right;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="50 -250 1500 1500"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" fill="rgb(170, 224, 255)"/><rect x="0" y="0" width="1024" height="1024" fill="rgba(0, 0, 0, 0)" /></svg>');
  
    box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);

    
  }
  input::-webkit-search-cancel-button{
    -webkit-appearance: none;
    
}
  button{
    border: none;
    box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.466);
    background: rgb(170, 224, 255);
    padding: 0px 10px;
    font-weight: 700;
    
  }
  
}

.search-results{
  position: absolute;
  background: rgb(40,41,45);
  background: linear-gradient(90deg, rgba(40,41,45,1) 0%, rgb(48, 50, 73) 100%);
  z-index: 500;
  width: 100%;
  box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);
  margin-top: -25px;
  padding: 0px 10px;

  
}
.result:first-child{
  margin-top: 25px;
}
.result{
  background: rgba(91, 91, 94, 0.192);
    // border-radius: 7px;
    overflow: hidden;
    margin: 5px;
    box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);
    padding: 10px;
    max-width: 1080px;
    margin: 5px auto;
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
.result:last-child{
  margin-bottom: 25px;
}
.section-title{
  // max-width: 1080px;
  padding-left: 15px;
  margin: 10px auto;
  text-align: left;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

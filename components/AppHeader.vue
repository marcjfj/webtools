<template lang="pug">
header
  .logo
    nuxt-link(to="/")
      h2 webtools
        span .cc
  nav
    ul
      li Browse
      li About
      li(v-if="!username")
        nuxt-link(to="/signin") Sign in
      li.sign-up(v-if="!username")
        nuxt-link(to="/signup") Sign up
      li.user-button(v-if="username" v-on:click="userToolHidden = !userToolHidden") {{username}}
        ul.user-options(v-if="!userToolHidden" v-on-clickaway="away")
          li
            nuxt-link(to="/profile") Profile
          li
            nuxt-link(to="/submittool") Submit tool
          li
            nuxt-link(@click.native="logout" to="/") Log out
</template>
<script>
import { mapMutations } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway';
export default {
  data(){
    return {
      userToolHidden: true,
    }
  },
  computed: {
    username() {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout'
      
    }),
    away: function() {
      console.log('clicked away');
      this.userToolHidden = true
    },
  },
  mixins: [ clickaway ],
  template: '<p v-on-clickaway="away">Click away</p>',
}
</script>
<style lang="scss">
header{
  h2{
    padding-left: 15px;
  }
}
.sign-up{
  a{
      color: rgb(238, 196, 81);
  }
  
}
li a{
  color: #FFF;
}
.user-button{
  color: rgb(238, 196, 81);
  position: relative;
  cursor: pointer;
  padding-right: 10px;
  ul::before{
    position: absolute;
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-bottom: 10px solid #37394A;;
    top: -20px;
    right: 10px;
    box-sizing: content-box;
    content: '';
  }
  ul{
    position: absolute;
    padding: 10px 10px;
    width: 150px;
    right: 10px;
    top: 35px;
    margin-top: 5px;
    background: #37394A;
    box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.623);
    padding-bottom: 20px;
    li{
      color: #FFF;
      display: block;
      padding: 10px 5px;
      margin:2px 0px;
      
      

      a{
        color: #FFF;
      }
      a:hover{
        color: rgb(238, 196, 81);
      }
    }
  }
}

</style>


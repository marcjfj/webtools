<template>
  <div>
    <AppHeader />
    <nuxt />
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader";
export default {
  components: {
    AppHeader
  }
}
</script>


<style lang="scss">
html {
  font-family: 'Source Code Pro', monospace;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body{
  background: rgb(40,41,45);
  background: linear-gradient(90deg, rgba(40,41,45,1) 0%, rgb(48, 50, 73) 100%);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

button, input, textarea {
  font-family: 'Source Code Pro', monospace;
}

a{
  text-decoration: none;
}

header{
  
  color: #FFF;
  display: flex;
  align-items: center;
  padding: 10px;
  padding-left: 20px;
  padding-top: 15px;
}

h1{
  color:rgb(170, 224, 255);
  font-weight: 400;
  span{
    color:rgb(238, 196, 81);
  }
  
}

h2{
  font-weight: 400;
  color:rgb(170, 224, 255);

  span{
    color:rgb(238, 196, 81);

  }
}

nav{
  margin-left: auto;
  ul{
    li{
      list-style: none;
      display: inline-block;
      margin-right: 25px;
    }
  }
}

.page-enter-active {
      animation: acrossIn .8s ease-out both;
    } 
    .page-leave-active {
      animation: acrossOut .2s ease-in both;
    } 
    @keyframes acrossIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes acrossOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
</style>

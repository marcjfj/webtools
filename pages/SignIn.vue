<template>
  <section class="container">
    <div class="form-box">
        <h1>Sign in</h1>
      <form autocomplete="off" @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autofocus="true"
            placeholder="Enter your email"
            required/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            label="password"
            type="password"
            class="form-control"
            autofocus="true"
            placeholder="Enter your password"
            required/>
        </div>
        <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
        <p class="already">
          No account yet?
          <router-link :to="{ name: 'SignUp'}" tag="a">
            Register
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.login(this.email, this.password)
        this.loading = false
        this.setUser(response.user)
        this.$router.push("/")
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>

<style lang="scss">

section.container{
    min-height: 75vh;
    display: flex;
    align-items: center;
}

.form-box{
    max-width: 800px;
    margin: 20px auto;
    padding: 25px;
    background: rgba(91, 91, 94, 0.192);

    box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);
    .form-group{
        margin: 15px 0px;

        label, input{
            display: block;
            width: 100%;
        }

        label{
            color: rgb(238, 196, 81);
            text-align: left;
        }

        input{
            border: none;
            border-radius: none;
            font-size: 16px;
            background: rgb(81, 91, 100);
            padding: 7px;
            color: rgb(170, 224, 255);
        }
        ::placeholder{
            color: rgb(102, 129, 146);
        }
        
    }
    button{
            border: none;
            border-radius: none;
            padding: 5px 15px;
            background: rgb(135, 177, 201);
            font-size: 16px;
        }
}

.already{
    color: rgb(170, 224, 255);
    margin-top: 25px;
    a{
        color: rgb(238, 196, 81);
    }
}

</style>

<template>
<v-layout justify-center>
  <v-card-actions>
    <v-btn primary v-on:click="signin">
     <span>SignIn with google</span>
    </v-btn>
  </v-card-actions>
</v-layout>
</template>

<script>
import {auth} from './../plugins/firebase'
import firebase from './../plugins/firebase'

export default {
    methods:{
        signin(){
            console.log('start')
            var provider = new firebase.auth.GoogleAuthProvider();
            // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            auth.signInWithPopup(provider)
            .then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //var token = result.credential.accessToken;
                // The signed-in user info.
                //var user = result.user;
                console.log('signedin');
                this.$store.dispatch('onAuthStateChangedAction')
                this.$router.push('/');
                // ...
                }.bind(this))
            .catch(function(error) {
                // Handle Errors here.
                console.log(error)
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                });
        }
    }
}
</script>

<style>

</style>
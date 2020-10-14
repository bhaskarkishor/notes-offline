import {auth} from './../plugins/firebase.js'
export default function ({ store, error, redirect, router }) {
    if (!store.state.authUser) {
      return redirect('/login')
    }
  }
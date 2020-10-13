
export default function ({ store, error, redirect, $fireAuth }) {
    if (!$fireAuth.currentUser) {
      return redirect('/login')
    }
  }
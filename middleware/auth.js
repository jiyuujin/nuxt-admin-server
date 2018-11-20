export default function ({ store, redirect }) {
  if (!store.state.userStatus) {
    return redirect('/login')
  }
}

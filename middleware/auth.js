export default function ({ store, redirect }) {
  if (!store.state.product.userStatus) {
    return redirect('/login')
  }
}

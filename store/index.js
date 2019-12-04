
export const state = () => ({
    cart: []
})

export const mutations = {
    cart(state, carts) {
        state.cart.push(carts)
    },
    removeFromCart(state, carts) {
        let index = state.cart.indexOf(carts);
        console.log(index)
        if (index > -1) {
            state.cart.splice(index, 1);
            console.log(state.cart)
        }
    }



}

export const getters = {

    cart: state => state.cart,
}

export const actions = {

}
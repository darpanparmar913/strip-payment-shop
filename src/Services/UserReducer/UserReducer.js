const initialState = {
    data: [],
    loading: false,
    error: null,
    cartProduct: []
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SHOW_USER_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'SHOW_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case 'SHOW_USER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case 'ADD_PRODUCT':
            return {
                ...state,
                cartProduct: [...state.cartProduct, action.payload]
            }

        case 'DELETE_PRODUCT':

            const afterDeleteItem = state.cartProduct.filter((item) => {
                return item.id != action.payload.id
            })

            return {
                ...state,
                cartProduct: afterDeleteItem
            }

        default:
            return state
    }
}

export default UserReducer
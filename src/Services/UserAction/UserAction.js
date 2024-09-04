export const ShowUserRequest = () =>{
    return{
        type: 'SHOW_USER_REQUEST'
    }
}

export const ShowUserSuccess = (data) =>{
    console.log("action",data)
    return{
        type: 'SHOW_USER_SUCCESS',
        payload: data
    }
}

export const ShowUserFailure = (error) =>{
    return{
        type: 'SHOW_USER_FAILURE',
        payload: error
    }
}

export const AddProduct = (data) =>{
    return{
        type: 'ADD_PRODUCT',
        payload: data
    }
}

export const DeletecartItem = (deleteData) =>{
    return{
        type: 'DELETE_PRODUCT',
        payload: deleteData
    }
}
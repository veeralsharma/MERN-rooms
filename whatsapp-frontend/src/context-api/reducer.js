export const initialState = {
    group:{
        name:"Health Support",
        description:"providing medical help and support to those who need",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6xhytlrcUemgvBvuccp4E6FARuSkoMqkB1w&usqp=CAU"
    },
    user:null
}

export const actionTypes = {
    SET_USER:"SET_USER",
    SET_GROUP:"SET_GROUP"
}

const reducer = (state,action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                ...state,
                user:action.user
            }
        case actionTypes.SET_GROUP:
            return{
                ...state,
                group:action.group
            }
        default:
            return state;
    }
}

export default reducer
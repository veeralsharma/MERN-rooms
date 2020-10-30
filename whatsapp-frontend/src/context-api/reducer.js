export const initialState = {
    group:{
        name:"Health Support",
        description:"providing medical help and support to those who need",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6xhytlrcUemgvBvuccp4E6FARuSkoMqkB1w&usqp=CAU",
        group_code:"GRP-boyrtT"
    },
    user:null,
    joined_groups:null
}

export const actionTypes = {
    SET_USER:"SET_USER",
    SET_GROUP:"SET_GROUP",
    SET_JOINED_GROUPS:"SET_JOINED_GROUPS"
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
        case actionTypes.SET_JOINED_GROUPS:
            return{
                ...state,
                joined_groups:action.joined_groups
            }
        default:
            return state;
    }
}

export default reducer
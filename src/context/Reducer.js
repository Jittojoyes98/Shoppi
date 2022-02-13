
export default function Reducer(state,action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {...state,cart:[...state.cart,{...action.payload,qty:1}]};
        case 'REMOVE_FROM_CART':
            return {...state,cart:state.cart.filter((c)=>c.id!==action.payload.id)};
        case 'QUANTITY_ADDED':
            return {...state,cart:state.cart.filter((c)=>(c.id===action.payload.product.id)? action.payload.product.qty=action.payload.qty : action.payload.product.qty)};    
         default:
            break;
    }
}
export const FilterReducer=(state,action)=>{
    switch (action.type) {
        case 'SORT_PRODUCTS':
            return {...state,sort:action.payload}
        case 'INCLUDE_OUT_OF_STOCK':
            return {...state,OutStocks:!state.OutStocks}
        case 'FAST_DELIVERY':
            return {...state,fastdelivery:!state.fastdelivery}
        case 'SORT_RATING':
            return {...state,ratingChange:action.payload}
        case 'CLEAR_FILTER':
            return {
                ...state,
                OutStocks:false,
                fastdelivery:false,
                ratingChange:0,
                clearFilter:false,
                searchQuery:"",
            }
        case 'SEARCH_QUERY':
            return {...state,searchQuery:action.payload}
        default:
            break;
    }
}

// {...shopState,cart:[...shopState.cart,action.payload]}


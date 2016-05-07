import { combineReducers } from 'redux'

let colors = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COLOR':
            return state.concat({
                id: action.id,
                color: action.color
            });
        case 'REMOVE_COLOR':
            let id = action.id;
            return state.filter(color => {
                return color.id !== id
            });
        default:
            return state;
    }
};

let currentColor = (state = 'd51c1c', action) => {
    switch (action.type) {
        case 'SET_COLOR':
            return action.color;
        default:
            return state
    }
}

export default combineReducers({
    colors,
    currentColor
});

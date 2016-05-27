let colorId = 0;

export const setColor = (color) => {
    return {
        type: 'SET_COLOR',
        color: color
    }
};

export const addColor = (color) => {
    return {
        type: 'ADD_COLOR',
        id: colorId++,
        color: color
    }
};

export const removeColor = (id) => {
    return {
        type: 'REMOVE_COLOR',
        id: id
    }
};

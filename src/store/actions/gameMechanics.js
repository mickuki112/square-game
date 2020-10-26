import * as actionTypes from './actionTypes';

export const removePoints = () => {
    return {
        type: actionTypes.REMOVE_POINTS_OBJECT
    }
};

export const setPoints = (points) => {
    return {
        type: actionTypes.SET_POINTS_OBJECT,
        points
    }
};
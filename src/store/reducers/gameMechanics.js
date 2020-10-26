import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../common/utility';

const initState = {
    points: 0,
};

const removePoints = (state, action) => {
    return updateObject(state, {
        points: 0
    });
};

const setPoints = (state, action) => {
    return updateObject(state, {
        points: action.points+state.points,
    });
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REMOVE_POINTS_OBJECT:
            return removePoints(state, action);
        case actionTypes.SET_POINTS_OBJECT:
            return setPoints(state, action);
        default:
            return state;
    }
};

export default reducer;
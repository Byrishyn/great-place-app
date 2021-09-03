import Place from "../model/place";
import { ADD_PLACE } from "./place-actions";

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(new Date().toString(), action.placeData.title, action.placeData.image)
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
}
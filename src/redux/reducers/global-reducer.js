import {
  SET_APPBAR_TITLE,
  SET_SCREEN_TYPE,
  SET_SCREEN_ACTION
} from './../actionTypes'

const initialState = {
  title: 'Dashboard',
  screenType: 'view', // form
  screenAction: () => {}
}

const globalReducer = (state = initialState, action) => {
  const {payload, type} = action

  switch (type) {
    case SET_APPBAR_TITLE:
      return {
        ...state,
        title: payload
      }
    case SET_SCREEN_TYPE:
      return {
        ...state,
        screenType: payload
      }
    case SET_SCREEN_ACTION:
      return {
        ...state,
        screenAction: payload
      }
    default:
      return state
  }
}

export default globalReducer

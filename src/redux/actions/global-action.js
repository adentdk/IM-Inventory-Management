import {
  SET_APPBAR_TITLE,
  SET_SCREEN_TYPE,
  SET_SCREEN_ACTION
} from './../actionTypes'

export const setAppBarTitle = title => {
  return dispatch => {
    dispatch({
      type: SET_APPBAR_TITLE,
      payload: title
    })
  }
}

export const setScreenType = screenType => {
  return dispatch => {
    dispatch({
      type: SET_SCREEN_TYPE,
      payload: screenType
    })
  }
}

export const setScreenAction = screenAction => {
  return dispatch => {
    dispatch({
      type: SET_SCREEN_ACTION,
      payload: screenAction
    })
  }
}
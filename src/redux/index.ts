import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import global, { GlobalState } from './global';

export interface ReducerState {
  global: GlobalState;
}

const rootReducer = combineReducers<ReducerState>({
  global,
});

const store: any = createStore(rootReducer, applyMiddleware(thunk));

export default store;

import{createStore,combineReducers,applyMiddleware} from 'redux';
import{Dishes} from './dishes';
import{Leaders} from './leaders';
import{Comments} from './comment';
import{Promotions} from './promotion';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import{createForms} from 'react-redux-form';
import {InitialFeedback} from './form';
export const ConfigureStore=()=>{
    const store=createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            promotions:Promotions,
            leaders:Leaders,
            ...createForms({
                feedback:InitialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}
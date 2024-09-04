import { applyMiddleware, compose, createStore } from "redux";
import UserReducer from "./Services/UserReducer/UserReducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./Services/SagaFunc/SagaFunc";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage
}

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, UserReducer);

const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default store
export {persistor}
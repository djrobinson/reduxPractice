const counter = (state = 0, action) => {
  switch (action.type){
    case "INCREMENT":
       return state + 1;
    case "DECREMENT":
       return state - 1;
    default:
      return state;
  }
};

//Reimplementing the Redux Store

//createStore takes a reducer that will modify state
const createStore = (reducer) => {

  //creating state variable, list of listeners
  let state;
  let listeners = [];

  //get state returns the current state
  const getState = () => state;

  //dispatch is the only way to change the current state via the reducer
  //it will notify each listener after being called
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  //Subscribe will add listener to listener array.
  //returns function that will remove unsubscribed components
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () =>{
  store.dispatch({type: "INCREMENT"});
});
import { createStore, combineReducers } from "redux";

//<------------------
/* ACTION CREATORS */
//<------------------

const addNewMessageActionCreator = ({ userName, text }) => ({
  type: "ADD_MESSAGE",
  payload: { userName, text }
});

const addUserActionCreator = ({ userName }) => ({
  type: "ADD_USER",
  payload: { userName }
});

//<------------------
/* REDUCERS */
//<------------------

const defaultAppState = { userName: "", text: "" };

const messagesReducer = function(previousState = defaultAppState, action) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        userName: action.payload.userName,
        text: action.payload.text
      };
    default:
      return previousState;
  }
};

const usersReducer = function(previousState = { userList: [] }, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        userList: [...previousState.userList, action.payload]
      };
    case "ADD_MESSAGE":
      var names = previousState.userList.map(function(user) {
        return user.userName;
      });
      if (names.indexOf(action.payload.userName) === -1) {
        return {
          userList: [
            ...previousState.userList,
            { userName: action.payload.userName }
          ]
        };
      }
    default:
      return previousState;
  }
};

const chatRoomReducer = function(previousState = [], action) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...previousState, action.payload];
    default:
      return previousState;
  }
};

const rootReducer = combineReducers({
  messages: messagesReducer,
  users: usersReducer,
  chatList: chatRoomReducer
});

//<------------------
/* INITIAL STATE */
//<------------------

const storeInitialState = {
  messages: { userName: "", text: "" },
  users: {
    userList: []
  },
  chatList: []
};

const store = createStore(rootReducer, storeInitialState);
window.__store = store;

/* 
To add items to the store in the browser, write the statement below in the brower's console:
let store = window.__store
then dispatch your action creators in the console as an argument inside dispatch like so:
store.dispatch({
  type: "ADD_MESSAGE",
  payload: { userName: "Lauren", text: "Where should we go out to eat?" }
})

NOT like so:
store.dispatch(addNewMessageActionCreator({
    userName: "Lauren",
    text: "Where should we go out to eat?"
)

*/

//console.log("Current State before dispatching actions with action creator >>>", store.getState());

/* In messagesReducer, comment out the "case" after the switch statement 
as well as the return statement right below the case.
call the dispatch function below. 
Because we are not handling the action type, note that the previous state is returned.
Now let's handle that action by uncommenting the case and return statement. Note the new current state. */

store.dispatch(
  addNewMessageActionCreator({
    userName: "Lauren",
    text: "Where should we go out to eat?"
  })
);

store.dispatch(
  addNewMessageActionCreator({
    userName: "Trevor",
    text: "Anywhere, I'm SO HUNGRY!!"
  })
);

store.dispatch(
  addUserActionCreator({
    userName: "Jimmy_Cliff"
  })
);

store.dispatch(
  addUserActionCreator({
    userName: "Matt_England"
  })
);

store.dispatch(
  addNewMessageActionCreator({
    userName: "Matt_England",
    text: "DOWN WITH PICKLES!!"
  })
);

store.dispatch(
  addNewMessageActionCreator({
    userName: "Jimmy_Cliff",
    text: "Anywhere, I am not that hungry!!"
  })
);

store.dispatch(
  addNewMessageActionCreator({
    userName: "Crunch",
    text: "CHOMP"
  })
);

store.dispatch(
  addNewMessageActionCreator({
    userName: "trent",
    text: "teach"
  })
);

store.dispatch(
  addNewMessageActionCreator({
    userName: "trent",
    text: "teach 2x"
  })
);

console.log(
  "Current state after dispatching action with action creator >>>",
  store.getState()
);

export default store;

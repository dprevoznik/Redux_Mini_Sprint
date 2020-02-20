import React, { Component } from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";

import "./App.css";

class App extends Component {
  render() {
    console.log(">>> The state is >>> ", {
      messages: this.props.messages,
      users: this.props.users
    });
    const { users, messages, chatList } = this.props;
    return (
      <div>
        <header className="head-style">
          Welcome to Chatty Kathy
          <img
            id="logo"
            src={require("./kathy-bates.jpg")}
            style={{ width: 250, height: 200 }}
            alt="logo"
          />
        </header>
        <div id="container" className="App">
          <aside id="sidebar" className="sidebar">
            <h2>Kathy's Disciples </h2>
            <ul>
              {users.userList.map(user => {
                return (
                  <li key={uuid()}>
                    <span>
                      <b>{user.userName}</b>
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
          <div id="main">
            <span>
              Current User: <b>{messages.userName.toUpperCase()}</b>
            </span>
            <br />
            <br />
            <div id="new-message">
              <b>Your Message:</b> {messages.text}
            </div>
            <h2>Chat Feed: </h2>
            <ul>
              {chatList.map(message => {
                return (
                  <li key={uuid()}>
                    <span>
                      <b>{message.userName}:</b> <br />
                      {message.text}
                    </span>
                    <br />
                    <br />
                  </li>
                );
              })}
            </ul>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(storeState) {
  return storeState;
};

/* The connect function makes the state returned from
the mapStateToProps function available to the App component as props */
export default connect(mapStateToProps)(App);

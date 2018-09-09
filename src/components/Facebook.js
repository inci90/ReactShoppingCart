import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component{
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  }

  responseFacebook = response => {
    console.log(response);
    sessionStorage.setItem("loginData", response);
    //test fetching of user name
    console.log("Hello " + response.name + "welcome to the RMIT giftshop");
  }

  componentClicked = () => console.log("clicked");

  render() {
    let fbContent;

    if(this.state.isLoggedIn){
      fbContent = null;
    } else {
      fbContent = (<FacebookLogin
        appId="332073414030996"
        autoLoad="false"
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />)
    }

    return (
      <div>
      {fbContent}
      </div>
    )
  }
}
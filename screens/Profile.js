import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions/";
import ClientDashboard from "../components/Profile/ClientDashboard";
import Admin from "../components/Profile/Admin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }

  async componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      await this.props.fetchUser();
      const { currentUser } = this.props.userState;
      if (currentUser) {
        const { expoToken } = currentUser;
        const expoPushToken = await AsyncStorage.getItem("expoPushToken");

        if (expoToken) {
          if (expoToken !== expoPushToken) {
          }
        }

        if (!expoToken) {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              expoToken: [expoPushToken],
            })
            .then(() => {})
            .catch((err) => console.log(err));
        }
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { currentUser, loading } = this.props.userState;

    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="#FFA500" size="large" />
        </View>
      );
    }

    if (currentUser) {
      if (currentUser.role === "admin") {
        return <Admin />;
      }

      if (currentUser.role === "client") {
        return <ClientDashboard navigation={this.props.navigation} />;
      }

      return null;
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps, { fetchUser })(Profile);

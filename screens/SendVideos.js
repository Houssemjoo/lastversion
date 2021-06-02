import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { FetchUsers } from "../redux/actions";

import UsersList from "../components/SearchUsers/UsersList/UsersList";
import SearchBar from "../components/SearchUsers/SearchBar/SearchBar";
import { sendPushNotification } from "../utility/PushNotification";

const InputField = ({ handleTextChange, state }) => (
  <View style={styles.card}>
    <Text style={{ fontSize: 16, color: "#444" }}>
      Ajouter votre vidéo url :
    </Text>

    <TextInput
      value={state.url}
      onChangeText={(val) => handleTextChange(val, "url")}
      style={{ marginVertical: 15, height: 50 }}
      placeholder="Url*"
      left={<TextInput.Icon icon={"link-plus"} color={"#555"} />}
      keyboardType="default"
      autoCapitalize="none"
      autoCorrect={false}
      theme={{ colors: { primary: "#999" } }}
    />

    <TextInput
      value={state.videoTitle}
      onChangeText={(val) => handleTextChange(val, "videoTitle")}
      style={{ marginVertical: 15, height: 50 }}
      placeholder="Titre de vidéo*"
      keyboardType="default"
      autoCapitalize="none"
      autoCorrect={false}
      theme={{ colors: { primary: "#999" } }}
    />

    <TextInput
      value={state.videoDiscr}
      onChangeText={(val) => handleTextChange(val, "videoDiscr")}
      style={{ marginVertical: 15, height: 50 }}
      placeholder="Description de vidéo*"
      keyboardType="default"
      autoCapitalize="none"
      autoCorrect={false}
      theme={{ colors: { primary: "#999" } }}
    />
  </View>
);

const SendButton = ({ handleOnPress }) => {
  return (
    <Button
      color="#ee6425"
      labelStyle={{ fontSize: 18, color: "#FFF" }}
      style={{ margin: 10, marginBottom: 20 }}
      mode="contained"
      onPress={handleOnPress}
    >
      Envoyer
    </Button>
  );
};

class videoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      data: [],
      users: [],
      selectedUsers: [],
      videoTitle: "",
      videoDiscr: "",
    };
  }

  componentDidMount() {
    this.props.FetchUsers();
    const { users } = this.props.usersState;

    if (users) {
      this.setState({ users: users, data: users });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const { users } = this.props.usersState;
      if (prevProps.usersState.users !== users) {
        this.setState({ users: users, data: users });
      }
    }
  }

  handleTextChange = (val, field) => {
    const { resetCheckedUsers } = this.state;

    if (resetCheckedUsers) {
      this.setState({ resetCheckedUsers: false });
    }

    this.setState({ [field]: val });
  };

  onSearchChange = (users) => {
    this.setState({ users });
  };

  setCheckedUsers = ({ userId, checked }) => {
    const { selectedUsers, resetCheckedUsers } = this.state;

    if (checked) {
      this.setState({
        ...this.state,
        selectedUsers: [...selectedUsers, userId],
      });
    } else {
      const userIndex = selectedUsers.indexOf(userId);
      selectedUsers.splice(userIndex, 1);
      this.setState({ selectedUsers: selectedUsers });
    }
  };

  handleOnPress = async () => {
    const { url, selectedUsers, videoTitle, videoDiscr, users } = this.state;
    let validation = true;
    const Tokens = [];

    selectedUsers.forEach((su) => {
      const indexOfuser = users.map((u) => u.userId).indexOf(su);
      if (users[indexOfuser].expoToken) {
        Tokens.push(users[indexOfuser].expoToken);
      }
    });

    if (url.trim().length === 0) {
      validation = false;
    }

    if (videoTitle.trim().length === 0) {
      validation = false;
    }

    if (videoDiscr.trim().length === 0) {
      validation = false;
    }

    if (selectedUsers.length === 0) {
      validation = false;
    }

    if (!validation) {
      alert("Completez les champs ⚠️");
    }

    if (validation) {
      firebase
        .firestore()
        .collection("videos")
        .add({
          title: videoTitle,
          description: videoDiscr,
          url: url,
          usersId: selectedUsers,
          createdAt: new Date(),
        })
        .then(() => {
          this.setState({
            url: "",
            videoTitle: "",
            videoDiscr: "",
            selectedUsers: [],
          });
          sendPushNotification({
            expoPushToken: Tokens,
            title: `Nouvelle Vidéo: ${videoTitle}`,
            body: `${videoDiscr}`,
          });
          alert("Vidéo bien envoyée ✔️");
        })
        .catch((err) => {
          alert("Server Error ❌");
        });
    }
  };

  render() {
    const { data, users, url, videoDiscr, videoTitle, selectedUsers } =
      this.state;

    const Data = [
      {
        name: "InputField",
        handleTextChange: this.handleTextChange,
        state: { url, videoDiscr, videoTitle },
      },
      {
        name: "SearchUsers",
        Users: data,
        onSearchChange: this.onSearchChange,
      },
      {
        name: "usersList",
        users: users,
        setCheckedUsers: this.setCheckedUsers,
        selectedUsers: selectedUsers,
      },
    ];

    const keyExtractor = (_, index) => index.toString();

    const renderItem = ({ item }) => {
      if (item.name === "InputField") {
        return <InputField {...item} />;
      }

      if (item.name === "SearchUsers") {
        return <SearchBar {...item} />;
      }

      if (item.name === "usersList") {
        return <UsersList {...item} />;
      }

      return null;
    };

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />

        <SendButton handleOnPress={this.handleOnPress} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  usersState: state.usersState,
});

export default connect(mapStateToProps, { FetchUsers })(videoScreen);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    margin: 10,
    padding: 10,
    elevation: 1,
    borderRadius: 8,
  },
});

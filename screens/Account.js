import React, { PureComponent } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Title, TouchableRipple, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import UserImage from "../components/UserImage/UserImage";
import { connect } from "react-redux";

const marginTop = StatusBar.currentHeight + 90;

export class Account extends PureComponent {
  constructor(props) {
    super(props);
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  logout = () => {
    if (this.mounted) {
      firebase.auth().signOut();
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {
      address = "",
      email = "",
      firstName = "",
      lastName = "",
      num = "",
      role = "",
      sourceImg = "",
    } = this.props.userState.currentUser;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFF" />

        <ScrollView>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              backgroundColor: "#07263e",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ marginTop: marginTop }}>
              <UserImage sourceUrl={sourceImg} />

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 60,
                      flexShrink: 1,
                    },
                  ]}
                >
                  {lastName} {firstName}
                </Title>
              </View>
            </View>
          </View>

          {/* <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {" "}
                {address}{" "}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}> {num} </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {" "}
                {email}{" "}
              </Text>
            </View>
          </View> */}

          <View tyle={styles.menuWrapper}>
            <TouchableRipple
              onPress={() => {
                this.props.navigation.navigate("EditProfile");
              }}
            >
              <View style={styles.menuItem}>
                <Icon
                  name="file-document-edit-outline"
                  color="#ee6425"
                  size={25}
                />
                <Text style={styles.menuItemText}>Profile</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                this.props.navigation.navigate("SendExercices");
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="share-outline" color="#ee6425" size={25} />
                <Text style={styles.menuItemText}>Exercices</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                this.props.navigation.navigate("Patients");
              }}
            >
              <View style={styles.menuItem}>
                <FontAwesomeIcons name="users" color="#ee6425" size={20} />
                <Text style={styles.menuItemText}> Patients</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                this.props.navigation.navigate("Rapports");
              }}
            >
              <View style={styles.menuItem}>
                <FontAwesomeIcons name="commenting" color="#ee6425" size={20} />
                <Text style={styles.menuItemText}> Rapports</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                this.props.navigation.navigate("Vidéos");
              }}
            >
              <View style={styles.menuItem}>
                <FontAwesomeIcons name="send" color="#ee6425" size={20} />
                <Text style={styles.menuItemText}> Vidéos</Text>
              </View>
            </TouchableRipple>
          </View>

          <Button
            icon="logout-variant"
            onPress={() => this.logout()}
            mode="contained"
            color="#ee6425"
            labelStyle={{ color: "#FFF" }}
            style={{ width: "60%", alignSelf: "center", marginVertical: 45 }}
          >
            Déconnexion
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(Account);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07263e",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    paddingTop: 30,
    marginTop: -30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#0e4875",
  },
  title: {
    fontSize: 22,
    color: "#FFF",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  menuWrapper: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#FFF",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});

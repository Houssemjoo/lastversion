import React, { PureComponent } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Title, Caption, TouchableRipple, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import UserImage from "../components/UserImage/UserImage";
import { connect } from "react-redux";

const marginTop = StatusBar.currentHeight + 90;

export class ClientDashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      videosTotal: 0,
      exercicesTotal: 0,
    };
    this.mounted = false;
  }

  logout = () => {
    if (this.mounted) {
      firebase.auth().signOut();
    }
  };

  async componentDidMount() {
    this.mounted = true;

    const { userId } = this.props.userState.currentUser;

    const videosTotal = await this.FetchVideosCount({ userId });

    const exercicesTotal = await this.FetchExercices({ userId });

    if (videosTotal) {
      if (this.mounted) {
        this.setState({ videosTotal, exercicesTotal });
      }
    }
  }

  FetchExercices = async ({ userId }) => {
    const querySnapshot = await firebase
      .firestore()
      .collection("exercices")
      .where("usersId", "array-contains", `${userId}`)
      .get();

    if (!querySnapshot.exists) {
      return querySnapshot.size;
    }

    return null;
  };

  FetchVideosCount = async ({ userId }) => {
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection("videos")
        .where("usersId", "array-contains", `${userId}`)
        .get();

      if (!querySnapshot.exists) {
        return querySnapshot.size;
      }

      return null;
    } catch (err) {
      return null;
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
    const { videosTotal, exercicesTotal } = this.state;

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

          {/* <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                },
              ]}
            >
              <Title style={{ color: "#FFF" }}>{videosTotal}</Title>
              <Caption style={{ color: "#FFF" }}>Vidéos</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title style={{ color: "#FFF" }}>{exercicesTotal}</Title>
              <Caption style={{ color: "#FFF" }}>Exercices</Caption>
            </View>
          </View> */}

          <View style={styles.menuWrapper}>
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
                this.props.navigation.navigate("Exercices");
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="run-fast" color="#ee6425" size={25} />
                <Text style={styles.menuItemText}>Mes Exercices</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                Linking.openURL("mailto:healthytherapyMS@gmail.com");
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="gmail" color="#ee6425" size={25} />
                <Text style={styles.menuItemText}>Contact Me</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                this.props.navigation.navigate("Videos");
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="message-video" color="#ee6425" size={25} />
                <Text style={styles.menuItemText}>Mes Vidéos</Text>
              </View>
            </TouchableRipple>

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
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(ClientDashboard);

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
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    flexDirection: "row",
    height: 80,
    paddingVertical: 15,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
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

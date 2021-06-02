import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Title, Caption, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RemoveUser } from "../redux/actions";
import UserImage from "../components/UserImage/UserImage";

const marginTop = StatusBar.currentHeight + 10;

export class UserProfile extends PureComponent {
  handleDeleteUser = () => {
    const { userId } = this.props.route.params.user;

    this.props.RemoveUser({ userId });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (prevProps.usesrState !== this.props.usesrState) {
        const { userId } = this.props.route.params.user;
        const { users } = this.props.usesrState;
        const indexId = users.map((user) => user.userId).indexOf(userId);

        if (indexId === -1) {
          this.props.navigation.goBack();
        }
      }
    }
  }

  render() {
    const {
      address = "",
      email = "",
      firstName = "",
      lastName = "",
      num = "",
      sourceImg = "",
    } = this.props.route.params.user;

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
                      marginBottom: 30,
                      flexShrink: 1,
                      textTransform: "capitalize",
                    },
                  ]}
                >
                  {firstName} {lastName}
                </Title>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#FFF" size={20} />
              <Text style={{ color: "#FFF", marginLeft: 20 }}>{address}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#FFF" size={20} />
              <Text style={{ color: "#FFF", marginLeft: 20 }}> {num} </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#FFF" size={20} />
              <Text style={{ color: "#FFF", marginLeft: 20 }}>{email}</Text>
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                },
              ]}
            >
              <Title style={styles.Text}>4</Title>
              <Caption style={styles.Text}>Videos</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title style={styles.Text}>12</Title>
              <Caption style={styles.Text}>Exercices</Caption>
            </View>
          </View>

          <Button
            labelStyle={{ fontSize: 18 }}
            contentStyle={{ paddingVertical: 2 }}
            style={{ margin: 50 }}
            color="#F00"
            icon="delete"
            mode="contained"
            onPress={() => this.handleDeleteUser()}
          >
            Supprimer
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  usesrState: state.usersState,
});

export default connect(mapStateToProps, { RemoveUser })(UserProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07263e",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    paddingVertical: 20,
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
  Text: {
    color: "#FFF",
  },
});

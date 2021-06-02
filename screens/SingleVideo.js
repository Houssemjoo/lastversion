import React, { Component } from "react";
import {
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import moment from "moment";
import Icon from "react-native-vector-icons/Fontisto";
import YoutubePlayer from "react-native-youtube-iframe";
import { createStackNavigator } from "@react-navigation/stack";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

const YoutubeVideo = ({ url }) => {
  return (
    <View style={{ flex: 1 }}>
      <YoutubePlayer
        height={width * 0.5}
        width={width}
        videoId={youtube_parser(url)}
        initialPlayerParams={{ controls: true, showClosedCaptions: false }}
      />
    </View>
  );
};

function Timer({ interval, style }) {
  const pad = (n) => (n < 10 ? "0" + n : n);
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);

  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())},</Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </View>
  );
}

function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <Pressable
      android_ripple={{ color: "#FFF", radius: 30 }}
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ];

  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
    </View>
  );
}

function LapsTable({ laps, timer }) {
  const finishedLaps = laps.slice(1);
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  if (finishedLaps.length >= 2) {
    finishedLaps.forEach((lap) => {
      if (lap < min) min = lap;
      if (lap > max) max = lap;
    });
  }

  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
          fastest={lap === min}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  );
}

function ButtonsRow({ children }) {
  return <View style={styles.buttonsRow}>{children}</View>;
}

class SingleVideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      laps: [],
    };

    this.video = React.createRef();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  start = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
      laps: [0],
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };

  lap = () => {
    const timestamp = new Date().getTime();
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp,
    });
  };

  stop = () => {
    clearInterval(this.timer);
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    });
  };

  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    });
  };

  resume = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };

  render() {
    const { now, start, laps } = this.state;
    const timer = now - start;
    const { description, title, url, videoId } = this.props.route.params.video;

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <YoutubeVideo url={url} />
            <View
              style={{
                flex: 1,
                marginBottom: 20,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                backgroundColor: "#FFF",
                padding: 15,
                elevation: 2,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textTransform: "capitalize",
                  fontWeight: "500",
                  marginBottom: 5,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textTransform: "capitalize",
                  color: "#777",
                }}
              >
                {description}
              </Text>
            </View>
            <Button
              onPress={() => {
                this.props.navigation.navigate("Preview", { videoId });
              }}
              color="#ee6425"
              mode="contained"
              labelStyle={{ fontSize: 18, color: "#FFF" }}
              style={{ marginTop: 10, marginBottom: 50, marginHorizontal: 10 }}
            >
              {" "}
              remplir mon bilan{" "}
            </Button>
          </View>

          <View style={styles.container}>
            <Icon name="stopwatch" color="#ee6425" size={45} />
            <Timer
              interval={laps.reduce((total, curr) => total + curr, 0) + timer}
              style={styles.timer}
            />

            <View style={{ flex: 1, alignItems: "center", width: "80%" }}>
              {laps.length === 0 && (
                <ButtonsRow>
                  <RoundButton
                    title="Lap"
                    color="#FFF"
                    background="#00BFFF"
                    disabled
                  />
                  <RoundButton
                    title="Start"
                    color="#FFF"
                    background="#7CFC00"
                    onPress={this.start}
                  />
                </ButtonsRow>
              )}
              {start > 0 && (
                <ButtonsRow>
                  <RoundButton
                    title="Lap"
                    color="#FFFFFF"
                    background="#87CEFA"
                    onPress={this.lap}
                  />
                  <RoundButton
                    title="Stop"
                    color="#FFFFFF"
                    background="#FF0000"
                    onPress={this.stop}
                  />
                </ButtonsRow>
              )}
              {laps.length > 0 && start === 0 && (
                <ButtonsRow>
                  <RoundButton
                    title="Reset"
                    color="#FFF"
                    background="#00FFFF"
                    onPress={this.reset}
                  />
                  <RoundButton
                    title="Start"
                    color="#FFF"
                    background="#7CFC00"
                    onPress={this.resume}
                  />
                </ButtonsRow>
              )}
            </View>

            <LapsTable laps={laps} timer={timer} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const SingleVideo = ({ route }) => {
  const { title } = route.params;
  const label = title || "Ma vidéo";

  return (
    <Stack.Navigator initialRouteName="SingleVideo">
      <Stack.Screen
        name={label}
        component={SingleVideoScreen}
        options={{ headerShown: true }}
        initialParams={{ video: route.params }}
      />
    </Stack.Navigator>
  );
};

export default SingleVideo;

const styles = StyleSheet.create({
  video: {
    width: 300,
    height: 150,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  timer: {
    color: "#333",
    fontSize: 76,
    fontWeight: "200",
    width: 110,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 30,
  },
  lapText: {
    color: "#145A32",
    fontSize: 18,
  },
  lapTimer: {
    width: 30,
  },
  lap: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: "stretch",
    elevation: 3,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  fastest: {
    color: "#4BC05F",
  },
  slowest: {
    color: "#CC3531",
  },
  timerContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  backgroundContainer: {
    flex: 1,
    alignItems: "center",
    overlayColor: "black",
  },
});

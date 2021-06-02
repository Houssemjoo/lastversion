import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Animated } from "react-native";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import slides from "../../slides";
import OnBoardingItem from "./OnBoardingItem";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function OnBoarding({ userState }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [exercicesData, setexercicesData] = useState([]);

  useEffect(() => {
    const { userId } = userState.currentUser;

    firebase
      .firestore()
      .collection("exercices")
      .where("usersId", "array-contains", `${userId}`)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.exists) {
          let exercicesData = [];
          querySnapshot.forEach((documentSnapshot) => {
            const exerciceId = documentSnapshot.id;

            exercicesData.push({ ...documentSnapshot.data(), exerciceId });
          });
          setexercicesData(exercicesData);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slidesRef = useRef(null);

  const scrollTo = () => {
    if (currentIndex < exercicesData.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      alert(`Fin d'exercices  ✅`);
    }
  };

  const renderEmptyItem = () => {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18 }}>
          Vous n'avez pas encore des exercices !
        </Text>
      </View>
    );
  };

  const keyExtractor = (_, index) => index.toString();

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          keyExtractor={keyExtractor}
          data={exercicesData}
          renderItem={({ item }) => <OnBoardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          ListEmptyComponent={renderEmptyItem}
        />
      </View>
      <Paginator data={exercicesData} scrollX={scrollX} />
      {exercicesData.length > 1 ? (
        <NextButton
          scrollTo={scrollTo}
          percentage={((currentIndex + 1) * 100) / exercicesData.length}
        />
      ) : null}
    </View>
  );
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(OnBoarding);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

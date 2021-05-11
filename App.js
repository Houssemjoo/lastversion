import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, LogBox, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app'
import 'firebase/auth'

LogBox.ignoreLogs(['Setting a timer'])

const firebaseConfig = {
  apiKey: "AIzaSyB65HnG2F1CtTwPRAGNlCn8ukbMfMeTTWY",
  authDomain: "kine-dev.firebaseapp.com",
  projectId: "kine-dev",
  storageBucket: "kine-dev.appspot.com",
  messagingSenderId: "631795409662",
  appId: "1:631795409662:web:268a09f430af6a34e6fbaf",
  measurementId: "G-P9LY90HE59"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { Provider } from 'react-redux'             
import { store } from './redux/store'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

//Screens
import LandingScreen from './screens/auth/Landing'
import RegisterScreen from './screens/auth/Register'
import LoginScreen from './screens/auth/Login'
import Profile from './screens/Profile'
import EditProfile from './screens/EditProfileScreen'
import VideosScreen from './screens/Videos'
import PreviewScreen from './screens/Preview'
import SingleUserScreen from './screens/SingleUser'
import ExercicesScreen from './screens/Exercices'


const Stack = createStackNavigator()
const Stacklog = createStackNavigator()

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [userState, setUser] = useState();

  function onAuthStateChanged(user) {
    if(user){
      setUser(user);
    } else {
      setUser(null)
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  if(initializing){
    return(
      <View style={{ flex: 1, justifyContent:'center', alignItems: 'center'}}>
          <ActivityIndicator size={"large"} color="#FFA500" />
      </View>
    )
  }

  return (
      <Provider store={store}>
        <StatusBar />
        <NavigationContainer>
        {
          !userState ?
              <Stack.Navigator initialRouteName="Bienvenue">
                  <Stack.Screen name="Bienvenue" component={LandingScreen} options={{ headerShown: true  }}/>
                  <Stack.Screen name="Register" component={RegisterScreen} options = {{title : 'Créer Un compte'}} />
                  <Stack.Screen name="Login" component={LoginScreen}  options = {{title : 'Se Connecter'}}  />
              </Stack.Navigator>
            :
              null
        }
        {
            userState ?
              <Stacklog.Navigator initialRouteName="Profile">
                <Stacklog.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stacklog.Screen name="EditProfile" component={EditProfile} options={{ headerShown: true , title : 'Modifier Votre Profil'}}/>
                <Stacklog.Screen name="Videos" component={VideosScreen} options={{ headerShown: true , title : 'Mes Vidéos'}}/>
                <Stacklog.Screen name="Preview" component={PreviewScreen} options={{ headerShown: true , title : 'Envoyer Mon Rapport'}}/>
                <Stacklog.Screen name="Single User" component={SingleUserScreen} options={{ headerShown: false }}/>
                <Stacklog.Screen name="Exercices" component={ExercicesScreen} options={{ headerShown: true }}/>
              </Stacklog.Navigator>
              :
              null
        }
        </NavigationContainer>
      </Provider>
  );
}
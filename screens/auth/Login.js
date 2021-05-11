import React, { Component } from 'react'
import { View, Image, StyleSheet,  SafeAreaView, ScrollView } from 'react-native' 
import firebase from 'firebase/app'
import 'firebase/auth'
import SocialButton from '../../components/design/SocialButton'
import FormButton from '../../components/design/FormButton'
import FormInput from '../../components/design/FormInput'
import loginImg from '../../images/login.gif'

export class Login extends Component {
    constructor(props) {
        super(props);
            this.state = {
                email: '',
                password: ''
            }
    }
    
    onSignIn = () => {
        const { email, password }= this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
          //
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    render() {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#FFF", paddingHorizontal: 10, paddingVertical: 20}}>
          <ScrollView>
            <View style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Image
                        source={loginImg}
                        style={styles.logo}
                    />
                    <FormInput
                        onChangeText={(email) => this.setState({ email })}
                        placeholderText="Email"
                        iconType="user"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <FormInput
                        onChangeText={(password) => this.setState({ password })}
                        placeholderText="Password"
                        iconType="lock"
                        secureTextEntry={true}
                    />
                    <FormButton
                        buttonTitle="Se connecter"
                        onPress={() => {this.onSignIn()}}
                    />
                </View>

                <SocialButton 
                  buttonTitle="Se connecter avec Facebook"
                  btnType="facebook"
                  color="#4867aa"
                  backgroundColor="#e6eaf4"
                  onPress={() => {}}
                />
                
                <SocialButton 
                  buttonTitle="Se connecter avec Google"
                  btnType="google"
                  color="#de4d41"
                  backgroundColor="#f5e7ea"
                  onPress={() => {}}
                />

            </View>
          </ScrollView>
        </SafeAreaView>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
      paddingTop:0
    },
    logo: {
      height: 150,
      width: 150,
      marginBottom: 80,
      marginTop:20
    },
    text: {
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
    }
});
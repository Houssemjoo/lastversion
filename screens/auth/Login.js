import React, { Component } from 'react'
import { View, Image, StyleSheet,  SafeAreaView, ScrollView, Text } from 'react-native' 
import firebase from 'firebase/app'
import 'firebase/auth'
import FormButton from '../../components/design/FormButton'
import FormInput from '../../components/design/FormInput'
import loginImg from '../../assets/icon.png'
import FacebookButton from '../../components/FacebookButton/FacebookButton'
import GoogleButton from '../../components/GoogleButton/GoogleButton'
import { Button, Snackbar  } from 'react-native-paper'

export class Login extends Component {
    constructor(props) {
        super(props);
            this.state = {
                email: '',
                password: '',
                visible: false,
                firebaseError: null,
                fieldsErrors: [
                  {
                      field: "email",
                      message: []
                  },
                  {
                      field: "password",
                      message: []
                  }
              ]
            }
            this.mounted = false
    }
    
    componentDidMount(){
      this.mounted = true
    }

    onSignIn = () => {
        const { email, password, fieldsErrors } = this.state
        let validation = true

        if(email.trim().length === 0){
          validation = false
          const errorMessage = "Adresse e-mail est obligatoire"
          
          const errorIndex = fieldsErrors.map((f) => f.field).indexOf("email")

          let messages = fieldsErrors[errorIndex].message;

          const msgIndex = messages.indexOf(errorMessage)

          if(msgIndex === -1){
              fieldsErrors[errorIndex].message = [...messages, errorMessage]
          }

          if(this.mounted){
            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
          }
        }

        if(password.trim().length === 0){
          validation = false
          const errorMessage = "Mot de passe est obligatoire"
          
          const errorIndex = fieldsErrors.map((f) => f.field).indexOf("password")

          let messages = fieldsErrors[errorIndex].message;

          const msgIndex = messages.indexOf(errorMessage)

          if(msgIndex === -1){
              fieldsErrors[errorIndex].message = [...messages, errorMessage]
          }

          if(this.mounted){
            this.setState({
              ...this.state,
              fieldsErrors: fieldsErrors
            })
          }
        }

        if(validation){
          firebase.auth().signInWithEmailAndPassword(email, password)
          .then((result) => {
            //
          })
          .catch((error)=> {
            if(this.mounted){
              this.setState({
                visible: true,
                firebaseError: error.message
              })
            }
          })
        }
    }

    handelInputchange = (val, field)  => {
      const errorIndex = this.state.fieldsErrors.map((f) => f.field).indexOf(field)

      this.state.fieldsErrors[errorIndex].message = []

      if(this.mounted){
        this.setState({ ...this.state, fieldsErrors: this.state.fieldsErrors, [field]: val })
      }
    }

    onDismissSnackBar = () => {
      if(this.mounted){
        this.setState({ visible: false, firebaseError: null })
      }
    }

    componentWillUnmount(){
      this.mounted = false
    }

    render() {
      const{ fieldsErrors, firebaseError, visible } = this.state

      return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, marginBottom: 40}}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", elevation: 2, padding: 16, backgroundColor: "#FFF", marginTop: 20, borderRadius: 5 }}>
                        <Image
                            source={loginImg}
                            style={styles.logo}
                        />

                        <FormInput
                            onChangeText={(email) => this.handelInputchange(email, 'email')}
                            placeholderText="Adresse e-mail"
                            iconType="account"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            theme={{ colors: { primary: "#999" } }}
                            fieldsErrors={fieldsErrors}
                            fieldName="email"
                        />

                        <FormInput
                            onChangeText={(password) => this.handelInputchange(password, 'password')}
                            placeholderText="Mot de passe"
                            iconType="lock"
                            secureTextEntry={true}
                            theme={{ colors: { primary: "#999" } }}
                            fieldsErrors={fieldsErrors}
                            fieldName="password"
                        />

                        <FormButton
                            buttonTitle="Se connecter"
                            onPress={() => {this.onSignIn()}}
                        />
                </View>

                <View style={styles.registerField}>
                    <Text style={styles.registerLabel}>Nouveau sur Healthy Therapy ?</Text>
                    <Button
                      style={{alignSelf: "center"}}
                      labelStyle={{ fontSize: 12 }}
                      style='text' 
                      onPress={() => {this.props.navigation.navigate('Register')}}
                      color='#4267b2'
                    > 
                    Créer un compte 
                    </Button>
                </View>

                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>OU</Text>
                  <View style={styles.divider} />
                </View>

                <GoogleButton 
                    onPress={() => {}} 
                />

            </View>
          </ScrollView>

          <View style={styles.snackContainer}>
                  <Snackbar
                    style={{backgroundColor: "#F00", color: "#FFF"}}
                    theme={{ colors: { accent: 'white' }}}
                    visible={visible}
                    onDismiss={this.onDismissSnackBar}
                    action={{
                      label: 'X',
                      onPress: () => {
                        // Do something
                      },
                    }}>
                    {firebaseError}
                  </Snackbar>
            </View>
        </SafeAreaView>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    snackContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
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
      marginTop: 5
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
    },
    registerField:{
      flexDirection: "row",
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    registerLabel:{
        color: "#888",
        fontSize: 14,
        flexShrink: 1
    },
    dividerContainer:{
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 15
    },
    dividerText:{
        marginHorizontal: 10
    },
    divider:{
        flex: 1,
        height: 0.5,
        backgroundColor: "#888",
        width: "100%"
    }
})
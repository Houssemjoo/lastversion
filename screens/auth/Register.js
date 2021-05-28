import React, { Component } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native' 
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import GoogleButton from '../../components/GoogleButton/GoogleButton'
import FormButton from '../../components/design/FormButton'
import FormInput from '../../components/design/FormInput'
import { windowWidth } from '../../components/utils/Dimensions'
import { Button, Divider } from 'react-native-paper'
import ErrorFieldMessage from '../../components/ErrorFieldMessage/ErrorFieldMessage'
import PhoneInput from "react-native-phone-number-input"
import EmailValidation from '../../utility/EmailValidation'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FormWidth = windowWidth * 0.95

export class Register extends Component {
    constructor(props) {
        super(props);
            this.state = {
              email: '',
              password: '',
              lastName: '',
              firstName: '',
              phone: '',
              address: '',
              RepeatPassword: '',
              phoneValidation: true,
              fieldsErrors: [
                {
                    field: "firstName",
                    message: []
                },
                {
                    field: "lastName",
                    message: []
                },
                {
                    field: "email",
                    message: []
                },
                {
                    field: "phone",
                    message: []
                },
                {
                    field: "address",
                    message: []
                },
                {
                    field: "password",
                    message: []
                },
                {
                    field: "RepeatPassword",
                    message: []
                },
            ]
            }

            this.lastNameRef = React.createRef()
            this.emailRef = React.createRef()
            this.numberRef = React.createRef()
            this.address = React.createRef()
            this.passwordRef = React.createRef()
            this.RepeatPasswordRef = React.createRef()
            this.phoneInputRef = React.createRef()
    }

    handleRegister = async () => {
        const { email, password, RepeatPassword, lastName, firstName, address, phone, fieldsErrors }= this.state
        let validation = true

        const expoPushToken = await AsyncStorage.getItem('expoPushToken')
        
        if(firstName.trim().length === 0){
            validation = false
            const errorMessage = "Prénom est obligatoire"
            
            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("firstName")

            let messages = fieldsErrors[errorIndex].message;

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage]
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(lastName.trim().length === 0){
            validation = false

            const errorMessage = "Nom est obligatoire"
            
            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("lastName")

            let messages = fieldsErrors[errorIndex].message;

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage]
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(email.trim().length === 0){
            validation = false

            const errorMessage = "Adresse e-mail est obligatoire"
            
            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("email")

            let messages = fieldsErrors[errorIndex].message

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage]
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(!EmailValidation(email)){
            validation = false

            const errorMessage = "Adresse de messagerie est invalide"

            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("email")

            let messages = fieldsErrors[errorIndex].message

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage];
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(phone.trim().length === 0){
            validation = false

            const errorMessage = "Téléphone est obligatoire"
            
            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("phone")

            let messages = fieldsErrors[errorIndex].message

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage]
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(address.trim().length === 0){
            validation = false

            const errorMessage = "Adresse est obligatoire"
            
            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("address")

            let messages = fieldsErrors[errorIndex].message

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage]
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(password.trim().length === 0){
            validation = false

            const errorMessage = "Mot de passe est obligatoire"
            
            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("password")

            let messages = fieldsErrors[errorIndex].message

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage]
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(password.trim().length < 8){
            validation = false

            const errorMessage = "Au moins 8 caractères"
            
            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("password")

            let messages = fieldsErrors[errorIndex].message

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage]
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(RepeatPassword.trim().length === 0){
            validation = false

            const errorMessage = "Confirmer votre mot de passe"
            
            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("RepeatPassword")

            let messages = fieldsErrors[errorIndex].message

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage]
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(RepeatPassword.trim() !== password.trim()){
            validation = false

            const errorMessage = "Les mots de passe ne sont pas identiques"
            
            const errorIndex = fieldsErrors.map((f) => f.field).indexOf("RepeatPassword")

            let messages = fieldsErrors[errorIndex].message

            const msgIndex = messages.indexOf(errorMessage)

            if(msgIndex === -1){
                fieldsErrors[errorIndex].message = [...messages, errorMessage]
            }

            this.setState({
                ...this.state,
                fieldsErrors: fieldsErrors
            })
        }

        if(validation){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    num: phone,
                    email,
                    address,
                    role: "client",
                    sourceImg: "https://icon-library.com/images/user-profile-icon/user-profile-icon-12.jpg",
                    expoToken: [expoPushToken]
                }) 
            })
            .catch((error)=> {
                console.log(error)
            })
        }
    }

    displayError = field => {
        const errorIndex = this.state.fieldsErrors.map((f) => f.field).indexOf(field)
    
        return  this.state.fieldsErrors[errorIndex].message
    }

    visibleError = field => {
        const msgs = this.displayError(field)

        if(msgs.length > 0){
            return true;
        }

        return false;
    }

    handelInputchange = (val, field, checkValid)  => {
        const errorIndex = this.state.fieldsErrors.map((f) => f.field).indexOf(field)

        this.state.fieldsErrors[errorIndex].message = []

        if(field === "phone"){
            this.setState({
                ...this.state, 
                fieldsErrors: this.state.fieldsErrors, 
                [field]: val,
                phoneValidation: checkValid ? checkValid : false
            })

            return;
        }

        this.setState({ ...this.state, fieldsErrors: this.state.fieldsErrors, [field]: val })
    }


    render() {
        const{ fieldsErrors,  firstName, lastName, email, password, RepeatPassword, address, phone } = this.state

        return (
            <SafeAreaView style={{flex: 1, marginHorizontal: 10}}>
                <ScrollView  style={{flex: 1, marginHorizontal: 10}} showsVerticalScrollIndicator={false} s>
                    <View style={{flex: 1, marginVertical: 5, marginBottom: 40}}>
                        <View style={{flex: 1, backgroundColor: "#fff", padding: 10, marginTop: 10, borderRadius: 10}}>
                            <FormInput
                                value={firstName}
                                onChangeText={firstName => this.handelInputchange(firstName, 'firstName')}
                                placeholderText="Prénom"
                                iconType="account"
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCompleteType="name"
                                textContentType="givenName"
                                importantForAutofill="yes"
                                maxLength={30}
                                autoCorrect={false}
                                returnKeyType="next"
                                theme={{ colors: { primary: "#999" } }}
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.lastNameRef.current.focus()}
                                fieldName="firstName"
                                fieldsErrors={fieldsErrors}
                            />

                            <FormInput
                                value={lastName}
                                textInputref={this.lastNameRef}
                                onChangeText={lastName => this.handelInputchange(lastName, 'lastName')}
                                placeholderText="Nom"
                                iconType="account"
                                keyboardType="default"
                                autoCapitalize="none"
                                textContentType="familyName"
                                maxLength={30}
                                autoCorrect={false}
                                returnKeyType="next"
                                theme={{ colors: { primary: "#999" } }}
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.emailRef.current.focus()}
                                fieldName="lastName"
                                fieldsErrors={fieldsErrors}
                            />

                            <FormInput
                                value={email}
                                textInputref={this.emailRef}
                                onChangeText={email => this.handelInputchange(email, 'email')}
                                placeholderText="Adresse e-mail"
                                iconType="email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                textContentType="emailAddress"
                                maxLength={320}
                                autoCorrect={false}
                                returnKeyType="next"
                                theme={{ colors: { primary: "#999" } }}
                                fieldName="email"
                                fieldsErrors={fieldsErrors}
                            />      
                            
                            <View style={this.visibleError("phone") ? { flex: 1, borderBottomWidth: 1, borderColor: "red", marginVertical: 10 } : {flex: 1} }>
                                <PhoneInput
                                    containerStyle={{flex: 1, width: '100%'}}
                                    ref={this.phoneInputRef}
                                    defaultValue={phone}
                                    defaultCode="FR"
                                    layout="first"
                                    autoCompleteType="tel"
                                    textContentType="telephoneNumber"
                                    placeholder="Téléphone"
                                    onChangeText={(text) => {
                                        const checkValid = this.phoneInputRef.current?.isValidNumber(text)
                                        this.handelInputchange(text, "phone", checkValid)
                                    }}
                                    blurOnSubmit={false}
                                />
                                <Divider style={{height: 1, color: "#777"}} />
                            </View>

                            <ErrorFieldMessage msgs={this.displayError("phone")} />

                            <FormInput
                                value={address}
                                textInputref={this.address}
                                onChangeText={address => this.handelInputchange(address, 'address')}
                                placeholderText="Adresse"
                                iconType="map-marker"
                                keyboardType="default"
                                autoCapitalize="none"
                                textContentType="fullStreetAddress"
                                maxLength={320}
                                autoCorrect={false}
                                returnKeyType="next"
                                theme={{ colors: { primary: "#999" } }}
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.passwordRef.current.focus()}
                                fieldName="address"
                                fieldsErrors={fieldsErrors}
                            />

                            <FormInput
                                value={password}
                                textInputref={this.passwordRef}
                                onChangeText={password => this.handelInputchange(password, 'password')}
                                placeholderText="Mot de passe"
                                iconType="lock"
                                textContentType="newPassword"
                                secureTextEntry={true}
                                returnKeyType="next"
                                theme={{ colors: { primary: "#999" } }}
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.RepeatPasswordRef.current.focus()}
                                fieldName="password"
                                fieldsErrors={fieldsErrors}
                            />

                            <FormInput
                                value={RepeatPassword}
                                textInputref={this.RepeatPasswordRef}
                                onChangeText={RepeatPassword => this.handelInputchange(RepeatPassword, 'RepeatPassword')}
                                placeholderText="Confirmer votre mot de passe"
                                textContentType="newPassword"
                                iconType="lock"
                                secureTextEntry={true}
                                returnKeyType="done"
                                theme={{ colors: { primary: "#999" } }}
                                fieldName="RepeatPassword"
                                fieldsErrors={fieldsErrors}
                            />
                        </View>

                        <FormButton 
                            buttonTitle="Créez votre compte" 
                            onPress={this.handleRegister} 
                        /> 

                        <View style={styles.loginField}>
                            <Text style={styles.loginLabel}>Avez vous déjà un compte ?</Text>
                            <Button 
                                style='text' 
                                onPress={() => {this.props.navigation.navigate('Login')}}
                                color='#4267b2'
                            > 
                                Connexion
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
            </SafeAreaView>
        )
    }
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,   
    },
    content:{
        flex: 1,
    },
    form:{
        flex: 1,
        height: "100%",
        width: FormWidth,
        marginHorizontal: (windowWidth - FormWidth) / 2,
        backgroundColor: "#FFF",
        marginVertical: 15,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingBottom: 20,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    formText:{
        color: "#888",
        marginTop: 15,
        fontSize: 17
    },
    loginField:{
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    loginLabel:{
        color: "#888",
        fontSize: 16,
        marginRight: 5
    },
    dividerContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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


import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView, 
  ScrollView,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import * as ImagePicker from 'expo-image-picker'

import { withTheme } from 'react-native-paper'

import EditProfileUserImg from '../components/EditProfileUserImg/EditProfileUserImg'

import { connect } from 'react-redux'
import { UpdateUser } from '../redux/actions'

export class EditProfileScreen extends PureComponent {
    state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      num: '',
      sourceImg: '',
      image: null
    }

    componentDidMount(){
      const { address = "", email = "", firstName = "", lastName = "", num = "", sourceImg = "" } = this.props.userState.currentUser

      this.setState({
        address,
        email,
        firstName,
        lastName,
        num,
        sourceImg,
      })
    }

    handleEditProfile = async () => {
      let errorForm = false
      const{ sourceImg, firstName, lastName, address, num, email, image } = this.state
      const { role, userId } = this.props.userState.currentUser
      let imgUrl = sourceImg

      if(image && image !== null && image.length > 0){
        imgUrl = await this.uploadImage(image)
      }
      
      if(!firstName && firstName.length === 0){
        errorForm = true
      }

      if(!lastName && lastName.length === 0){
        errorForm = true
      }

      if(!address && address.length === 0){
        errorForm = true
      }

      if(!num && num.length === 0){
        errorForm = true
      }

      if(!email && email.length === 0){
        errorForm = true
      }

      if(!errorForm){
        firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
              firstName,
              lastName,
              num,
              email,
              address,
              sourceImg: imgUrl
          })
          .then(() => {
              alert('Modification effectuée ✅')
              this.props.UpdateUser({
                firstName,
                lastName,
                num,
                email,
                address,
                sourceImg: imgUrl,
                role
              })
          })
          .catch(err => alert('Server error ❌'))
      }
    }

  uploadImage = async (uri) => {
    const imageName = 'profileImage' + Date.now();

    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`images/${imageName}`)

    return ref.put(blob).then(() => {
      return ref.getDownloadURL().then(url => {
        return url
      })
    })
  }

  pickImage = async () => {
      const{ status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if(status === 'granted'){
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        })

        if (!result.cancelled) {
          this.setState({ image: result.uri })
        }
      }
  }

    render(){
      const { colors } = this.props.theme
      const { firstName, lastName, email, address, num, sourceImg, image } = this.state

      return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
              <View style={{ alignItems: 'center', marginTop : 50 , marginBottom: 30 }}>
                <TouchableOpacity onPress={this.pickImage}>
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                  }}>
                      <EditProfileUserImg sourceImg={image || sourceImg} />
                  </View>
                </TouchableOpacity>
              <Text style={{ marginTop: 25, fontSize: 16, fontWeight: 'bold' }}>{lastName} {firstName}</Text>
            </View>

            <View style={styles.action}>
              <TextInput
                placeholder="Prénom"
                left={<TextInput.Icon icon="account" color={"#555"} />}
                placeholderTextColor="#666666"
                value={firstName}
                autoCorrect={false}
                onChangeText={(firstName) => { this.setState({ firstName })}}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            <View style={styles.action}>
              <TextInput
                placeholder="Nom"
                left={<TextInput.Icon icon="account" color={"#555"} />}
                value={lastName}
                placeholderTextColor="#666666"
                autoCorrect={false}
                onChangeText={(lastName) => { this.setState({ lastName })  }}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            <View style={styles.action}>
              <TextInput
                placeholder="Téléphone"
                value={num}
                left={<TextInput.Icon icon="phone" color={"#555"} />}
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                autoCorrect={false}
                onChangeText={(num) => { this.setState({ num })}}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            <View style={styles.action}>
              <TextInput
                placeholder="Email"
                left={<TextInput.Icon icon="email" color={"#555"} />}
                value={email}
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCorrect={false}
                onChangeText={(email) => { this.setState({ email })}}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            <View style={styles.action}>
              <TextInput
                placeholder="Adresse"
                left={<TextInput.Icon icon="map-marker" color={"#555"} />}
                placeholderTextColor="#666666"
                value={address}
                autoCorrect={false}
                onChangeText={(address) => { this.setState({ address })}}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            <Button labelStyle={{color: "#FFF", fontSize: 18}} style={{ marginTop: 10 }} mode='contained' color='#FFA500' styleContent={styles.commandButton} onPress={this.handleEditProfile}>
              Modifier
            </Button>
          </ScrollView>
      </SafeAreaView>
      )
    }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
})

export default connect(mapStateToProps, { UpdateUser })(withTheme(EditProfileScreen));

const styles = StyleSheet.create({
    container : {
      flex: 1,
      padding:20
    },
    commandButton: {
      alignItems: 'center',
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      paddingLeft: 10,
      color: '#05375a',
    },
  });

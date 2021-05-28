import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView, 
  ScrollView,
  StatusBar
} from 'react-native';
import { Button, TextInput, withTheme, ProgressBar } from 'react-native-paper'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

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
      image: null,
      uploadValue: null
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
        if(image && image !== null && image.length > 0){
          imgUrl = await this.uploadImage(image)
        }

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
    const imageName = `profileImage${Date.now()}.png` 

    const response = await fetch(uri)
    const blob = await response.blob()

    const ref = firebase.storage().ref().child(`images/${imageName}`)
    const uploadTask = ref.put(blob)
    this.unsubscribe = ref

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes);
            this.setState({uploadValue: progress})
          },
          (error) => {
            reject(error)
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
    })
  }

  pickImage = async () => {
      const{ status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if(status === 'granted'){
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        })

        if (!result.cancelled) {
          let image = await this.compressImage(result)

          this.setState({ image: image.uri, uploadValue: null })
        }
      }
  }

  compressImage = async (image) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      image.localUri || image.uri,
      [{ resize: { width: 400 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: true }
    )
   
    return manipResult
  }

  componentWillUnmount(){
    if(this.unsubscribe){
      this.unsubscribe()
    }
  }

  render(){
    const { colors } = this.props.theme
    const { firstName, lastName, email, address, num, sourceImg, image, uploadValue } = this.state

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"dark-content"} backgroundColor="#FFF" />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: 'center', marginTop: 30 , marginBottom: 10 }}>
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
            
            {
              uploadValue !== null ?
                <View style={{flex: 1, marginBottom: 15}}>

                  {
                    uploadValue === 1 ?
                    <Text style={{fontSize: 14, alignSelf: "center", marginBottom: 10}}>
                      Téléchargement d'image avec succès
                    </Text> 
                    : 
                    <Text style={{fontSize: 14, alignSelf: "center", marginBottom: 10}}>
                      Téléchargement d'image en cours...
                    </Text> 
                  }

                  <ProgressBar style={{flex: 1, width:'90%', height: 15, borderRadius: 10, alignSelf: "center"}} progress={uploadValue} color='#FFA500' />
                </View>
              : null
            }

            <View style={styles.action}>
              <TextInput
                theme={{ colors: { primary: "#ee6425" } }}
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
                theme={{ colors: { primary: "#ee6425" } }}
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
                theme={{ colors: { primary: "#ee6425" } }}
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
                theme={{ colors: { primary: "#ee6425" } }}
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
                theme={{ colors: { primary: "#ee6425" } }}
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

            <Button labelStyle={{color: "#FFF", fontSize: 18}} style={{ marginTop: 10, marginBottom: 30 }} mode='contained' color='#ee6425' styleContent={styles.commandButton} onPress={this.handleEditProfile}>
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

export default connect(mapStateToProps, { UpdateUser })(withTheme(EditProfileScreen))

const styles = StyleSheet.create({
    container : {
      flex: 1,
      paddingHorizontal:20
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
  })

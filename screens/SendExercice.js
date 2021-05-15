import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { connect } from 'react-redux'
import { View, FlatList, StyleSheet } from 'react-native'
import { Button, TextInput  }  from 'react-native-paper'
import { FetchUsers }  from '../redux/actions'
import ExerciceImage from '../components/ExerciceImage/ExerciceImage'
import * as ImagePicker from 'expo-image-picker'

import UsersList from '../components/SearchUsers/UsersList/UsersList'
import SearchBar from '../components/SearchUsers/SearchBar/SearchBar'

const InputField = ({ handleTextChange, state, handlePress }) => {

    return(
        <View style={styles.card}>

        <ExerciceImage
            handlePress={handlePress}
            image={state.image}
        />

        <TextInput
            value={state.videoTitle}
            onChangeText={(val) => handleTextChange(val, 'exerciceTitle')}
            style={{ marginVertical: 15, height: 50 }}
            placeholder="Titre de exercice*"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            theme={{ colors: { primary: "#999" } }}
        />

        <TextInput
            value={state.videoDiscr}
            onChangeText={(val) => handleTextChange(val, 'exerciceDiscr')}
            style={{ marginVertical: 15, height: 50 }}
            placeholder="Description de exercice*"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            theme={{ colors: { primary: "#999" } }}
        />

    </View>
    )
}


const SendButton = ({ handleOnPress }) => {
    return(
        <Button color="#FFA500" labelStyle={{ fontSize: 18, color: "#FFF" }} style={{ margin: 10, marginBottom: 20 }} mode="contained" onPress={handleOnPress}>
            Envoyer
        </Button>
    )
}

class SendExercice extends Component {
    constructor(props){
        super(props)
        this.state = {
            image: null,
            data: [],
            users: [],
            selectedUsers: [],
            exerciceTitle: '',
            exerciceDiscr: '',
        }
    }

    componentDidMount(){
        this.props.FetchUsers()
        const{ users } = this.props.usersState

        if(users){
            this.setState({ users: users, data: users })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            const{ users } = this.props.usersState
            if(prevProps.usersState.users !== users){
                this.setState({ users: users, data: users })
            }
        }
    }

    handleTextChange = (val, field) => {
        const{ resetCheckedUsers } = this.state

        if(resetCheckedUsers){
            this.setState({resetCheckedUsers: false})
        }

        this.setState({[field]: val})
    }

    onSearchChange = (users) => {
        this.setState({ users })
    }

    setCheckedUsers = ({ userId, checked }) => {
        const{ selectedUsers } = this.state

       if(checked){
            this.setState({ ...this.state, selectedUsers: [...selectedUsers, userId] })
       } else {
            const userIndex = selectedUsers.indexOf(userId)
            selectedUsers.splice(userIndex, 1)
            this.setState({selectedUsers: selectedUsers })
       }
    }

    handleOnPress = async () => {
        const{ image, selectedUsers, exerciceTitle, exerciceDiscr } = this.state
        let validation = true
   
        if(image === null){
            validation = false
        }

        if(exerciceTitle.trim().length === 0){
            validation = false
        }

        if(exerciceDiscr.trim().length === 0){
            validation = false
        }

        if(selectedUsers.length === 0){
            validation = false
        }

        if(!validation){
            alert("Completez les champs ⚠️")
        }

        if(validation){
            const imgUrl = await this.uploadImage(image)
            
            firebase.firestore().collection("exercices").add({
                title: exerciceTitle,
                description: exerciceDiscr,
                image: imgUrl,
                usersId: selectedUsers
            })
            .then(() =>  {
                this.setState({ 
                    image: null,
                    imageTitle: '',
                    imageDiscr: '',
                    selectedUsers: []
                 })
                 alert("Exercice bien envoyée ✔️")
            })
            .catch(err => {
                alert("Server Error ❌")
            })
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
            aspect: [4, 4],
            quality: 1,
            base64: true
          })
  
          if (!result.cancelled) {
            this.setState({ image: result.uri })
          }
        }
    }
    
    handlePress = () => {
        this.pickImage()
    }

    render(){
        const{ data, users, image, imageDiscr, imageTitle, selectedUsers } = this.state

        const Data = [
            {
                name: "InputField",
                handleTextChange: this.handleTextChange,
                state: { image, imageDiscr, imageTitle },
                handlePress: this.handlePress
            },
            {
                name: "SearchUsers",
                Users: data,
                onSearchChange: this.onSearchChange
            },
            {
                name: "usersList",
                users: users,
                setCheckedUsers: this.setCheckedUsers,
                selectedUsers: selectedUsers
            }
        ]

        const keyExtractor = (_, index) => index.toString()

        const renderItem = ({ item }) => {
            if(item.name === 'InputField'){
                return <InputField {...item} />
            }   

            if(item.name === 'SearchUsers'){
                return <SearchBar {...item} />
            }

            if(item.name === 'usersList'){
                return <UsersList {...item} />
            }

            return null
        }

        return(
            <View style={{flex: 1}}>
                <FlatList 
                    data={Data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
                <SendButton handleOnPress={this.handleOnPress} />
            </View>

        )
    }
}

const mapStateToProps = (state) => ({
    usersState: state.usersState,
})

export default  connect(mapStateToProps, { FetchUsers })(SendExercice)

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#FFF", 
        margin: 10, 
        padding: 20, 
        elevation: 2, 
        borderRadius: 8
    }
})
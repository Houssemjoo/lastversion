import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { Button, TextInput }  from 'react-native-paper'
import { connect } from 'react-redux'
import { FetchUsers }  from '../redux/actions'
import { Searchbar } from 'react-native-paper';
import SelectCheckBox from '../components/SelectCheckBox/SelectCheckBox'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const InputField = ({ handleTextChange, state }) => (
    <View style={styles.card}>
        <Text style={{ fontSize: 16, color: "#444" }}>Ajouter votre vidéo url :</Text>

        <TextInput
            value={state.url}
            onChangeText={(val) => handleTextChange(val, 'url')}
            style={{ marginVertical: 15, height: 50 }}
            placeholder="Url*"
            left={<TextInput.Icon icon={"link-plus"} color={"#555"} />}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            theme={{ colors: { primary: "#999" } }}
        />

        <TextInput
            value={state.videoTitle}
            onChangeText={(val) => handleTextChange(val, 'videoTitle')}
            style={{ marginVertical: 15, height: 50 }}
            placeholder="Titre de vidéo*"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            theme={{ colors: { primary: "#999" } }}
        />

        <TextInput
            value={state.videoDiscr}
            onChangeText={(val) => handleTextChange(val, 'videoDiscr')}
            style={{ marginVertical: 15, height: 50 }}
            placeholder="Description de vidéo*"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            theme={{ colors: { primary: "#999" } }}
        />
    </View>
)

const contains = ({ firstName, lastName }, query) => {
    const fullName = `${firstName} ${lastName}`
    const test = fullName.toLowerCase()
    if(test.includes(query)){
        return true
    } else {
        return false
    }
}

const SearchBar = ({ Users, onSearchChange  }) => {
    const [searchQuery, setSearchQuery] = React.useState('')

    const onChangeSearch = query => {
        const filterInput = query.toLowerCase()

        const data  = Users.filter(user => {
            return contains(user, filterInput)
        })

        setSearchQuery(query)
        onSearchChange(data)
    }

    return (
        <View style={{ flex: 1 }}> 
            <Searchbar
                placeholder="Recherche"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ marginHorizontal: 10, marginTop: 10 }}
                theme={{ colors: { primary: "#999" } }}
            />
        </View>
    )
}

const SearchUsers = ({ data, onSearchChange }) => (
    <SearchBar style={styles.searchBar} Users={data} onSearchChange={onSearchChange}  />
)

const UsersList = ({ users, setCheckedUsers, reset }) => {
    const keyExtractor = (_, index) => index.toString()

    const renderItem = ({ item }) => {
        return <SelectCheckBox onPress={setCheckedUsers} reset={reset} {...item} />
    }

    return(
        <View style={[styles.card, {marginTop: 20}]}>
            <Text style={{fontSize: 14, marginTop: 5, marginBottom: 10, color: "#666"}}>Choisir votre patient</Text>
            <FlatList 
                data={users}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    )
}

const SendButton = ({ handleOnPress }) => {
    return(
        <Button color="#ff7600" labelStyle={{ fontSize: 18, color: "#FFF" }} style={{ margin: 10, marginBottom: 20 }} mode="contained" onPress={handleOnPress}>
            Envoyer
        </Button>
    )
}

class videoScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            url: '',
            data: [],
            users: [],
            selectedUsers: [],
            videoTitle: '',
            videoDiscr: '',
            resetCheckedUsers: false
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
        const{ resetCheckedUsers } = this.state

        if(resetCheckedUsers){
            this.setState({resetCheckedUsers: false})
        }

        this.setState({ users })
    }

    setCheckedUsers = ({ userId, checked }) => {
        const{ selectedUsers, resetCheckedUsers } = this.state

        if(resetCheckedUsers){
            this.setState({resetCheckedUsers: false})
        }

       if(checked){
            this.setState({ selectedUsers: [...selectedUsers, userId] })
       } else {
            const userIndex = selectedUsers.indexOf(userId)
            selectedUsers.splice(userIndex, 1)
            this.setState({selectedUsers: selectedUsers })
       }
    }

    handleOnPress = () => {
        const{ url, selectedUsers, videoTitle, videoDiscr, resetCheckedUsers } = this.state
        let validation = true
        this.setState({ resetCheckedUsers: false })
        
        if(url.trim().length === 0){
            validation = false
        }

        if(videoTitle.trim().length === 0){
            validation = false
        }

        if(videoDiscr.trim().length === 0){
            validation = false
        }

        if(selectedUsers.length === 0){
            validation = false
        }

        if(validation){
            firebase.firestore().collection("videos").add({
                title: videoTitle,
                description: videoDiscr,
                url: url,
                usersId: selectedUsers
            })
            .then(() =>  {
                this.setState({ 
                    url: '',
                    videoTitle: '',
                    videoDiscr: '',
                    selectedUsers: [],
                    resetCheckedUsers: true
                 })
            })
            .catch(err => console.log(err))
        }
    }

    render(){
        const{ data, users, resetCheckedUsers, url, videoDiscr, videoTitle } = this.state

        const Data = [
            {
                name: "InputField",
                handleTextChange: this.handleTextChange,
                state: {url, videoDiscr, videoTitle}
            },
            {
                name: "SearchUsers",
                data: data,
                onSearchChange: this.onSearchChange
            },
            {
                name: "usersList",
                users: users,
                setCheckedUsers: this.setCheckedUsers,
                reset: resetCheckedUsers
            },
            {
                name: "Submit Btn",
                handleOnPress: this.handleOnPress
            }
        ]

        const keyExtractor = (_, index) => index.toString()

        const renderItem = ({ item }) => {
            if(item.name === 'InputField'){
                return <InputField {...item} />
            }   

            if(item.name === 'SearchUsers'){
                return <SearchUsers {...item} />
            }

            if(item.name === 'usersList'){
                return <UsersList {...item} />
            }

            if(item.name === 'Submit Btn'){
                return <SendButton {...item} />
            }

            return null
        }

        return(
            <FlatList 
                data={Data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    usersState: state.usersState,
})

export default  connect(mapStateToProps, { FetchUsers })(videoScreen)

const styles = StyleSheet.create({
   card:{
    flex: 1,
    backgroundColor: "#FFF", 
    margin: 10, 
    padding: 10, 
    elevation: 1, 
    borderRadius: 8
   },
   searchBar:{
    marginHorizontal: 10,
    marginVertical: 20 
   }
})




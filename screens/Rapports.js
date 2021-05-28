import React, { Component } from 'react'
import { View, FlatList, Pressable } from 'react-native'
import { Avatar, List } from 'react-native-paper'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const RapportItem = (prop) => {

    const userData = prop.userData;
    const videoData = prop.videoData;
    const {
        nbrRep,
        resume,
        difficult,
        done,
        id,
        intensity
    } = prop

    const rapport = {
        nbrRep,
        resume,
        difficult,
        done,
        id,
        intensity
    }

    return (
        <Pressable onPress={() => { prop.navigation.navigate('SingleRapport', { userData, videoData, rapport }) }} android_ripple={{ color: '#CCC' }} style={{borderBottomWidth: 0.5, borderBottomColor: "#CCC" }} >
            <List.Item
                titleStyle={{ marginTop: 0 }}
                title={`${prop.videoData.title}`}
                description={`${prop.userData.firstName} ${prop.userData.lastName}`}
                left={props => <Avatar.Icon color="#ee6425" icon="clipboard-account" style={{backgroundColor: "#00000000", marginTop: 10, marginRight: 10 }} size={60}  />}
            />
        </Pressable>
    )
}

const fetchRapports =  async () => {
    let rapports = [];
    let userIds = [];
    let users = [];
    let videoIds = [];
    let videos = [];

    try{
        const querySnapshot = await firebase.firestore().collection("rapport").get()

        if(!querySnapshot.exists){
            querySnapshot.forEach((documentSnapshot) => {
                const rapportId = documentSnapshot.id
                const rapData = documentSnapshot.data()
                const{ userId, videoId } = rapData

                if(userIds.indexOf(userId) === -1){
                    userIds.push(userId)
                }

                if(videoIds.indexOf(videoId) === -1){
                    videoIds.push(videoId)
                }
                
                rapports.push({...rapData, id: rapportId})
            })
        }

        const promises = [];
        const promissesVideo = [];

        userIds.forEach((id) => {
            promises.push(firebase.firestore().collection("users").doc(id).get())
        })

        videoIds.forEach((id) => {
            promissesVideo.push(firebase.firestore().collection("videos").doc(id).get())
        })

        const outputs = await Promise.all(promises)
        const outputsVideos = await Promise.all(promissesVideo)

        outputs.forEach((res) => {
            users.push({ ...res.data(), userId: res.id })
        })

        outputsVideos.forEach((res) => {
            videos.push({ ...res.data(), videoId: res.id })
        })

       return{rapports, users, videos}
    } catch (err) {
        console.log(err)
    }
}
 
class RapportScreen extends Component {
    state = {
        rapports: [],
        users: [],
        videos: []
    }

    async componentDidMount(){
       const { users, rapports, videos } = await fetchRapports()

       this.setState({ rapports, users, videos })
    }

    render(){
        const{ rapports, users, videos } = this.state
        const keyExtractor = (_, index) => index.toString()

        const renderItem = ({ item }) => {
            const indexOfuser = users.map((u) => u.userId).indexOf(item.userId)

            const indexOfvideo = videos.map((v) => v.videoId).indexOf(item.videoId)

            return <RapportItem {...item} navigation={this.props.navigation} userData={users[indexOfuser]} videoData={videos[indexOfvideo]} />
        }
    
        return (
            <View style={{ backgroundColor: "#FFF", elevation: 3, margin: 10, marginTop: 30, borderRadius: 10 }}>
                <FlatList 
                    data={rapports}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
            </View>
        )
    }
}

export class Rapport extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Rapports">
                <Stack.Screen name="Rapports" component={RapportScreen} options={{ headerShown: true }} />
            </Stack.Navigator>
        )
    }
}

export default Rapport
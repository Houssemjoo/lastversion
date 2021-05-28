import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import UserImage from '../components/UserImage/UserImage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'react-native-paper'
import * as Linking from 'expo-linking';

const Stack = createStackNavigator()

const User = ({ userData }) => {
    return(
        <View style={{flex: 1, backgroundColor: "#FFF", elevation: 2, margin: 10, paddingVertical: 5}}>
            <View style={{flex: 1, margin: 15, flexDirection: "row", justifyContent:"space-between", alignItems: "center"}}>
                <Text style={{fontSize: 22, fontWeight: "500"}}>{userData.firstName} {userData.lastName}</Text>
                <UserImage sourceUrl={userData.sourceImg} />
            </View>
            <View style={{flex: 1, height: 0.5, backgroundColor: "#666", marginVertical: 15}} />
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8, flexDirection: "row"}}>
                <Icon name="email" color="#777777" size={20}/>
                <Text style={{color: "#777", marginLeft: 10}}>{userData.email}</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8, flexDirection: "row"}}>
                <Icon name="phone" color="#777777" size={20}/>
                <Text style={{color: "#777", marginLeft: 10}}>{userData.num}</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8, marginBottom: 15, flexDirection: "row"}}>
                <Icon name="map-marker-radius" color="#777777" size={20}/>
                <Text style={{color: "#777", marginLeft: 10}}>{userData.address}</Text>
            </View>
        </View>
    )
}

const Video = ({ videoData }) => {
    const handleOpenLink = (url) => {
        Linking.openURL(url);
    }

    return(
        <View style={{flex: 1, backgroundColor: "#FFF", elevation: 2, margin: 10, paddingVertical: 5}}>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8, flexDirection: "row"}}>
                <Text style={{color: "#333", marginLeft: 5}}> Titre : </Text>
                <Text style={{color: "#777", marginLeft: 5}}>{videoData.title}</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8, flexDirection: "row"}}>
                <Text style={{color: "#333", marginLeft: 5}}>Description : </Text>
                <Text style={{color: "#777", marginLeft: 5}}>{videoData.description}</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8, flexDirection: "row", alignItems: "center"}}>
                <Text style={{color: "#333", marginLeft: 5}}>Vidéo url : </Text>
                <Button onPress={() => handleOpenLink(videoData.url)} color="#ee6425" labelStyle={{fontSize: 12}} mode="text" style={{ marginLeft: 5 }}>Ouvrir</Button>
            </View>
        </View>
    )
}

const RapportInfo = ({ rapport }) => {
    return(
        <View style={{flex: 1, backgroundColor: "#FFF", elevation: 2, margin: 10, paddingVertical: 5}}>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8}}>
                <Text style={{color: "#333", marginLeft: 5, marginVertical: 5}}>Combien de répititions avez-vous fait ?</Text>
                <Text style={{color: "#777", marginLeft: 5}}>{rapport.nbrRep}</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8}}>
                <Text style={{color: "#333", marginLeft: 5, marginVertical: 5}}>Quel est l'intensité de votre douleur ? </Text>
                <Text style={{color: "#777", marginLeft: 5}}>{rapport.intensity} /10</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8}}>
                <Text style={{color: "#333", marginLeft: 5, marginVertical: 5}}>L'exercice a été difficile d'éxécuter?</Text>
                <Text style={{color: "#777", marginLeft: 5}}>{rapport.difficult}</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8}}>
                <Text style={{color: "#333", marginLeft: 5, marginVertical: 5}}>Avez-vous fait tout les exercices proposés ?</Text>
                <Text style={{color: "#777", marginLeft: 5}}>{rapport.done}</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 8}}>
                <Text style={{color: "#333", marginLeft: 5, marginVertical: 5}}>Ils ont été facile à faire ?</Text>
                <Text style={{color: "#777", marginLeft: 5}}>{rapport.resume}</Text>
            </View>
        </View>
    )
}

const Rapport = ({ route }) => {
    const{rapport, userData, videoData} = route.params

    const Data = [
        {
            name: 'user'
        },
        {
            name: 'video'
        },
        {
            name: 'rapport'
        }
    ]

    const keyExtractor = (_, index) => index.toString()

    const renderItem = ({ item }) => {
        if(item.name === "user"){
            return <User {...item} userData={userData} />
        }

        if(item.name === "video"){
            return <Video {...item} videoData={videoData} />
        }

        if(item.name === "rapport"){
            return <RapportInfo {...item} rapport={rapport} />
        }
    }

    return(
        <View style={{ backgroundColor: "#FFF", elevation: 3, margin: 10, marginTop: 30, borderRadius: 10 }}>
            <FlatList 
                data={Data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    )
}

export class SingleRapport extends Component {
    render() {
        const{ rapport, userData, videoData } = this.props.route.params;
        const name =  videoData.title || 'Rapport'

        return (
            <Stack.Navigator >
                <Stack.Screen name={'rapport'} component={Rapport} options={{title : name}}  initialParams={{ rapport: rapport, userData: userData, videoData: videoData }} />
            </Stack.Navigator>
        )
    }
}


export default SingleRapport

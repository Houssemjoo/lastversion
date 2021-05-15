import React, { PureComponent } from 'react'
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import {
    Title,
    Caption,
    TouchableRipple,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import UserImage from '../components/UserImage/UserImage'

import { connect } from 'react-redux'

export class ClientDashboard extends PureComponent {
    state = {
        videosTotal: 0,
        exercicesTotal: 0
    }

    logout = () => {
        firebase.auth()
        .signOut()
    }
    
    async componentDidMount(){
        const{ userId } = this.props.userState.currentUser

       const videosTotal = await this.FetchVideosCount({ userId })

       const exercicesTotal = await this.FetchExercices({ userId })

       if(videosTotal){
            this.setState({ videosTotal, exercicesTotal })
       }
    }

    FetchExercices = async ({ userId }) => {
        const querySnapshot =  await firebase.firestore().collection("exercices").where('usersId', 'array-contains', `${userId}`).get()

        if(!querySnapshot.exists){
            return querySnapshot.size
        }

        return null
    } 

    FetchVideosCount = async ({ userId }) => {
        try {
            const querySnapshot =  await firebase.firestore().collection("videos").where('usersId', 'array-contains', `${userId}`).get()

            if(!querySnapshot.exists){
                return querySnapshot.size
            }

            return null
        } catch(err) {
            return null
        }
    }
      
    render() {
        const { address = "", email = "", firstName = "", lastName = "", num = "", role = "", sourceImg = "" } = this.props.userState.currentUser
        const{ videosTotal, exercicesTotal } = this.state

        return (
            <SafeAreaView style = {styles.container}>
                <ScrollView>
                    <View style = {{flex: 1, paddingHorizontal: 20, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }} >
                          
                            <UserImage sourceUrl={sourceImg} />

                            <View style={{ flex: 1, marginHorizontal: 15, justifyContent: "flex-start", alignItems: "flex-start" }}>
                                <Title style={[styles.title, {
                                    marginTop:15,
                                    marginBottom: 5,
                                    marginLeft: 10,
                                    flexShrink: 1,
                                    }]}
                                >
                                    {lastName} {firstName}
                                </Title>
                            </View>
                        </View>
                    </View>

                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Icon name="map-marker-radius" color="#777777" size={20}/>
                            <Text style={{color:"#777777", marginLeft: 20}}> { address } </Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="phone" color="#777777" size={20}/>
                            <Text style={{color:"#777777", marginLeft: 20}}> { num } </Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="email" color="#777777" size={20}/>
                            <Text style={{color:"#777777", marginLeft: 20}}> { email } </Text>
                        </View>
                    </View>

      
                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox, {
                            borderRightColor: '#dddddd',
                            borderRightWidth: 1
                        }]}>
                            <Title>{ videosTotal }</Title>
                            <Caption>Vidéos</Caption>
                        </View>
                        <View style={styles.infoBox}>
                            <Title>{ exercicesTotal }</Title>
                            <Caption>Exercices</Caption>
                        </View>
                    </View>

                    <View tyle={styles.menuWrapper}>
                        <TouchableRipple onPress={() => {this.props.navigation.navigate("Videos")}}>
                            <View style={styles.menuItem}>
                                <Icon name="message-video" color="#FFA500" size={25}/>
                                <Text style={styles.menuItemText}>Mes Vidéos</Text>
                            </View>
                        </TouchableRipple>

                        <TouchableRipple onPress={() => {this.props.navigation.navigate('Exercices')}}>
                            <View style={styles.menuItem}>
                                <Icon name="run-fast" color="#FFA500" size={25}/>
                                <Text style={styles.menuItemText}>Mes Exercices</Text>
                            </View>
                        </TouchableRipple>
                        
                        
                        <TouchableRipple  onPress={() => {this.props.navigation.navigate("EditProfile")}}>
                            <View style={styles.menuItem}>
                                <Icon name="file-document-edit-outline" color="#FFA500" size={25}/>
                                <Text style={styles.menuItemText}>Modifier</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple  onPress={() => this.logout()}>
                            <View style={styles.menuItem}>
                                <Icon name="logout-variant" color="#FFA500" size={25}/>
                                <Text style={styles.menuItemText}>Se Déconnecter </Text>
                            </View>
                        </TouchableRipple>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    userState: state.userState,
})

export default connect(mapStateToProps)(ClientDashboard)

const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 5,
        marginTop: 10
      },
      title: {
        fontSize: 22,
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
      },
      row: {
        flexDirection: 'row',
        marginBottom: 15,
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 80,
        marginVertical: 15
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
        marginBottom: 30
      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
      }
})
import React, { PureComponent } from 'react'
import { Text, View, SafeAreaView, ScrollView, StyleSheet  } from 'react-native'
import { Title, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import UserImage from '../components/UserImage/UserImage'

import { connect } from 'react-redux'

export class Account extends PureComponent {
    constructor(props) {
        super(props);
        this.mounted = false
    }
    
    componentDidMount(){
        this.mounted = true
    }

    logout = () => {
        if(this.mounted){
            firebase.auth()
            .signOut()
        }
    }

    componentWillUnmount(){
        this.mounted = false
    }

    render() {
        const { address = "", email = "", firstName = "", lastName = "", num = "", role = "", sourceImg = "" } = this.props.userState.currentUser

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style = {{ flex: 1, paddingHorizontal: 20, marginBottom: 20  }}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }} >

                            <UserImage sourceUrl={sourceImg} />

                            <View style={{ flex: 1, marginHorizontal: 15, justifyContent: "flex-start", alignItems: "flex-start" }}>
                                <Title style={[styles.title, {
                                marginTop:15,
                                marginBottom: 5,
                                marginLeft: 10,
                                flexShrink: 1,
                                }]}>{ lastName } { firstName } </Title>
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
      
                    <View tyle={styles.menuWrapper}>
                        <TouchableRipple onPress={() => { this.props.navigation.navigate('SendExercices') }}>
                            <View style={styles.menuItem}>
                                <Icon name="share-outline" color="#ee6425" size={25}/>
                                <Text style={styles.menuItemText}>Envoyer des exercices</Text>
                            </View>
                        </TouchableRipple>

                        <TouchableRipple  onPress={() => {this.props.navigation.navigate("EditProfile")}}>
                            <View style={styles.menuItem}>
                                <Icon name="file-document-edit-outline" color="#ee6425" size={25}/>
                                <Text style={styles.menuItemText}>Modifier</Text>
                            </View>
                        </TouchableRipple>

                        <TouchableRipple  onPress={() => this.logout()}>
                            <View style={styles.menuItem}>
                                <Icon name="logout-variant" color="#ee6425" size={25}/>
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

export default connect(mapStateToProps)(Account)

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
        justifyContent: "center"
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
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

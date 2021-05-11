import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import {
    Title,
    Caption,
    Button
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RemoveUser } from '../redux/actions'
import UserImage from '../components/UserImage/UserImage'

export class UserProfile extends PureComponent {

    handleDeleteUser = () => {
        const{ userId } = this.props.route.params.user

        this.props.RemoveUser({ userId })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            if(prevProps.usesrState !== this.props.usesrState){
                const{ userId } = this.props.route.params.user
                const{ users } = this.props.usesrState
                const indexId = users.map((user) => user.userId).indexOf(userId)

                if(indexId === -1){
                   this.props.navigation.goBack()
                }
            }
        }
    }

    render() {
        const { address = "", email = "", firstName = "", lastName = "", num = "", sourceImg = "" } = this.props.route.params.user
        
        return (
            <SafeAreaView style = {styles.container}>
                <ScrollView>
                    <View style = {styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }} >
                          
                            <UserImage sourceUrl={sourceImg} />

                            <View style={{flex: 1, marginHorizontal: 10, justifyContent: "flex-start", alignItems: "center"}}>
                                <Title style={[styles.title, {
                                    marginTop:15,
                                    marginBottom: 5,
                                    flexShrink: 1,
                                }]}> {lastName} {firstName} </Title>
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
                            <Title>4</Title>
                            <Caption>Videos</Caption>
                        </View>
                        <View style={styles.infoBox}>
                            <Title>12</Title>
                            <Caption>Exercices</Caption>
                        </View>
                    </View>

                    <Button labelStyle={{ fontSize: 18 }} contentStyle={{ paddingVertical: 2 }} style={{margin: 50,}} color="#F00" icon="delete" mode="contained" onPress={() => this.handleDeleteUser()}>
                        Supprimer
                    </Button>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    usesrState: state.usersState
})

export default connect(mapStateToProps, { RemoveUser })(UserProfile)

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
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
        marginBottom: 10,
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
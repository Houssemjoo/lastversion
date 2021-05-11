import React, { Component } from 'react'
import { View, ActivityIndicator, FlatList, Pressable, Text } from 'react-native'

import { Avatar, List } from 'react-native-paper';
import { connect } from 'react-redux'
import { FetchUsers }  from '../redux/actions'

const User = ({ firstName, lastName, sourceImg = "https://icon-library.com/images/user-profile-icon/user-profile-icon-12.jpg", email, navigation, address, num, userId }) => {
    return(
        <Pressable onPress={() => { navigation.navigate('Single User', { firstName, lastName, sourceImg, email, address, num, userId }) }} android_ripple={{ color: '#CCC' }} style={{borderBottomWidth: 0.5, borderBottomColor: "#CCC" }} >
            <List.Item
                titleStyle={{marginTop: 0}}
                title={`${firstName} ${lastName}`}
                description={email}
                left={props => <Avatar.Image style={{backgroundColor: "#00000000", marginTop: 10, marginRight: 10}} source={{uri: sourceImg}} size={35}  />}
            />
        </Pressable>
    )
}

export class Patients extends Component {
    componentDidMount(){
        this.props.FetchUsers()
    }

    render() {
        const{ users } = this.props.usersState
        
        const keyExtractor = (_, index) => index.toString()

        const renderItem = ({ item }) => {
            return <User {...item} navigation={this.props.navigation} />
        }

        return (
            <View style={{ backgroundColor: "#FFF", elevation: 3, margin: 10, marginTop: 30, borderRadius: 10 }}>
                <FlatList 
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    usersState: state.usersState,
})

export default connect(mapStateToProps, { FetchUsers })(Patients)

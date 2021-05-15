import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import SelectCheckBox from '../../../components/SelectCheckBox/SelectCheckBox'

const UsersList = ({ users, setCheckedUsers, selectedUsers }) => {
    const keyExtractor = (_, index) => index.toString()

    const renderItem = ({ item }) => {
        return <SelectCheckBox onPress={setCheckedUsers} selectedUsers={selectedUsers} {...item} />
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

export default UsersList

const styles = StyleSheet.create({
    card:{
     flex: 1,
     backgroundColor: "#FFF", 
     margin: 10, 
     padding: 10, 
     elevation: 1, 
     borderRadius: 8
    }
 })
 
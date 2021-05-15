import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Searchbar } from 'react-native-paper'

const contains = ({ firstName, lastName }, query) => {
    const fullName = `${firstName} ${lastName}`
    const test = fullName.toLowerCase()
    if(test.includes(query)){
        return true
    } else {
        return false
    }
}

const SearchBarUsers = ({ Users, onSearchChange  }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const onChangeSearch = query => {
        const filterInput = query.toLowerCase()

        const data  = Users.filter(user => {
            return contains(user, filterInput)
        })

        setSearchQuery(query)
        onSearchChange(data)
    }

    return (
        <View style={styles.searchBar}> 
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

export default SearchBarUsers

const styles = StyleSheet.create({
    searchBar:{
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 10 
    }
 })
 
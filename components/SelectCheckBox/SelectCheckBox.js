import React, { useState, useEffect } from 'react'
import { View, Pressable } from 'react-native'
import { List, Avatar } from 'react-native-paper'
import UnCheckIcon from '../unCheckIcon'
import CheckIcon from '../checkIcon'

const UnCheck = () => (
    <View style={{width: 30, height: 30, marginTop: 10}}>
        <UnCheckIcon />
    </View>
)

const Check = () => (
    <View style={{width: 30, height: 30, marginTop: 10}}>
        <CheckIcon />
    </View>
)

const UsersListIcon = (checked) => {
    if(checked.checked){
        return <Check />
    } else {
        return <UnCheck />
    }
}

export default function SelectCheckBox({ firstName, lastName, email, sourceImg = "https://icon-library.com/images/user-profile-icon/user-profile-icon-12.jpg", userId, onPress, reset, selectedUsers }) {
    const[checked, setChecked] = useState(false)

    useEffect(() => {
        if(selectedUsers){
            const userIndex = selectedUsers.indexOf(userId)
            if(userIndex === -1){
                setChecked(false)
            } else {
                setChecked(true)
            }
        }
    }, [selectedUsers, onPress, userId])

    const bgcolor = () => {
        if(checked){
            return '#ddd'
        } else {
            return '#FFF'
        }
    }

    const handlePress = () => {
        //setChecked(!checked)
        if(selectedUsers){
            const userIndex = selectedUsers.indexOf(userId)
            if(userIndex === -1){
                setChecked(true)
                onPress({ userId, checked: true})
            } else {
                setChecked(false)
                onPress({ userId, checked: false})
            }            
        }
    }
    
    return (
        <Pressable onPress={handlePress} android_ripple={{ color: "#777" }} style={{ borderBottomWidth: 0.5, borderBottomColor: "#CCC", backgroundColor: bgcolor() }}>
            <List.Item
                title={`${firstName} ${lastName}`}
                description={email}
                titleStyle={{ fontSize: 14, textTransform: "capitalize" }}
                descriptionStyle={{ fontSize: 12 }}
                right={props => <UsersListIcon checked={checked} />}
                left={props => <Avatar.Image style={{backgroundColor: "#00000000", marginTop: 10, marginRight: 10}} source={{uri: sourceImg}} size={35}  />}
            />
        </Pressable>
    )
}

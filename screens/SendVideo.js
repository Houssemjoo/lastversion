import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SendVideosScreen from './SendVideos'

const Stack = createStackNavigator()

export class SendVideo extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Diffusion des Vidéos" component={SendVideosScreen} options={{ headerShown: true }} />
            </Stack.Navigator>
        )
    }
}

export default SendVideo
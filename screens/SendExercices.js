import React, { PureComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SendExerciceScreen from './SendExercice'

const Stack = createStackNavigator()

export class SendExercices extends PureComponent {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Envoie d'exercice" component={SendExerciceScreen} options={{ headerShown: true }} />
            </Stack.Navigator>
        )
    }
}

export default SendExercices

import React, { PureComponent } from 'react'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'

import ClientAccountScreen from '../../screens/ClientAccount'

const Stack = createStackNavigator()

export class ClientDashboard extends PureComponent {
    render() {
        return (
            <Stack.Navigator initialRouteName="Compte">
                <Stack.Screen name="Compte" component={ClientAccountScreen} options={{ headerShown: false, headerTitle: "", headerStyle: { backgroundColor: '#4ba0f4'}, headerTintColor: '#fff' } } />
            </Stack.Navigator>
        )
    }
}

export default ClientDashboard
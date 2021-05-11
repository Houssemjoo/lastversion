import React, { PureComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import PatientScreen from './UserProfile'

const Stack = createStackNavigator()

export class SingleUser extends PureComponent {
    
    render() {
        const { firstName, lastName } = this.props.route.params
        
        let PatientName =  `${firstName} ${lastName}` || 'Patient'

        return (
            <Stack.Navigator>
                <Stack.Screen name={PatientName} component={PatientScreen} options={{ headerShown: true }} initialParams={ { user: this.props.route.params }} />
            </Stack.Navigator>
        )
    }
}

export default SingleUser

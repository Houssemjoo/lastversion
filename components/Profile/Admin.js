import React, { PureComponent } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'

import AdminDashboardScreen from '../../screens/AdminDashboard'
import SendVideoScreen from '../../screens/SendVideo'
import UsersScreen from '../../screens/Users'
import RapportsScreen from '../../screens/Rapports'

const Tab = createMaterialBottomTabNavigator()

export class AdminDashboard extends PureComponent {
    render() {
        return (
            <Tab.Navigator
                barStyle={{ backgroundColor: '#FFF' }}
                initialRouteName="Account"
                labeled={true}
                shifting={false}
            >
                <Tab.Screen name="Account" component={AdminDashboardScreen}
                    options={{
                        tabBarLabel: 'Compte',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcons name="user-circle" color={color} size={24} />
                        ),
                }} />

                <Tab.Screen name="Send Video" component={SendVideoScreen}
                    options={{
                        tabBarLabel: 'Vidéos',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcons name="send" color={color} size={24} />
                        ),
                }}/>


                <Tab.Screen name="Users" component={UsersScreen}
                    options={{
                        tabBarLabel: 'Patients',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcons name="users" color={color} size={24} />
                        ),
                }}/>

                <Tab.Screen name="Reviews" component={RapportsScreen}
                    options={{
                        tabBarLabel: 'Rapports',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcons name="commenting" color={color} size={24} />
                        ),
                }}/>

            </Tab.Navigator>
        )
    }
}

export default AdminDashboard

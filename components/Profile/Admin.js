import React, { PureComponent } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../screens/Account";

const Stack = createStackNavigator();

export class AdminDashboard extends PureComponent {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AdminAccount"
          component={AccountScreen}
          options={{
            headerShown: false,
            headerTitle: "",
            headerStyle: { backgroundColor: "#4ba0f4" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    );
  }
}

// export class AdminDashboard extends PureComponent {
//     render() {
//         return (
//             <Tab.Navigator
//                 barStyle={{ backgroundColor: '#FFF' }}
//                 initialRouteName="Account"
//                 labeled={true}
//                 shifting={false}
//             >
//                 <Tab.Screen name="Account" component={AdminDashboardScreen}
//                     options={{
//                         tabBarLabel: 'Compte',
//                         tabBarIcon: ({ color, size }) => (
//                             <FontAwesomeIcons name="user-circle" color={color} size={24} />
//                         ),
//                 }} />

//                 <Tab.Screen name="Send Video" component={SendVideoScreen}
//                     options={{
//                         tabBarLabel: 'Vidéos',
//                         tabBarIcon: ({ color, size }) => (
//                             <FontAwesomeIcons name="send" color={color} size={24} />
//                         ),
//                 }}/>

//                 <Tab.Screen name="Users" component={UsersScreen}
//                     options={{
//                         tabBarLabel: 'Patients',
//                         tabBarIcon: ({ color, size }) => (
//                             <FontAwesomeIcons name="users" color={color} size={24} />
//                         ),
//                 }}/>

//                 <Tab.Screen name="Reviews" component={RapportsScreen}
//                     options={{
//                         tabBarLabel: 'Rapports',
//                         tabBarIcon: ({ color, size }) => (
//                             <FontAwesomeIcons name="commenting" color={color} size={24} />
//                         ),
//                 }}/>

//             </Tab.Navigator>
//         )
//     }
// }

export default AdminDashboard;

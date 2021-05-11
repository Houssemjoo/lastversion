import React, { Component } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'

import { connect } from 'react-redux'
import { fetchUser } from '../redux/actions/'

import ClientDashboard from '../components/Profile/ClientDashboard'
import Admin from '../components/Profile/Admin'

export class Profile extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchUser() 
  }
  
  render() {
    const { currentUser } = this.props.userState

    if(currentUser){
      if(currentUser.role === "admin"){
        return <Admin />
      }

      if(currentUser.role === "client"){
        return <ClientDashboard navigation={this.props.navigation} />
      }

      return null
    }

    return null
  }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
})

export default connect(mapStateToProps, { fetchUser })(Profile)

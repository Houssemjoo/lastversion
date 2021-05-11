import React, { Component } from 'react'
import { Text, SafeAreaView, StyleSheet, View } from 'react-native'
import Slider from '@react-native-community/slider';
import Antdesign from 'react-native-vector-icons/AntDesign'
import {TouchableRipple} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ReviewInput from '../components/design/ReviewInput'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { connect } from 'react-redux'

export class Preview extends Component {
        constructor(props) {
        super(props);
            this.state = {
              nbrRep: '',
              intensity: '',
              difficult: '',
              done: '',
              resume: '',
            }
    }
    componentDidMount(){
        const { userId } = this.props.userState.currentUser
        
    }
    onSendReview = () => {
        const { nbrRep, intensity, difficult, done, resume } = this.state
        const { userId } = this.props.userState.currentUser

        // firebase.firestore().collection("rapport")
        //     .add({
        //       nbrRep,
        //       intensity,
        //       difficult,
        //       done,
        //       resume,
        //       userId
        //     })
            
    }

    
    render() {
        
    return (
        
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <View style={{ flex: 1, justifyContent:'center'}}>
                        
                    </View>

                        <SafeAreaView style = {styles.container}>
                            
                                <View style={{marginBottom: 10}}>
                                <Text style = {styles.quest}>Combien de répititions avez-vous fait ?
                                </Text>
                                <ReviewInput 
                                iconType='form'
                                onChangeText={(nbrRep)=> this.setState({ nbrRep })}
                                />
                                </View>

                                <Text style = {{
                                fontSize: 15,
                                fontWeight: 'bold'
                                }}>Quel est l'intensité de votre douleur ?
                                </Text>

                                <Slider
                                style={{width:'100%', height: 100}}
                                minimumValue={0}
                                maximumValue={10}
                                step = {1}
                                minimumTrackTintColor="#191970"
                                maximumTrackTintColor="black"
                                /> 

                            
                            <View style={{marginBottom: 5}}>
                            <Text style = {styles.quest} >
                                L'exercice a été difficile d'éxécuter?
                            </Text>
                            <ReviewInput 
                            iconType='form'
                            onChangeText={(difficult)=> this.setState({ difficult })}
                            />
                            </View>
                            
                            <View style={{marginBottom: 1}}>
                            <Text style = {styles.quest}>
                            Avez-vous fait tout les exercices proposés ?
                            </Text>
                            <ReviewInput 
                            iconType='form'
                            onChangeText={(done)=> this.setState({ done })}
                            />
                            </View>

                            <View style={{marginBottom: 15}}>
                            <Text style = {styles.quest}>
                            Ils ont été facile à faire ?
                            </Text>
                            <ReviewInput 
                            iconType='form'
                            onChangeText={(resume)=> this.setState({ resume })}
                            />
                            </View>

                            <TouchableRipple onPress={() => {alert('Bilan bien envoyé !')}}>
                                <View style={{ width: '80%',marginLeft: 35,borderRadius : 80, alignItems : 'center', justifyContent :'center',height: 40,  backgroundColor: '#33FF69'}}>

                                    <Text style={{fontSize: 20,color: '#191970', fontWeight:'bold' }}>Envoyer</Text>
                                </View>
                            </TouchableRipple>

                        </SafeAreaView >
                    </View>
            </ScrollView>
        </SafeAreaView>  

    )
} 

}
const mapStateToProps = (state) => ({
    userState: state.userState,
})
    export default connect(mapStateToProps)(Preview)

const styles = StyleSheet.create({

    container: {
      marginTop: 30,
      marginLeft:20,
      marginRight:20,

    },
    quest : {
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold'
    }

}) 
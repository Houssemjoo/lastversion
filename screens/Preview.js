import React, { Component } from 'react'
import { Text, SafeAreaView, StyleSheet, View } from 'react-native'
import Slider from '@react-native-community/slider'
import { ScrollView } from 'react-native-gesture-handler'
import ReviewInput from '../components/design/ReviewInput'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { connect } from 'react-redux'
import  { Button } from 'react-native-paper'
import { sendPushNotification } from '../utility/PushNotification'

export class Preview extends Component {
    constructor(props) {
        super(props);
            this.state = {
                nbrRep: '',
                intensity: 5,
                difficult: '',
                done: '',
                resume: '',
                adminExpoToken: []
            }
    }

    componentDidMount(){
        firebase.firestore().collection("users").where('role', '==', 'admin').get()
            .then((querySnapshot) => {
                if(!querySnapshot.exists){
                    const adminExpoToken = []
                    querySnapshot.forEach(documentSnapshot => {
                        const adminUser = documentSnapshot.data()
                        adminExpoToken.push(adminUser.expoToken)
                    })
                    this.setState({ adminExpoToken: adminExpoToken  })
                }
            })
            .catch(err => console.log(err))
    }
    
    onSendReview = () => {
        const { nbrRep, intensity, difficult, done, resume, adminExpoToken } = this.state
        const { userId, firstName, lastName } = this.props.userState.currentUser
        const{ videoId } = this.props.route.params

        console.log(adminExpoToken)

        let validate = true

        if(!nbrRep){
            validate = false
        }

        if(!difficult){
            validate = false
        }

        if(!resume){
            validate = false
        }

        if(!done){
            validate = false
        }

        if(!intensity){
            validate = false
        }

        if(!validate){
            alert("Completez le bilan ⚠️")
        }

        if(validate){
            firebase.firestore().collection("rapport")
            .add({
                nbrRep,
                intensity,
                difficult,
                done,
                resume,
                userId,
                videoId
            })
            .then(() => {
                this.setState({
                    nbrRep: "",
                    intensity: 5,
                    difficult: "",
                    done: "",
                    resume: "",
             })

            if(adminExpoToken && adminExpoToken.length > 0){
                sendPushNotification({ expoPushToken: adminExpoToken, title: `Nouveau rapport 🆕`, body: `Vous recevez un nouveau rapport de : ${lastName} ${firstName} 👥`})
            }

            alert("Bilan bien envoyé ✔️")
            })
            .catch((err) => {
                console.log(err)
                alert("Server Error ❌")
            })
        }  
    }

    render() {
        const{ nbrRep, intensity, difficult, done, resume  } = this.state
        
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <View style={{ flex: 1, justifyContent:'center'}}>
                            
                        </View>
                            <View style = {styles.container}>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style = {styles.quest}>Combien de répititions avez-vous fait ?
                                        </Text>
                                        <ReviewInput 
                                            labelValue={nbrRep}
                                            iconType='form'
                                            onChangeText={(nbrRep)=> this.setState({ nbrRep })}
                                        />
                                    </View>

                                    <Text style = {{
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                        }}
                                    >
                                        Quel est l'intensité de votre douleur ?
                                    </Text>

                                    <Slider
                                        style={{width:'100%', marginVertical: 20}}
                                        value={intensity}
                                        minimumValue={0}
                                        maximumValue={10}
                                        step = {1}
                                        minimumTrackTintColor="#191970"
                                        maximumTrackTintColor="black"
                                        onValueChange={(val) => this.setState({intensity: val})}
                                    /> 

                                    <View style={{ flex: 1, flexDirection: "row", marginBottom: 20, alignItems: "center" }}>
                                        <Text style={{fontSize: 18, textTransform: "capitalize", textDecorationLine: "underline"}}>intensité :</Text>
                                        <Text style={{fontSize: 20, color: "#3ebd5f", marginLeft: 15}}>{intensity}</Text>
                                    </View>
                                        
                                <View style={{marginBottom: 5}}>
                                    <Text style = {styles.quest} >
                                        L'exercice a été difficile d'éxécuter?
                                    </Text>
                                    <ReviewInput
                                        labelValue={difficult}
                                        iconType='form'
                                        onChangeText={(difficult)=> this.setState({ difficult })}
                                    />
                                </View>
                                
                                <View style={{marginBottom: 1}}>
                                    <Text style = {styles.quest}>
                                        Avez-vous fait tout les exercices proposés ?
                                    </Text>
                                    <ReviewInput 
                                        labelValue={done}
                                        iconType='form'
                                        onChangeText={(done)=> this.setState({ done })}
                                    />
                                </View>

                                <View style={{marginBottom: 15 }}>
                                    <Text style = {styles.quest}>
                                        Ils ont été facile à faire ?
                                    </Text>
                                    <ReviewInput
                                        labelValue={resume}
                                        iconType='form'
                                        onChangeText={(resume)=> this.setState({ resume })}
                                    />
                                </View>

                                <Button
                                    mode="contained"
                                    color="#3ebd5f"
                                    style={{ marginBottom: 30 }}
                                    labelStyle={{ fontSize: 18, color: "#FFF" }}
                                    onPress={this.onSendReview}
                                >
                                    Envoyer  
                                </Button>

                            </View>
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
        marginTop: 15,
        marginLeft:20,
        marginRight:20,
    },
    quest : {
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold'
    }
}) 
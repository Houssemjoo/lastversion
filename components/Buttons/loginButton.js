import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper'

export default function LoginButton({text, onPress}) {
    return (
        <View style={{marginTop: 50}}>
            <Button mode="contained" labelStyle={styles.buttonText} onPress={onPress} contentStyle={styles.button}>
                {text}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width : 250,
        textAlign: 'center',
        fontSize: 16,
        padding: 5,
        backgroundColor: "#ee6425"
    },
    buttonText : {
       color : 'white',
       fontWeight : 'bold',
       textTransform : 'uppercase',
       fontSize:16,
       textAlign : 'center'
    }
})
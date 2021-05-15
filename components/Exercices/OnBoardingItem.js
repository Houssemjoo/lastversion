import React from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';

function OnBoardingItem({item}) {
const {width} = useWindowDimensions()
    return (
        <View style = {[styles.container, {width}]}>
            <Image 
            source = {{uri: item.image}} 
            style = {[styles.image, {width, resizeMode :'contain'}]}
            />
            <View  style = {{flex : 0.3}}>
                <Text style = {styles.title}>{item.title}</Text>
                <Text style = {styles.desc}>{item.description}</Text>
            </View>
        </View>
    );
}

export default OnBoardingItem;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        justifyContent:'center',
        alignItems: 'center'
    },
    image : {
        flex : 0.7,
        justifyContent: 'center',
    },
    title : {
        fontWeight : '800',
        fontSize : 28 ,
        marginBottom : 10 ,
        color : '#493d8a',
        textAlign : 'center'
    },
    desc : {
        fontWeight : '300',
        paddingHorizontal:60,
        color : '#62656b',
        textAlign : 'center'
    }
})
import React, {useEffect , useRef} from 'react';
import { StyleSheet, Animated, View, TouchableOpacity } from 'react-native';
import Svg , {G, Circle } from 'react-native-svg';
import {AntDesign} from '@expo/vector-icons'


function NextButton({percentage,scrollTo}) {

    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 ;
    const circumference  = 2 * Math.PI * radius;
    const progressAnimation = useRef ( new Animated.Value(0)).current
    const progRef = useRef(null)
    const animation = (toValue)=>{
        return Animated.timing(progressAnimation,{
            toValue,
            duration:250,
            useNativeDriver : true
        }).start()
    }
    useEffect (()=>{
        animation(percentage)
    }, [percentage])

    useEffect (()=>{

        progressAnimation.addListener((value)=>{
            
            const strokeDashoffset = circumference - (circumference * value.value) / 100

            if(progRef?.current){

                progRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        })
    }, [percentage])


    return (
        <View style = {styles.container}>
           <Svg width = {size} height = {size}>
           <Circle 
           ref = {progRef}

           stroke = '#E7E8E9' 
           cx = {center} 
           cy = {center} 
           r = {radius} 
           strokeWidth= {strokeWidth}
           strokeDasharray = {circumference}
           
           />
           </Svg>
           <TouchableOpacity 
           style = {styles.button}
           onPress = {scrollTo}
           >
               <AntDesign name = 'arrowright' size = {32} color = '#fff' />
           </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }, 
    button : {
        position : 'absolute',
        backgroundColor : '#fca221', 
        borderRadius : 100,
        padding : 20
    }
})
export default NextButton;
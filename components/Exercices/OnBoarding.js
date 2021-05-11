import React, {useState , useRef} from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import Paginator from './Paginator'
import NextButton from './NextButton'
import slides from '../../slides';
import OnBoardingItem from './OnBoardingItem'

function OnBoarding() {
    const [currentIndex , setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current

    const viewableItemChanged = useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index)

    }).current
    const viewConfig = useRef({viewAreaCoveragePercentThreshold : 50 }).current
    const slidesRef = useRef(null)

    const scrollTo = ()=>{
        if(currentIndex < slides.length-1){
            slidesRef.current.scrollToIndex({index: currentIndex+1})
        }else {
            alert ('Dernier exercice ❤❤ ')
        }
    }

    return (
        <View style = {styles.container}>
            <View style = {{flex : 3}}>
           <FlatList 
           data = {slides}
           renderItem = {({item})=> <OnBoardingItem item = {item} />}
           horizontal
           showsHorizontalScrollIndicator
           pagingEnabled
           bounces = {false}
           onScroll = {Animated.event([{ nativeEvent : {contentOffset : {x: scrollX } } } ] , {
               useNativeDriver: false,

           }) }
           onViewableItemsChanged = {viewableItemChanged}
           viewabilityConfig = {viewConfig}
           ref = {slidesRef}
           />
           </View>
           <Paginator data = {slides} scrollX = {scrollX}/>
           <NextButton scrollTo = {scrollTo} percentage = {(currentIndex+1)*100/slides.length} />
        </View>
    );
}

export default OnBoarding;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        justifyContent:'center',
        alignItems: 'center'
    }
})
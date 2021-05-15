import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableRipple  }  from 'react-native-paper'
import { View, ImageBackground } from 'react-native'
import { windowWidth } from '../../components/utils/Dimensions'

const imageSize = windowWidth * 0.6

export default function ExerciceImage({ image, handlePress }) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                <TouchableRipple onPress={handlePress} rippleColor="rgba(0, 0, 0, .32)" style={{ flex: 1, width: imageSize, height: imageSize, backgroundColor: "#F1F1F1", borderRadius: 5 }}>
                    <ImageBackground
                        source={{
                            uri: image,
                        }}
                        style={{ height: imageSize, width: imageSize }}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: "#00000030",
                            }}
                        >
                            <Icon
                                name="camera-plus"
                                size={35}
                                color="#FFF"
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                }}
                            />
                        </View>
                    </ImageBackground>
                </TouchableRipple>
            </View>
        )
}
import React from 'react'
import { HelperText } from 'react-native-paper'

export default function ErrorFieldMessage({ msgs }) {
    if(msgs && msgs.length > 0){
        return msgs.map((m, index) => (
            <HelperText key={index} type="error" visible={true}>
                { m }
            </HelperText>
        ))
    }

    return null
}

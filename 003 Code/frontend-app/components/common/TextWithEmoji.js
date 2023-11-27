import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import { Text } from 'react-native-paper';

function TextWithEmoji({
    style,
    emoji,
    text
}) {
    return (
        <View style={[_styles.block, style]}>
            <Text style={_styles.text} variant='bodyMedium'>{text}</Text>
            <Image style={_styles.emoji} source={emoji}/>
        </View>
    )
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        marginRight: 5
    },
    emoji: {
        height: 20,
        width: 20
    }
});

export default TextWithEmoji;
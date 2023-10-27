import React from 'react';
import {
    Pressable,
    View,
    Image,
    StyleSheet
} from 'react-native';
import { Text } from 'react-native-paper';

function System({
    image,
    title,
    text,
    onPress
}) {
    return (
        <Pressable
            style={({pressed}) => [
                {backgroundColor: pressed ? '#f5f5f5' : '#ffffff'}
                ,_styles.block
            ]}
            onPress={onPress}
        >
            <Image style={_styles.image} source={image}/>
            <View style={_styles.texts}>
                <Text style={_styles.title} variant='bodyLarge'>{title}</Text>
                <Text style={_styles.text} variant='bodyMedium'>{text}</Text>
            </View>
        </Pressable>
    )
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 10,
        borderRadius: 5
    },
    image: {
        height: 50,
        width: 50,
        marginRight: 10
    },
    texts: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        color: '#000000',
        fontWeight: 'bold'
    },
    text: {
        color: '#000000'
    }
});

export default System;
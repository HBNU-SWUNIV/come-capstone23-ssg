import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

function ImageWithText({ image, text }) {
    return (
        <SafeAreaView style={styles.block}>
            <Image style={styles.image} source={image}/>
            <Text style={styles.text} variant='titleLarge'>{text}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginBottom: 20,
        height: 140,
        width: 140
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000'
    }
});

export default ImageWithText;
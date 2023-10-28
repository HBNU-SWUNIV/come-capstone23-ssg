import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import { Button, Text } from 'react-native-paper';

function HomeNotRegister({
    style,
    image,
    title,
    body,
    buttonText,
    onPress
}) {
    return (
        <View style={[_styles.block, style]}>
            <Image style={_styles.image} source={image}/>
            <Text style={_styles.titleText} variant='titleMedium'>
                {title}
            </Text>
            <Text style={_styles.bodyText} variant='bodyLarge'>
                {body}
            </Text>
            <Button
                style={_styles.button}
                mode='contained'
                onPress={onPress}
            >
                {buttonText}
            </Button>
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginBottom: 20,
        height: 140,
        width: 140
    },
    titleText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 10
    },
    bodyText: {
        textAlign: 'center',
        color: '#000000',
        marginBottom: 40
    },
    button: {
        borderRadius: 5
    }
});

export default HomeNotRegister;
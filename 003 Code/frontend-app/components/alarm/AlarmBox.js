import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import { Text } from 'react-native-paper';

function AlarmBox({
    image,
    title,
    children
}) {
    return (
        <View style={_styles.block}>
            <View style={_styles.titleBlock}>
                <Image style={_styles.image} source={image}/>
                <Text style={_styles.text} variant='titleLarge'>{title}</Text>
            </View>
            <View>
                {children}
            </View>
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        marginRight: 20,
        marginLeft: 20
    },
    titleBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 16
    },
    image: {
        marginRight: 16,
        height: 40,
        width: 40
    },
    text: {
        fontWeight: 'bold'
    }
});

export default AlarmBox;
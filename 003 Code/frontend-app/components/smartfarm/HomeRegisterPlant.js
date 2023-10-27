import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import TextWithEmoji from '../common/TextWithEmoji';
import plant from '../../assets/icon/plant.png';
import sad from '../../assets/emoji/sad.png';
import laugh from '../../assets/emoji/laugh.png';

function HomeRegisterPlant() {
    return (
        <View style={styles.block}>
            <Image style={styles.image} source={plant}/>
            <Text style={styles.titleText} variant='titleMedium'>
                새싹이와 10일 째
            </Text>
            <TextWithEmoji
                style={styles.titleTextWithEmoji}
                emoji={sad}
                text='90일 후에 새싹이와 헤어질 예정이에요'
            />
            <Button style={styles.button} mode='contained'>
                수확
            </Button>
            <TextWithEmoji
                style={styles.bodyTextWithEmoji}
                emoji={laugh}
                text='농부의 DN가 흐르고 있네요'
            />
            <Text style={styles.bodyText} variant='bodyMedium'>
                새싹이는 건강하게 자라고 있으니 걱정마세요
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    image: {
        marginBottom: 20,
        height: 140,
        width: 140,
    },
    titleText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8
    },
    titleTextWithEmoji: {
        marginBottom: 40
    },
    button: {
        borderRadius: 5,
        marginBottom: 40
    },
    bodyTextWithEmoji: {
        marginBottom: 8
    },
    bodyText: {
        textAlign: 'center',
        color: '#000000'
    }
});

export default HomeRegisterPlant;
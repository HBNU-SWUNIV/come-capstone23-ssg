import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import TextWithEmoji from '../common/TextWithEmoji';
import plant from '../../assets/icon/plant.png';
import laugh from '../../assets/emoji/laugh.png';
import smile from '../../assets/emoji/smile.png';
import frown from '../../assets/emoji/frown.png';
import dizzy from '../../assets/emoji/dizzy.png';

const textWithNdvi = (ndvi, name) => {
    if (ndvi === null) {
        return (
            <></>
        )
    }

    if (ndvi > 0.5) {
        return (
            <>
                <TextWithEmoji
                    style={styles.bodyTextWithEmoji}
                    emoji={laugh}
                    text='농부의 DN가 흐르고 있네요'
                />
                <Text style={styles.bodyText} variant='bodyMedium'>
                    {name}는 건강하게 자라고 있으니 걱정마세요
                </Text>
            </>
        )
    } else if (ndvi > 0) {
        return (
            <>
                <TextWithEmoji
                    style={styles.bodyTextWithEmoji}
                    emoji={smile}
                    text='식집사로 거듭나고 있어요'
                />
                <Text style={styles.bodyText} variant='bodyMedium'>
                    {name}가 열심히 힘을 내고 있어요
                </Text>
            </>
        )
    } else if (ndvi > -0.5) {
        return (
            <>
                <TextWithEmoji
                    style={styles.bodyTextWithEmoji}
                    emoji={frown}
                    text='아직 포기하기엔 일러요'
                />
                <Text style={styles.bodyText} variant='bodyMedium'>
                    {name}에게 조금 더 관심과 애정을 주세요
                </Text>
            </>
        )
    } else {
        return (
            <>
                <TextWithEmoji
                    style={styles.bodyTextWithEmoji}
                    emoji={frown}
                    text='응급 상황이에요'
                />
                <Text style={styles.bodyText} variant='bodyMedium'>
                    {name}이 많이 아파하고 있어요
                </Text>
            </>
        )
    }
};

function HomeRegisterPlant({
    name,
    day,
    ndvi,
    onHarvest
}) {
    return (
        <View style={styles.block}>
            <Image style={styles.image} source={plant}/>
            <Text style={styles.titleText} variant='titleMedium'>
                {name}와 {day}일 째
            </Text>
            <Button
                style={styles.button}
                mode='contained'
                onPress={onHarvest}
            >
                수확
            </Button>
            {textWithNdvi(ndvi, name)}
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
        marginBottom: 35
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
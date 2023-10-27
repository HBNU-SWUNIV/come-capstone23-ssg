import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import OutlineTextInput from '../common/OutlineTextInput';
import GreyButton from '../common/GreyButton';

function RegisterPlant({
    name,
    day,
    onNameChange,
    onDayChange,
    onRegisterPlant,
    goBack
}) {
    return (
        <View style={styles.block}>
            <OutlineTextInput
                style={styles.nameTextInput}
                label='이름'
                value={name}
                onChangeText={onNameChange}
            />
            <View style={styles.dayBlock}>
                <Text variant='bodySmall'>
                    작물을 키운 지
                </Text>
                <OutlineTextInput
                    style={styles.dayTextInput}
                    value={day}
                    onChangeText={onDayChange}
                />
                <Text variant='bodySmall'>
                    일 지났어요
                </Text>
            </View>
            <Button
                style={styles.button}
                mode='contained'
                onPress={onRegisterPlant}
            >
                작물 등록
            </Button>
            <GreyButton onPress={goBack}>취소</GreyButton>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        marginRight: 50,
        marginLeft: 50
    },
    nameTextInput: {
        marginBottom: 15
    },
    dayBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    dayTextInput: {
        marginRight: 8,
        marginLeft: 8
    },
    button: {
        borderRadius: 5,
        marginBottom: 10
    }
});

export default RegisterPlant;
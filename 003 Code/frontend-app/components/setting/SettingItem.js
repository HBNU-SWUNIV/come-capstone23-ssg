import React from 'react';
import {
    Pressable,
    View,
    Image,
    StyleSheet
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';

function SettingItem({ setting, go }) {
    const theme = useTheme();

    return (
        <Pressable
            style={({pressed}) => [
                {backgroundColor: pressed ? '#f5f5f5' : '#ffffff'}
                ,_styles.block
            ]}
            onPress={go}
        >
            <View style={_styles.titleBlock}>
                <Image style={_styles.image} source={setting.image}/>
                <Text variant='bodyLarge'>{setting.title}</Text>
            </View>
            <Icon
                name='angle-right'
                color={theme.colors.secondary}
                size={16}
            />
        </Pressable>
    );
}

const _styles = StyleSheet.create({
    block: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 6,
        padding: 16,
        borderRadius: 5
    },
    titleBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    image: {
        height: 25,
        width: 25,
        marginRight: 12
    }
});

export default SettingItem;
import React from 'react';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

function Header({ navigation, route, options, back }) {
    const title = getHeaderTitle(options, route.name);
    
    return (
        <Appbar.Header style={{ backgroundColor: '#ffffff' }} mode='center-aligned'>
            {back ? (
                <Appbar.BackAction onPress={navigation.goBack}/>
            ) : null}
            <Appbar.Content
                title={title}
                titleStyle={{
                    fontWeight: '900',
                    fontSize: 20
                }}
                color='#000000'
            />
        </Appbar.Header>
    );
}

export default Header;
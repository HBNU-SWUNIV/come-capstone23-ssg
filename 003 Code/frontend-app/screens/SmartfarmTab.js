import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LedControlScreen from "./smartfarm/LedControlScreen";
import WateringSystemControlScreen from "./smartfarm/WateringSystemControlScreen";
import FanControlScreen from "./smartfarm/FanControlScreen";
import CenterDoorControlScreen from "./smartfarm/CenterDoorControlScreen";

const Tab = createMaterialTopTabNavigator();

function SmartfarmTab() {
    return (
        <Tab.Navigator
            initialRouteName='LedControl'
            screenOptions={{
                headerShown: false
            }}
            sceneContainerStyle={{
                backgroundColor: '#ffffff'
            }}
        >
            <Tab.Screen
                name='LedControl'
                component={LedControlScreen}
                options={{
                    tabBarLabel: 'LED'
                }}
            />
            <Tab.Screen
                name='WateringSystemControl'
                component={WateringSystemControlScreen}
                options={{
                    tabBarLabel: '관수 시스템'
                }}
            />
            <Tab.Screen
                name='FanControl'
                component={FanControlScreen}
                options={{
                    tabBarLabel: '환기팬'
                }}
            />
            <Tab.Screen
                name='CenterDoorControl'
                component={CenterDoorControlScreen}
                options={{
                    tabBarLabel: '중앙문'
                }}
            />
        </Tab.Navigator>
    );
}

export default SmartfarmTab;
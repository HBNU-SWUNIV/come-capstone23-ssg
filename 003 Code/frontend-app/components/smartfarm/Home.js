import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import HomeNotRegister from './HomeNotRegister';
import HomeRegisterPlant from './HomeRegisterPlant';
import Environment from './Environment';
import System from './System';
import greenhouse from '../../assets/icon/greenhouse.png';
import plant from '../../assets/icon/plant.png';
import bulb from '../../assets/icon/bulb.png';
import raindrops from '../../assets/icon/raindrops.png';
import wind from '../../assets/icon/wind.png';
import door from '../../assets/icon/door.png';


function Home({
    existSmartfarm,
    existPlant,
    name,
    day,
    temperature,
    humidity,
    waterTemperature,
    waterLevel,
    ndvi,
    ledControlStatus,
    wateringSystemControlStatus,
    fanControlStatus,
    centerDoorControlStatus,
    goRegisterSmartfarm,
    goRegisterPlant,
    goLedControl,
    goWateringSystemControl,
    goFanControl,
    goCenterDoorControl,
    onHarvest
}) {
    const systems = [
        {
            id: 1,
            image: bulb,
            title: 'LED',
            text: ledControlStatus,
            onPress: goLedControl
        },
        {
            id: 2,
            image: raindrops,
            title: '관수 시스템',
            text: wateringSystemControlStatus,
            onPress: goWateringSystemControl
        },
        {
            id: 3,
            image: wind,
            title: '환기팬',
            text: fanControlStatus,
            onPress: goFanControl
        },
        {
            id: 4,
            image: door,
            title: '중앙문',
            text: centerDoorControlStatus,
            onPress: goCenterDoorControl
        }
    ];

    return (
        <SafeAreaView style={styles.block}>
            {!existSmartfarm ? (
                <HomeNotRegister
                    style={[{ 
                        flex: 1,
                        justifyContent: 'center'
                    }, styles.body]}
                    image={greenhouse}
                    title='등록된 스마트팜이 없어요'
                    body='스마트팜을 등록하시면 스마트팜 및 작물을 실시간으로 모니터링 하실 수 있어요'
                    buttonText='스마트팜 등록'
                    onPress={goRegisterSmartfarm}
                />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.body}>
                        {!existPlant ? (
                            <HomeNotRegister
                                style={{ marginTop: 40 }}
                                image={plant}
                                title='등록된 작물이 없어요'
                                body='작물을 등록하시면 작물을 실시간으로 모니터링 하실 수 있어요'
                                buttonText='작물 등록'
                                onPress={goRegisterPlant}
                            />
                        ) : (
                            <HomeRegisterPlant
                                name={name}
                                day={day}
                                ndvi={ndvi}
                                onHarvest={onHarvest}
                            />
                        )}
                        <Card style={styles.card}>
                            <Card.Content>
                                <Environment
                                    name='온도'
                                    value={`${temperature}℃`}
                                />
                                <Environment
                                    name='습도'
                                    value={`${humidity}%`}
                                />
                                <Environment
                                    name='수온'
                                    value={`${waterTemperature}℃`}
                                />
                                <Environment
                                    name='수위'
                                    value={`${waterLevel}cm`}
                                />
                                <Environment
                                    name='NDVI(정규 식생 지수)'
                                    value={ndvi ? ndvi : '-'}
                                />
                            </Card.Content>
                        </Card>
                        <Card style={[{ marginBottom: 40 }, styles.card]}>
                            <Card.Content>
                                {systems.map((system) =>
                                    <System
                                        key={system.id}
                                        image={system.image}
                                        title={system.title}
                                        text={system.text}
                                        onPress={system.onPress}
                                    />
                                )}
                            </Card.Content>
                        </Card>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    body: {
        marginRight: 20,
        marginLeft: 20
    },
    card: {
        marginTop: 50,
        backgroundColor: '#ffffff',
        borderRadius: 5
    }
})

export default Home;
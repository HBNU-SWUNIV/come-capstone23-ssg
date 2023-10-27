import SettingBox from './SettingBox';
import SettingAlarmItem from './SettingAlarmItem';
import ButtonDefault from '../common/ButtonDefault';

const SettingAlarm = ({
    settingAlarm,
    existSmartfarm,
    existPlant,
    onModifyPersonalInformationChange,
    onLogInOutChange,
    onModifySmartfarmChange,
    onAutoControlSmartfarmChange,
    onWarnSmartfarmChange,
    onModifyPlantChange,
    onHarvestPlantChange,
    goRegisterSmartfarm,
    goRegisterPlant
}) => {
    const userSettingAlarm = [
        {
            id: 1,
            text: '개인정보 수정 알람',
            checked: settingAlarm.modifyPersonalInformation,
            onChange: onModifyPersonalInformationChange
        },
        {
            id: 2,
            text: '로그인/로그아웃 알람',
            checked: settingAlarm.logInOut,
            onChange: onLogInOutChange
        }
    ];
    const smartfarmSettingAlarm = [
        {
            id: 1,
            text: '스마트팜 정보 수정 알람',
            checked: settingAlarm.modifySmartfarm,
            onChange: onModifySmartfarmChange
        },
        {
            id: 2,
            text: '스마트팜 현장/원격 제어 알람',
            checked: settingAlarm.autoControlSmartfarm,
            onChange: onAutoControlSmartfarmChange
        },
        {
            id: 3,
            text: '스마트팜 이상 경고 알람',
            checked: settingAlarm.warnSmartfarm,
            onChange: onWarnSmartfarmChange
        }
    ];
    const plantSettingAlarm = [
        {
            id: 1,
            text: '작물 정보 수정 알람',
            checked: settingAlarm.modifyPlant,
            onChange: onModifyPlantChange
        },
        {
            id: 2,
            text: '작물 적정 수확 시기 알람',
            checked: settingAlarm.harvestPlant,
            onChange: onHarvestPlantChange
        }
    ];

    return (
        <div style={{ width: '100%', marginTop: 32 }}>
            <SettingBox
                title='사용자'
                sx={{ mb: 4 }}
            >
                { userSettingAlarm.map((user) => 
                    <SettingAlarmItem
                        key={user.id}
                        text={user.text}
                        checked={user.checked}
                        onChange={user.onChange}
                    />
                )}
            </SettingBox>
            <SettingBox
                title='스마트팜'
                sx={{ mb: 4 }}
            >
                { existSmartfarm === false ? (
                    <ButtonDefault
                        sx={{
                            mt: 2,
                            fontSize: 'medium',
                            fontweight: 'bold',
                            color: '#ffffff'
                        }}
                        onClick={goRegisterSmartfarm}
                        text="스마트팜 등록"
                    />
                ) : (
                    smartfarmSettingAlarm.map((smartfarm) => 
                        <SettingAlarmItem
                            key={smartfarm.id}
                            text={smartfarm.text}
                            checked={smartfarm.checked}
                            onChange={smartfarm.onChange}
                        />
                    )
                )}
            </SettingBox>
            <SettingBox
                title='작물'
            >
                { existPlant === false ? (
                    <ButtonDefault
                        sx={{
                            mt: 1,
                            fontSize: 'medium',
                            fontweight: 'bold',
                            color: '#ffffff'
                        }}
                        onClick={goRegisterPlant}
                        text="작물 등록"
                    />
                ) : (
                    plantSettingAlarm.map((plant) => 
                        <SettingAlarmItem
                            key={plant.id}
                            text={plant.text}
                            checked={plant.checked}
                            onChange={plant.onChange}
                        />
                    )
                )}
            </SettingBox>
        </div>
    );
};

export default SettingAlarm;
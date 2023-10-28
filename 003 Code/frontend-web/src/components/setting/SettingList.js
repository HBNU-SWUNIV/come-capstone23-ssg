import SettingBox from './SettingBox';
import SettingItem from '../../containers/setting/SettingItem';
import ButtonDefault from '../common/ButtonDefault';
import profile from '../../lib/icon/profile.png';
import lock from '../../lib/icon/lock.png';
import greenhouse from '../../lib/icon/greenhouse.png';
import plant from '../../lib/icon/plant.png';
import bell from '../../lib/icon/bell.png';

const SettingList = ({
    existSmartfarm,
    existPlant,
    goRegisterSmartfarm,
    goRegisterPlant
}) => {
    const userSetting = [
        {
            id: 1,
            image: profile,
            title: '개인정보 수정',
            path: process.env.REACT_APP_SETTING_PERSONAL_INFORMATION_PATH
        },
        {
            id: 2,
            image: lock,
            title: '비밀번호 변경',
            path: process.env.REACT_APP_SETTING_PASSWORD_VERIFY_PATH
        }
    ]

    return (
        <div style={{ width: '100%'}}>
            <SettingBox
                title='사용자'
                sx={{ mb: 4 }}
            >
                {userSetting.map((user) => 
                    <SettingItem
                        key={user.id}
                        image={user.image}
                        title={user.title}
                        path={user.path}
                    />
                )}
            </SettingBox>
            <SettingBox
                title='스마트팜'
                sx={{ mb: 4 }}
            >
                { !existSmartfarm ? (
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
                    <SettingItem
                        image={greenhouse}
                        title='스마트팜 수정'
                        path={process.env.REACT_APP_SETTING_SMARTFARM_VERIFY_PATH}
                    />
                )}
            </SettingBox>
            <SettingBox
                title='작물'
                sx={{ mb: 4 }}
            >
                { !existPlant ? (
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
                    <SettingItem
                        image={plant}
                        title='작물 수정'
                        path={process.env.REACT_APP_SETTING_PLANT_VERIFY_PATH}
                    />
                )}
            </SettingBox>
            <SettingBox
                title='시스템'
            >
                <SettingItem
                    image={bell}
                    title='푸시 알람 설정'
                    path={process.env.REACT_APP_SETTING_ALARM_PATH}
                />
            </SettingBox>
        </div>
    );
};

export default SettingList;
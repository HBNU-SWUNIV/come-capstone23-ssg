// SERVER: 서버에서 알람 정보(내용(text), 경과 시간(time)) 요청
// alarm.time: (현재 시각) - (알람 발생 시각)

import AlarmBox from './AlarmBox';
import AlarmItem from '../../containers/alarm/AlarmItem';
import ButtonDefault from '../common/ButtonDefault';
import profile from '../../lib/icon/profile.png';
import greenhouse from '../../lib/icon/greenhouse.png';
import plant from '../../lib/icon/plant.png';

const AlarmList = ({
    existSmartfarm,
    existPlant,
    smartfarmAlarm,
    goRegisterSmartfarm,
    goRegisterPlant
}) => {
    const userAlarm = null;
    const plantAlarm = null;

    return (
        <div style={{ width: '100%'}}>
            <AlarmBox
                image={profile}
                title='사용자'
                sx={{ mb: 4 }}
            >
                { userAlarm && userAlarm.map((alarm) => <AlarmItem key={alarm.id} alarm={alarm}/>)}
            </AlarmBox>
            <AlarmBox
                image={greenhouse}
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
                    smartfarmAlarm && smartfarmAlarm.map((alarm) => <AlarmItem key={alarm.id} alarm={alarm}/>)
                )}
            </AlarmBox>
            <AlarmBox
                image={plant}
                title='작물'
            >
                { !existPlant ? (
                    <ButtonDefault
                        sx={{
                            mt: 2,
                            fontSize: 'medium',
                            fontweight: 'bold',
                            color: '#ffffff'
                        }}
                        onClick={goRegisterPlant}
                        text="작물 등록"
                    />
                ) : (
                    plantAlarm && plantAlarm.map((alarm) => <AlarmItem key={alarm.id} alarm={alarm}/>)
                )}
            </AlarmBox>
            <div style={{ height: 30 }}/>
        </div>
    )
}

export default AlarmList;
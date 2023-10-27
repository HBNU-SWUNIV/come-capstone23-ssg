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
    goRegisterSmartfarm,
    goRegisterPlant
}) => {
    const userAlarm = null;
    const SmartFarmAlarm = [
        { id: 1, text: '현장 제어 모드로 설정하셨습니다.', time: '15분 전' },
        { id: 2, text: '원격 제어 모드로 설정하셨습니다.', time: '2시간 전' }
    ];
    const PlantAlarm = [
        { id: 1, text: '작물을 키우기 시작하셨습니다.', time: '10일 전' },
        { id: 2, text: '작물 이름을 \'새싹이\'로 변경하셨습니다.', time: '3일 전'}
    ];

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
                            mt: 1,
                            fontSize: 'medium',
                            fontweight: 'bold',
                            color: '#ffffff'
                        }}
                        onClick={goRegisterSmartfarm}
                        text="스마트팜 등록"
                    />
                ) : (
                    SmartFarmAlarm && SmartFarmAlarm.map((alarm) => <AlarmItem key={alarm.id} alarm={alarm}/>)
                )}
            </AlarmBox>
            <AlarmBox
                image={plant}
                title='작물'
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
                    PlantAlarm && PlantAlarm.map((alarm) => <AlarmItem key={alarm.id} alarm={alarm}/>)
                )}
            </AlarmBox>
        </div>
    )
}

export default AlarmList;
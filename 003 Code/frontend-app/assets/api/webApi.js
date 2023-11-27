import axios from "axios";
import API_URL from './webApiUrl';

// 회원가입
export const signup = ({
    id,
    password,
    name,
    phoneNumber
}) => axios.post(API_URL.SIGNUP, {
    username: id,
    password,
    name: name,
    phone_number: phoneNumber
});

// 로그인
export const login = ({
    id,
    password,
    fcmToken
}) => axios.post(API_URL.LOGIN, {
    username: id,
    password,
    fcm_token: fcmToken
});

// 토큰 유효 확인
export const check = (token) => axios.get(API_URL.CHECK, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 아이디 찾기
export const searchId = ({
    name,
    phoneNumber
}) => axios.post(API_URL.SEARCH_ID, {
    name,
    phone_number: phoneNumber
});

// 비밀번호 찾기
export const searchPassword = ({
    name,
    phoneNumber,
    id
}) => axios.post(API_URL.SEARCH_PASSWORD, {
    name,
    phone_number: phoneNumber,
    username: id
});

// 스마트팜 고유번호 확인
export const checkSmartfarmNumber = (smartfarmNumber) => axios.post(API_URL.CHECK_SMARTFARM_NUMBER, {
    sfid: smartfarmNumber
});

// 스마트팜 등록
export const registerSmartfarm = ({
    token,
    smartfarmNumber
}) => axios.post(API_URL.REGISTER_SMARTFARM, {
    sfid: smartfarmNumber
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 작물 등록
export const registerPlant = ({
    token,
    name,
    day
}) => axios.post(API_URL.REGISTER_PLANT, {
    name,
    day
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 스마트팜 시스템 제어 - 원격 제어
export const remoteControl = ({
    token,
    datas
}) => axios.post(API_URL.REMOTE_CONTROL, {
    remotepower: datas.remoteControl
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 스마트팜 시스템 제어 - LED
export const controlLed = ({
    token,
    datas
}) => axios.post(API_URL.CONTROL_LED, {
    ledtoggle: datas.work,
    ledautotoggle: datas.autoWork,
    ledstarttimevalue: datas.autoWorkStart.dayNight === 'AM' ? Number(datas.autoWorkStart.hour) : Number(datas.autoWorkStart.hour) + 12,
    ledstartminutevalue: Number(datas.autoWorkStart.minute),
    ledendtimevalue: datas.autoWorkEnd.dayNight === 'AM' ? Number(datas.autoWorkEnd.hour) : Number(datas.autoWorkEnd.hour) + 12,
    ledendminutevalue: Number(datas.autoWorkEnd.minute)
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 스마트팜 시스템 제어 - 관수 시스템
export const controlWateringSystem = ({
    token,
    datas
}) => axios.post(API_URL.CONTROL_WATERING_SYSTEM, {
    waterpumptoggle: datas.work,
    waterpumprunningtime: datas.workTime,
    waterpumpautotoggle: datas.autoWork,
    waterpumpstarttime: datas.autoWorkPeriod
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 스마트팜 시스템 제어 - 환기팬
export const controlFan = ({
    token,
    datas
}) => axios.post(API_URL.CONTROL_FAN, {
    fantoggle: datas.work,
    fanautotoggle: datas.autoWork,
    fanstarttimevalue: datas.autoWorkStart.dayNight === 'AM' ? Number(datas.autoWorkStart.hour) : Number(datas.autoWorkStart.hour) + 12,
    fanstartminutevalue: Number(datas.autoWorkStart.minute),
    fanendtimevalue: datas.autoWorkEnd.dayNight === 'AM' ? Number(datas.autoWorkEnd.hour) : Number(datas.autoWorkEnd.hour) + 12,
    fanendminutevalue: Number(datas.autoWorkEnd.minute)
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 스마트팜 시스템 제어 - 중앙문
export const controlCenterDoor = ({
    token,
    datas
}) => axios.post(API_URL.CONTROL_CENTER_DOOR, {
    doortoggle: datas.work,
    doorautotoggle: datas.autoWork,
    doorstarttimevalue: datas.autoWorkStart.dayNight === 'AM' ? Number(datas.autoWorkStart.hour) : Number(datas.autoWorkStart.hour) + 12,
    doorstartminutevalue: Number(datas.autoWorkStart.minute),
    doorendtimevalue: datas.autoWorkEnd.dayNight === 'AM' ? Number(datas.autoWorkEnd.hour) : Number(datas.autoWorkEnd.hour) + 12,
    doorendminutevalue: Number(datas.autoWorkEnd.minute)
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 비밀번호 확인
export const verify = ({
    token,
    password
}) => axios.post(API_URL.VERIFY, {
    password
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 비밀번호 수정
export const modifyPassword = ({
    token,
    password
}) => axios.put(API_URL.MODIFY_PASSWORD, {
    password
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 개인정보 가져오기
export const getPersonalInformation = (token) => axios.get(API_URL.GET_PERSONAL_INFORMATION, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 개인정보 수정
export const modifyPersonalInformation = ({
    token,
    name,
    phoneNumber
}) => axios.put(API_URL.MODIFY_PERSONAL_INFORMATION, {
    name,
    phone_number: phoneNumber
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 회원 탈퇴
export const withdraw = ({
    token,
    password
}) => axios.delete(API_URL.WITHDRAW, {
    headers: {
        Authorization: `Token ${token}`
    },
    data: {
        password
    }
});

// 스마트팜 정보
export const getSmartfarm = (token) => axios.get(API_URL.GET_SMARTFARM, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 스마트팜 수정
export const modifySmartfarm = ({
    token,
    smartfarmNumber
}) => axios.put(API_URL.MODIFY_SMARTFARM, {
    sfid: smartfarmNumber
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 스마트팜 삭제
export const removeSmartfarm = (token) => axios.delete(API_URL.REMOVE_SMARTFARM, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 작물 정보
export const getPlant = (token) => axios.get(API_URL.GET_PLANT, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 작물 수정
export const modifyPlant = ({
    token,
    name,
    day
}) => axios.put(API_URL.MODIFY_PLANT, {
    name,
    day
}, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 작물 삭제
export const removePlant = (token) => axios.delete(API_URL.REMOVE_PLANT, {
    headers: {
        Authorization: `Token ${token}`
    }
});

// 알람 리스트 가져오기
export const getSmartfarmAlarmList = (token) => axios.get(API_URL.GET_ALARM_LIST, {
    headers: {
        Authorization: `Token ${token}`
    }
});
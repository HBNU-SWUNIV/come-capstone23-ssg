import axios from "axios";
import API_URL from './webApiUrl';

// 회원가입
export const signup = ({
    id,
    password,
    passwordCheck,
    name,
    phoneNumber
}) => axios.post(API_URL.SIGNUP, {
    user_id: id,
    password,
    passwordCheck,
    user_name: name,
    phone_number: phoneNumber
});

// 로그인
export const login = ({
    id,
    password
}) => axios.post(API_URL.LOGIN, {
    user_id: id,
    password
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
    user_name: name,
    phone_number: phoneNumber
});

// 비밀번호 찾기
export const searchPassword = ({
    name,
    phoneNumber,
    id
}) => axios.post(API_URL.SEARCH_PASSWORD, {
    user_name: name,
    phone_number: phoneNumber,
    user_id: id
});

// 스마트팜 고유번호 확인 X
export const checkSmartfarmNumber = (smartfarmNumber) => {
    console.log(smartfarmNumber);
}

// 스마트팜 등록 X
export const registerSmartfarm = ({
    token,
    smartfarmNumber
}) => {
    console.log(token, smartfarmNumber);
};

// 작물 등록 X
export const registerPlant = ({
    name,
    day
}) => {
    console.log(name, day);
};

// 스마트팜 시스템 제어 - 원격 제어 X
export const remoteControl = ({
    token,
    datas
}) => {
    console.log(token, datas);
}

// 스마트팜 시스템 제어 - LED X
export const controlLed = ({
    token,
    datas
}) => {
    console.log(token, datas);
};

// 스마트팜 시스템 제어 - 관수 시스템 X
export const controlWateringSystem = ({
    token,
    datas
}) => {
    console.log(token, datas);
};

// 스마트팜 시스템 제어 - 환기팬 X
export const controlFan = ({
    token,
    datas
}) => {
    console.log(token, datas);
};

// 스마트팜 시스템 제어 - 중앙문 X
export const controlCenterDoor = ({
    token,
    datas
}) => {
    console.log(token, datas);
};

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

// 개인정보 수정
export const modifyPersonalInformation = ({
    token,
    name,
    phoneNumber
}) => axios.put(API_URL.MODIFY_PERSONAL_INFORMATION, {
    user_name: name,
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

// 스마트팜 수정 X
export const modifySmartfarm = ({
    token,
    datas
}) => {
    console.log(token, datas);
}

// 스마트팜 삭제 X
export const removeSmartfarm = (token) => {
    console.log(token);
}

// 작물 수정 X
export const modifyPlant = ({
    token,
    name,
    day
}) => {
    console.log(token, name, day);
}

// 작물 삭제 X
export const removePlant = (token) => {
    console.log(token);
}

// 설정 X
export const setting = (datas) => {
    console.log(datas);
}
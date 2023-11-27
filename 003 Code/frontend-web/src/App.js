import { ThemeProvider } from "@mui/material";
import { Route, Routes } from 'react-router-dom';
import { requestPermission, onForegroundMessage } from "./lib/firebase/firebaseCloudMessaging";
import MyTheme from './MyTheme';
// 회원가입
import VerifyPage from './pages/user/VerifyPage';
import SignUpPage from './pages/user/SignUpPage';
import SignUpSuccessPage from './pages/user/SignUpSuccessPage';
// 로그인
import LogInPage from './pages/user/LogInPage';
// 아이디 찾기
import SearchIdPage from './pages/user/SearchIdPage';
import SearchIdSuccessPage from './pages/user/SearchIdSuccessPage';
import SearchIdFailurePage from './pages/user/SearchIdFailurePage';
// 비밀번호 찾기
import SearchPasswordPage from './pages/user/SearchPasswordPage';
import SearchPasswordSuccessPage from './pages/user/SearchPasswordSuccessPage';
import SearchPasswordFailurePage from './pages/user/SearchPasswordFailurePage';
// 홈
import HomePage from './pages/smartfarm/HomePage';
// 스마트팜 등록
import RegisterSmartfarmPage from './pages/smartfarm/RegisterSmartfarmPage';
import RegisterSmartfarmSuccessPage from "./pages/smartfarm/RegisterSmartfarmSuccessPage";
// 작물 등록
import RegisterPlantPage from './pages/smartfarm/RegisterPlantPage';
import RegisterPlantSuccessPage from './pages/smartfarm/RegisterPlantSuccessPage';
// 스마트팜 시스템 제어
import LedControlPage from "./pages/smartfarm/LedControlPage";
import WateringSystemControlPage from './pages/smartfarm/WateringSystemControlPage';
import FanControlPage from "./pages/smartfarm/FanControlPage";
import CenterDoorControlPage from "./pages/smartfarm/CenterDoorPage";
// 알람
import AlarmPage from './pages/alarm/AlarmPage';
// 설정
import SettingPage from './pages/setting/SettingPage';
import SettingVerifyPage from './pages/setting/SettingVerifyPage';
import SettingPersonalInformationPage from "./pages/setting/SettingPersonalInformationPage";
import SettingPasswordPage from './pages/setting/SettingPasswordPage';
import SettingSmartfarmPage from './pages/setting/SettingSmartfarmPage';
import RemoveSmartfarmSuccessPage from './pages/setting/RemoveSmartfarmSuccessPage';
import SettingPlantPage from './pages/setting/SettingPlantPage';
import RemovePlantSuccessPage from './pages/setting/RemovePlantSuccessPage';
import SettingAlarmPage from './pages/setting/SettingAlarmPage';
import NotFoundPage from './pages/NotFoundPage';

import Snackbar from "./containers/common/Snackbar";

// FCM permission & token
if (Notification.permission !== 'granted') {
    requestPermission();
}

// FCM foreground
onForegroundMessage();

const App = () => {
    return (
        <ThemeProvider theme={MyTheme}>
            <Routes>
                {/* 회원가입 */}
                <Route path={process.env.REACT_APP_VERIFY_PATH} element={<VerifyPage />}/>
                <Route path={process.env.REACT_APP_SIGNUP_PATH} element={<SignUpPage />}/>
                <Route path={process.env.REACT_APP_SIGNUP_SUCCESS_PATH} element={<SignUpSuccessPage />}/>
                {/* 로그인 */}
                <Route path={process.env.REACT_APP_LOGIN_PATH} element={<LogInPage />}/>
                {/* 아이디 찾기 */}
                <Route path={process.env.REACT_APP_SEARCH_ID_PATH} element={<SearchIdPage />}/>
                <Route path={process.env.REACT_APP_SEARCH_ID_SUCCESS_PATH} element={<SearchIdSuccessPage />}/>
                <Route path={process.env.REACT_APP_SEARCH_ID_FAILURE_PATH} element={<SearchIdFailurePage />}/>
                {/* 비밀번호 찾기 */}
                <Route path={process.env.REACT_APP_SEARCH_PASSWORD_PATH} element={<SearchPasswordPage />}/>
                <Route path={process.env.REACT_APP_SEARCH_PASSWORD_SUCCESS_PATH} element={<SearchPasswordSuccessPage />}/>
                <Route path={process.env.REACT_APP_SEARCH_PASSWORD_FAILURE_PATH} element={<SearchPasswordFailurePage />}/>
                {/* 홈 */}
                <Route path={process.env.REACT_APP_HOME_PATH} element={<HomePage />}/>
                {/* 스마트팜 등록 */}
                <Route path={process.env.REACT_APP_REGISTER_SMARTFARM_PATH} element={<RegisterSmartfarmPage />}/>
                <Route path={process.env.REACT_APP_REGISTER_SMARTFARM_SUCCESS_PATH} element={<RegisterSmartfarmSuccessPage />}/>
                {/* 작물 등록 */}
                <Route path={process.env.REACT_APP_REGISTER_PLANT_PATH} element={<RegisterPlantPage />}/>
                <Route path={process.env.REACT_APP_REGISTER_PLANT_SUCCESS_PATH} element={<RegisterPlantSuccessPage />}/>
                {/* 스마트팜 시스템 제어 */}
                <Route path={process.env.REACT_APP_CONTROL_LED_PATH} element={<LedControlPage />}/>
                <Route path={process.env.REACT_APP_CONTROL_WATERING_SYSTEM_PATH} element={<WateringSystemControlPage />}/>
                <Route path={process.env.REACT_APP_CONTROL_FAN_PATH} element={<FanControlPage />}/>
                <Route path={process.env.REACT_APP_CONTROL_CENTER_DOOR_PATH} element={<CenterDoorControlPage />}/>
                {/* 알람 */}
                <Route path={process.env.REACT_APP_ALARM_PATH} element={<AlarmPage />}/>
                {/* 설정 */}
                <Route path={process.env.REACT_APP_SETTING_PATH} element={<SettingPage />}/>
                <Route path={process.env.REACT_APP_SETTING_VERIFY_PATH} element={<SettingVerifyPage/>}/>
                <Route path={process.env.REACT_APP_SETTING_PERSONAL_INFORMATION_PATH} element={<SettingPersonalInformationPage />}/>
                <Route path={process.env.REACT_APP_SETTING_PASSWORD_PATH} element={<SettingPasswordPage />}/>
                <Route path={process.env.REACT_APP_SETTING_SMARTFARM_PATH} element={<SettingSmartfarmPage />}/>
                <Route path={process.env.REACT_APP_REMOVE_SMARTFARM_SUCCESS_PATH} element={<RemoveSmartfarmSuccessPage />}/>
                <Route path={process.env.REACT_APP_REMOVE_PLANT_SUCCESS_PATH} element={<RemovePlantSuccessPage />}/>
                <Route path={process.env.REACT_APP_SETTING_ALARM_PATH} element={<SettingAlarmPage />}/>
                <Route path={process.env.REACT_APP_SETTING_PLANT_PATH} element={<SettingPlantPage />}/>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Snackbar />
        </ThemeProvider>
    )
}

export default App;
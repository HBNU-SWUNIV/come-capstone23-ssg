import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterSmartfarmComponent from '../../components/smartfarm/RegisterSmartfarm';
import { changeSmartfarmNumber, registerSmartfarmInitialize, registerSmartfarmSuccessInitialize, checkSmartfarmNumber, registerSmartfarm } from '../../modules/smartfarm/smartfarm';

const RegisterSmartfarm = () => {
    const token = useSelector(state => state.user.token);
    const smartfarmNumber = useSelector(state => state.smartfarm.smartfarmNumber);
    const checkSmartfarmNumberSuccess = useSelector(state => state.smartfarm.checkSmartfarmNumberSuccess);
    const registerSmartfarmSuccess = useSelector(state => state.smartfarm.registerSmartfarmSuccess);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSmartfarmNumberChange = useCallback(e => dispatch(changeSmartfarmNumber(e.target.value)), [dispatch]);

    const onCheckSmartfarmNumberClick = () => {
        dispatch(checkSmartfarmNumber(smartfarmNumber));
    };
    const onRegisterClick = () => {
        dispatch(registerSmartfarm({
            token,
            smartfarmNumber
        }));
    };
    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (registerSmartfarmSuccess) {
            navigate(process.env.REACT_APP_REGISTER_SMARTFARM_SUCCESS_PATH);
        }

        return () => {
            if (registerSmartfarmSuccess === false) {
                dispatch(registerSmartfarmInitialize());
            } else if (registerSmartfarmSuccess) {
                dispatch(registerSmartfarmSuccessInitialize());
            }
        }
    }, [registerSmartfarmSuccess, navigate, dispatch]);

    return (
        <RegisterSmartfarmComponent
            smartfarmNumber={smartfarmNumber}
            checkSmartfarmNumberSuccess={checkSmartfarmNumberSuccess}
            onSmartfarmNumberChange={onSmartfarmNumberChange}
            onCheckSmartfarmNumberClick={onCheckSmartfarmNumberClick}
            onRegisterClick={onRegisterClick}
            goBack={goBack}
        />
    );
};

export default React.memo(RegisterSmartfarm);
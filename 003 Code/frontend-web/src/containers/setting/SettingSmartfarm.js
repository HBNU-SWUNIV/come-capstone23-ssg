import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingSmartfarmComponent from '../../components/setting/SettingSmartfarm';
import { changeSmartfarmNumber, modifySmartfarmInitialize, checkSmartfarmNumber, removeSmartfarmInitialize, getSmartfarm, modifySmartfarm, removeSmartfarm } from '../../modules/smartfarm/smartfarm';

const SettingSmartfarm = () => {
    const token = useSelector(state => state.user.token);
    const exist = useSelector(state => state.smartfarm.exist);
    const smartfarmNumber = useSelector(state => state.smartfarm.smartfarmNumber);
    const checkSmartfarmNumberSuccess = useSelector(state => state.smartfarm.checkSmartfarmNumberSuccess);
    const removeSmartfarmSuccess = useSelector(state => state.smartfarm.removeSmartfarmSuccess);

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSmartfarmNumberChange = useCallback(e => dispatch(changeSmartfarmNumber(e.target.value)), [dispatch]);
    const onCheckSmartfarmNumberClick = () => {
        dispatch(checkSmartfarmNumber(smartfarmNumber));
    };

    const onModifyClick = () => {
        dispatch(modifySmartfarm({
            token,
            smartfarmNumber
        }));
    };
    const onOpenClick = () => {
        setOpen(true);
    };
    const onYesClick = () => {
        dispatch(removeSmartfarm(token));
    };
    const onNoClick = () => {
        setOpen(false);
    }
    const goBack = () => {
        navigate(process.env.REACT_APP_SETTING_PATH);
    };

    useEffect(() => {
        if (exist) {
            dispatch(getSmartfarm(token));
        }
        
    }, [exist, dispatch, token]);

    useEffect(() => {
        if (!exist) {
            navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
        }
    }, [exist, navigate]);

    useEffect(() => {
        if (removeSmartfarmSuccess) {
            navigate(process.env.REACT_APP_REMOVE_SMARTFARM_SUCCESS_PATH);
            dispatch(removeSmartfarmInitialize());
        }

        return () => {
            if (!removeSmartfarmSuccess) {
                dispatch(modifySmartfarmInitialize());
            }
        }
    }, [removeSmartfarmSuccess, navigate, dispatch]);

    return (
        <SettingSmartfarmComponent
            smartfarmNumber={smartfarmNumber}
            checkSmartfarmNumberSuccess={checkSmartfarmNumberSuccess}
            open={open}
            onSmartfarmNumberChange={onSmartfarmNumberChange}
            onCheckSmartfarmNumberClick={onCheckSmartfarmNumberClick}
            onModifyClick={onModifyClick}
            onOpenClick={onOpenClick}
            onYesClick={onYesClick}
            onNoClick={onNoClick}
            goBack={goBack}
        />
    );
};

export default React.memo(SettingSmartfarm);
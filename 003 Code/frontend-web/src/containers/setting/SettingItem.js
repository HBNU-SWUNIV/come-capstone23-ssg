import React from 'react';
import { useNavigate } from "react-router-dom";
import SettingItemComponent from "../../components/setting/SettingItem";

const SettingItem = ({ image, title, path }) => {
    const navigate = useNavigate();

    const go = () => {
        navigate(path);
    };

    return (
        <SettingItemComponent
            image={image}
            title={title}
            go={go}
        />
    );
};

export default React.memo(SettingItem);
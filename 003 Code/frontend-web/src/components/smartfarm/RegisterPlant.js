// SERVER: '작물 등록' 버튼 클릭 시 DB에 작물 등록 요청
// 작물 품종을 입력하지 않았을 시 '작물 등록' 버튼 클릭 불가능 추가하기
// 작물 품종 검색 기능 추가하기

import { Stack, Typography, MenuItem } from '@mui/material';
import TextFieldDefault from '../common/TextFieldDefault';
import SelectAutoWidth from '../common/SelectAutoWidth';
import ButtonDefault from '../common/ButtonDefault';

const RegisterSmartfarm = ({
    name,
    day,
    onNameChange,
    onDayChange,
    onRegisterClick,
    goBack
}) => {
    const numbers = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    ];

    return (
        <div style={{ width: '100%' }}>
            <TextFieldDefault
                label="이름"
                autoFocus={true}
                value={name}
                onChange={onNameChange}
            />
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                sx={{ mt: 3 }}
            >
                <Typography variant='subtitle1' sx={{ mr: 1.5 }}>작물을 키운 지</Typography>
                <SelectAutoWidth value={day} onChange={onDayChange}>
                    {numbers.map((number, index) => <MenuItem key={index} value={number}>{number}</MenuItem>)}
                </SelectAutoWidth>
                <Typography variant='subtitle1' sx={{ ml: 1 }}>일 지났어요</Typography>
            </Stack>
            <ButtonDefault
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={onRegisterClick}
                text="작물 등록"
            />
            <ButtonDefault
                color="secondary"
                sx={{
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={goBack}
                text="취소"
            />
        </div>
    );
};

export default RegisterSmartfarm;
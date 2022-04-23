import { CircularProgress, Backdrop, Button } from '@mui/material'
import { useState } from 'react';
const Loader = () => {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
export default Loader
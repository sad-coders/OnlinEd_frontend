import { Box, Button, TextField } from "@material-ui/core"
import { useContext } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import { useRef } from "react"
import { makeStyles } from "@material-ui/core";
import { dayCardImgStyle, dayCardStyle } from '../styles'
import { Card, CardMedia, CardContent } from '@mui/material'
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});
const ClassJoinCard = () => {
    const { joinClassroom } = useContext(GlobalContext)
    const classcodeRef = useRef()
    const onClickHandler = () => {
      console.log(classcodeRef.current.value)
        joinClassroom(classcodeRef.current.value)
    }
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root} variant="outlined" style={dayCardStyle}>
                <CardMedia
                    style={dayCardImgStyle}
                >
                    <img src={`${process.env.PUBLIC_URL}/assets/images/img_code.jpg`} alt="weather" />
                </CardMedia>
                <CardContent>
                    <Box mb={2}>
                        <TextField
                            variant="outlined"
                            inputRef={classcodeRef}
                            label="Class Code" />
                    </Box>
                    <Button
                        onClick={onClickHandler}
                        variant="contained"
                        color="primary">Join</Button>
                </CardContent>
            </Card>

        </>
    )
}
export default ClassJoinCard 
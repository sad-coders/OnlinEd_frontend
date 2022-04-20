import { CardMedia, CardContent, Typography, Card, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { dayCardStyle, dayCardImgStyle } from "../styles";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
const ClassroomCard = ({ classroom }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined" style={dayCardStyle}>
      <CardActionArea>
        <CardMedia
          style={dayCardImgStyle}
        >
          <img src={`${process.env.PUBLIC_URL}/assets/images/img_code.jpg`} alt="weather" />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="span">
            {classroom.className}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {classroom.authorName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ClassroomCard;
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ClassroomCard({classroom}){
  return (
    <Card sx={{ width: 275, margin : 10 }}>
      <CardContent>
        <Typography variant = "h5">
          {classroom.className}
        </Typography>
        <Typography variant ="h6">
          {classroom.authorName}
        </Typography>
      </CardContent>
    </Card>
  );
}
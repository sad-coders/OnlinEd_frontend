import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import { useParams, useNavigate, Link } from "react-router-dom";
 

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';  
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const drawerWidth = 480;

const AssignmentMarks = () => {
    const navigate = useNavigate();
    const { assignmentId } = useParams();
    const { loading , solutionsOfAssignment, getSolutionsOfAssignment, assignMarks} = useContext(GlobalContext);
// assignment, getAssignment  
    const [solution, setSolution] = useState({})
    const [component, setComponent] = useState('default')
    const [marks, setMarks] = useState(0)

    useEffect(() => {
        getSolutionsOfAssignment(assignmentId)
        console.log(solutionsOfAssignment)
    }, []);
    // useEffect(() => {
    //   setsolutions(solutionsOfAssignment)
    // }, [solutionsOfAssignment])
    const submitMarks = () => {
        console.log(marks)
        assignMarks(marks, solution._id)
    }

    useEffect(() => {
        if(solutionsOfAssignment.length > 0){
            var solutions = solutionsOfAssignment.filter(sol => sol._id === solution._id)
            setSolution(solutions[0]);
        }
    }, [solutionsOfAssignment])
    
    
    return (
        <>
            {
                loading ? "loading" : (
            <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Toolbar>
                        <Typography variant="p" noWrap component="div" onClick={() => navigate(-1)}
                            style={{ textDecoration: "none", color: "inherit" }} >
                            <ArrowBackIcon style={{ marginTop:"10px" }} /> 
                        </Typography>
                        <Typography variant="p" noWrap component="div" 
                            style={{ backgroundColor:"#fff", textDecoration: "underline", color: "#1976d2", padding:"5px", marginLeft:"50px" }} >
                            Submissions for Assignment
                        </Typography>
                        {/* TODO: CHANGE LINK */}
                        <Typography variant="p" noWrap component={Link} to={"/assignment/" + assignmentId}
                            style={{ textDecoration: "underline", color: "inherit", marginLeft:"50px" }} >
                            View Assignment Question
                        </Typography>
                    
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <List>
                    {['Solutions of Students'].map((text, index) => (
                        <ListItem button key={text}  onClick={() => {setComponent('default');setSolution({})}}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {solutionsOfAssignment.length > 0 && solutionsOfAssignment.map((solution, index) => (
                            <ListItem button key={solution.studentId} onClick={() => {setComponent('solution');setSolution(solution)}}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText>{solution.studentName}</ListItemText>
                            </ListItem>
                        ))
                    }
                    </List>
                    <Divider />
                    
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Typography paragraph>
                        {component === 'default' ?
                         'Select any student to view the submission and to grade.' 
                         : 'Submission of student: '}
                    </Typography>
                    {
                        component === 'solution' ? (
                            <>  
                                <Typography paragraph>
                                    Date of submission: {solution.dateOfSubmission}
                                </Typography>
                                {
                                    solution.marks ? 
                                    (<>Marks Assigned : {solution.marks} </>) : (<></>)
                                }
                                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                    
                                    <Button onClick={() => {
                                        // TODO
                                    }}>
                                        Download Submission
                                    </Button>
                                    
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        // fullWidth
                                        name="Marks"
                                        label="Marks"
                                        type="text"
                                        id="marks"
                                    
                                        autoComplete="0/100"

                                        onChange={(e) => setMarks(e.target.value)} value={marks}
                                    /> 
                                    <Button onClick = {(e) => {
                                        submitMarks()
                                    }}>
                                        Submit Marks 
                                    </Button>
                                </Box>
                            </>
                        ) : 
                            (solutionsOfAssignment.length > 0 ? (<>No submissions made yet</>) : (<></>))
                        
                    }
                    {/* "_id" : ObjectId("626136a385ed27c9426ef3b8"),
                    "studentName" : "studentName",
                    "studentId" : "62612b6580c659f94ec1e4ba",
                    "assignmentId" : "626136a285ed27c9426ef3b7",
                    "link" : "",
                    "dateOfSubmission" : "",
                    "deadline" : "22-04-2022",
                    "marks" : 99.5
                    */}
                </Box>
            </Box>


            {/* <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ marginTop: '2rem' }}
                spacing={2}>
                <Grid item>
                        fff
                </Grid>

                <Grid item
                    style={{ maxWidth: 555 }}
                >
                    ff
                </Grid>

                <Grid item> 
                </Grid>
            </Grid> */}
        </>
                )
            }
        </>
    )
}
export default AssignmentMarks
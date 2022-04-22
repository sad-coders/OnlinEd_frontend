import React, { useState, useEffect, useContext } from 'react';

// Material UI 
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'; 
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';  
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { GlobalContext } from "../../context/GlobalState";
import { useNavigate } from 'react-router-dom';
 

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



const SignUp = () => {
  let navigate = useNavigate();
  
  const { signUp, signupSuccess} = useContext(GlobalContext)

  const classes = useStyles();

  // const state = useSelector(state => state.state)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFaculty, setIsFaculty] = useState("no");
  const [name, setName] = useState('');

  useEffect(() => {
      if(signupSuccess)
        navigate("/");
      // isAuthenticated is in dependency list
  }, [signupSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        var x = isFaculty === 'Yes' ? true: false;
        console.log(email + '  pa ' + password + ' name ', name, ' isF ', x);
        // console.log(x)
        signUp({email, password, isFaculty:x, name});
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> */}
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="Email"
                        autoComplete="email"
                        autoFocus

                        onChange={(e) => setEmail(e.target.value)} value={email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"

                        onChange={(e) => setPassword(e.target.value)} value={password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Name"
                        label="Name"
                        type="text"
                        id="name"
                        autoComplete="your-name"

                        onChange={(e) => setName(e.target.value)} value={name}
                    />
                    <FormControl>
                      <FormLabel id="isFaculty">Are you a faculty member ?</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="no"
                        name="radio-buttons-group"
                        value={isFaculty}
                        onChange={(e) => setIsFaculty(e.target.value)}
                      >
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" /> 
                      </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => handleSubmit(e)}
                    >
                        SignUp
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link href="/" variant="body2">
                                {"Already have an account? Sign In instead"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
                <Footer />
            </Box> */}
        </Container>

    );
}
 
export default SignUp
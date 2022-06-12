import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import identityService from '../../services/IdentityService';
import Alert from '@mui/material/Alert';
import { IRegister } from './IRegister'
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
export default function Register(props: any) {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);

    const renderErrorAlert = () => {
        if (error) {
            return <Alert severity="error">Your credentials are wrong.</Alert>
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const submitRegister = async () => {
        const credentials: IRegister = {
            'username': username,
            'email': email,
            'password': password
        };
        console.log(credentials);
        const loginResult = await identityService.register(credentials);
        if (loginResult.status === 401 || loginResult.status === 400) {
            setError(true);
        } else {
            handleClose();
        }
    }
    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClickOpen}
            >
                <VpnKeyIcon fontSize='large' />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth
                maxWidth="sm">
                <ValidatorForm
                    onSubmit={submitRegister}
                    onError={errors => console.log(errors)}
                >
                    <DialogTitle style={{ textAlign: "center" }} color='primary'>
                        Register
                    </DialogTitle>
                    <DialogContentText style={{ textAlign: "center" }}>
                        <VpnKeyIcon fontSize='large' color='primary' />
                    </DialogContentText>
                    <DialogContent>
                        {renderErrorAlert()}
                        <TextValidator
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={(e: any) => {
                                setUsername(e.target.value)
                                setError(false)
                            }}
                            name="username"
                            value={username}
                            validators={['required']}
                            errorMessages={['Username is required', 'username is not valid']}
                        />
                        <TextValidator
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            onChange={(e: any) => {
                                setEmail(e.target.value)
                                setError(false)
                            }}
                            name="password"
                            value={email}
                            validators={['required']}
                            errorMessages={['Email is required', 'Email is not valid']}
                        />
                        <TextValidator
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            onChange={(e: any) => {
                                setPassword(e.target.value)
                                setError(false)
                            }}
                            name="password"
                            value={password}
                            validators={['required']}
                            errorMessages={['Password is required', 'password is not valid']}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Register</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}
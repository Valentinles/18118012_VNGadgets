import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import identityService from '../../services/IdentityService';
import Alert from '@mui/material/Alert';
import { ILoginProps } from './ILoginProps';
import { ILogin } from './ILogin';
import LockIcon from '@mui/icons-material/Lock';
import { DialogContentText } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function Login(props: ILoginProps) {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
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
    const submitLogin = async () => {
        const credentials: ILogin = {
            'username': username,
            'password': password
        };
        console.log(credentials);
        const loginResult = await identityService.login(credentials);
        if (loginResult.status === 401 || loginResult.status === 400) {
            setError(true);
        } else {
            identityService.storeToken(loginResult.token);
            identityService.storeAdminRole(loginResult.roles);
            handleClose();
            window.location.reload();
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
                <LoginIcon fontSize='large' />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth
                maxWidth="sm">
                <ValidatorForm
                    onSubmit={submitLogin}
                    onError={errors => console.log(errors)}
                >

                    <DialogTitle style={{ textAlign: "center" }} color='primary'>
                        Login
                    </DialogTitle>
                    <DialogContentText style={{ textAlign: "center" }}>
                        <LockIcon fontSize='large' color='primary' />
                    </DialogContentText>
                    <DialogContent>
                        {renderErrorAlert()}
                        <TextValidator
                            autoFocus
                            margin="dense"
                            label="Username"
                            fullWidth
                            variant="outlined"
                            onChange={(e: any) => {
                                setUsername(e.target.value)
                                setError(false)
                            }}
                            name="usermame"
                            value={username}
                            validators={['required']}
                            errorMessages={['Username is required', 'username is not valid']}
                        />
                        <TextValidator
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            onChange={(e: any) => {
                                setPassword(e.target.value)
                                setError(false)
                            }}
                            value={password}
                            name="password"
                            validators={['required']}
                            errorMessages={['Password is required', 'email is not valid']}
                            type="password"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Log in</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div >
    );
}
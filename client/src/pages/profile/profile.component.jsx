import { Grid, TextField, Button, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

import useInput from '../../hooks/useInput';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { auth, firestore } from '../../firebase/firebase.utils';

import styles from './profile.module.css';

const Profile = () => {
  let formIsValid = false;
  const isNotEmpty = (val) => val.trim() !== '';
  const isValidPhone = (val) => /^\d{10}$/.test(val);

  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  const { email, displayName, photoURL, address, phoneNumber } = currentUser;
  console.log(auth.currentUser.multiFactor.user);

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    auth.currentUser
      .updateProfile({
        displayName: enteredName,
      })
      .then(() => {
        firestore.collection('users').doc(currentUser.uid).update({
          displayName: enteredName,
          address: enteredAddress,
          phoneNumber: enteredPhone,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    resetName();
    resetPhone();
    resetAddress();
  };

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty, displayName);

  const {
    value: enteredPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isValidPhone, phoneNumber);

  const {
    value: enteredAddress,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty, address);

  if (nameIsValid && phoneIsValid && addressIsValid) {
    formIsValid = true;
  }

  return (
    <Grid container component='main' className={styles.root}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={styles['profile-image-container']}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box className={styles['profile-box']}>
          <Avatar
            alt={displayName}
            src={photoURL}
            className={styles['profile-avatar']}
          >
            {displayName.charAt(0)}
          </Avatar>
          <Box
            component='form'
            className={styles['profile-form']}
            onSubmit={handleProfileSubmit}
          >
            <Grid container spacing={1}>
              <TextField
                type='email'
                placeholder='Enter email'
                label='Email'
                color='secondary'
                variant='outlined'
                margin='normal'
                size='small'
                fullWidth
                autoFocus
                required
                disabled
                value={email}
              />
              <TextField
                type='text'
                label='Name'
                color='secondary'
                variant='outlined'
                margin='normal'
                size='small'
                fullWidth
                required
                value={enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                error={nameHasError}
                {...(nameHasError && {
                  helperText: 'Name cannot be empty!',
                })}
              />
              <TextField
                type='tel'
                label='Phone Number'
                color='secondary'
                variant='outlined'
                margin='normal'
                size='small'
                fullWidth
                required
                value={enteredPhone}
                onChange={phoneChangeHandler}
                onBlur={phoneBlurHandler}
                error={phoneHasError}
                {...(phoneHasError && {
                  helperText: 'Invalid Phone Number!',
                })}
              />
              <TextField
                color='secondary'
                label='Address'
                multiline
                rows={4}
                placeholder='Yore address here...'
                variant='outlined'
                margin='normal'
                size='small'
                fullWidth
                required
                value={enteredAddress}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                error={addressHasError}
                {...(addressHasError && {
                  helperText: 'Address cannot be empty!',
                })}
              />
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                className={styles['profile-button']}
                fullWidth
                disabled={!formIsValid}
              >
                Save
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;

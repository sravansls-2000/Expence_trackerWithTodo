import React from 'react';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/slices/rigisterSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomSeparator from './CustomSeparator';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Logout = useSelector((state) => state.Rigister);
  const { firstname, lastname, email } = useSelector(
    (state) => state.Rigister.userAuth
  );
  const { success } = Logout;

  const logoutBtn = () => {
    dispatch(logout());
    if (success) {
      navigate('/');
    }
  };

  return (
    <>
      <CustomSeparator />

      <p className="font-bold text-xl">
        {firstname} {lastname}
      </p>
      <div className="flex ml-7">
        <button
          className="ml-[445px]"
          onClick={() => {
            logoutBtn();
          }}
        >
          logout111
        </button>

        <Divider sx={{ height: 5, marginTop: 10 }} />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
    </>
  );
};

export default Profile;

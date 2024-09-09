import React from 'react';
import { useState, useEffect } from 'react';
import { logout } from '../../redux/slices/rigisterSlice';
import { Disclosure } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../Constants/baseURl';
import BasicModal from './Modal';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/slices/darkmodeSlice';
import '../../App.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import axios from 'axios';
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

export default function Navbar() {
  const dispatch = useDispatch();

  const Logout = useSelector((state) => state.Rigister);
  const { success } = Logout;
  const toggle = useSelector((state) => state.theme.mode);
  const { firstname, mobileNumber, email, lastname, _id } = useSelector(
    (state) => state.Rigister.userAuth
  );

  const [mobileViewOpen, setMobileViewOpen] = useState(false);
  const [image, setImage] = useState();
  const [showingProfile, setShowingProfile] = useState();

  const logoutBtn = () => {
    dispatch(logout());
  };
  const handleSideNav = () => {
    setMobileViewOpen(!mobileViewOpen);
  };
  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append('image', image);
    formdata.append('id', _id);

    axios
      .post('http://localhost:8008/api/upload/Photo', formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/upload/image/${_id}`)
      .then((res) => setShowingProfile(res.data[0].myPhoto))
      .catch((err) => console.log(err));
  }, []);
  console.log(showingProfile);

  const responsiveDrawer = (
    <div
      className={`w-[250px] h-full grid grid-rows-[2fr,1fr,1fr,2fr]  ${
        toggle ? 'bg-[#083344]' : 'bg-slate-100'
      }`}
    >
      <img
        className="w-24 h-24 rounded-full flex justify-center mx-auto"
        src={`http://localhost:5000/profiles/${showingProfile}`}
        alt="profile"
      />
      <div
        className={` ${
          toggle ? 'text-[#B0B8C4]' : 'text-blue-600'
        }  font-extrabold text-center`}
      >
        {firstname} {lastname}
        {}
      </div>
      <div>
        <p
          className={` ${
            toggle ? 'text-[#B0B8C4]' : 'text-blue-600'
          }  font-bold text-center`}
        >
          <EmailIcon /> {email}
        </p>
        <p
          className={` ${
            toggle ? 'text-[#B0B8C4]' : 'text-blue-600'
          }  font-bold text-center`}
        >
          <PhoneIphoneIcon /> {mobileNumber}
        </p>
      </div>
      {!showingProfile ? (
        <>
          <Button component="label" startIcon={<CloudUploadIcon />}>
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
          </Button>
          <button onClick={handleUpload}>upload</button>
        </>
      ) : null}

      <button className="text-center" onClick={logoutBtn}>
        logout
        <i className="fa-solid fa-arrow-right-from-bracket fa-beat-fade"></i>
      </button>
    </div>
  );

  return (
    <Disclosure as="nav" className={toggle ? 'bg-[#083344]' : 'bg-slate-100'}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div
                  className={`flex flex-shrink-0 items-center ${
                    toggle ? 'text-[#B0B8C4]' : 'text-blue-600'
                  }  font-extrabold`}
                >
                  SIRA
                </div>

                <div
                  className={`flex flex-shrink-0 items-center text-blue-600 ${
                    toggle ? 'bg-[#083344] text-[#B0B8C4]' : 'bg-slate-100'
                  }`}
                >
                  <button
                    className="w-full m-2 border-x-gray-700"
                    onClick={() => {
                      dispatch(toggleTheme());
                    }}
                  >
                    <i
                      className={`fa-regular fa-${toggle ? 'sun' : 'moon'}`}
                    ></i>
                  </button>
                </div>
                <div className="hidden float-right sm:ml-6 sm:block">
                  <div className="space-x-4">
                    <BasicModal />
                  </div>
                </div>
              </div>
              <div
                className={`${
                  toggle ? 'text-[#B0B8C4]' : 'text-blue-600'
                } flex`}
              >
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <i
                    className="fa-solid fa-user cursor"
                    onClick={handleSideNav}
                  ></i>
                  <Box component="nav">
                    <Drawer
                      variant="temporary"
                      open={mobileViewOpen}
                      onClose={handleSideNav}
                      anchor="right"
                      ModalProps={{
                        keepMounted: true,
                      }}
                    >
                      {responsiveDrawer}
                    </Drawer>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../../redux/slices/rigisterSlice';
import { toggleTheme } from '../../redux/slices/darkmodeSlice';
import Loader from '../ReUseComponents/Loder';
import Success from '../ReUseComponents/Success';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');
  const [loginEnable, setLoginenable] = useState(false);
  const [eyeicon, setEyeIcon] = useState(false);

  const toggle = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.Rigister);
  const { userLoading, userAppErr, userServerErr, isRegistered } = user;
  const [Registered, setRegistered] = useState(isRegistered);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Registered) {
      setIsVisible(true);

      // After 2000ms (2 seconds), hide the component
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      // Clear the timeout when the component unmounts to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [Registered]);

  const loginButton = () => {
    dispatch(loginUserAction({ email, passWord }));

    if (!userLoading) {
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } else {
      navigate('/');
    }
  };

  return userLoading ? (
    <div className="flex justify-center flec-col items-center mt-[300px]">
      <Loader />
    </div>
  ) : (
    <div className="grid grid-cols-[1fr_3fr_2fr] grid-rows-[1fr_3fr]">
      {Registered && isVisible && <Success isVisible={isVisible} />}

      <button
        className={`w-full m-2 border-x-gray-700 ${
          toggle ? 'text-gray-400' : 'text-indigo-600'
        } `}
        title={toggle ? 'Light Mode' : 'Dark Mode'}
        onClick={() => {
          dispatch(toggleTheme());
        }}
      >
        <i
          className={`fa-regular fa-${toggle ? 'sun' : 'moon'} hover:fa-bounce`}
        ></i>
      </button>
      <div className="flex justify-center flex-col items-start ">
        <h3
          className={`text-[40px] font-medium leading-6 ${
            toggle ? 'text-[#B0B8C4]' : 'text-indigo-600'
          } mb-2`}
        >
          Dairy
        </h3>
        <p className="mt-1  text-md text-gray-600">
          Daily Dairy One Stop To Check your daily tasks
        </p>
      </div>
      <div className="border rounded-md drop-shadow-2xl mt-4 mr-4">
        <div className="mt-11 ml-[50px]">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-[#B0B8C4]"
          >
            Email Adress
          </label>
          <input
            className={`w-[300px] rounded-md border-solid border-2 ${
              toggle ? 'text-[#B0B8C4]' : 'border-indigo-500'
            }`}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="mt-11 ml-[50px]">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-[#B0B8C4]"
          >
            PassWord
          </label>

          <div className="inputContainer">
            <input
              className={`w-[300px] rounded-md border-solid border-2 ${
                toggle ? 'text-[#B0B8C4]' : 'border-indigo-500'
              }   input-password`}
              ref={inputRef}
              type={`${eyeicon ? 'text' : 'password'}`}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button
              className={` m-2 border-x-gray-700 ${
                toggle ? 'text-gray-400' : 'text-indigo-600'
              }  inputIcon `}
              title={eyeicon ? 'hide password' : 'show password Mode'}
              onClick={() => {
                if (inputRef.current.type === 'password') {
                  setEyeIcon(true);
                } else {
                  setEyeIcon(false);
                }
              }}
            >
              <i
                className={`fa-regular fa-${
                  eyeicon ? 'eye' : 'eye-slash'
                } fa-bounce `}
              ></i>
            </button>
          </div>
        </div>
        <div className=" px-4 py-3 text-right  mt-[140px]">
          <button
            className={`inline-flex  justify-center rounded-md border border-transparent ${
              email || passWord ? 'bg-indigo-600' : 'bg-indigo-100'
            } ${
              toggle ? 'text-indigo-600' : null
            } py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            onClick={loginButton}
            disabled={loginEnable}
          >
            Login
          </button>
          <a
            className={`underline ml-1 ${
              toggle ? 'text-[#B0B8C4]' : 'text-black'
            }`}
            onClick={() => {
              navigate('/rigister');
            }}
          >
            Sign in !
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;

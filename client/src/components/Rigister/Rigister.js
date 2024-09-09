import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, useFormik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import Key from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { registerUserAction } from '../../redux/slices/rigisterSlice';
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(' FirstName Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('LastName Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  mobileNumber: Yup.string().required('MobileNumber Required'),
  passWord: Yup.string().required('Password Required'),
});

function Rigister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const toggle = useSelector((state) => state.theme.mode);

  const user = useSelector((state) => state.Rigister);
  const { userLoading, isRegistered, userAppErr, userServerErr } = user;

  useEffect(() => {
    if (isRegistered) {
      navigate('/');
    }
  });

  return userLoading ? (
    <div className="flex justify-center items-center mt-[170px] ">
      <Box>
        <CircularProgress />
      </Box>
    </div>
  ) : (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          passWord: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          if (values) {
            dispatch(registerUserAction(values));
          }
        }}
      >
        {({ errors, touched }) => (
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3
                    className={`text-[30px] font-medium mt-5 leading-6 ${
                      toggle ? 'text-[#B0B8C4]' : 'text-indigo-600 '
                    } mb-2`}
                  >
                    Sign In
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      toggle ? 'text-[#B0B8C4]' : 'text-indigo-600 '
                    } mb-2`}
                  >
                    Daily Dairy One Stop To Check your daily tasks
                  </p>
                </div>
              </div>
              {userAppErr || userServerErr ? (
                <div className="bg-red-600 text-white">
                  {userServerErr} {userAppErr}
                </div>
              ) : null}
              <div className="mt-5 md:col-span-2 md:mt-0">
                <Form>
                  <div className="overflow-hidden shadow sm:rounded-md border rounded-md drop-shadow-2xl">
                    <div
                      className={`${
                        toggle ? 'bg-black' : 'bg-white'
                      } px-4 py-5 sm:p-6`}
                    >
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-[#B0B8C4]"
                          >
                            First name
                          </label>
                          <Field
                            type="text"
                            name="firstName"
                            id="first-name"
                            className={`mt-1 block w-full rounded-md border-solid border-2 ${
                              errors.firstName && touched.firstName
                                ? 'border-red-600'
                                : 'border-indigo-500'
                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                          />
                          {errors.firstName && touched.firstName ? (
                            <div className="text-red-500">
                              *{errors.firstName}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-[#B0B8C4]"
                          >
                            Last name
                          </label>
                          <Field
                            type="text"
                            name="lastName"
                            id="last-name"
                            className={`mt-1 block w-full rounded-md border-solid border-2 ${
                              errors.lastName && touched.lastName
                                ? 'border-red-600'
                                : 'border-indigo-500'
                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                          />
                          {errors.lastName && touched.lastName ? (
                            <div className="text-red-500">
                              *{errors.lastName}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-[#B0B8C4]"
                          >
                            Email address
                          </label>
                          <Field
                            type="text"
                            name="email"
                            id="email-address"
                            className={`mt-1 block w-full rounded-md border-solid border-2 ${
                              errors.email && touched.email
                                ? 'border-red-600'
                                : 'border-indigo-500'
                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                          />
                          {errors.email && touched.email ? (
                            <div className="text-red-500">*{errors.email}</div>
                          ) : null}
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="mobile-number"
                            className="block text-sm font-medium text-[#B0B8C4]"
                          >
                            MobileNumber
                          </label>
                          <Field
                            type="number"
                            name="mobileNumber"
                            id="mobile-number"
                            className={`mt-1 block w-full rounded-md border-solid border-2 ${
                              errors.mobileNumber && touched.mobileNumber
                                ? 'border-red-600'
                                : 'border-indigo-500'
                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                          />
                          {errors.mobileNumber && touched.mobileNumber ? (
                            <div className="text-red-500">
                              *{errors.mobileNumber}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-[#B0B8C4]"
                          >
                            Password
                          </label>
                          <Field
                            type="password"
                            name="passWord"
                            id="password"
                            className={`mt-1 block w-full rounded-md border-solid border-2 ${
                              errors.passWord && touched.passWord
                                ? 'border-red-600'
                                : 'border-indigo-500'
                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                          />

                          {errors.passWord && touched.passWord ? (
                            <div className="text-red-500">
                              *{errors.passWord}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-start-1 col-end-7">
                          <button
                            onClick={() => {
                              navigate('/');
                            }}
                            className={`underline mr-2 float-right ${
                              toggle ? 'text-[#B0B8C4]' : 'text-black'
                            }`}
                          >
                            Already Have an account..?
                          </button>
                          <button
                            type="submit"
                            className="inline-flex justify-center float-left rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Rigister
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default Rigister;

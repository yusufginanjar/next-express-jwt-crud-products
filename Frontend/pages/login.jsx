import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux'
import { login as _login, logout } from '../store/loginSlice';
import axios from 'axios';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const loginState = {
  email: '',
  password: '',
};
export default function SignIn() {
  const router = useRouter();
  const [login, setLogin] = useState(loginState);
  const { email, password } = login;
  const dispatch = useDispatch();

  useEffect(() => {

  });

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const authLogin = async () => {
    try {
      if ((email, password === '')) {
        await Toast.fire({
          icon: 'warning',
          title: 'please fill in the column first',
          timer: 1500,
        });
      } else {       
        const response = await axios.post('http://localhost:4000/api/v1/login', {
          email,
          password,
          });
          console.log(response);
        if(response.data.accessToken){
          await Toast.fire({
            icon: 'success',
            title: 'signed in successfully',
          });
          router.push('/login');
          dispatch(_login());
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('user_id', response.data.id )
        }else{
          await Toast.fire({
            icon: 'error',
            title: 'email or password is wrong',
          });        
      }}
    } catch (error) {
      console.log(error);
      await Toast.fire({
        icon: 'error',
        title: 'email or password is wrong',
      }); 
    }
  };

  return (
    <div className="container  ">
      <div className="row  justify-content-center   ">
        <div className="d-flex m-5 justify-content-center  ">
          <div className="col-md-6 col-lg-4 border border-primary pb-5 d-flex flex-column align-items-center p-4">
            <h3 className="text-center pt-5 pb-4">Sign In</h3>
            <input
              className="col-md-4 mb-2 form-control mb-2"
              label="Email"
              type="email"
              name="email"
              placeholder="Your Email ... "
              onChange={handleOnChangeInput}
            />
            <input
              className="col-md-4 form-control mb-2"
              label="Password"
              type="password"
              name="password"
              placeholder="Password Here .."
              onChange={handleOnChangeInput}
            />
            <div className="col-md-7 offset-md-4 mt-4">
              <button
                type="button"
                className="btn btn-primary col-md-6 "
                onClick={authLogin}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

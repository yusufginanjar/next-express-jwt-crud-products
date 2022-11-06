import React, { useState as _useState } from 'react';
import { Form } from 'react-bootstrap';
import { uid } from 'uid';
import { useRouter as _useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios from 'axios';
const registerState = {
  username: '',
  password: '',
  email: '',
  bio: 0,
  score: 0,
};
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
export default function signup() {
  const router = _useRouter();
  const [user, setUser] = _useState(registerState);
  const { username, email, password, score, bio } = user;
  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleRegister = async () => {
    if ((username, password, email === '')) {
      await Toast.fire({
        icon: 'warning',
        title: 'please fill in the column first',
        timer: 1500,
      });
    } else {
      if (password.length < 6) {
        alert('please input password 6 character');
      } else {
        try {
          const response = await axios.post('http://localhost:4000/api/v1/register', {
            username,
            email,
            password
          });
          console.log(response);
          if(response.status === 200){
            await Toast.fire({
              icon: 'success',
              title:
                'register is successful and will be redirected to the Login page',
              timer: 2400,
            });
            await router.push('/login');
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <Form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                            className="col-md-4 form-control mb-2"
                              label={'Username'}
                              placeholder="input username ..."
                              type="string"
                              name="username"
                              onChange={handleRegisterInput}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                            className="col-md-4 form-control mb-2"
                              label={'email'}
                              placeholder="input email ..."
                              type="email"
                              name="email"
                              onChange={handleRegisterInput}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                            className="col-md-4 form-control mb-2"
                              label={'Password'}
                              placeholder="input password ..."
                              type="password"
                              name="password"
                              onChange={handleRegisterInput}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleRegister}
                          >
                            Register
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

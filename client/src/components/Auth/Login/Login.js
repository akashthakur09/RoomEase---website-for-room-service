import React, { useState } from 'react'
// import Navbar from '../../Pages/navbar';
import basestyle from '../Base.module.css'
import loginstyle from './Login.module.css';
import '../../css/landlordLogin.css';
import { useNavigate, NavLink } from 'react-router-dom'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", role: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, role: credentials.role, password: credentials.password })

    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.authToken)
      const userId = json.userId;
      localStorage.setItem('userId', userId);
      
      if(credentials.role === 'landlord'){
        navigate("/landlordProfile")
      }else{
        navigate("/home")
      }

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="loginBox">
        
        <div className={loginstyle.login}>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={onChange}
              value={credentials.email}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={onChange}
              value={credentials.password}
            />
           <input
              type="role"
              name="role"
              id="role"
              placeholder="Role"
              onChange={onChange}
              value={credentials.role}
            />
            <button className={basestyle.button_common} >
              Sign In
            </button>
          </form>
          <NavLink to="/signup">Not yet registered? Sign Up</NavLink>
      </div>
     
    </div>
    
  )
}




























// import React, { useState, useEffect } from "react";
// import basestyle from '../Base.module.css'
// import loginstyle from './Login.module.css';
// import '../../css/landlordLogin.css';
// import axios from "axios";
// import { useNavigate, NavLink } from "react-router-dom";
// const Login = ({ setUserState }) => {
//   const navigate = useNavigate();
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [user, setUserDetails] = useState({
//     role:"",
//     email: "",
//     password: "",
//   });

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({
//       ...user,
//       [name]: value,
//     });
//   };
//   const validateForm = (values) => {
//     const error = {};
//     const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if(!values.role){
//       error.role = "Who are you? Tenant or Landlord";
//     }else if (!values.email) {
//       error.email = "Email is required";
//     } else if (!regex.test(values.email)) {
//       error.email = "Please enter a valid email address";
//     }
//     if (!values.password) {
//       error.password = "Password is required";
//     }
//     return error;
//   };

//   const loginHandler = (e) => {
//     e.preventDefault();
//     setFormErrors(validateForm(user));
//     setIsSubmit(true);
//   };

//   useEffect(() => {
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(user);
//       axios.post("http://localhost:5000/api/auth/login", user).then((res) => {
//         alert(res.data.message);
//         setUserState(res.data.user);
//         navigate("/", { replace: true });
//       });
//     }
//   }, [formErrors]);
//   return (
//     <div className="loginBox">
//         <div className="first">
//             <div className="MyAppLogo"><NavLink to="/">MyAppLogo</NavLink></div>
//             <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta itaque libero </h3>
//         </div>
//         <div className={loginstyle.login}>
//           <form>
//             <h1>Login</h1>
            
//             <input
//               type="email"
//               name="email"
//               id="email"
//               placeholder="Email"
//               onChange={changeHandler}
//               value={user.email}
//             />
//             <p className={basestyle.error}>{formErrors.email}</p>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="Password"
//               onChange={changeHandler}
//               value={user.password}
//             />
//             <p className={basestyle.error}>{formErrors.password}</p>
//             <input
//               type="role"
//               name="role"
//               id="role"
//               placeholder="Role"
//               onChange={changeHandler}
//               value={user.role}
//             />
//             <p className={basestyle.error}>{formErrors.role}</p>
//             <button className={basestyle.button_common} onClick={loginHandler}>
//               Sign In
//             </button>
//           </form>
//           <NavLink to="/signup">Not yet registered? Sign Up</NavLink>
//       </div>
//       <div className="third">
//           <p className="para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque molestiae nemo autem temporibus, fugit laborum quos sapiente inventore nisi nulla.</p>
//       </div>
//     </div>
//   );
// };
// export default Login;

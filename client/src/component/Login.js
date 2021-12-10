// import React from "react";
// import { useState } from "react";
// import styled from "styled-components";
// import LogoutButton from "./LogoutButton";
// import LoginButton from "./LoginButton";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(email, password);
//   };

//   return (
//     <div>
//       <Background>
//         <Wrapper>
//           <form onSubmit={handleSubmit}>
//             <Title>Login</Title>
//             <Div>
//               <Label>
//                 <span>Email:</span>
//                 <Input
//                   type="email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                   required
//                 />
//               </Label>
//             </Div>
//             <Div2>
//               <Label>
//                 <span>Password:</span>
//                 <Input
//                   type="password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   value={password}
//                   required
//                 />
//               </Label>
//             </Div2>
//           </form>
//           <Button>
//             <LoginButton />
//           </Button>
//         </Wrapper>
//       </Background>
//     </div>
//   );
// };

// const Title = styled.h1`
//   color: #fff;
//   text-transform: uppercase;
//   font-size: 23px;
//   margin: -50px 0 80px 0;
//   display: block;
//   text-align: center;
// `;

// const Wrapper = styled.div`
//   position: absolute;
//   left: 52%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   /* background-color: rgba(0, 0, 0, 0.89); */
//   border-radius: 3px;
//   padding: 70px 100px;
//   background-color: rgb(1, 1, 1);
//   width: 400px;
// `;

// const Div = styled.div`
//   position: relative;
//   margin-bottom: 25px;
//   border: 0;
//   border-bottom: 1px solid #555;
//   background: transparent;
//   margin-top: 10px !important;
//   width: 100%;
//   padding: 8px 0px 5px 0;
//   font-size: 16px;
//   color: #fff;

//   :focus {
//     border: none;
//     outline: none;
//     border-bottom: 1px solid #e74c3c;
//   }
// `;

// const Div2 = styled.div`
//   position: relative;
//   margin-bottom: 25px;
//   top: 10px;
//   border-bottom: 1px solid #555;
//   border: 0;
//   border-bottom: 1px solid #555;
//   background: transparent;
//   width: 100%;
//   padding: 8px 0px 5px 0;
//   font-size: 16px;
//   color: #fff;

//   :focus {
//     border: none;
//     outline: none;
//     border-bottom: 1px solid #e74c3c;
//   }
// `;

// const Input = styled.input`
//   margin-left: -10px;
// `;

// const Label = styled.label`
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   font-size: 16px;
//   color: #fff;
//   transition: all 0.5s ease-in-out;
//   :focus,
//   :valid {
//     top: -12px;
//     font-size: 12px;
//   }
// `;

// const Background = styled.div`
//   margin: 0px;
//   background-image: url("/picture/login2.jpg");
//   min-height: 100vh;
//   background-size: cover;
//   /* margin-top: -65px; */
//   position: relative;
//   opacity: 0.9;
// `;

// const Button = styled.button`
//   color: #fff;
//   /* background-color: #be95c4; */
//   outline: none;
//   border: 0;
//   color: #fff;
//   padding: 10px 20px;
//   text-transform: uppercase;
//   margin-top: 50px;
//   border-radius: 2px;
//   cursor: pointer;
//   position: relative;
//   margin-top: 80px;
// `;

// export default Login;

import React, { useState, useEffect } from "react";
import styled from "styled-components";

// const FriendButton = () => {
//   const [addFriend, setAddFriend] = useState(null);

//   const query = Object.keys(params)
//     .map(
//       (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
//     )
//     .join("&");

//   fetch(`/api/friends/add?${query}`, {
//     method: "PUT",
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       alert(data.message);
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return (
//     <div>
//       <Button onClick={addFriendRequest}>Add Friend</Button>
//     </div>
//   );
// };

// const Button = styled.button`
//   align-items: center;
//   margin-left: 180px;
//   @extend .center-content;
//   padding: 10px 30px;
//   font-size: 24px;
//   cursor: pointer;

//   border-radius: 7px;
//   border-bottom-left-radius: 0;

//   background-color: var(--feedback-secondary-color);
//   color: var(--feedback-primary-color);

//   transition: all 0.3s;

//   &:hover {
//     border-radius: 0px;

//     color: var(--feedback-primary-color);
//     background-color: var(--background-color);
//     background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffacac' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
//     animation: animatedBackground 5s linear infinite alternate;
//   }

//   @keyframes animatedBackground {
//     from {
//       background-position: 0 0;
//     }
//     to {
//       background-position: 100% 0;
//     }
//   }
// `;
// export default FriendButton;

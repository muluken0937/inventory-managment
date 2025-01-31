
// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // Default role
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userData = {
//       username: username.trim(),
//       email: email.trim(),
//       password,
//       role, // Include role in the user data
//     };

//     try {
//       const response = await fetch("http://localhost:3001/api/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         navigate("/"); // Redirect to login after successful registration
//       } else {
//         const errorData = await response.json();
//         // Check if there's a message key and display that
//         if (errorData.message) {
//           setError(errorData.message);
//         } else {
//           setError(errorData.errors[0].msg); // Default to first error if available
//         }
//         console.log("Error during registration:", errorData);
//       }
//     } catch (err) {
//       console.error("Error during registration:", err);
//       setError("An error occurred during registration.");
//     }
//   };

//   return (
//     <div className="container-fluid p-5">
//       <h1 className="mb-4 text-center">User Registration</h1>
//       {error && <p className="text-danger text-center">{error}</p>}
//       <form
//         onSubmit={handleSubmit}
//         className="mx-auto"
//         style={{ maxWidth: "400px" }}
//       >
//         <div className="form-group mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <select
//             className="form-control"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary w-100">
//           Register
//         </button>
//       </form>
//       <div className="mt-3 text-center">
//         <NavLink to="/">Already have an account? Log in here.</NavLink>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is set to 'user'
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username.trim(),
      email: email.trim(),
      password,
      role, // Include role in the user data
    };

    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/"); // Redirect to login after successful registration
      } else {
        const errorData = await response.json();
        setError(errorData.message || errorData.errors[0].msg || "Registration failed. Please try again.");
        console.log("Error during registration:", errorData);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="container-fluid p-5">
      <h1 className="mb-4 text-center">User Registration</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Dropdown for selecting role (fixed to 'User' only) */}
        <div className="form-group mb-3">
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled // Disable the dropdown to restrict role selection
          >
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
      <div className="mt-3 text-center">
      Already have an account?   
        <NavLink to="/">Log in here.</NavLink>
      </div>
    </div>
  );
}

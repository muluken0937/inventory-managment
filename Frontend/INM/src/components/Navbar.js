
// import React, { useState } from 'react'; // Import useState from React
// import { useNavigate } from 'react-router-dom';

// export default function Navbar(props) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate(); // Hook for navigation

//   const handleSearch = (e) => {
//     e.preventDefault(); // Prevent default form submission

//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg bg-dark">
//         <div className="container-fluid">
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link active text-white fs-4" aria-current="page" href="/">{props.title}</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link active text-white fs-4" aria-current="page" href="/products">Products</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link active text-white fs-4" aria-current="page" href="/about">About</a>
//               </li>
//             </ul>
//             <form className="d-flex" role="search" onSubmit={handleSearch}>
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button className="btn btn-primary fs-5" type="submit">Search</button>
//             </form>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white fs-4" aria-current="page" href="/">
                  {props.title}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-white fs-4" aria-current="page" href="/products">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-white fs-4" aria-current="page" href="/about">
                  About
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary fs-5" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

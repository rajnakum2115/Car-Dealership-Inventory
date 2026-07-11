// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>

//                 <Route
//                     path="/"
//                     element={<Navigate to="/login" replace />}
//                 />

//                 <Route
//                     path="/login"
//                     element={<Login />}
//                 />

//                 <Route
//                     path="/register"
//                     element={<Register />}
//                 />

//                 <Route
//                     path="/home"
//                     element={<Home />}
//                 />

//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;


// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // import Home from "./pages/Home";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";

// // function App() {

// //     const token = localStorage.getItem("token");

// //     return (

// //         <BrowserRouter>

// //             <Routes>

// //                 <Route
// //                     path="/"
// //                     element={
// //                         token ? <Home /> : <Navigate to="/login" />
// //                     }
// //                 />

// //                 <Route
// //                     path="/login"
// //                     element={
// //                         token ? <Navigate to="/" /> : <Login />
// //                     }
// //                 />

// //                 <Route
// //                     path="/register"
// //                     element={
// //                         token ? <Navigate to="/" /> : <Register />
// //                     }
// //                 />

// //             </Routes>

// //         </BrowserRouter>

// //     );

// // }

// // export default App;




import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {

    const token = localStorage.getItem("token");

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={token ? <Home /> : <Navigate to="/login" replace />}
                />

                <Route
                    path="/home"
                    element={token ? <Home /> : <Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={!token ? <Login /> : <Navigate to="/" replace />}
                />

                <Route
                    path="/register"
                    element={!token ? <Register /> : <Navigate to="/" replace />}
                />

                <Route
                    path="/about"
                    element={token ? <About /> : <Navigate to="/login" replace />}
                />

                <Route
                    path="/contact"
                    element={token ? <Contact /> : <Navigate to="/login" replace />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Admin from "./Admin";
import PostEditor from "./PostEditor";
import Author from "./Author";

function App() {
    return (
        <>
            <div className="racing-stripe"></div>
            <div className="App container">
                <BrowserRouter>
                    <Link
                        style={{ textDecoration: "none", textShadow: "none" }}
                        to="/"
                        className="home-link"
                    >
                        <span>my</span>📣<span>BLOG</span>
                    </Link>
                    
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/create-account" element={<CreateAccount />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/author/:id" element={<Author />} />
                            <Route
                                path="/admin/post-editor/:id"
                                element={<PostEditor />}
                            />
                        </Routes>
                    
                </BrowserRouter>
            </div>
            <div
                style={{ position: "fixed", bottom: 0 }}
                className="racing-stripe"
            ></div>
            <div id="page-bg"></div>
        </>
    );
}

export default App;

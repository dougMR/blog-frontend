import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import APIUrl from "./APIUrl";

const Admin = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    // const [log,setLog] = useState("");
    useEffect(() => {
        const checkLoginStatus = async () => {
            const response = await fetch(`${APIUrl}/loginStatus`, {
                credentials: "include",
            });
            const data = await response.json();
            if (data.isLoggedIn) {
                // you're fine
                getPosts();
            } else {
                // not logged in, can't be on this page
                navigate("/login");
            }
        };
        checkLoginStatus();
    }, [navigate]);
    // useEffect(()=>{
    //     console.log(log);
    // },[log]);

    const getPosts = async () => {
        const response = await fetch(`${APIUrl}/posts`);
        const data = await response.json();
        setPosts(data.posts);
    };

    const deletePost = async (postID) => {
        if (window.confirm("You sure?")) {
            await fetch(`${APIUrl}/post/${postID}`, {
                method: "DELETE",
                credentials: "include",
            });
            getPosts();
        }
    };

    return (
        <div>
            <h1>Admin</h1>

            <div id="nav-links">
                <Link to="#"
                    className="link"
                    onClick={async (evt) => {
                        await fetch(`${APIUrl}/logout`, {
                            credentials: "include",
                        });
                        navigate("/login");
                    }}
                >
                    Log out
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/admin/post-editor/new">New Post</Link>
            </div>
            <br />
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => {
                        return (
                            <tr key={post.id}>
                                <td>
                                    <h6>{post.title}</h6>
                                </td>
                                <td>
                                    <Link
                                        className="btn btn-primary"
                                        to={`/admin/post-editor/${post.id}`}
                                    >
                                        Edit
                                    </Link>
                                    {/* <button className="btn btn-primary" onPointerDown={()=>{
                                        editPost(post.id);
                                    }}>
                                        Edit
                                    </button> */}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onPointerDown={() => {
                                            deletePost(post.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import APIUrl from "./APIUrl";

const PostEditor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);
    const postPost = async (evt) => {
        evt.preventDefault();
        if(params.id==="new"){
            const response = await fetch(`${APIUrl}/post`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
                credentials: "include",
            });
        } else {
            await fetch(`${APIUrl}/post/${params.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON. stringify({title,content}),
                credentials: "include"
            })
        }
        

        navigate("/admin");
        // setLog("Just came from PostEditor, and boy are my arms tired.");
    };
    useEffect(() => {
        const getPost = async (id) => {
            if (params.id !== "new") {
                const response = await fetch(`${APIUrl}/post/${params.id}`, {
                    credentials: "include",
                });
                const data = await response.json();
                setContent(data.post.content);
                setTitle(data.post.title);
                console.log("data: ", data);
            } else {
                setContent("");
                setTitle("");
            }
        };
        getPost();
    }, [params.id]);

    return (
        <div>
            <h1>{params.id === "new" ? "New" : "Edit"} Post</h1>
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
                {params.id==="new" ? (
                    ""
                ) : (
                    <Link to="/admin/post-editor/new">New Post</Link>
                )}
                
                <Link to="/admin">Admin</Link>
                <Link to="/">Home</Link>
            </div>
            
            <form onSubmit={postPost}>
                <label htmlFor="">Post Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(evt) => {
                        setTitle(evt.target.value);
                    }}
                />
                <br />
                <label htmlFor="">Post Content</label>
                <textarea
                    type="text"
                    className="form-control"
                    value={content}
                    onChange={(evt) => {
                        setContent(evt.target.value);
                    }}
                />
                <br />
                <button type="submit" className="btn btn-primary">
                    Post
                </button>
            </form>
        </div>
    );
};
export default PostEditor;

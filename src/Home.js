import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import APIUrl from "./APIUrl";
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch(`${APIUrl}/posts`);
            const data = await response.json();
            setPosts(data.posts);
        };
        getPosts();

        const getAuthors = async () => {
            const response = await fetch(`${APIUrl}/authors`);
            console.log("response: ", response);
            const data = await response.json();
            setAuthors(data.authors);
        };
        getAuthors();
    }, []);
    return (
        <div>
            <h1>HOME</h1>
            <div id="nav-links">
                <Link to="/login">Login</Link>
                <Link to="/admin">Admin</Link>
            </div>
            <br />
			{/* Authors buttons */}
            <span
                style={{ fontSize: "0.7em", color: "#555", fontWeight: "bold" }}
            >
                AUTHORS:{" "}
            </span>
            {authors.map((author) => {
                return (
                    <span className="author" key={author.id}>
                        <Link to={`/author/${author.id}`}>
                            {author.username}
                        </Link>
                    </span>
                );
            })}
			{/* Posts */}
            {posts.map((post) => {
                return (
                    <div className="post-panel" key={post.id}>
                        <h4 className="title card-title">{post.title}</h4>
                        <p className="byline">by: {post.user.username}</p>
                        <p className="card-text">{post.content}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;

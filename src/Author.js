import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import APIUrl from "./APIUrl";

const Author = () => {
    const params = useParams();
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState(null);
    const [authors, setAuthors] = useState([]);
    // console.log(params.id);

    useEffect(() => {
        const getPostsByAuthor = async () => {
            const results = await fetch(`${APIUrl}/author/${params.id}`);
            const data = await results.json();
            // console.log("data: ", data);
            setPosts(data.posts);
            setAuthor(data.user.username);
        };
        getPostsByAuthor();
    }, [params.id]);
    useEffect(() => {
        const getAuthors = async () => {
            const response = await fetch(`${APIUrl}/authors`);
            // console.log("response: ", response);
            const data = await response.json();
            setAuthors(data.authors);
        };
        getAuthors();
    }, []);

    return (
        <div className="component-body">
            <h1>
                <span style={{ fontSize: "0.8em" }}>Posts by: </span>
                {author}
            </h1>
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
            {posts.length === 0 ? (
                <p>This author has not created any posts yet.</p>
            ) : (
                posts.map((post) => {
                    return (
                        <div className="post-panel" key={post.id}>
                            <h4 className="title card-title">{post.title}</h4>
                            <p className="card-text">{post.content}</p>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Author;

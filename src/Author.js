import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIUrl from "./APIUrl";

const Author = () => {
    const params = useParams();
    const [posts, setPosts] = useState([]);
    const [author, setAuthor]  = useState(null);
    console.log(params.id);

    useEffect(() => {
        const getPostsByAuthor = async () => {
            const results = await fetch(`${APIUrl}/author/${params.id}`);
            const data = await results.json();
            console.log('data: ',data);
            setPosts(data.posts);
            setAuthor(data.user.username);
        };
        getPostsByAuthor();

    }, [params.id]);

    return (
        <div>
            <h1><span style={{fontSize:"0.8em"}}>Posts by: </span>{author}</h1>
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

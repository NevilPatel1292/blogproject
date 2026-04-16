import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function BlogDetails() {
    const API = "http://localhost:5013/api/Blogs";
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");

    useEffect(() => {
        axios.get(`${API}/${id}`)
            .then(res => setBlog(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!blog) return <h3 className="text-center mt-5">Loading...</h3>;

    

    return (
        <div className="container mt-4">

            {/* Back Button */}
            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate(`/?page=${page}`)}
            >
                ⬅ Back
            </button>

            <div className="row">

                {/* LEFT SIDE → IMAGE */}
                <div className="col-md-5">
                    {blog.image && (
                        <img
                            src={
                                blog.image && blog.image.startsWith("http")
                                    ? blog.image
                                    : `${process.env.PUBLIC_URL}${blog.image}`
                            }
                            alt="blog"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "10px",
                                objectFit: "cover"
                            }}
                        />
                    )}
                </div>

                {/* RIGHT SIDE → DETAILS */}
                <div className="col-md-7">

                    <h2 className="mb-3">{blog.title}</h2>

                    <span style={{ fontSize: "18px", lineHeight: "1.6", whiteSpace: "pre-line" }}>
                        {blog.description}
                    </span>

                </div>

            </div>
            
        </div>
    );
}

export default BlogDetails;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function BlogComponent() {
  const API = "http://localhost:5013/api/Blogs";
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // ✅ added
  const [editId, setEditId] = useState(null);
  const location = useLocation();

  const fetchBlogs = () => {
    axios.get(API)
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchBlogs();

    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page"));

    if (page) {
      setCurrentPage(page);
    }
  }, [location.search]);

  const addBlog = () => {
    axios.post(API, {
      title,
      description,
      image
    }).then(() => {
      fetchBlogs();
      setTitle("");
      setDescription("");
      setImage(""); // ✅ reset
    });
  };

  const deleteBlog = (id) => {
    axios.delete(`${API}/${id}`)
      .then(() => fetchBlogs());
  };

  const editBlog = (blog) => {
    setEditId(blog.id);
    setTitle(blog.title);
    setDescription(blog.description);
    setImage(blog.image); // ✅ load image
  };

  const updateBlog = () => {
    axios.put(`${API}/${editId}`, {
      id: editId,
      title,
      description,
      image
    }).then(() => {
      setEditId(null);
      setTitle("");
      setDescription("");
      setImage("");
      fetchBlogs();
    });
  };

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;

  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);


  return (
    <div className="container mt-4">

      {/* FORM */}
      {isAdmin && (
        <div className="card p-3 mb-4 shadow">
          <input
            className="form-control mb-2"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Enter Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {editId ? (
            <button className="btn btn-warning" onClick={updateBlog}>
              Update ✏️
            </button>
          ) : (
            <button className="btn btn-primary" onClick={addBlog}>
              Add ➕
            </button>
          )}
        </div>
      )}

      {/* BLOG LIST */}
      <div className="row">
        {currentBlogs.map((b) => (
          <div key={b.id} className="col-md-4" style={{ cursor: "pointer" }}
            onClick={() => navigate(`/blog/${b.id}?page=${currentPage}`)}>
            <div className="card mb-4 shadow blog-card">
              {b.image && (
                <img
                  src={
                    b.image && b.image.startsWith("http")
                      ? b.image
                      : `${process.env.PUBLIC_URL}${b.image}`
                  }
                  className="card-img-top"
                  alt="blog"
                  style={{ height: "500px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h5 className="card-title"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                  {b.title.length > 40
                    ? b.title.substring(0, 40) + "..."
                    : b.title}
                </h5>

                <p className="card-text">
                  {b.description.length > 100
                    ? b.description.substring(0, 100) + "..."
                    : b.description}
                </p>

                {isAdmin && (
                  <>
                    <button
                      className="btn btn-warning me-2"
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ important
                        editBlog(b);
                      }}
                    >
                      Edit ✏️
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ important
                        deleteBlog(b.id);
                      }}
                    >
                      Delete ❌
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {Array.from(
          { length: Math.ceil(blogs.length / blogsPerPage) },
          (_, i) => (
            <button
              key={i}
              className={`btn me-2 ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
                }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      <div className="text-center mt-3">
        <button
          className="btn btn-secondary me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <button
          className="btn btn-secondary"
          disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default BlogComponent;

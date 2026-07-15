import { Link } from "react-router-dom";

export default function RelatedPosts({ posts, type = "tours" }) {
  const getPath = (id) => {
    if (type === "tours") return `/tour-packages/${id}`;
    if (type === "destinations") return `/destinations/${id}`;
    return `/travel-blog/${id}`;
  };

  return (
    <div>
      <h3 className="font-heading text-2xl text-dark mb-6">
        {type === "tours" && "Related Tours"}
        {type === "destinations" && "More Destinations"}
        {type === "blogs" && "Related Articles"}
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={getPath(post.id)}
            className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-44 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
            <div className="p-4">
              {post.category && (
                <span className="text-primary text-xs uppercase tracking-wider font-semibold">
                  {post.category}
                </span>
              )}
              <h4 className="font-heading text-lg text-dark mt-1 group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              {post.price && (
                <p className="text-primary font-bold mt-2">{post.price}</p>
              )}
              {post.date && (
                <p className="text-gray-400 text-xs mt-1">{post.date}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

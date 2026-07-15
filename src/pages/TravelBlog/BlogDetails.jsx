import { useParams, Link } from "react-router-dom";
import { blogDetails } from "../../data/blogDetails";
import { useData } from "../../context/DataContext";
import BackButton from "../../components/common/BackButton";
import ShareButtons from "../../components/common/ShareButtons";
import TravelTips from "../../components/common/TravelTips";
import RelatedPosts from "../../components/common/RelatedPosts";
import { FaUser, FaCalendar, FaClock } from "react-icons/fa";

export default function BlogDetails() {
  const { id } = useParams();
  const { blogs } = useData();
  const blog = blogDetails.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="bg-[#F8F5EF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-dark mb-4">Article Not Found</h1>
          <Link to="/travel-blog" className="text-primary font-semibold hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = blog.relatedIds
    .map((rid) => blogs.find((b) => b.id === rid))
    .filter(Boolean)
    .map((b) => ({
      id: b.id,
      title: b.title,
      image: b.image,
      category: b.category,
      date: b.date,
    }));

  return (
    <div className="bg-[#F8F5EF] min-h-screen">

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <BackButton label="Back to Blog" />
            <span className="inline-block bg-primary text-dark text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              {blog.category}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl text-white leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Meta */}
      <section className="max-w-4xl mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <FaUser className="text-primary" />
            {blog.author}
          </span>
          <span className="flex items-center gap-2">
            <FaCalendar className="text-primary" />
            {blog.date}
          </span>
          <span className="flex items-center gap-2">
            <FaClock className="text-primary" />
            {blog.readingTime}
          </span>
          <div className="ml-auto">
            <ShareButtons url={window.location.href} title={blog.title} />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Paragraphs */}
        <div className="prose prose-lg max-w-none">
          {blog.content.map((paragraph, i) => (
            <p key={i} className="text-gray-700 leading-8 text-lg mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Inline Image */}
        {blog.images[1] && (
          <div className="rounded-2xl overflow-hidden my-10">
            <img
              src={blog.images[1]}
              alt=""
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Quote */}
        {blog.quote && (
          <blockquote className="border-l-4 border-primary pl-6 py-4 bg-white rounded-r-xl my-10">
            <p className="text-xl text-dark italic leading-8 font-heading">
              &ldquo;{blog.quote.text}&rdquo;
            </p>
            <cite className="text-primary text-sm mt-3 block not-italic">
              — {blog.quote.author}
            </cite>
          </blockquote>
        )}

        {/* Second set of paragraphs */}
        {blog.content.length > 2 && (
          <div className="prose prose-lg max-w-none">
            {blog.content.slice(2).map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-8 text-lg mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Another Image */}
        {blog.images[2] && (
          <div className="rounded-2xl overflow-hidden my-10">
            <img
              src={blog.images[2]}
              alt=""
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Travel Tips */}
        {blog.travelTips && blog.travelTips.length > 0 && (
          <TravelTips tips={blog.travelTips} />
        )}

        {/* Share Bottom */}
        <div className="border-t border-gray-200 pt-6">
          <ShareButtons url={window.location.href} title={blog.title} />
        </div>

      </section>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <RelatedPosts posts={relatedArticles} type="blogs" />
      </section>

    </div>
  );
}

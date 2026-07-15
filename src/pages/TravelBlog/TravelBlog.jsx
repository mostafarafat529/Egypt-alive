import BlogCard from "./BlogCard";
import { useData } from "../../context/DataContext";
import { categories } from "../../data/blogs";
import img2 from "../../assets/images/1e61a4913591bae3f8557589ae623d549a515118.png";
import img3 from "../../assets/images/49d715a253a3f1916913fca267df3c611b4b3989.jpg";



export default function TravelBlog() {
  const { blogs } = useData();

  return (
    <div className="bg-[#F8F5EF]">

      {/* Hero */}

      <section className="relative h-[65vh] flex items-center justify-center">

        <img
          src={img2}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 text-center px-5">

          <p className="uppercase tracking-[4px] text-primary mb-4">
            Travel Journal
          </p>

          <h1 className="font-heading text-5xl md:text-6xl text-white">
            Stories From Egypt
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto mt-6 leading-8">
            Discover hidden destinations, timeless history, practical travel
            guides and unforgettable adventures across Egypt.
          </p>

          <button className="mt-10 bg-primary text-dark px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
            Explore Articles
          </button>

        </div>

      </section>

      {/* Featured */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <img
            src={img3}
            alt=""
            className="rounded-2xl shadow-xl h-[500px] object-cover w-full"
          />

          <div>

            <span className="uppercase tracking-[3px] text-primary text-sm">
              Featured Story
            </span>

            <h2 className="font-heading text-5xl text-dark mt-4 leading-tight">
              Discover Egypt Beyond The Pyramids
            </h2>

            <p className="text-gray-600 mt-6 leading-8">
              Egypt offers much more than ancient monuments. Explore hidden
              oases, colorful Nubian villages, crystal-clear beaches and
              unforgettable experiences that reveal another side of this
              incredible country.
            </p>

            <button className="mt-8 bg-primary text-dark px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
              Read Full Story
            </button>

          </div>

        </div>

      </section>

      {/* Latest Articles */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-primary">
            Latest Articles
          </p>

          <h2 className="font-heading text-4xl text-dark mt-4">
            Travel Inspiration
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              {...blog}
            />
          ))}

        </div>

      </section>

      {/* Categories */}

      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="font-heading text-4xl text-center text-dark mb-14">
            Browse By Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {categories.map((category) => (

              <div
                key={category.id}
                className="border border-primary text-primary-light rounded-xl py-10 text-center bg-[#F8F5EF] hover:bg-primary hover:text-dark transition duration-300 cursor-pointer"
              >

                <h3 className="font-heading text-2xl">
                  {category.name}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Newsletter */}

      <section className="py-24">

        <div className="max-w-3xl mx-auto text-center px-6">

          <p className="uppercase tracking-[3px] text-primary">
            Stay Inspired
          </p>

          <h2 className="font-heading text-4xl text-dark mt-4">
            Subscribe To Our Newsletter
          </h2>

          <p className="text-gray-600 mt-6 leading-8">
            Receive exclusive travel stories, destination guides and special
            offers directly in your inbox.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 rounded-full px-6 py-4 outline-none focus:border-primary"
            />

            <button className="bg-primary text-dark px-8 rounded-full font-semibold hover:scale-105 transition">
              Subscribe
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}

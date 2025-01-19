import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

interface Post {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

const posts: Post[] = [
  {
    title: "The Future of Solar Energy: Trends to Watch in 2024",
    excerpt:
      "Discover the latest innovations and developments shaping the solar industry this year.",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "Mar 15, 2024",
    author: "Dr. Sarah Johnson",
    category: "Industry Insights",
  },
  {
    title: "Maximizing Solar Panel Efficiency: Expert Tips",
    excerpt:
      "Learn how to get the most out of your solar installation with these professional recommendations.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "Mar 12, 2024",
    author: "James Wilson",
    category: "Tips & Guides",
  },
  {
    title: "Solar Energy Myths Debunked",
    excerpt:
      "Separating fact from fiction in the world of solar power and renewable energy.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "Mar 10, 2024",
    author: "Emily Chen",
    category: "Education",
  },
];

export default function Blog() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('../assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">
            Latest News
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Solar Energy Insights
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and developments in solar energy
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {post.date}
                  <span className="mx-2">•</span>
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center text-yellow-500 font-semibold group"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

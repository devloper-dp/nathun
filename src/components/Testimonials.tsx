import { Star, Quote, User, Building, MapPin, Sun, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';

interface VideoTestimonialProps {
  id: string;
  thumbnail: string;
  title: string;
  videoUrl: string;
  client: string;
  role: string;
  location: string;
  description: string;
  rating: number;
  savings: string;
  date: string;
  video: string;
}

interface VideoTestimonialComponentProps {
  video: VideoTestimonialProps;
  isPlaying: boolean;
  onPlay: (videoId: string) => void;
}

const videoTestimonials = [
  {
    id: "xyz123",
    title: "Our Solar Journey with Nathun Energies",
    client: "Rajesh Kumar",
    role: "Villa Owner",
    location: "Bhopal",
    thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
    date: "2024-03-01",
    rating: 5,
    savings: "₹12,000/month",
    description: "Switching to solar power was the best decision for our home. The installation was quick and professional.",
    video: "video1",
  },
  {
    id: "abc456",
    title: "Commercial Solar Success Story",
    client: "Priya Sharma",
    role: "Hotel Owner",
    location: "Indore",
    thumbnail: "https://images.unsplash.com/photo-1566093097221-ac2335b09e70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&mute=1",
    date: "2024-02-15",
    rating: 5,
    savings: "₹45,000/month",
    description: "The energy savings have been remarkable. Our hotel's operating costs have reduced significantly.",
    video: "video2",
  },
  {
    id: "def789",
    title: "Industrial Solar Transformation",
    client: "Amit Patel",
    role: "Factory Owner",
    location: "Gwalior",
    thumbnail: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/Y-Elr5K2Vuo?autoplay=1&mute=1",
    date: "2024-02-01",
    rating: 5,
    savings: "₹1,80,000/month",
    description: "The ROI has been exceptional. Our factory now runs primarily on solar power.",
    video: "video3",
  },
  {
    id: "ghi012",
    title: "Residential Solar Experience",
    client: "Meera Singh",
    role: "Homeowner",
    location: "Bhopal",
    thumbnail: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&mute=1",
    date: "2024-01-15",
    rating: 5,
    savings: "₹15,000/month",
    description: "From consultation to installation, the entire process was smooth and professional.",
    video: "video4",
  }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Villa Owner",
    location: "Bhopal",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    content: "The entire process from consultation to installation was seamless. Our electricity bills have reduced significantly, and the after-sales service is exceptional.",
    rating: 5,
    savings: "₹12,000/month",
    system: "5kW System"
  },
  {
    name: "Priya Sharma",
    role: "Hotel Owner",
    location: "Indore",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    content: "Nathun Energies helped us achieve our sustainability goals while significantly reducing our operational costs. Their expertise in commercial solar solutions is unmatched.",
    rating: 5,
    savings: "₹45,000/month",
    system: "15kW System"
  },
  {
    name: "Amit Patel",
    role: "Factory Owner",
    location: "Gwalior",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    content: "The industrial solar solution provided by Nathun Energies has transformed our manufacturing facility. The energy savings have exceeded our expectations.",
    rating: 5,
    savings: "₹1,80,000/month",
    system: "50kW System"
  }
];

function VideoTestimonial({
  video,
  isPlaying,
  onPlay,
}: VideoTestimonialComponentProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = () => {
    if (iframeRef.current) {
      onPlay(video.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden">
        {!isPlaying && (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0' : 'bg-black/50'
          }`}
        >
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white p-4 rounded-full hover:bg-yellow-600 transition-colors group-hover:scale-110"
            >
              <Play className="h-6 w-6" />
            </button>
          )}
        </div>

        {isPlaying && (
          <iframe
            ref={iframeRef}
            src={video.videoUrl}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      <div className="mt-4 space-y-2">
        <h4 className="text-lg font-semibold text-white group-hover:text-yellow-500 transition-colors">
          {video.title}
        </h4>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <User /> {video.client} - <Building /> {video.role}
          <MapPin /> {video.location}
          <Sun /> {/* Decorative icon */}
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(video.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <span className="text-green-500 font-semibold">{video.savings}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handleVideoPlay = (videoId: string) => {
    setActiveVideoId(videoId);
  };

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('../assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their energy consumption
          </p>
        </motion.div>

        {/* Video Testimonials */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {videoTestimonials.map((video) => (
            <VideoTestimonial
              key={video.id}
              video={video}
              isPlaying={activeVideoId === video.id}
              onPlay={handleVideoPlay}
            />
          ))}
        </div>

        {/* Written Testimonials */}
        <div ref={ref} className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-white" />
                </div>

                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-yellow-500"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400">{testimonial.role}</p>
                    <p className="text-sm text-yellow-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                <p className="mt-4 text-gray-300">{testimonial.content}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Monthly Savings</p>
                    <p className="text-lg font-semibold text-white">
                      {testimonial.savings}
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Installation</p>
                    <p className="text-lg font-semibold text-white">
                      {testimonial.system}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-2xl font-semibold text-white">
            Join <span className="text-yellow-500">1,000+</span> satisfied customers
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
          >
            View More Reviews
            <Star className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

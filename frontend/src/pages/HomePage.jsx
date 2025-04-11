import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { Link } from "react-router-dom";
import { HeartHandshake, Globe, Users, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: activeNGOs } = useQuery({
    queryKey: ["activeNGOs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/ngos/featured");
      return res.data;
    },
  });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  // Trending hashtags/campaigns
  const trendingItems = [
    { id: 1, name: "#ClimateActionNow", posts: 1250 },
    { id: 2, name: "#EducationForAll", posts: 980 },
    { id: 3, name: "#EndPoverty", posts: 870 },
    { id: 4, name: "#CleanWater", posts: 650 },
    { id: 5, name: "#GenderEquality", posts: 520 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content - takes full width on mobile, 3/4 on desktop */}
          <div className="w-full lg:w-3/4">
            {/* Welcome Banner */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 rounded-xl"
            >
              <div className="text-center px-4">
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold mb-4"
                >
                  Welcome to Sampark NGO
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-xl md:text-2xl mb-8"
                >
                  Connecting Compassion with Action
                </motion.p>
                <motion.div 
                  variants={containerVariants}
                  className="flex gap-4 justify-center"
                >
                  {!authUser ? (
                    <>
                      <motion.div variants={itemVariants}>
                        <Link 
                          to="/signup" 
                          className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                        >
                          Join Our Community
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Link 
                          to="/about" 
                          className="border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition"
                        >
                          Learn More
                        </Link>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div variants={itemVariants}>
                      <Link 
                        to="/feed" 
                        className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition flex items-center gap-2"
                      >
                        Explore Causes <ArrowRight size={18} />
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Mission Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="py-16"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
                  <HeartHandshake size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Sampark NGO bridges the gap between passionate individuals and impactful NGOs. 
                  We empower communities by facilitating connections, resources, and awareness 
                  to create sustainable social change.
                </p>
              </motion.div>

              <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3 inline-flex mb-4">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Connect</h3>
                  <p className="text-gray-600">
                    Bring together NGOs, volunteers, and donors on a single platform to maximize impact.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3 inline-flex mb-4">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Empower</h3>
                  <p className="text-gray-600">
                    Provide tools and resources to help NGOs grow and individuals contribute effectively.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3 inline-flex mb-4">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Amplify</h3>
                  <p className="text-gray-600">
                    Increase visibility for important causes and measure real-world impact.
                  </p>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Active NGOs Section */}
            {activeNGOs && activeNGOs.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-blue-50 py-16 rounded-xl mb-6"
              >
                <div className="px-4">
                  <h2 className="text-3xl font-bold mb-12 text-center">Featured NGOs</h2>
                  <motion.div 
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {activeNGOs.slice(0, 6).map((ngo) => (
                      <motion.div 
                        key={ngo._id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                      >
                        <div className="h-40 bg-blue-100 flex items-center justify-center">
                          {ngo.logo ? (
                            <img src={ngo.logo} alt={ngo.name} className="h-24 object-contain" />
                          ) : (
                            <Users size={48} className="text-blue-500" />
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{ngo.name}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{ngo.description}</p>
                          <Link 
                            to={`/ngo/${ngo._id}`} 
                            className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                          >
                            Learn more <ArrowRight size={16} />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                  >
                    <Link 
                      to="/ngos" 
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition"
                    >
                      Browse All NGOs <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* CTA Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl p-8 md:p-12 text-white">
                <div className="md:flex items-center justify-between">
                  <motion.div 
                    variants={itemVariants}
                    className="mb-6 md:mb-0 md:max-w-lg"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to make a difference?</h2>
                    <p className="text-blue-100">
                      Whether you want to join a cause, start fundraising, or volunteer your skills, 
                      Sampark makes it easy to take action.
                    </p>
                  </motion.div>
                  <motion.div 
                    variants={containerVariants}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <motion.div variants={itemVariants}>
                      <Link 
                        to={authUser ? "/create-campaign" : "/signup"} 
                        className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-center hover:bg-gray-100 transition block"
                      >
                        Start Fundraising
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link 
                        to="/causes" 
                        className="border-2 border-white px-6 py-3 rounded-full font-bold text-center hover:bg-white hover:bg-opacity-10 transition block"
                      >
                        Join a Cause
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Sidebar - takes 1/4 width on desktop, hidden on mobile */}
          {(recommendedUsers?.length > 0 || trendingItems.length > 0) && (
            <div className="w-full lg:w-1/4 hidden lg:block space-y-4">
              {/* Trending Box */}
              <div className="bg-white rounded-lg shadow p-4 sticky top-4">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp size={20} />
                  Trending Now
                </h2>
                <div className="space-y-3">
                  {trendingItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <Link 
                        to={`/search?q=${encodeURIComponent(item.name)}`} 
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span className="text-xs text-gray-500">{item.posts} posts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users, TrendingUp } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";

const FeedPage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  // Dummy trending hashtags/campaigns for NGOs
  const trendingItems = [
    { id: 1, name: "#ClimateActionNow", posts: 1250 },
    { id: 2, name: "#EducationForAll", posts: 980 },
    { id: 3, name: "#EndPoverty", posts: 870 },
    { id: 4, name: "#CleanWater", posts: 650 },
    { id: 5, name: "#GenderEquality", posts: 520 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />

        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}

        {posts?.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">No Posts Yet</h2>
            <p className="text-gray-600 mb-6">
              Connect with others to start seeing posts in your feed!
            </p>
          </div>
        )}
      </div>

      {(recommendedUsers?.length > 0 || trendingItems.length > 0) && (
        <div className="col-span-1 lg:col-span-1 hidden lg:block space-y-4">
          <div className="bg-secondary rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Trending Now
            </h2>
            <div className="space-y-3">
              {trendingItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <a href="#" className="text-blue-500 hover:underline">
                    {item.name}
                  </a>
                  <span className="text-xs text-gray-500">{item.posts} posts</span>
                </div>
              ))}
            </div>
          </div>

          {recommendedUsers?.length > 0 && (
            <div className="bg-secondary rounded-lg shadow p-4">
              <h2 className="font-semibold mb-4">People you may know</h2>
              {recommendedUsers?.map((user) => (
                <RecommendedUser key={user._id} user={user} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
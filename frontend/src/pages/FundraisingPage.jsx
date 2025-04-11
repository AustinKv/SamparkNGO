import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { HeartHandshake, TrendingUp } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";

const FundraisingPage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  // Dummy fundraising campaigns data
  const campaigns = [
    {
      id: 1,
      name: "Clean Water for Villages",
      ngo: "WaterAid Foundation",
      image: "https://source.unsplash.com/random/600x400/?water,well",
      goal: 50000,
      raised: 32500,
      description: "Help us provide clean drinking water to 10 remote villages in Africa."
    },
    {
      id: 2,
      name: "Education for Underprivileged",
      ngo: "Teach For All",
      image: "https://source.unsplash.com/random/600x400/?school,children",
      goal: 75000,
      raised: 42000,
      description: "Sponsor education for 100 children from low-income families."
    },
    {
      id: 3,
      name: "Disaster Relief Fund",
      ngo: "Red Cross Society",
      image: "https://source.unsplash.com/random/600x400/?disaster,relief",
      goal: 100000,
      raised: 58700,
      description: "Emergency funds for recent earthquake victims."
    },
    {
      id: 4,
      name: "Animal Shelter Renovation",
      ngo: "Paws & Care",
      image: "https://source.unsplash.com/random/600x400/?animals,shelter",
      goal: 30000,
      raised: 12500,
      description: "Help us rebuild our shelter to accommodate more rescued animals."
    },
  ];

  // Dummy trending campaigns
  const trendingItems = [
    { id: 1, name: "#ClimateActionNow", posts: 1250 },
    { id: 2, name: "#EducationForAll", posts: 980 },
    { id: 3, name: "#EndPoverty", posts: 870 },
    { id: 4, name: "#CleanWater", posts: 650 },
    { id: 5, name: "#GenderEquality", posts: 520 },
  ];

  const handleDonate = (campaignId) => {
    // This would be replaced with actual donation logic
    alert(`Donation initiated for campaign ${campaignId}`);
    // In a real app, this would open a payment modal or redirect to payment page
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <HeartHandshake className="text-red-500" />
            Active Fundraising Campaigns
          </h1>
          <p className="text-gray-600 mt-2">
            Support these causes and make a difference today
          </p>
        </div>

        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img 
                src={campaign.image} 
                alt={campaign.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{campaign.name}</h2>
                    <p className="text-gray-600">by {campaign.ngo}</p>
                  </div>
                  <button 
                    onClick={() => handleDonate(campaign.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Donate
                  </button>
                </div>
                
                <p className="text-gray-700 mb-4">{campaign.description}</p>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Raised: ₹{campaign.raised.toLocaleString()}</span>
                    <span className="text-gray-600">Goal: ₹{campaign.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-red-500 h-2.5 rounded-full" 
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((campaign.raised / campaign.goal) * 100)}% of goal reached
                </div>
              </div>
            </div>
          ))}

          {campaigns.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="mb-6">
                <HeartHandshake size={64} className="mx-auto text-red-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">No Active Campaigns</h2>
              <p className="text-gray-600 mb-6">
                Check back later for fundraising opportunities!
              </p>
            </div>
          )}
        </div>
      </div>

      {(recommendedUsers?.length > 0 || trendingItems.length > 0) && (
        <div className="col-span-1 lg:col-span-1 hidden lg:block space-y-4">
          <div className="bg-secondary rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Trending Campaigns
            </h2>
            <div className="space-y-3">
              {trendingItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <a href="#" className="text-blue-500 hover:underline">
                    {item.name}
                  </a>
                  <span className="text-xs text-gray-500">{item.donations} donations</span>
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

export default FundraisingPage;
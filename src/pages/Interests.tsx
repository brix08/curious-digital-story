
import { useState, useEffect } from "react";
import { Heart, Edit, Save, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Interest {
  id: string;
  title: string;
  category: string;
  description: string;
  level: string;
}

const Interests = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [interests, setInterests] = useState<Interest[]>([
    {
      id: "1",
      title: "Photography",
      category: "Creative",
      description: "Capturing moments and telling stories through lens. I enjoy landscape and street photography during my travels.",
      level: "Intermediate"
    },
    {
      id: "2",
      title: "Rock Climbing",
      category: "Sports",
      description: "Indoor and outdoor climbing. Love the mental and physical challenge it provides.",
      level: "Advanced"
    },
    {
      id: "3",
      title: "Cooking",
      category: "Lifestyle",
      description: "Experimenting with different cuisines and techniques. Italian and Asian cuisines are my specialties.",
      level: "Intermediate"
    },
    {
      id: "4",
      title: "Reading",
      category: "Educational",
      description: "Science fiction, technical books, and biographies. Currently exploring books on AI and machine learning.",
      level: "Advanced"
    },
    {
      id: "5",
      title: "Gaming",
      category: "Entertainment",
      description: "Strategy games and indie titles. Enjoy analyzing game mechanics and design patterns.",
      level: "Advanced"
    },
    {
      id: "6",
      title: "Gardening",
      category: "Lifestyle",
      description: "Growing herbs and vegetables. Finding peace in nurturing plants and connecting with nature.",
      level: "Beginner"
    }
  ]);
  const [editInterests, setEditInterests] = useState<Interest[]>(interests);
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('interestsData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setInterests(parsed);
      setEditInterests(parsed);
    }
  }, []);

  const handleSave = () => {
    setInterests(editInterests);
    localStorage.setItem('interestsData', JSON.stringify(editInterests));
    setIsEditing(false);
    toast({
      title: "Success!",
      description: "Interests updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditInterests(interests);
    setIsEditing(false);
  };

  const addInterest = () => {
    const newInterest: Interest = {
      id: Date.now().toString(),
      title: "",
      category: "",
      description: "",
      level: "Beginner"
    };
    setEditInterests([...editInterests, newInterest]);
  };

  const updateInterest = (id: string, field: keyof Interest, value: string) => {
    setEditInterests(editInterests.map(interest => 
      interest.id === id ? { ...interest, [field]: value } : interest
    ));
  };

  const removeInterest = (id: string) => {
    setEditInterests(editInterests.filter(interest => interest.id !== id));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Creative': 'from-purple-500 to-pink-600',
      'Sports': 'from-green-500 to-emerald-600',
      'Lifestyle': 'from-blue-500 to-cyan-600',
      'Educational': 'from-orange-500 to-red-600',
      'Entertainment': 'from-indigo-500 to-purple-600',
      'Technology': 'from-gray-500 to-slate-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Beginner': 'text-green-400',
      'Intermediate': 'text-yellow-400',
      'Advanced': 'text-red-400',
      'Expert': 'text-purple-400'
    };
    return colors[level as keyof typeof colors] || 'text-gray-400';
  };

  const categories = Array.from(new Set(interests.map(i => i.category))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Heart size={32} className="text-gray-700" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Personal Interests
            </h1>
            <p className="text-xl text-gray-300">
              What drives and inspires me beyond work
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl text-white">My Interests & Hobbies</CardTitle>
              <div className="flex gap-2">
                {isEditing && (
                  <Button
                    onClick={addInterest}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Interest
                  </Button>
                )}
                <Button
                  onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div>
                  {/* Category Overview */}
                  {categories.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                      <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                          <span
                            key={category}
                            className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(category)} text-white rounded-full text-sm font-medium`}
                          >
                            {category} ({interests.filter(i => i.category === category).length})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interests Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interests.map((interest) => (
                      <div key={interest.id} className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div className="text-center mb-4">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${getCategoryColor(interest.category)} flex items-center justify-center`}>
                            <Heart size={24} className="text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{interest.title}</h3>
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-pink-400 font-medium text-sm">{interest.category}</span>
                            <span className="text-gray-400">•</span>
                            <span className={`font-medium text-sm ${getLevelColor(interest.level)}`}>
                              {interest.level}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-center">{interest.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {editInterests.map((interest, index) => (
                    <div key={interest.id} className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">
                          {interest.title || `Interest ${index + 1}`}
                        </h3>
                        <Button
                          onClick={() => removeInterest(interest.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Title</Label>
                          <Input
                            value={interest.title}
                            onChange={(e) => updateInterest(interest.id, 'title', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="Interest or hobby name"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Category</Label>
                          <Input
                            value={interest.category}
                            onChange={(e) => updateInterest(interest.id, 'category', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="e.g., Creative, Sports, Lifestyle"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-white">Skill Level</Label>
                          <select
                            value={interest.level}
                            onChange={(e) => updateInterest(interest.id, 'level', e.target.value)}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          >
                            <option value="Beginner" className="bg-gray-800">Beginner</option>
                            <option value="Intermediate" className="bg-gray-800">Intermediate</option>
                            <option value="Advanced" className="bg-gray-800">Advanced</option>
                            <option value="Expert" className="bg-gray-800">Expert</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">Description</Label>
                        <Textarea
                          value={interest.description}
                          onChange={(e) => updateInterest(interest.id, 'description', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="Describe your interest and what you enjoy about it..."
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex gap-4">
                    <Button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Interests;

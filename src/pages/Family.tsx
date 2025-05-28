
import { useState, useEffect } from "react";
import { Users, Edit, Save, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: string;
  occupation: string;
  description: string;
}

const Family = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [familyStory, setFamilyStory] = useState("Growing up in a close-knit family has shaped who I am today. Our family values include hard work, education, and supporting one another through life's challenges. We believe in celebrating each other's achievements and learning from our experiences together.");
  const [editStory, setEditStory] = useState(familyStory);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Robert Doe",
      relationship: "Father",
      age: "58",
      occupation: "Engineer",
      description: "A dedicated engineer who taught me the value of precision and problem-solving."
    },
    {
      id: "2",
      name: "Maria Doe",
      relationship: "Mother",
      age: "55",
      occupation: "Teacher",
      description: "An inspiring educator who instilled in me a love for learning and helping others."
    },
    {
      id: "3",
      name: "Sarah Doe",
      relationship: "Sister",
      age: "25",
      occupation: "Designer",
      description: "My creative sister who always sees the world from a unique perspective."
    }
  ]);
  const [editMembers, setEditMembers] = useState<FamilyMember[]>(familyMembers);
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('familyData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFamilyStory(parsed.story || familyStory);
      setFamilyMembers(parsed.members || familyMembers);
      setEditStory(parsed.story || familyStory);
      setEditMembers(parsed.members || familyMembers);
    }
  }, []);

  const handleSave = () => {
    setFamilyStory(editStory);
    setFamilyMembers(editMembers);
    localStorage.setItem('familyData', JSON.stringify({
      story: editStory,
      members: editMembers
    }));
    setIsEditing(false);
    toast({
      title: "Success!",
      description: "Family information updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditStory(familyStory);
    setEditMembers(familyMembers);
    setIsEditing(false);
  };

  const addMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: "",
      relationship: "",
      age: "",
      occupation: "",
      description: ""
    };
    setEditMembers([...editMembers, newMember]);
  };

  const updateMember = (id: string, field: keyof FamilyMember, value: string) => {
    setEditMembers(editMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const removeMember = (id: string) => {
    setEditMembers(editMembers.filter(member => member.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-teal-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Users size={32} className="text-gray-700" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Family Background
            </h1>
            <p className="text-xl text-gray-300">
              The people who shaped my journey
            </p>
          </div>

          {/* Family Story */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl text-white">Our Family Story</CardTitle>
              <Button
                onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <p className="text-gray-300 leading-relaxed text-lg">{familyStory}</p>
              ) : (
                <Textarea
                  value={editStory}
                  onChange={(e) => setEditStory(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                  placeholder="Share your family story..."
                />
              )}
            </CardContent>
          </Card>

          {/* Family Members */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl text-white">Family Members</CardTitle>
              {isEditing && (
                <Button
                  onClick={addMember}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                          <Users size={24} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-green-400 font-medium">{member.relationship}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300">
                          <span className="text-gray-400">Age:</span> {member.age}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-gray-400">Occupation:</span> {member.occupation}
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-3">{member.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {editMembers.map((member, index) => (
                    <div key={member.id} className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">
                          {member.name || `Family Member ${index + 1}`}
                        </h3>
                        <Button
                          onClick={() => removeMember(member.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Name</Label>
                          <Input
                            value={member.name}
                            onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Relationship</Label>
                          <Input
                            value={member.relationship}
                            onChange={(e) => updateMember(member.id, 'relationship', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="e.g., Father, Mother, Sister"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Age</Label>
                          <Input
                            value={member.age}
                            onChange={(e) => updateMember(member.id, 'age', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="Age"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Occupation</Label>
                          <Input
                            value={member.occupation}
                            onChange={(e) => updateMember(member.id, 'occupation', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="Job title or profession"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">Description</Label>
                        <Textarea
                          value={member.description}
                          onChange={(e) => updateMember(member.id, 'description', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="Tell us about this family member..."
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

export default Family;

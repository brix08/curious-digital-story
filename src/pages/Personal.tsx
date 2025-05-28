
import { useState, useEffect } from "react";
import { User, Edit, Save, X, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  bio: string;
  skills: string[];
}

const Personal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Brix Pasilan",
    email: "pasilanbrixjustin08@gmail.com",
    phone: "+63 9659033687",
    location: "Kauswagan, CDOC",
    birthDate: "March 08, 2003",
    bio: "I love cooking",
    skills: ["JavaScript", "React", "Node.js", "Python", "TypeScript", "AWS"]
  });
  const [editForm, setEditForm] = useState<PersonalInfo>(personalInfo);
  const [newSkill, setNewSkill] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedInfo = localStorage.getItem('personalInfo');
    if (savedInfo) {
      const parsed = JSON.parse(savedInfo);
      setPersonalInfo(parsed);
      setEditForm(parsed);
    }
  }, []);

  const handleSave = () => {
    setPersonalInfo(editForm);
    localStorage.setItem('personalInfo', JSON.stringify(editForm));
    setIsEditing(false);
    toast({
      title: "Success!",
      description: "Personal information updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditForm(personalInfo);
    setIsEditing(false);
    setNewSkill("");
  };

  const addSkill = () => {
    if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
      setEditForm({
        ...editForm,
        skills: [...editForm.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <User size={32} className="text-gray-700" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Personal Information
            </h1>
            <p className="text-xl text-gray-300">
              Get to know me better
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl text-white">About Me</CardTitle>
              <Button
                onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-8">
              {!isEditing ? (
                // Display Mode
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                      <User className="text-blue-400" size={24} />
                      <div>
                        <p className="text-gray-400 text-sm">Full Name</p>
                        <p className="text-white font-semibold">{personalInfo.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                      <Mail className="text-green-400" size={24} />
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white font-semibold">{personalInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                      <Phone className="text-purple-400" size={24} />
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white font-semibold">{personalInfo.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                      <MapPin className="text-red-400" size={24} />
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white font-semibold">{personalInfo.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg md:col-span-2">
                      <Calendar className="text-orange-400" size={24} />
                      <div>
                        <p className="text-gray-400 text-sm">Birth Date</p>
                        <p className="text-white font-semibold">{personalInfo.birthDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <h3 className="text-white font-semibold mb-3">Bio</h3>
                    <p className="text-gray-300 leading-relaxed">{personalInfo.bio}</p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <h3 className="text-white font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {personalInfo.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // Edit Mode
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone</Label>
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-white">Location</Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="birthDate" className="text-white">Birth Date</Label>
                      <Input
                        id="birthDate"
                        value={editForm.birthDate}
                        onChange={(e) => setEditForm({...editForm, birthDate: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-white">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <Label className="text-white">Skills</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {editForm.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer hover:opacity-80"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill}
                          <X size={14} />
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        Add
                      </Button>
                    </div>
                  </div>

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

export default Personal;

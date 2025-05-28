
import { useState, useEffect } from "react";
import { Briefcase, Edit, Save, X, Plus, Trash2, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

const Experience = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: "Lead development of scalable web applications using React, Node.js, and AWS. Collaborate with cross-functional teams to deliver high-quality software solutions.",
      achievements: [
        "Reduced application load time by 40% through optimization",
        "Led a team of 5 developers on a major product launch",
        "Implemented CI/CD pipeline improving deployment efficiency by 60%"
      ]
    },
    {
      id: "2",
      company: "Digital Innovations LLC",
      position: "Frontend Developer",
      location: "Remote",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
      description: "Developed responsive web applications and mobile interfaces. Worked closely with UX/UI designers to create engaging user experiences.",
      achievements: [
        "Built 15+ responsive web applications",
        "Improved user engagement by 35% through UI/UX enhancements",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      id: "3",
      company: "StartupXYZ",
      position: "Junior Developer",
      location: "New York, NY",
      startDate: "2019-03",
      endDate: "2020-05",
      current: false,
      description: "Contributed to early-stage product development in a fast-paced startup environment. Gained experience in full-stack development and agile methodologies.",
      achievements: [
        "Contributed to MVP development from scratch",
        "Learned multiple programming languages and frameworks",
        "Participated in daily standups and sprint planning"
      ]
    }
  ]);
  const [editExperiences, setEditExperiences] = useState<Experience[]>(experiences);
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('experienceData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setExperiences(parsed);
      setEditExperiences(parsed);
    }
  }, []);

  const handleSave = () => {
    setExperiences(editExperiences);
    localStorage.setItem('experienceData', JSON.stringify(editExperiences));
    setIsEditing(false);
    toast({
      title: "Success!",
      description: "Work experience updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditExperiences(experiences);
    setIsEditing(false);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: []
    };
    setEditExperiences([newExp, ...editExperiences]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setEditExperiences(editExperiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setEditExperiences(editExperiences.filter(exp => exp.id !== id));
  };

  const addAchievement = (expId: string) => {
    setEditExperiences(editExperiences.map(exp => 
      exp.id === expId ? { ...exp, achievements: [...exp.achievements, ""] } : exp
    ));
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    setEditExperiences(editExperiences.map(exp => 
      exp.id === expId ? {
        ...exp,
        achievements: exp.achievements.map((ach, i) => i === index ? value : ach)
      } : exp
    ));
  };

  const removeAchievement = (expId: string, index: number) => {
    setEditExperiences(editExperiences.map(exp => 
      exp.id === expId ? {
        ...exp,
        achievements: exp.achievements.filter((_, i) => i !== index)
      } : exp
    ));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-red-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Briefcase size={32} className="text-gray-700" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Work Experience
            </h1>
            <p className="text-xl text-gray-300">
              My professional journey and achievements
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl text-white">Professional Experience</CardTitle>
              <div className="flex gap-2">
                {isEditing && (
                  <Button
                    onClick={addExperience}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
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
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      {/* Timeline line */}
                      {index < experiences.length - 1 && (
                        <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-orange-500 to-red-600 opacity-30"></div>
                      )}
                      
                      <div className="flex items-start space-x-6">
                        {/* Timeline dot */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                          <Briefcase size={24} className="text-white" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                              <p className="text-orange-400 font-semibold text-lg">{exp.company}</p>
                            </div>
                            <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                              <div className="flex items-center text-gray-300 text-sm mb-1">
                                <Calendar size={16} className="mr-2" />
                                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                              </div>
                              <div className="flex items-center text-gray-300 text-sm">
                                <MapPin size={16} className="mr-2" />
                                {exp.location}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 leading-relaxed mb-4">{exp.description}</p>
                          
                          {exp.achievements.length > 0 && (
                            <div>
                              <h4 className="text-white font-semibold mb-2">Key Achievements:</h4>
                              <ul className="space-y-1">
                                {exp.achievements.map((achievement, achIndex) => (
                                  <li key={achIndex} className="text-gray-300 flex items-start">
                                    <span className="text-orange-400 mr-2">•</span>
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {editExperiences.map((exp, index) => (
                    <div key={exp.id} className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">
                          {exp.company || `Experience ${index + 1}`}
                        </h3>
                        <Button
                          onClick={() => removeExperience(exp.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="Company name"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="Job title"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Location</Label>
                          <Input
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="City, State/Country"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            className="rounded"
                          />
                          <Label className="text-white">Currently working here</Label>
                        </div>
                        <div>
                          <Label className="text-white">Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        {!exp.current && (
                          <div>
                            <Label className="text-white">End Date</Label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <Label className="text-white">Description</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="Describe your role and responsibilities..."
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <Label className="text-white">Achievements</Label>
                          <Button
                            onClick={() => addAchievement(exp.id)}
                            variant="outline"
                            size="sm"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex gap-2">
                              <Input
                                value={achievement}
                                onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                placeholder="Describe an achievement..."
                              />
                              <Button
                                onClick={() => removeAchievement(exp.id, achIndex)}
                                variant="outline"
                                size="sm"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
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

export default Experience;

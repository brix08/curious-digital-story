
import { useState, useEffect } from "react";
import { Code, Edit, Save, X, Plus, Trash2, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  progress: number;
  challenges: string;
  goals: string;
}

const Projects = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "AI-Powered Task Manager",
      description: "A smart task management application that uses machine learning to predict task completion times and optimize scheduling. Features include natural language processing for task creation and intelligent priority suggestions.",
      status: "In Progress",
      startDate: "2024-01",
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB", "TypeScript"],
      githubUrl: "https://github.com/username/ai-task-manager",
      liveUrl: "",
      progress: 75,
      challenges: "Implementing the ML model for accurate time prediction has been challenging due to the need for sufficient training data.",
      goals: "Complete the MVP by end of quarter and implement advanced analytics dashboard."
    },
    {
      id: "2",
      title: "Sustainable Living App",
      description: "Mobile application to help users track their carbon footprint and discover eco-friendly alternatives. Includes gamification elements to encourage sustainable habits.",
      status: "Planning",
      startDate: "2024-03",
      technologies: ["React Native", "Firebase", "Node.js", "Chart.js"],
      githubUrl: "",
      liveUrl: "",
      progress: 25,
      challenges: "Research phase is ongoing to ensure accurate carbon footprint calculations and sourcing reliable environmental data.",
      goals: "Launch beta version for testing with environmental groups and refine based on feedback."
    },
    {
      id: "3",
      title: "Portfolio Analytics Dashboard",
      description: "A comprehensive dashboard for tracking portfolio performance across different asset classes. Features real-time data integration and advanced charting capabilities.",
      status: "Completed",
      startDate: "2023-09",
      technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "D3.js"],
      githubUrl: "https://github.com/username/portfolio-dashboard",
      liveUrl: "https://portfolio-analytics.demo.com",
      progress: 100,
      challenges: "Integrating multiple financial data APIs and ensuring data accuracy was complex.",
      goals: "Successfully deployed and being used by 50+ active users. Planning v2 with additional features."
    }
  ]);
  const [editProjects, setEditProjects] = useState<Project[]>(projects);
  const [newTech, setNewTech] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('projectsData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setProjects(parsed);
      setEditProjects(parsed);
    }
  }, []);

  const handleSave = () => {
    setProjects(editProjects);
    localStorage.setItem('projectsData', JSON.stringify(editProjects));
    setIsEditing(false);
    setNewTech({});
    toast({
      title: "Success!",
      description: "Projects updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditProjects(projects);
    setIsEditing(false);
    setNewTech({});
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      status: "Planning",
      startDate: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      progress: 0,
      challenges: "",
      goals: ""
    };
    setEditProjects([...editProjects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setEditProjects(editProjects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    setEditProjects(editProjects.filter(project => project.id !== id));
  };

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (tech) {
      setEditProjects(editProjects.map(project => 
        project.id === projectId ? {
          ...project,
          technologies: [...project.technologies, tech]
        } : project
      ));
      setNewTech({ ...newTech, [projectId]: "" });
    }
  };

  const removeTechnology = (projectId: string, techToRemove: string) => {
    setEditProjects(editProjects.map(project => 
      project.id === projectId ? {
        ...project,
        technologies: project.technologies.filter(tech => tech !== techToRemove)
      } : project
    ));
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Planning': 'from-yellow-500 to-orange-600',
      'In Progress': 'from-blue-500 to-indigo-600',
      'Completed': 'from-green-500 to-emerald-600',
      'On Hold': 'from-gray-500 to-slate-600'
    };
    return colors[status as keyof typeof colors] || 'from-gray-500 to-gray-600';
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
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Code size={32} className="text-gray-700" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Current Projects
            </h1>
            <p className="text-xl text-gray-300">
              What I'm working on and building
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl text-white">Active Projects</CardTitle>
              <div className="flex gap-2">
                {isEditing && (
                  <Button
                    onClick={addProject}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              <span>Started {formatDate(project.startDate)}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(project.status)} text-white rounded-full text-sm font-medium`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-300">Progress</span>
                          <span className="text-sm text-white font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-4">{project.description}</p>

                      {/* Technologies */}
                      <div className="mb-4">
                        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                          <Tag size={16} />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-indigo-600/30 text-indigo-300 rounded text-sm border border-indigo-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Challenges & Goals */}
                      {project.challenges && (
                        <div className="mb-4">
                          <h4 className="text-white font-medium mb-2">Current Challenges</h4>
                          <p className="text-gray-300 text-sm">{project.challenges}</p>
                        </div>
                      )}

                      {project.goals && (
                        <div className="mb-4">
                          <h4 className="text-white font-medium mb-2">Goals</h4>
                          <p className="text-gray-300 text-sm">{project.goals}</p>
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex gap-3 mt-4">
                        {project.githubUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10"
                            onClick={() => window.open(project.githubUrl, '_blank')}
                          >
                            <Github size={16} className="mr-2" />
                            Code
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10"
                            onClick={() => window.open(project.liveUrl, '_blank')}
                          >
                            <ExternalLink size={16} className="mr-2" />
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {editProjects.map((project, index) => (
                    <div key={project.id} className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">
                          {project.title || `Project ${index + 1}`}
                        </h3>
                        <Button
                          onClick={() => removeProject(project.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Project Title</Label>
                          <Input
                            value={project.title}
                            onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="Project name"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Status</Label>
                          <select
                            value={project.status}
                            onChange={(e) => updateProject(project.id, 'status', e.target.value)}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="Planning" className="bg-gray-800">Planning</option>
                            <option value="In Progress" className="bg-gray-800">In Progress</option>
                            <option value="Completed" className="bg-gray-800">Completed</option>
                            <option value="On Hold" className="bg-gray-800">On Hold</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-white">Start Date</Label>
                          <Input
                            type="month"
                            value={project.startDate}
                            onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Progress (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={project.progress}
                            onChange={(e) => updateProject(project.id, 'progress', parseInt(e.target.value) || 0)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">GitHub URL</Label>
                          <Input
                            value={project.githubUrl}
                            onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div>
                          <Label className="text-white">Live URL</Label>
                          <Input
                            value={project.liveUrl}
                            onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="https://..."
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label className="text-white">Description</Label>
                        <Textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="Describe your project..."
                        />
                      </div>

                      <div className="mb-4">
                        <Label className="text-white">Technologies</Label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-indigo-600/30 text-indigo-300 rounded text-sm border border-indigo-500/30 flex items-center gap-2 cursor-pointer hover:opacity-80"
                              onClick={() => removeTechnology(project.id, tech)}
                            >
                              {tech}
                              <X size={14} />
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={newTech[project.id] || ""}
                            onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                            placeholder="Add technology..."
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            onKeyPress={(e) => e.key === 'Enter' && addTechnology(project.id)}
                          />
                          <Button
                            onClick={() => addTechnology(project.id)}
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            Add
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">Current Challenges</Label>
                          <Textarea
                            value={project.challenges}
                            onChange={(e) => updateProject(project.id, 'challenges', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="What challenges are you facing?"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Goals</Label>
                          <Textarea
                            value={project.goals}
                            onChange={(e) => updateProject(project.id, 'goals', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="What are your goals for this project?"
                          />
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

export default Projects;

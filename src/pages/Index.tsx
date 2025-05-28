
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Briefcase, Users, Heart, Code, ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { 
      icon: User, 
      title: "Personal Information", 
      description: "Get to know me better",
      path: "/personal",
      color: "from-gray-600 to-gray-800"
    },
    { 
      icon: Users, 
      title: "Family Background", 
      description: "My roots and family story",
      path: "/family",
      color: "from-gray-500 to-gray-700"
    },
    { 
      icon: Briefcase, 
      title: "Work Experience", 
      description: "Professional journey and achievements",
      path: "/experience",
      color: "from-gray-700 to-gray-900"
    },
    { 
      icon: Heart, 
      title: "Personal Interests", 
      description: "What drives and inspires me",
      path: "/interests",
      color: "from-gray-600 to-gray-800"
    },
    { 
      icon: Code, 
      title: "Current Projects", 
      description: "What I'm working on now",
      path: "/projects",
      color: "from-gray-500 to-gray-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-sm"></div>
        
        <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <User size={48} className="text-gray-700" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              My
              <span className="block bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover my journey, experiences, and passions through an interactive showcase
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              <Github className="mr-2" size={20} />
              
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              <Linkedin className="mr-2" size={20} />
              Facebook
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              <Mail className="mr-2" size={20} />
              Contact
            </Button>
          </div>

          <div className="animate-bounce">
            <ChevronDown size={32} className="text-white/60 mx-auto" />
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gray-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-700/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Portfolio Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Explore My Portfolio
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Navigate through different aspects of my life and career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link key={section.path} to={section.path} className="group">
                  <Card className={`h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`} style={{ animationDelay: `${index * 100}ms` }}>
                    <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                      <div>
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${section.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={32} className="text-white w-full h-full" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-300 transition-colors duration-300">
                          {section.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                      <div className="mt-6">
                        <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 group-hover:border-gray-400 transition-all duration-300">
                          Explore
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 My Portfolio. Built with passion and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

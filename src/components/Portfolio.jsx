import React, { useState, useEffect, useRef } from "react";
import './portfolio.css';

import {
  Mail,
  Phone,
  MapPin,
  Github,
  ExternalLink,
  Download,
  Menu,
  X,
  Code,
  Database,
  Globe,
  Settings,
  Star,
  Sparkles,
  Zap,
  Heart,
  Rocket,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const heroRef = useRef(null);

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Load animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const skills = {
    frontend: ["React.js", "Redux", "JavaScript (ES6+)", "React Router"],
    styling: ["Tailwind CSS", "Bootstrap", "Responsive Design"],
    backend: ["PHP (CodeIgniter 3)", "MySQL", "REST API"],
    tools: ["Git", "GitHub", "GitLab", "JSON Server", "Drush"],
  };

  const projects = [
    {
      title: "Student Management Dashboard",
      description:
        "Built an admin panel to manage student records with full CRUD operations using React Router for SPA navigation and React Bootstrap for responsive UI.",
      technologies: ["React", "React Router", "React Bootstrap", "JSON Server"],
      github: "https://github.com/HariRam577/student-dashboard",
      features: [
        "Add/Edit/Delete student records",
        "Clean responsive UI",
        "RESTful API simulation",
        "Form validation",
      ],
    },
    {
      title: "E-commerce Web App",
      description:
        "Developed a product listing and management platform with Redux state management, async API handling, and modern React patterns.",
      technologies: ["React", "Redux", "Redux Thunk", "REST API"],
      github: "https://github.com/HariRam577/e-commerce",
      features: [
        "Product CRUD operations",
        "Cart management",
        "Code-splitting & lazy loading",
        "CI/CD deployment",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed pointer-events-none z-50 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm opacity-30 transition-all duration-300"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div
              className={`text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transform transition-all duration-1000 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              Hari Ram
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                "Home",
                "About",
                "Skills",
                "Experience",
                "Projects",
                "Contact",
              ].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 ${
                    activeSection === item.toLowerCase()
                      ? "text-purple-400 shadow-lg shadow-purple-500/50"
                      : "text-gray-300 hover:text-purple-400"
                  } ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-5 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-purple-400 hover:text-pink-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} className="animate-spin" />
              ) : (
                <Menu size={24} className="animate-pulse" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-500/20 animate-slideDown">
              {[
                "Home",
                "About",
                "Skills",
                "Experience",
                "Projects",
                "Contact",
              ].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-gray-300 hover:text-purple-400 transform hover:translate-x-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-blue-900/50 animate-gradientShift" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <Sparkles className="text-purple-400 opacity-60" size={32} />
        </div>
        <div
          className="absolute top-40 right-20 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Star className="text-pink-400 opacity-60" size={24} />
        </div>
        <div
          className="absolute bottom-40 left-20 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Zap className="text-blue-400 opacity-60" size={28} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Avatar with Pulsing Ring */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-20" />
            <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full mx-auto flex items-center justify-center transform hover:scale-110 transition-all duration-500 shadow-2xl shadow-purple-500/50">
              <span className="text-4xl font-bold text-white animate-pulse">
                HR
              </span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full animate-bounce flex items-center justify-center">
              <Heart className="text-white" size={16} />
            </div>
          </div>

          {/* Animated Title */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradientText">
              Hari Ram
            </span>
          </h1>

          {/* Animated Subtitle */}
          <p
            className={`text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="inline-block animate-typewriter">
              React.js Developer | Frontend Developer | JavaScript | Tailwind
              CSS
            </span>
          </p>

          {/* Contact Info with Staggered Animation */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-8 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center text-gray-300 hover:text-purple-400 transform hover:scale-110 transition-all duration-300 group">
              <MapPin size={20} className="mr-2 group-hover:animate-bounce" />
              Aruppukottai
            </div>
            <div className="flex items-center text-gray-300 hover:text-purple-400 transform hover:scale-110 transition-all duration-300 group">
              <Mail size={20} className="mr-2 group-hover:animate-bounce" />
              hariram.dev18@gmail.com
            </div>
            <div className="flex items-center text-gray-300 hover:text-purple-400 transform hover:scale-110 transition-all duration-300 group">
              <Phone size={20} className="mr-2 group-hover:animate-bounce" />
              9092350519
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row justify-center gap-4 mb-12 transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <a
              href="https://github.com/HariRam577"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl shadow-gray-900/50"
            >
              <Github size={20} className="mr-2 group-hover:animate-spin" />
              GitHub
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl shadow-purple-500/50"
            >
              <Rocket size={20} className="mr-2 group-hover:animate-bounce" />
              Contact Me
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-purple-400" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto animate-pulse" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed animate-slideInLeft">
                  Frontend Developer with 2 years of backend experience in PHP
                  (CodeIgniter) and hands-on frontend expertise using React.js,
                  Redux, and REST APIs. I specialize in building interactive,
                  responsive dashboards and web applications using modern
                  frameworks.
                </p>
                <p
                  className="text-lg text-gray-300 leading-relaxed animate-slideInLeft"
                  style={{ animationDelay: "0.2s" }}
                >
                  I'm passionate about creating clean UI designs, seamless API
                  integrations, and reusable components. Currently open to React
                  roles in Bangalore or remote opportunities where I can
                  contribute to building exceptional user experiences.
                </p>
              </div>

              <div className="space-y-8">
                <div className="animate-slideInRight">
                  <h3 className="text-2xl font-semibold text-purple-400 mb-6">
                    Education
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-purple-500 pl-6 transform hover:scale-105 transition-all duration-300">
                      <h4 className="font-medium text-white text-lg">
                        B.Sc. Information Technology
                      </h4>
                      <p className="text-gray-300">
                        Devanga Arts and Science College, Aruppukottai
                      </p>
                      <p className="text-sm text-gray-400">07/2019 - 08/2022</p>
                    </div>
                    <div className="border-l-4 border-pink-500 pl-6 transform hover:scale-105 transition-all duration-300">
                      <h4 className="font-medium text-white text-lg">HSE</h4>
                      <p className="text-gray-300">
                        SBK Boys Higher Secondary School
                      </p>
                      <p className="text-sm text-gray-400">06/2018 - 03/2019</p>
                    </div>
                  </div>
                </div>

                <div
                  className="animate-slideInRight"
                  style={{ animationDelay: "0.3s" }}
                >
                  <h3 className="text-2xl font-semibold text-pink-400 mb-6">
                    Highlights
                  </h3>
                  <div className="space-y-3">
                    {[
                      "2+ years backend experience",
                      "Expertise in React.js & Redux",
                      "Responsive web development",
                      "Open to relocate",
                    ].map((highlight, index) => (
                      <div key={index} className="flex items-start group">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 mr-4 group-hover:animate-pulse" />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => {
              const icons = [Code, Globe, Database, Settings];
              const colors = ["blue", "green", "purple", "orange"];
              const Icon = icons[index];
              const color = colors[index];

              return (
                <div
                  key={category}
                  className={`group bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-${color}-500/20 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-${color}-500/20 animate-slideInUp`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-spin transition-all duration-500`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-6 capitalize">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {skillList.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className="text-gray-300 flex items-center group-hover:text-white transition-colors duration-300"
                        style={{ animationDelay: `${skillIndex * 0.1}s` }}
                      >
                        <div
                          className={`w-2 h-2 bg-${color}-400 rounded-full mr-3 group-hover:animate-pulse`}
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto animate-pulse" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-10 rounded-3xl border border-purple-500/20 transform hover:scale-105 transition-all duration-500 shadow-2xl shadow-purple-500/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Senior Programmer Analyst
                  </h3>
                  <p className="text-xl text-purple-400">Coimbatore</p>
                </div>
                <div className="text-sm text-gray-400 sm:text-right">
                  <p className="text-lg">03/2023 - Present</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-4 text-xl">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Developed responsive web applications using PHP and CodeIgniter 3",
                      "Built ERP/CRM modules for inventory, billing, and reporting",
                      "Integrated MySQL, jQuery, AJAX, and cron jobs",
                    ].map((responsibility, index) => (
                      <li key={index} className="flex items-start group">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 mr-4 group-hover:animate-pulse" />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {responsibility}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-pink-400 mb-4 text-xl">
                    Technical Achievements
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Used Git and GitLab for version control and CI/CD",
                      "Customized WordPress and Drupal sites",
                      "Automated tasks using Drush",
                    ].map((achievement, index) => (
                      <li key={index} className="flex items-start group">
                        <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mt-2 mr-4 group-hover:animate-pulse" />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-black/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-500/20 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center group-hover:animate-spin">
                      <Code className="text-white" size={24} />
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 group-hover:text-white transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-purple-400 mb-3 text-lg">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 mr-3 animate-pulse" />
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-900/50"
                    >
                      <Github size={16} className="mr-2" />
                      View Code
                      <ExternalLink size={14} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto animate-pulse" />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="animate-slideInLeft">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Let's Connect
                  </h3>
                  <p className="text-lg text-gray-300 mb-8">
                    I'm actively seeking React.js opportunities in Bangalore or
                    remote positions. Let's discuss how I can contribute to your
                    team's success.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "hariram.dev18@gmail.com",
                      color: "purple",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "9092350519",
                      color: "pink",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Aruppukottai (Open to relocate)",
                      color: "blue",
                    },
                    {
                      icon: Github,
                      label: "GitHub",
                      value: "github.com/HariRam577",
                      color: "green",
                      link: "https://github.com/HariRam577",
                    },
                  ].map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <div
                        key={index}
                        className={`group flex items-center p-4 rounded-2xl bg-gradient-to-r from-${contact.color}-900/20 to-${contact.color}-800/20 border border-${contact.color}-500/20 transform hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-${contact.color}-500/20 animate-slideInLeft`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className={`w-14 h-14 bg-gradient-to-r from-${contact.color}-400 to-${contact.color}-600 rounded-xl flex items-center justify-center mr-4 group-hover:animate-pulse`}
                        >
                          <Icon className="text-white" size={24} />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-lg">
                            {contact.label}
                          </p>
                          {contact.link ? (
                            <a
                              href={contact.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-${contact.color}-400 hover:text-${contact.color}-300 transition-colors duration-300`}
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <p className="text-gray-300">{contact.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="animate-slideInRight">
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-8 rounded-3xl border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Send me a message
                  </h3>
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:border-purple-400"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:border-purple-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:border-purple-400 resize-none"
                        placeholder="Tell me about your project or opportunity..."
                      />
                    </div>
                    <button
                      onClick={() =>
                        alert(
                          "✨ Message sent successfully! I'll get back to you soon."
                        )
                      }
                      className="group w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-500 transform hover:scale-105 shadow-lg shadow-purple-500/30 flex items-center justify-center"
                    >
                      <span className="mr-2">Send Message</span>
                      <Rocket
                        className="group-hover:animate-bounce"
                        size={20}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-purple-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              © 2025 Hari Ram. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Built with React, Tailwind CSS, and lots of{" "}
              <Heart className="inline w-4 h-4 text-red-500 animate-pulse" />
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      
    </div>
  );
};

export default Portfolio;

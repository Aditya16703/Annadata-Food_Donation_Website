import React from "react";
import cc from "../../assets/abcd.jpg";

const Contact = () => {
  const data = [
    {
      title: "Annadata Related Queries, Feedback and Suggestions",
      body: [
        "Galgotias College of Engineering and Technology",
        "Knowledge Park 3, Greater Noida, Uttar Pradesh, India",
        "Email: annadata@cdac.in",
      ],
    },
    {
      title: "For Administrative Queries",
      body: [
        "Food Cell, National Food Corporation",
        "Ministry of Health & Family Welfare, New Delhi - 110011",
      ],
    },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-6 bg-white-100 dark:bg-black">
      <div className="max-w-6xl w-full animate-fade-in">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Get in Touch
          </div>
          <h1 className="text-5xl font-display font-bold text-secondary-900 dark:text-white-900 leading-tight">
            Contact <span className="text-primary-600">Details</span>
          </h1>
          <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-12">
          {/* Contact Info Section */}
          <div className="flex-1 space-y-6">
            {data.map((section, i) => (
              <div key={i} className="glass dark:glass-dark rounded-[2rem] p-8 shadow-premium border border-white/10 group hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-display font-bold text-secondary-900 dark:text-white mb-4 group-hover:text-primary-600 transition-colors">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.body.map((line, j) => (
                    <div key={j} className="flex items-start text-secondary-600 dark:text-white-400">
                      <div className="mt-1 mr-3 h-2 w-2 rounded-full bg-primary-500 shrink-0"></div>
                      <p className="text-sm leading-relaxed">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="flex-1 relative group">
            <div className="absolute -inset-4 bg-primary-500/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img
              src={cc}
              draggable={false}
              className="relative rounded-[2.5rem] w-full h-full object-cover shadow-2xl border-4 border-white dark:border-secondary-800 transition-transform duration-700 group-hover:scale-[1.02]"
              alt="Contact Office"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

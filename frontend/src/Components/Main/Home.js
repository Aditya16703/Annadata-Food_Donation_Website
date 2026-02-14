import React from "react";
import bg from "../../assets/bgstart1.jpg";
import bg2 from "../../assets/food2.jpg";
import donationFact from "../../assets/abc.jpg";
import g1 from "../../assets/donation/g1.jpg";
import g2 from "../../assets/donation/g2.jpg";
import g3 from "../../assets/donation/g3.jpg";
import g4 from "../../assets/donation/g4.jpg";

const Home = () => {
  const foodTypes = [
    {
      food: "Non-Perishable Food",
      type: "Rice, flour, salt, spices, cooking oil, etc.",
    },
    {
      food: "Perishable Food",
      type: "Fruits, vegetables, milk, cheese, bread, etc.",
    },
    {
      food: "Prepared Food",
      type: "Restaurant leftovers, homemade dishes, catered meals, etc.",
    },
    {
      food: "Baby Food and Formula",
      type: "Infant cereals fortified with iron and other nutrients.",
    },
    {
      food: "Snacks and Beverages",
      type: "Nuts, dried fruits, crackers, chips, sports drinks, etc.",
    },
  ];

  const donationSteps = [
    { title: "Registration", img: g1 },
    { title: "Seeing", img: g2 },
    { title: "Donation", img: g3 },
    { title: "Save Life", img: g4 },
  ];

  return (
    <div className="bg-white-100 dark:bg-black min-h-screen font-sans selection:bg-primary-200 selection:text-primary-900">
      {/* Hero Section */}
      <div className="relative pt-12 pb-20 px-6 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-success/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in [animation-delay:200ms]">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-secondary-900 dark:text-white-900 leading-tight mb-6">
              Feeding Hope, <br /> 
              <span className="text-primary-600 italic">One Meal</span> at a Time.
            </h1>
            <p className="text-lg text-secondary-600 dark:text-white-400 mb-8 max-w-lg leading-relaxed">
              Annadata is a bridge between abundance and need. Join our community to share surplus food and help ensure no one in our neighborhood goes to bed hungry.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register/donor" className="btn-primary px-8 py-3 text-lg shadow-premium">
                Start Donating
              </Link>
              <Link to="/about" className="px-8 py-3 rounded-full border-2 border-secondary-200 text-secondary-700 font-medium hover:bg-secondary-50 transition-all active:scale-95 dark:border-secondary-700 dark:text-white-300">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative animate-fade-in [animation-delay:400ms]">
            <div className="absolute -inset-4 bg-primary-500/10 rounded-[2rem] blur-xl -z-10 rotate-3"></div>
            <img 
              src={bg} 
              alt="Food Donation Banner" 
              className="w-full h-[450px] object-cover rounded-[2rem] shadow-2xl border-4 border-white dark:border-secondary-800 transform transition-transform hover:-rotate-1 duration-700" 
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl flex items-center space-x-3 animate-bounce shadow-premium">
              <div className="bg-primary-100 p-2 rounded-xl text-primary-600">
                <i className="fa-solid fa-heart text-xl"></i>
              </div>
              <div>
                <p className="text-xs text-secondary-500 font-medium uppercase tracking-wider">Join Us</p>
                <p className="font-bold text-secondary-900 italic line-through decoration-primary-500">Fight Hunger</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-white dark:bg-secondary-900 border-y border-secondary-100 dark:border-secondary-800 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-block p-1 px-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6 italic">
            Mission Statement
          </div>
          <blockquote className="text-3xl md:text-4xl font-display font-medium text-secondary-900 dark:text-white-900 leading-snug italic mb-6">
            “Hunger is not an issue of charity. It is an issue of <span className="text-primary-600 underline decoration-wavy underline-offset-8">justice</span>.”
          </blockquote>
          <cite className="text-secondary-500 dark:text-white-400 not-italic font-medium">— Jacques Diouf</cite>
        </div>
      </div>

      {/* Know About Donation Section */}
      <div className="max-w-7xl mx-auto py-24 px-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-display font-bold text-secondary-900 dark:text-white-900 mb-6">
              Why <span className="text-primary-600">Donate?</span>
            </h2>
            <div className="relative mb-8 group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary-600 to-success rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img
                src={donationFact}
                alt="Donation Facts"
                className="relative rounded-2xl w-full h-80 object-cover shadow-xl"
              />
            </div>
            <p className="text-lg text-secondary-600 dark:text-white-400 leading-relaxed italic border-l-4 border-primary-500 pl-6">
              "No adjective in the dictionary can define the feeling after you
              donate food to the needy. Food donation is an act of gratitude —
              a way to share blessings and ensure no one sleeps hungry."
            </p>
          </div>

          <div className="flex-1 w-full">
            <div className="overflow-hidden rounded-2xl border border-secondary-100 dark:border-secondary-800 shadow-premium">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary-600">
                    <th colSpan={2} className="px-6 py-4 text-white font-display font-bold text-center">
                      Compatible Food Types
                    </th>
                  </tr>
                  <tr className="bg-secondary-50 dark:bg-secondary-800 border-b border-secondary-100 dark:border-secondary-700">
                    <th className="px-6 py-4 text-secondary-900 dark:text-white font-bold text-sm uppercase tracking-wider">Food Categories</th>
                    <th className="px-6 py-4 text-secondary-900 dark:text-white font-bold text-sm uppercase tracking-wider">Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100 dark:divide-secondary-800 bg-white dark:bg-secondary-900">
                  {foodTypes.map((item, index) => (
                    <tr key={index} className="hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors">
                      <td className="px-6 py-4 font-bold text-secondary-900 dark:text-white-300 text-sm whitespace-nowrap">{item.food}</td>
                      <td className="px-6 py-4 text-secondary-500 dark:text-white-400 text-sm">{item.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Food Donation Process */}
      <div className="bg-secondary-50 dark:bg-black py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-secondary-900 dark:text-white-900 mb-4">
              Simple <span className="text-primary-600">4-Step</span> Process
            </h2>
            <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {donationSteps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-secondary-900 rounded-[2rem] overflow-hidden border border-secondary-100 dark:border-secondary-800 shadow-premium transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img
                      src={step.img}
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={step.title}
                    />
                    <div className="absolute top-4 left-4 bg-primary-600 text-white font-display font-bold h-10 w-10 flex items-center justify-center rounded-xl shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-display font-bold text-secondary-900 dark:text-white-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-white-400 leading-relaxed text-sm">
                      {step.title === "Registration" && (
                        "Register easily to become a food donor or receiver. Our simple process ensures that every meal you share reaches those who need it most."
                      )}
                      {step.title === "Seeing" && (
                        "View available donations and nearby food banks in real time. Get instant access to meals shared by kind donors and help reduce food waste."
                      )}
                      {step.title === "Donation" && (
                        "Donate your surplus food through our verified network. Every contribution helps feed someone in need and promotes a sustainable community."
                      )}
                      {step.title === "Save Life" && (
                        "Your one small act of kindness can save lives. By donating food, you are helping to fight hunger and bring hope to those in need."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-secondary-900 border-t border-secondary-100 dark:border-secondary-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <div className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Annadata
            </div>
            <div className="ml-4 pl-4 border-l border-secondary-200 dark:border-secondary-700 text-secondary-500 text-sm italic">
              Sharing Abundance, Ending Hunger.
            </div>
          </div>
          
          <div className="flex space-x-6 text-2xl text-secondary-400">
            <a href="#" className="hover:text-primary-600 transition-colors"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="hover:text-primary-600 transition-colors"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-primary-600 transition-colors"><i className="fa-brands fa-twitter"></i></a>
          </div>

          <div className="text-secondary-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Annadata Platform. Optimized for impact.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;



































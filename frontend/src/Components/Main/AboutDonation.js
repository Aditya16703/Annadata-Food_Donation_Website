import React from "react";
import g1 from "../../assets/donation/g1.jpg";
import g2 from "../../assets/donation/g2.jpg";
import g3 from "../../assets/donation/g3.jpg";
import g4 from "../../assets/donation/g4.jpg";

const AboutDonation = () => {
  const data = [
    {
      title: "Registration",
      img: g1,
      description: `Begin your journey of giving by registering with our food donation
      platform. Provide your basic details to help us coordinate your
      contributions efficiently. Once registered, you’ll receive guidance
      on nearby collection centers, donation timings, and food handling
      safety tips.`,
    },
    {
      title: "Seeing",
      img: g2,
      description: `After registration, you can explore the list of verified donation
      centers and ongoing drives. See where your contribution will make
      the biggest impact. Transparency is key — you can view photos,
      locations, and testimonials from recipients to understand how your
      donations help.`,
    },
    {
      title: "Donation",
      img: g3,
      description: `This is where kindness turns into action. Bring your food items to
      the nearest collection point or schedule a pickup. We accept
      non-perishable goods, packed meals, and essentials. Our volunteers
      ensure that each donation is checked, packed, and distributed with
      care to those who need it most.`,
    },
    {
      title: "Save Life",
      img: g4,
      description: `Every act of giving saves a life. By donating food, you provide
      nourishment, hope, and strength to those battling hunger. Together,
      we can reduce food waste and ensure no one sleeps hungry. Your
      simple act of compassion can inspire others to do the same — making
      a lasting difference in your community.`,
    },
  ];

  return (
    <section className="min-h-screen py-24 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Our Workflow
          </div>
          <h1 className="text-5xl font-display font-bold text-secondary-900 dark:text-white leading-tight">
            The Journey of <span className="text-primary-600">Kindness</span>
          </h1>
          <p className="mt-6 text-secondary-500 max-w-2xl mx-auto font-medium">
            Follow our streamlined logistics pipeline to make a direct impact on community hunger and sustainability.
          </p>
          <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {data.map((e, i) => (
            <div
              key={i}
              className="group glass dark:glass-dark rounded-[3rem] overflow-hidden border border-white/20 shadow-premium hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row"
            >
              <div className="lg:w-2/5 relative overflow-hidden">
                <img
                  src={e.img}
                  draggable={false}
                  className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={e.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6 h-12 w-12 rounded-2xl bg-white/90 dark:bg-secondary-900/90 backdrop-blur-md flex items-center justify-center text-secondary-900 dark:text-white font-black text-2xl shadow-lg">
                  0{i + 1}
                </div>
              </div>
              
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-4 group-hover:text-primary-600 transition-colors">
                  {e.title}
                </h3>
                <p className="text-secondary-500 dark:text-secondary-400 leading-relaxed font-medium">
                  {e.description}
                </p>
                <div className="mt-8 pt-8 border-t border-secondary-100 dark:border-secondary-800 flex items-center text-primary-600 font-bold text-sm tracking-wider uppercase">
                  <span>Learn Logistics</span>
                  <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 glass dark:glass-dark rounded-[4rem] border border-white/20 text-center relative overflow-hidden">
             <div className="absolute -top-24 -right-24 h-64 w-64 bg-primary-500/10 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-success-500/10 rounded-full blur-3xl"></div>
             
             <h2 className="text-3xl font-display font-bold text-secondary-900 dark:text-white mb-4">Ready to start saving lives?</h2>
             <p className="text-secondary-500 font-medium mb-8 max-w-xl mx-auto">Your surplus can be someone's sustenance. Join our network of institutional and individual donors today.</p>
             <button className="px-10 py-4 rounded-2xl bg-primary-600 text-white font-black uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all">
                Identify Collection Centers
             </button>
        </div>
      </div>
    </section>
  );
};

export default AboutDonation;

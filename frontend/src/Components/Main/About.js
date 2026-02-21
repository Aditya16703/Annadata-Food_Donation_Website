import React from "react";

const About = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-6 bg-transparent dark:bg-transparent">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Our Mission
          </div>
          <h1 className="text-5xl font-display font-bold text-secondary-900 dark:text-white-900 leading-tight">
            About <span className="text-primary-600">Annadata</span>
          </h1>
          <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="glass dark:glass-dark rounded-[2.5rem] p-10 md:p-16 shadow-premium relative overflow-hidden group">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 h-32 w-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="absolute bottom-0 left-0 h-32 w-32 bg-success/5 rounded-full -ml-16 -mb-16 transition-transform group-hover:scale-150 duration-700"></div>

          <div className="space-y-8 relative z-10">
            <p className="text-xl text-secondary-700 dark:text-white-300 leading-relaxed text-justify">
              <span className="font-bold text-primary-600">Annadata</span> is more than just a platform; it's a movement bridging the gap between abundance and hunger. We empower individuals and organizations to share surplus food, ensuring that every meal reaches those who need it most.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="p-6 rounded-3xl bg-white-100/50 dark:bg-secondary-800/50 border border-secondary-100 dark:border-secondary-700">
                <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="fa-solid fa-shield-check"></i>
                </div>
                <h3 className="font-display font-bold text-secondary-900 dark:text-white-900 mb-2">Accountability</h3>
                <p className="text-sm text-secondary-500 dark:text-white-400">Secure authentication ensures every donation is tracked and verified.</p>
              </div>
              <div className="p-6 rounded-3xl bg-white-100/50 dark:bg-secondary-800/50 border border-secondary-100 dark:border-secondary-700">
                <div className="h-10 w-10 bg-success/10 text-success rounded-xl flex items-center justify-center mb-4">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <h3 className="font-display font-bold text-secondary-900 dark:text-white-900 mb-2">Real-time Impact</h3>
                <p className="text-sm text-secondary-500 dark:text-white-400">Connecting donors and NGOs instantly to minimize food waste.</p>
              </div>
            </div>

            <p className="text-lg text-secondary-600 dark:text-white-400 text-justify leading-relaxed">
              By promoting a culture of compassion, Annadata aims to build sustainable communities where sharing is the norm. We believe that technology can be the ultimate tool for social justice, one meal at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

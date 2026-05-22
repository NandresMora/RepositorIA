

/**
 * Hero Component
 * The main landing section of the application.
 * 
 * Visual Features:
 * - Geometric background gradients for depth.
 * - Dynamic typography with neon accent (RepositorIA ENGINNER).
 * - Domain highlights (Study, Work, Business) with specific brand colors.
 */
const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background py-1 pb-1">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="flex justify-center mb-6">
           
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-7xl font-geist ">
            RepositorIA <span className="text-secondary drop-shadow-[0_0_15px_rgba(188,19,254,0.3]">ENGINNER</span>
          </h1>
          
          <p className="mt-6 text-base leading-relaxed text-on-surface-variant max-w-3xl mx-auto font-medium font-geist">
           Repositorio de herramientas con enfoque de productividad y cumplir actividades relacionadas a Sistemas <span className="text-primary font-bold uppercase drop-shadow-[0_0_5px_rgba(0,242,255,0.3)]">Study</span>, <span className="text-secondary font-bold uppercase drop-shadow-[0_0_5px_rgba(188,19,254,0.3)]">Work</span>, and <span className="text-tertiary font-bold uppercase drop-shadow-[0_0_5px_rgba(57,255,20,0.3)]">Business</span> domains.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold font-geist text-outline uppercase tracking-[0.2em]">
            <span className="hover:text-primary transition-colors cursor-default">Systems Engineering</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/30 shadow-[0_0_5px_rgba(0,242,255,0.5)]" />
            <span className="hover:text-secondary transition-colors cursor-default">DevOps</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/30 shadow-[0_0_5px_rgba(0,242,255,0.5)]" />
            <span className="hover:text-tertiary transition-colors cursor-default">AI Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

export const PageTitleWithEmoji = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="glossy-gradient rounded-3xl p-6 text-center max-w-2xl mx-auto mb-16 shadow-2xl relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-full h-1 bg-[#EDC4C7]"></div>
    <div className="text-center mx-auto bg-white h-16 w-16 rounded-3xl flex items-center justify-center text-slate-600 mb-6 group-hover:scale-105 transition-transform">
      <Icon size={24} />
    </div>
    <h1 className="text-5xl font-extrabold tracking-tighter text-slate-950 mb-3">
      {title}
    </h1>
  </div>
);

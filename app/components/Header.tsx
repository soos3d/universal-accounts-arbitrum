/* eslint-disable @next/next/no-img-element */
export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center gap-2.5">
          <img
            src="https://pbs.twimg.com/profile_images/1623919818108997633/o2JfMaqi_400x400.png"
            alt="Particle Network Logo"
            className="h-10 w-10 rounded-full ring-2 ring-[#8B5CF6]/30 shadow-lg"
          />
          <div className="text-xl font-bold text-gray-400">×</div>
          <img
            src="https://universalx.app/_next/image?url=https%3A%2F%2Fstatic.particle.network%2Fchains%2Fevm%2Ficons%2F42161.png&w=32&q=75"
            alt="Arbitrum Logo"
            className="h-10 w-10 rounded-full ring-2 ring-blue-500/30 shadow-lg"
          />
        </div>
        <div className="text-center space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#8B5CF6] to-blue-500 drop-shadow-lg">
            Universal Accounts on Arbitrum
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl">
            Use funds from any chain directly in your Arbitrum dApp
          </p>
        </div>
      </div>
    </div>
  );
};

import { Globe, Users, ShoppingBag } from "lucide-react";

const StatCard = ({ value, label }) => (
  <div className="text-center animate-fade-in">
    <div className="text-3xl font-bold mb-2 text-white">{value}</div>
    <p className="text-sm text-white/80">{label}</p>
  </div>
);

const ImpactPoint = ({ text }) => (
  <div className="flex items-center space-x-3 animate-slide-in">
    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
    <p className="text-gray-700">{text}</p>
  </div>
);

const AboutCard = ({
  icon: Icon,
  title,
  children,
  className = "",
  bgColor = "bg-white",
}) => (
  <div className={`relative ${className} animate-fade-up`}>
    <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-200 rounded-full opacity-50"></div>
    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-200 rounded-full opacity-50"></div>
    <div
      className={`relative ${bgColor} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`${
            bgColor === "bg-white" ? "bg-green-100" : "bg-white/20"
          } w-12 h-12 rounded-full flex items-center justify-center`}
        >
          <Icon
            className={`h-6 w-6 ${
              bgColor === "bg-white" ? "text-green-700" : "text-white"
            }`}
          />
        </div>
        <h3
          className={`text-2xl font-bold ${
            bgColor === "bg-white" ? "text-green-800" : "text-white"
          }`}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  </div>
);

export default function About() {
  const stats = [
    { value: "5+", label: "Local Languages" },
    { value: "100+", label: "Community Leaders" },
    { value: "24/7", label: "Support Available" },
    { value: "10+", label: "Regions Covered" },
  ];

  const impactPoints = [
    "Access quality education in local languages",
    "Connect with buyers and sellers nationwide",
    "Learn modern business techniques",
    "Increase income through better market access",
  ];

  return (
    <section
      id="about"
      className="py-16 px-4 bg-gradient-to-b from-white to-green-50"
      aria-labelledby="about-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-down">
          <h2
            id="about-heading"
            className="text-4xl font-bold text-green-800 mb-4"
          >
            About Market Connect
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <AboutCard icon={Globe} title="Our Mission">
            <p className="text-gray-700 leading-relaxed">
              Market Connect is dedicated to empowering Ghanaian market women
              and farmers by providing accessible education, fostering community
              connections, and creating new market opportunities. We believe in
              the power of technology to transform traditional markets and
              improve livelihoods across Ghana.
            </p>
          </AboutCard>

          <AboutCard icon={Users} title="Our Impact">
            <div className="space-y-4">
              {impactPoints.map((point, index) => (
                <ImpactPoint key={index} text={point} />
              ))}
            </div>
          </AboutCard>
        </div>

        <AboutCard
          icon={ShoppingBag}
          title="Our Approach"
          className="mb-0"
          bgColor="bg-gradient-to-r from-green-600 to-green-700"
        >
          <p className="text-white/90 leading-relaxed mb-6">
            We combine traditional market knowledge with modern technology to
            create a platform that's both accessible and effective. Our content
            is available in multiple local languages, and we work closely with
            community leaders to ensure our solutions meet real needs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <StatCard key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        </AboutCard>
      </div>
    </section>
  );
}

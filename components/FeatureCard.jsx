import Link from "next/link";

export default function FeatureCard({ icon, title, description, href, color }) {
  return (
    <Link href={href}>
      <div
        className={`${color} rounded-xl p-6 text-center h-full transition-all hover:scale-105 hover:shadow-lg cursor-pointer shadow-md flex flex-col items-center`}
      >
        <div className="flex justify-center mb-4 bg-white p-4 rounded-full shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </Link>
  );
}

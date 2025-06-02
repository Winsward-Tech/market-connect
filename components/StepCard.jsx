export default function StepCard({ number, title, description }) {
  return (
    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

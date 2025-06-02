export default function Statistics() {
  const stats = [
    { value: "5,000+", label: "Active Users" },
    { value: "120+", label: "Communities" },
    { value: "1,500+", label: "Products Listed" },
    { value: "30%", label: "Average Income Increase" },
  ];

  return (
    <section className="py-12 px-4 bg-green-700 text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Shaping the Future of Ghanaian Markets
        </h2>
        <p className="text-center text-green-100 mb-12 italic font-semibold">
          Discover our bold goals and the lasting change we aim to achieve
          within the next year.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <p className="text-green-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

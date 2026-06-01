import DestinationCard from "@/components/DestinationCard";

export default async function DestinationPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destinations`);
  const destinations = await res.json();

  return (
    <div className="max-w-7xl mx-auto">
      <h1>All Destinations</h1>

      <div className="grid grid-cols-4 gap-5">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
}

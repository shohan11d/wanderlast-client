import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

export default function DestinationCard({ destination }) {
  const {
    imageUrl,
    destinationName,
    country,
    category,
    price,
    duration,
    departureDate,
  } = destination;
  return (
    <div className="border rounded-lg">
      <Image
        src={imageUrl}
        alt={destinationName}
        width={400}
        height={300}
        className="rounded-lg object-cover"
      />
      <div className="p-2">
        <div className="flex items-center gap-2">
          <LuMapPin /> <span>{country}</span>
        </div>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{destinationName}</h2>
        </div>

        <div className="flex items-center gap-1">
          <FaRegCalendar /> {duration}
        </div>
      </div>

      <div className="text-2xl font-bold">
        {" "}
        <h3>{price}</h3>
      </div>
    
    </div>
  );
}

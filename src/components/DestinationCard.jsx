import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";

export default function DestinationCard({ destination }) {
  const {
    _id,
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
      <div className="h-40 overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          width={400}
          height={400}
          className="rounded-lg h-full w-full object-cover"
        />
      </div>
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
        <div className="text-2xl font-bold">
          <h3>{price}</h3>
        </div>
      </div>

      <Link
        href={`/destinations/${_id}`}
        variant="ghost"
        className={`mt-1 text-cyan-500`}
      >
        <FiExternalLink /> Book Now
      </Link>
    </div>
  );
}

import { EditModal } from "@/components/EditModal";
import { Button } from "@heroui/react";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

export default async function DestinationDetailsPage({ params }) {
  const { id } = await params;
  console.log(id);

  const res = await fetch(`http://localhost:5000/destination/${id}`);
  const destination = await res.json();

  console.log(destination);
  const { destinationName, price, duration, country, imageUrl, description } =
    destination;

  return (
    <div className="max-w-7xl mx-auto">
      <EditModal destination={destination} />

      <Image
        src={imageUrl}
        width={800}
        height={500}
        alt={destinationName}
        className="w-full h-100 object-cover"
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
        <div className="text-2xl font-bold">
          <h3>{price}</h3>
        </div>
        <h1 className="mt-10 text-2xl font-bold">Overview</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

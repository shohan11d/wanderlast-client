import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";

export default function TutorCard({ tutor }) {
  console.log("tutor card >", tutor);
  const { _id, imageUrl, tutorName, location, mode, price, slot, subject } =
    tutor;
  return (
    <div className="bg-[#0f1c2e] rounded-lg overflow-hidden border border-teal-300/20 hover:border-teal-300/50 transition-all hover:shadow-lg hover:shadow-teal-300/10">
      {/* Image */}
      <div className="relative w-full h-48 bg-[#1a2a3a]">
        {imageUrl && (
          <Image src={imageUrl} alt={tutorName} fill className="object-cover" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Tutor Name */}
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-[#f0ece3]">{tutorName}</h2>
          <span className="text-xs bg-teal-300/20 text-teal-300 px-2 py-1 rounded">
            {subject}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-[#f0ece3]/70">
          <LuMapPin size={16} /> <span className="text-sm">{location}</span>
        </div>

        {/* Mode */}
        <div className="text-sm text-[#f0ece3]/70">
          <span className="bg-teal-300/10 px-2 py-1 rounded">{mode}</span>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 text-[#f0ece3]/70">
          <FaRegCalendar size={16} />
          <span className="text-sm">{slot} slots available</span>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-[#f0ece3]/10">
          <div className="text-2xl font-bold text-teal-300">${price}/hr</div>
        </div>

        {/* Book Button */}
        <Link
          href={`/tutors/${_id}`}
          className="inline-flex items-center gap-2 w-full justify-center bg-teal-300 text-[#0f1c2e] font-semibold py-2 rounded hover:bg-teal-200 transition-colors mt-3"
        >
          <FiExternalLink /> Book Now
        </Link>
      </div>
    </div>
  );
}

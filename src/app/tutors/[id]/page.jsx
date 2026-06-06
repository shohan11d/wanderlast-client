import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

export default async function TutorDetailsPage({ params }) {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  console.log("token", token);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const tutor = await res.json();

  console.log(tutor);
 const { _id, imageUrl, tutorName, location, mode, price, slot, startDate, endDate, subject } =
    tutor;

  return (
    <div className="max-w-7xl mx-auto bg-[#0f1c2e] min-h-screen p-5">
      

      <Image
        src={imageUrl}
        width={800}
        height={500}
        alt={tutorName}
        className="w-full h-100 object-cover"
      />
      <div className="flex justify-between">
        <div className="p-2">
          <div className="flex items-center gap-2 text-[#f0ece3]">
            <LuMapPin /> <span>{location}</span>
          </div>
          <div className="flex justify-between">
            <h2 className="text-xl font-bold text-[#f0ece3]">
              {tutorName}
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#f0ece3]">
            <FaRegCalendar /> {slot} slots available
          </div>

          <h1 className="mt-10 text-2xl font-bold text-[#f0ece3]">Overview</h1>
          <p className="text-[#f0ece3]/70">{subject}</p>
        </div>
        <BookingCard destination={tutor} token={token} />
      </div>
    </div>
  );
}

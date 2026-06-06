"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card } from "@heroui/react";
import { DateField, Label } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { EditModal } from "./EditModal";

export default function BookingCard({ destination, token }) {
  const { data: session } = authClient.useSession();
  console.log(session);
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);
  const { price, _id, destinationName, imageUrl, country } = destination;

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: _id,
      destinationName: destinationName,
      price,
      imageUrl,
      country,
      departureDate: new Date(departureDate),
    };

    console.log(bookingData);

    try {

      const {data:tokenData} = await authClient.token();
      console.log("token", tokenData);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      console.log(data);

      toast.success("You booked successfully")
    } catch(err) {
      if(err){
        toast.error(err.message)
      }
    }
  };

  return (
    <Card className="rounded-xl bg-[#0f1c2e] text-white border mt-5 ">
      <p className="text-sm ">Fee</p>
      <h2 className="text-3xl font-bold text-cyan-400">${price}</h2>
      
     <EditModal tutor={destination} token={token} />
    </Card>
  );
}

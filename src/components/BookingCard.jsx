"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card } from "@heroui/react";
import { DateField, Label } from "@heroui/react";
import { useState } from "react";

export default function BookingCard({ destination }) {
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

    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    console.log(data);
   
  };

  return (
    <Card className="rounded-none border mt-5 ">
      <p className="text-sm text-muted">Starting from</p>
      <h2 className="text-3xl font-bold text-cyan-400">${price}</h2>
      <p>per person</p>
      <DateField onChange={setDepartureDate} className="w-[256px]" name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
      <Button
        onClick={handleBooking}
        className={`w-full rounded-none bg-cyan-500`}
      >
        Book Now
      </Button>
    </Card>
  );
}

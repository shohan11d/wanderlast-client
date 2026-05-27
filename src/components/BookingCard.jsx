"use client";
import { Button, Card } from "@heroui/react";
import {DateField, Label} from "@heroui/react";


export default function BookingCard({ destination }) {
  const { price } = destination;
  return (
    <Card className="rounded-none border mt-5 ">
      <p className="text-sm text-muted">Starting from</p>
      <h2 className="text-3xl font-bold text-cyan-400">${price}</h2>
      <p>per person</p>
<DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
    <Button className={`w-full rounded-none bg-cyan-500`}>Book Now</Button>

    </Card>
  );
}

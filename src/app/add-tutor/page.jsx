"use client";
import toast from "react-hot-toast";

import { useState } from "react";
import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
  Card,
  Dropdown,
} from "@heroui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Page() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date("2026/02/10"));

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    console.log("New tutor:", destination);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(destination),
      },
    );

    const data = await res.json();
    if (!res.ok) {
      console.error("Error adding tutor:", data);
      toast.error("Failed to add tutor. Please try again.");
      return;
    }
    if (data.acknowledged) {
      toast.success("Tutor added successfully!");
    }

  };
  return (
    <div className="p-5 max-w-7xl mx-auto bg-[#0f1c2e] min-h-screen">
      <h1 className="text-xl font-bold text-[#f0ece3]">Add Tutor</h1>
      <Card className="bg-[#0f1c2e] text-[#f0ece3]">
        <form className="p-10 w-3xl space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Destination Name */}
            <div className="md:col-span-2">
              <TextField
                name="tutorName"
                isRequired
                defaultValue="Rakib Rahman"
              >
                <Label className="text-[#f0ece3]">Tutor Name</Label>
                <Input
                  placeholder="Bali Paradise"
                  className="rounded-2xl bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Country */}
            <TextField name="location" defaultValue="Dhaka" isRequired>
              <Label className="text-[#f0ece3]">Location</Label>
              <Input
                placeholder="Indonesia"
                className="rounded-2xl bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
              />
              <FieldError />
            </TextField>

            <div>
              <Select
                name="mode"
                isRequired
                className="w-full"
                placeholder="Select category"
              >
                <Label className="text-[#f0ece3]">Teaching Mode</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Online" textValue="Online">
                      Online
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Offline" textValue="Offline">
                      Offline
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Both" textValue="Both">
                      Both
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Category - Updated Select Component */}
            <div>
              <Select
                name="subject"
                isRequired
                className="w-full"
                placeholder="Select subject"
              >
                <Label className="text-[#f0ece3]">Subject</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Mathematics" textValue="Mathematics">
                      Mathematics
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Physics" textValue="Physics">
                      Physics
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Biology" textValue="Biology">
                      Biology
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Price */}
            <TextField
              name="price"
              type="number"
              isRequired
              defaultValue="4000"
            >
              <Label className="text-[#f0ece3]">Hourly fee</Label>
              <Input
                type="number"
                className="rounded-2xl bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
              />
              <FieldError />
            </TextField>

            <TextField name="slot" type="number" isRequired defaultValue="10">
              <Label className="text-[#f0ece3]">Total Slot</Label>
              <Input
                type="number"
                className="rounded-2xl bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
              />
              <FieldError />
            </TextField>

            {/* Departure Date */}
            <div className="md:col-span-2">
              <Label className="text-[#f0ece3]">Available from</Label>
              <div className="flex gap-4 items-center mt-2">
                <div className="flex-1">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start date"
                    className="w-full px-4 py-2 border-2 border-teal-300/30 bg-[#0f1c2e] text-[#f0ece3] rounded-2xl focus:outline-none focus:border-teal-300"
                  />
                </div>
                
                
              </div>
              <input
                type="hidden"
                name="startDate"
                value={startDate?.toISOString().split("T")[0]}
              />
              <input
                type="hidden"
                name="endDate"
                value={endDate?.toISOString().split("T")[0]}
              />
            </div>

            {/* Image URL - Removed preview */}
            <div className="md:col-span-2">
              <TextField
                name="imageUrl"
                defaultValue="https://i.pravatar.cc/150?img=12"
                isRequired
              >
                <Label className="text-[#f0ece3]">Photo</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/bali-paradise.jpg"
                  className="rounded-2xl bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="location" defaultValue="BUET" isRequired>
                <Label className="text-[#f0ece3]">Institute</Label>
                <Input className="rounded-2xl bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50" />
                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Buttons */}

          <Button
            type="submit"
            variant="outline"
            className=" rounded-none w-full bg-teal-300 text-[#0f1c2e]"
          >
            Add Tutor
          </Button>
        </form>
      </Card>
    </div>
  );
}

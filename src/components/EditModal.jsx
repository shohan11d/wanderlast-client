"use client";

import { authClient } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Select,
  ListBox,
  TextArea,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";

export function EditModal({ tutor, token }) {

  const { data: session } = authClient.useSession();
  console.log("session", session?.user.id);
  const userId = session?.user?.id;
  const {
    _id,
    imageUrl,
    tutorName,
    location,
    mode,
    price,
    slot,
    startDate,
    subject,
  } = tutor;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const studentData = Object.fromEntries(formData.entries());
    console.log("student Data:", studentData);
    const { phone, studentEmail, studentName, tutorId, tutorName } =
      studentData;

    const bookingData = {
      studentName,
      studentEmail,
      phone,
      tutorId,
      tutorName,
      studentId:userId,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    console.log(data);
  };
  return (
    <Modal>
      <Button variant="primary" className={`rounded-sm `}>
        <BiEdit /> Book
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Student Details</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="p-10 space-y-8" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField
                        name="studentName"
                        isRequired
                        defaultValue="Rahim"
                      >
                        <Label>Student Name</Label>
                        <Input placeholder="John Doe" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Country */}
                    <TextField
                      name="tutorName"
                      defaultValue={tutorName}
                      isRequired
                    >
                      <Label>Tutor Name</Label>
                      <Input placeholder="Indonesia" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Category - Updated Select Component */}

                    {/* Price */}
                    <TextField
                      name="phone"
                      type="number"
                      isRequired
                      defaultValue="01343583233"
                    >
                      <Label>Phone Number</Label>
                      <Input type="number" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    <TextField
                      name="tutorId"
                      type="text"
                      isRequired
                      defaultValue={`${_id}`}
                    >
                      <Label>Tutor ID</Label>
                      <Input type="text" className="rounded-2xl" />
                      <FieldError />
                    </TextField>
                    <TextField
                      name="studentEmail"
                      type="email"
                      isRequired
                      defaultValue={`rahimbd880@gmail.com`}
                    >
                      <Label>Student Email</Label>
                      <Input type="email" className="rounded-2xl" />
                      <FieldError />
                    </TextField>
                  </div>

                  {/* Buttons */}

                  <Modal.Footer>
                    {slot > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-2 bg-green-800 text-white rounded-full">
                          Book Status: Available
                        </span>
                        <Button type="submit" slot="close">
                          Book Now
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-2 bg-red-800 text-white rounded-full">
                          Book Status: Not Available
                        </span>
                        <Button disabled type="submit" slot="close">
                          No available slots left
                        </Button>
                      </div>
                    )}
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

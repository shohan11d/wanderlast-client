import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingPage() {
   const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user;

    console.log("user", user);

    const res = await fetch(`http://localhost:5000/booking/${user?.id}`)
    const data = await res.json();
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold ">My Bookings</h1>
    </div>
  );
}

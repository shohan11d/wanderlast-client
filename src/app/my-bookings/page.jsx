import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function MyBookingPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const user = session?.user;

  console.log("user", user);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const bookings = await res.json();
  console.log("bookings", bookings);
  return (
    <div className="max-w-7xl mx-auto bg-[#0f1c2e] min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-8 text-[#f0ece3]">My Bookings</h1>

      {bookings && bookings.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-[#f0ece3]/20">
          <table className="w-full text-[#f0ece3]">
            <thead>
              <tr className="bg-[#1a2f4b] border-b border-[#f0ece3]/20">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Tutor Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-[#f0ece3]/10 hover:bg-[#1a2f4b]/50 transition"
                >
                  <td className="px-6 py-4">{booking.studentName}</td>
                  <td className="px-6 py-4 text-[#f0ece3]/80">
                    {booking.studentEmail}
                  </td>
                  <td className="px-6 py-4">{booking.phone}</td>
                  <td className="px-6 py-4 font-semibold text-cyan-400">
                    {booking.tutorName}
                  </td>
                  <td className="px-6 py-4">
                    <BookingCancelAlert bookingId={booking._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[#f0ece3]/70 text-lg">No bookings found</p>
        </div>
      )}
    </div>
  );
}

"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, ButtonGroup } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  console.log(session);

  const user = session?.user;
  console.log(user);


  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="flex justify-between items-center bg-white p-5">
      <ul className="flex gap-3">
        <li>
          <Link href={"/"}>Home</Link>
        </li>

        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>

        <li>
          <Link href={"/my-bookings"}>My Bookings</Link>
        </li>

        <li>
          <Link href={"/add-destination"}>Add Destination</Link>
        </li>
      </ul>

      <div>
        <Image
          src={"/assets/Wanderlast.png"}
          width={150}
          height={150}
          alt="logo"
        ></Image>
      </div>

      <ul className="flex items-center gap-3">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>

        {user ? (
          <>
            <li>
              <Avatar>
                <Avatar.Image src={user?.image} alt="nn" />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </li>
            <li>
              <Button onClick={handleSignOut}>Logout</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>

            <li>
              <Link href={"/signup"}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

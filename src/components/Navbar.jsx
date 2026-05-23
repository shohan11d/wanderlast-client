import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-white p-5">
      <ul className="flex gap-3">
        <li>
          <Link href={"/"}>Home</Link>
        </li>

        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>

        <li>
          <Link href={"/destinations"}>Destinations</Link>
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

      <ul className="flex gap-3">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>

        <li>
          <Link href={"/destinations"}>Login</Link>
        </li>

        <li>
          <Link href={"/signup"}>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}

import TutorCard from "@/components/tutorCard";

export default async function tutorPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`);
  const tutors = await res.json();

  return (
    <div className="max-w-8xl mx-auto bg-[#0f1c2e] min-h-screen p-5">
      <h1 className="text-[#f0ece3] text-2xl font-bold mb-5">All Tutors</h1>

      <div className="grid grid-cols-3 gap-5">
        {tutors.map((tutor)=> (
          <TutorCard key={tutor._id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}

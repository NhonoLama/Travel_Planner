import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import TripDetailClient from "@/components/trip-detail";

export default async function TripDetail({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const session = await auth();
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        <h1 className="text-2xl font-bold">
          Please sign in to view your trip details.
        </h1>
      </div>
    );
  }
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user?.id },
  });

  if (!trip) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        <h1 className="text-2xl font-bold">Trip not found.</h1>
      </div>
    );
  }
  return <TripDetailClient trip={trip} />;
}

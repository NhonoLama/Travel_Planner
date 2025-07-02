import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TripsPage() {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter((trip) => {
    return new Date(trip.startDate) >= today;
  });

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        <h1 className="text-2xl font-bold">
          Please sign in to view your trips.
        </h1>
      </div>
    );
  }
  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href={"/trips/new"}>
          <Button>New Trips</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {session.user?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {trips.length === 0
              ? "Start planning your first tripby clicking the button above."
              : `You have ${trips.length}  ${
                  trips.length === 1 ? "trip" : "trips"
                } planned. ${upcomingTrips.length} of them are upcoming.`}
          </p>
        </CardContent>
        <div className="px-4">
          <h2 className="text-xl font-semibold mb-4">Your Recent Trips</h2>
          {trips.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <h3 className="text-xl font-medium mb-2">No trips yet.</h3>
                <p className="text-center mb-4 max-w-md">
                  Start planning your adventure by creating your first trip.
                </p>
                <Link href={"/trips/new"}>
                  <Button>New Trips</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedTrips.slice(0, 6).map((trip, key) => (
                <Link key={key} href={""}>
                  <Card className="h-full hover: shadow-md transition-shadow">
                    <CardHeader>{trip.title}</CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-2 mb-2">
                        {trip.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {new Date(trip.startDate).toLocaleDateString()} -{" "}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

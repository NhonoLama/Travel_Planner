"use client";

import { useState } from "react";
import { Trip } from "@/app/generated/prisma";
import Image from "next/image";
import { Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TripDetailClientProps {
  trip: Trip;
}

const TripDetailClient = ({ trip }: TripDetailClientProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        </div>
      )}
      <div className="bg-white p-6 shadow roudned-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>
          <div className="flex items-center text-gray-500 mt-2">
            <Calendar className="h-5 w-5 mr-4" />
            <span className="text-lg">
              {trip.startDate.toLocaleDateString()} -{" "}
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button>
              <Plus className="mr-2 h-5 w-5" />
              Add Location
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 mx-4 shadow rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-[16px]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-[16px]">
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="text-[16px]">
              Map
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
              <div className="space-y-4 ">
                <div className="flex items-start">
                  <Calendar className="h-6 w-6 mr-3 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Dates</p>
                  <p className="text-gray-500">
                    {trip.startDate.toLocaleDateString()} -{" "}
                    {trip.endDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripDetailClient;

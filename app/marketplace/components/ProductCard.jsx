"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export function FeaturedProductCard({ title, price, location, image }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-56">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white text-xl">{price}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center text-gray-700 text-lg">
          <MapPin className="h-6 w-6 mr-3 text-green-600" />
          <span>Location: {location}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function SimpleProductCard({
  title,
  description,
  price,
  quantity,
  location,
  category,
  isAvailable,
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
              {title}
            </h3>
            <Badge
              variant={isAvailable ? "default" : "destructive"}
              className="ml-2"
            >
              {isAvailable ? "Available" : "Sold Out"}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

          {/* Price and Quantity */}
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-green-600">{price}</span>
            <div className="flex items-center text-gray-600">
              <Package className="h-4 w-4 mr-1" />
              <span className="text-sm">{quantity}</span>
            </div>
          </div>

          {/* Location and Category */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
            <Badge variant="outline" className="capitalize">
              {category}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

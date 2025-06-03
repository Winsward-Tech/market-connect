import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, CheckCircle } from "lucide-react";

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
  seller,
  location,
  price,
  image,
  phone,
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-56">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-3 py-2 rounded-full text-base font-medium flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Available
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-green-600 font-bold text-xl mb-4">{price}</p>
        <div className="space-y-3">
          <div className="flex items-center text-gray-700 text-lg">
            <MapPin className="h-6 w-6 mr-3 text-green-600" />
            <span>Location: {location}</span>
          </div>
          <div className="flex items-center text-gray-700 text-lg">
            <Phone className="h-6 w-6 mr-3 text-green-600" />
            <span>Call: {phone}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
          Call Seller
        </Button>
      </CardFooter>
    </Card>
  );
}

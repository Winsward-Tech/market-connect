"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AddProductPage() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    // Handle image upload logic here
    console.log("Image upload triggered");
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/marketplace/dashboard">
            <Button variant="ghost" className="text-white p-0 mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Add New Product</h1>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-lg">
                    Product Name
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter product name"
                    className="mt-1 text-lg py-6"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-lg">
                      Price
                    </Label>
                    <Input
                      id="price"
                      placeholder="Enter price"
                      className="mt-1 text-lg py-6"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit" className="text-lg">
                      Unit
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-1 text-lg py-6">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="g">Gram (g)</SelectItem>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="bunch">Bunch</SelectItem>
                        <SelectItem value="bag">Bag</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="category" className="text-lg">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1 text-lg py-6">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-lg">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product..."
                    className="mt-1 text-lg min-h-[100px]"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <Label className="text-lg">Product Images</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500"
                    onClick={handleImageUpload}
                  >
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Add Photo</p>
                  </div>
                  {/* Image previews will be added here */}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <Label htmlFor="location" className="text-lg">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Enter your location"
                  className="text-lg py-6"
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Label htmlFor="phone" className="text-lg">
                  Contact Number
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  className="text-lg py-6"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-lg py-6 px-8"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  List Product
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

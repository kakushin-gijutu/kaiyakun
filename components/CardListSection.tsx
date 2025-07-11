import { client } from "@/lib/client";
import { ServiceResponseType } from "@/lib/type";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

const CardListSection = async ({ category }: { category?: string }) => {
  const { contents: subscriptionServices } =
    await client.get<ServiceResponseType>({
      endpoint: "services",
      queries: {
        filters: `category[contains]${category}`,
      },
    });

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptionServices.map((service) => (
          <Card
            key={service.id}
            className="hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <CardHeader className="bg-white rounded-t-lg">
              <div className="w-full h-24 relative mb-4 transition-transform duration-300 ease-in-out transform group-hover:scale-105">
                <Image
                  src={service.image.url}
                  alt={`${service.title}のロゴ`}
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
              <CardTitle className="text-orange-800">{service.title}</CardTitle>
              <CardDescription className="text-orange-600">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="w-full bg-orange-500 hover:bg-orange-600 mb-2"
              >
                <a
                  href={service.cancel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  解約ページへ
                </a>
              </Button>
              <Button
                asChild
                className="w-full bg-green-500 hover:bg-green-600"
              >
                <a
                  href={service.register_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  登録ページへ
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardListSection;

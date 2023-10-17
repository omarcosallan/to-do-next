import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface AlertProps {
  icon: string;
  description: string;
}

export function Alert({ icon, description }: AlertProps) {
  return (
    <Card className="flex flex-col items-center p-2 space-y-4 sm:w-2/6 text-center">
      <CardHeader>
        <CardTitle className="text-5xl">{icon}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="w-full">{description}</CardDescription>
      </CardContent>
      <CardFooter className="w-full">
        <Button className="w-full">
          <Link href={"/tasks"}>Tasks</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

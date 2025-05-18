import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import type { ReactNode } from "react";

interface CardDashboardProps {
  title: string;
  description: string;
  content?: string;
  icon: ReactNode;
  item?: ReactNode;
}

const CardDashboard = ({
  content,
  description,
  title,
  icon,
  item,
}: CardDashboardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="select-none text-base text-gray-800 sm:text-xl">
            {title}
          </CardTitle>
          {icon}
        </div>
        <CardDescription className="text-xs sm:text-base">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm font-bold sm:text-lg">
          {content}
          {item}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;

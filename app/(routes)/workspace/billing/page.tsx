import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import React from "react";

const Billing = () => {
  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Billing & Subscription
            <Badge variant="outline" className="ml-3">
              Beta
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="info" className="mb-6">
            <Info className="h-5 w-5 text-blue-500" />
            <AlertTitle>Billing in Development</AlertTitle>
            <AlertDescription>
              Billing features are currently in development. You will not be charged at this time.<br />
              <span className="font-medium text-blue-700">
                You will only be charged when paid features are released.
              </span>
            </AlertDescription>
          </Alert>
          <div className="text-gray-600 text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li>All current features are free during the beta period.</li>
              <li>You will be notified before any charges are made.</li>
              <li>Stay tuned for premium features and subscription plans!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
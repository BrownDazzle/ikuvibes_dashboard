import { CreditCard, DollarSign, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/shared/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getTotalLikes } from "@/lib/actions/get-total-revenue";
import { getSalesCount } from "@/lib/actions/get-sales-count";
import { getStockCount } from "@/lib/actions/get-stock-count";
import { formatPrice } from "@/lib/utils";
import Analytics from "@/components/ui/analytics";
import IndexComponent from "@/components/shared/Index";
import { SearchParamProps } from "@/types/index";

const Dashboard = async ({ searchParams }: SearchParamProps) => {
  const query = (searchParams?.query as string) || '';

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <IndexComponent query={query} />
      </div>
    </div>
  );
};

export default Dashboard;

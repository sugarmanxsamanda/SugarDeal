import { DealExplorer } from "@/components/DealExplorer";
import { getDeals } from "@/lib/deals";

export default function Home() {
  const deals = getDeals();

  return <DealExplorer deals={deals} />;
}

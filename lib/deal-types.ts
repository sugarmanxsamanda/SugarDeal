export type DealStatus =
  | "draft"
  | "review_required"
  | "active"
  | "reserved"
  | "sold_out"
  | "hidden";

export type Hotdeal = {
  dealId: string;
  branchName: string;
  region: string;
  address: string;
  nearestStation: string;
  walkingDistanceText: string;
  latitude: string;
  longitude: string;
  searchKeywords: string;
  productType: string;
  normalPriceMonthly: number;
  dealPriceMonthly: number;
  depositPrice: string;
  dealTitle: string;
  dealSummary: string;
  availableFrom: string;
  quantityAvailable: number;
  dealCondition: string;
  contactChannel: string;
  status: DealStatus;
  needsReview: boolean;
  sampleOnly: boolean;
  notes: string;
};

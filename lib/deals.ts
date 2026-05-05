import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import type { DealStatus, Hotdeal } from "@/lib/deal-types";

type RawDeal = {
  deal_id: string;
  branch_name: string;
  region: string;
  address: string;
  nearest_station: string;
  walking_distance_text: string;
  latitude: string;
  longitude: string;
  search_keywords: string;
  product_type: string;
  normal_price_monthly: string;
  deal_price_monthly: string;
  deposit_price: string;
  deal_title: string;
  deal_summary: string;
  available_from: string;
  quantity_available: string;
  deal_condition: string;
  contact_channel: string;
  status: DealStatus;
  needs_review: string;
  sample_only: string;
  notes: string;
};

const csvPath = path.join(process.cwd(), "sample_hotdeals.csv");

export function getDeals(): Hotdeal[] {
  const csv = fs.readFileSync(csvPath, "utf8");
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  }) as RawDeal[];

  return records.map((record) => ({
    dealId: record.deal_id,
    branchName: record.branch_name,
    region: record.region,
    address: record.address,
    nearestStation: record.nearest_station,
    walkingDistanceText: record.walking_distance_text,
    latitude: record.latitude,
    longitude: record.longitude,
    searchKeywords: record.search_keywords,
    productType: record.product_type,
    normalPriceMonthly: Number(record.normal_price_monthly),
    dealPriceMonthly: Number(record.deal_price_monthly),
    depositPrice: record.deposit_price,
    dealTitle: record.deal_title,
    dealSummary: record.deal_summary,
    availableFrom: record.available_from,
    quantityAvailable: Number(record.quantity_available),
    dealCondition: record.deal_condition,
    contactChannel: record.contact_channel,
    status: record.status,
    needsReview: record.needs_review === "true",
    sampleOnly: record.sample_only === "true",
    notes: record.notes
  }));
}

export function getDealById(dealId: string): Hotdeal | undefined {
  return getDeals().find((deal) => deal.dealId === dealId);
}

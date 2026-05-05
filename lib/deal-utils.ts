import type { Hotdeal } from "@/lib/deal-types";

export function getProductTypes(deals: Hotdeal[]) {
  return ["전체", ...Array.from(new Set(deals.map((deal) => deal.productType)))];
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export function getDiscountRate(normalPrice: number, dealPrice: number) {
  if (!normalPrice) {
    return 0;
  }

  return Math.round(((normalPrice - dealPrice) / normalPrice) * 100);
}

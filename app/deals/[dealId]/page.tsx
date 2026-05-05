import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Tag,
  Users
} from "lucide-react";
import { OfficeVisual } from "@/components/OfficeVisual";
import { SiteChrome } from "@/components/SiteChrome";
import { getDealById, getDeals } from "@/lib/deals";
import { formatPrice } from "@/lib/deal-utils";

type DealPageProps = {
  params: Promise<{
    dealId: string;
  }>;
};

function productLabel(productType: string) {
  if (productType.includes("개인룸") || productType.includes("1인실")) return "개인룸";
  return productType;
}

function locationTitle(nearestStation: string, walkingDistanceText: string) {
  const distance = walkingDistanceText === "검수 필요" ? "도보 3분" : walkingDistanceText;
  return `${nearestStation} ${distance}`;
}

export function generateStaticParams() {
  return getDeals().map((deal) => ({
    dealId: deal.dealId
  }));
}

export async function generateMetadata({ params }: DealPageProps) {
  const { dealId } = await params;
  const deal = getDealById(dealId);

  return {
    title: deal ? `${deal.branchName} | 슈가맨워크 핫딜` : "슈가맨워크 핫딜"
  };
}

export default async function DealPage({ params }: DealPageProps) {
  const { dealId } = await params;
  const deal = getDealById(dealId);

  if (!deal) {
    notFound();
  }

  return (
    <main className="hotdealPage detailSurface">
      <SiteChrome />
      <div className="detailWrap">
        <Link className="backLink" href="/">
          <ArrowLeft size={18} />
          핫딜 목록
        </Link>

        <section className="figmaDetailHero">
          <OfficeVisual className="detailHeroVisual" />
          <div className="detailHeroInfo">
            <div className="dealTags">
              <span className="darkTag">{productLabel(deal.productType)}</span>
              <span className="blueTag">즉시 가능</span>
            </div>
            <h1>{deal.branchName}</h1>
            <p>
              {deal.dealCondition} · 남은 수량 {deal.quantityAvailable}개
            </p>
            <div className="locationSummary detailLocation">
              <MapPin size={18} />
              <div>
                <strong>{locationTitle(deal.nearestStation, deal.walkingDistanceText)}</strong>
                <span>내 위치 2.1km · 교통 정보 상담 확인</span>
              </div>
            </div>
            <div className="detailPriceCard">
              <span>정상가 월 {formatPrice(deal.normalPriceMonthly)}원</span>
              <strong>핫딜가 월 {formatPrice(deal.dealPriceMonthly)}원</strong>
              <em>본사 상담으로 계약 조건을 확인합니다.</em>
            </div>
          </div>
        </section>

        <section className="detailContentGrid">
          <div className="detailFactCard">
            <h2>상품 조건</h2>
            <div className="factRows">
              <div>
                <CalendarDays size={18} />
                <span>입주 가능일</span>
                <strong>{deal.availableFrom}</strong>
              </div>
              <div>
                <Building2 size={18} />
                <span>상품 유형</span>
                <strong>{deal.productType}</strong>
              </div>
              <div>
                <Users size={18} />
                <span>남은 수량</span>
                <strong>{deal.quantityAvailable}개</strong>
              </div>
              <div>
                <Tag size={18} />
                <span>특가 조건</span>
                <strong>{deal.dealCondition}</strong>
              </div>
            </div>
          </div>

          <div className="detailForm" role="form" aria-label="본사 상담 문의">
            <h2>본사 상담 문의</h2>
            <label>
              이름
              <input placeholder="홍길동" type="text" />
            </label>
            <label>
              연락처
              <input placeholder="010-0000-0000" type="tel" />
            </label>
            <label>
              희망 상담 시간
              <input placeholder="평일 오후 2시 이후" type="text" />
            </label>
            <label className="checkRow">
              <input type="checkbox" />
              개인정보 수집 및 상담 목적 이용에 동의합니다.
            </label>
            <div className="formActions">
              <button className="bluePill" type="button">
                문의 접수하기
              </button>
              <a className="yellowPill" href="https://pf.kakao.com/" rel="noreferrer" target="_blank">
                <MessageCircle size={17} />
                카카오톡 상담
              </a>
            </div>
          </div>
        </section>

        <section className="detailNotice">
          <h2>상담 전 확인사항</h2>
          <ul>
            <li>
              <CheckCircle2 size={18} />
              가격, 잔여 수량, 계약 조건은 실제 노출 전 최종 검수합니다.
            </li>
            <li>
              <ShieldCheck size={18} />
              본사 상담 후 지점별 실제 이용 가능 여부를 안내합니다.
            </li>
            <li>
              <CalendarDays size={18} />
              결제 연동 전에는 상담 신청을 기준으로 예약 절차를 진행합니다.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

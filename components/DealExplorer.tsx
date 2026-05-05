"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  LocateFixed,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Tag,
  Users
} from "lucide-react";
import { OfficeVisual } from "@/components/OfficeVisual";
import { SiteChrome } from "@/components/SiteChrome";
import type { Hotdeal } from "@/lib/deal-types";
import { formatPrice, getProductTypes } from "@/lib/deal-utils";

type DealExplorerProps = {
  deals: Hotdeal[];
};

const quickFilters = ["가까운순", "즉시 입주", "개인룸"];

function productLabel(productType: string) {
  if (productType.includes("개인룸") || productType.includes("1인실")) return "개인룸";
  return productType;
}

function locationTitle(deal: Hotdeal) {
  const station = deal.nearestStation || deal.region;
  const distance = deal.walkingDistanceText === "검수 필요" ? "도보 3분" : deal.walkingDistanceText;
  return `${station} ${distance}`;
}

function searchableText(deal: Hotdeal) {
  return [
    deal.branchName,
    deal.region,
    deal.address,
    deal.nearestStation,
    deal.searchKeywords,
    deal.productType,
    deal.dealTitle
  ]
    .join(" ")
    .toLowerCase();
}

export function DealExplorer({ deals }: DealExplorerProps) {
  const [selectedType, setSelectedType] = useState("전체");
  const [selectedDealId, setSelectedDealId] = useState(deals[0]?.dealId ?? "");
  const [query, setQuery] = useState("");
  const productTypes = getProductTypes(deals);

  const filteredDeals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return deals.filter((deal) => {
      const typeMatches =
        selectedType === "전체" ||
        deal.productType === selectedType ||
        productLabel(deal.productType) === selectedType;
      const queryMatches = !normalizedQuery || searchableText(deal).includes(normalizedQuery);
      return typeMatches && queryMatches;
    });
  }, [deals, query, selectedType]);

  const visibleDeals = filteredDeals.length > 0 ? filteredDeals : deals;
  const selectedDeal = deals.find((deal) => deal.dealId === selectedDealId) ?? deals[0];
  const nearestDeal = visibleDeals[0] ?? deals[0];

  return (
    <main className="hotdealPage">
      <SiteChrome />

      <section className="landingHero">
        <OfficeVisual className="heroVisual" />
        <div className="heroShade" />
        <div className="heroInner">
          <div className="heroCopy">
            <h1>슈가맨워크 입주 핫딜</h1>
            <p>입주 가능한 지점의 개인룸, 자유석, 비상주 특가를 한 화면에서 확인하고 본사 상담으로 바로 연결하세요.</p>
            <div className="heroButtons">
              <a className="bluePill" href="#deals">
                핫딜 상품 보기
              </a>
              <a className="navyPill" href="#inquiry">
                본사 상담
              </a>
            </div>
          </div>

          <div className="heroSearchPanel" aria-label="위치 검색">
            <label className="searchField">
              <Search size={17} />
              <input
                aria-label="지역, 지하철역, 지점명 검색"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="지역, 지하철역, 지점명을 검색하세요"
                type="search"
                value={query}
              />
            </label>
            <button className="nearButton" type="button">
              <LocateFixed size={17} />
              내 주변 핫딜
            </button>
            <div className="quickFilterRow" aria-label="빠른 필터">
              {quickFilters.map((filter) => (
                <button
                  className={filter === "가까운순" ? "quickFilter active" : "quickFilter"}
                  key={filter}
                  onClick={() => {
                    if (filter === "개인룸") setSelectedType("1인실(개인룸)");
                  }}
                  type="button"
                >
                  {filter}
                </button>
              ))}
              <span>예: 신중동역 도보 3분 · 내 위치에서 2.1km</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dealShell" id="deals">
        <div className="sectionLead">
          <div>
            <h2>이번 주 한정 핫딜</h2>
            <p>상품 수량과 조건은 상담 시 최종 확인됩니다.</p>
          </div>
          <div className="typeFilters" aria-label="상품 유형 필터">
            {productTypes.map((type) => (
              <button
                className={selectedType === type ? "typeFilter active" : "typeFilter"}
                key={type}
                onClick={() => setSelectedType(type)}
                type="button"
              >
                {type === "1인실(개인룸)" ? "개인룸" : type}
              </button>
            ))}
          </div>
        </div>

        <div className="locationSummary">
          <MapPin size={18} />
          <div>
            <strong>{nearestDeal ? locationTitle(nearestDeal) : "가까운 지점 검색"}</strong>
            <span>
              {nearestDeal
                ? `내 위치 기준 2.1km · ${productLabel(nearestDeal.productType)} ${nearestDeal.quantityAvailable}개`
                : "지역 또는 지하철역을 검색해보세요."}
            </span>
          </div>
        </div>

        <div className="dealGrid">
          {visibleDeals.map((deal) => (
            <article className="figmaDealCard" key={deal.dealId}>
              <OfficeVisual className="cardVisual" />
              <div className="cardBody">
                <div className="dealTags">
                  <span className="darkTag">{productLabel(deal.productType)}</span>
                  <span className="blueTag">잔여 {deal.quantityAvailable}개</span>
                </div>
                <h3>{deal.branchName}</h3>
                <p>{deal.dealCondition}</p>
                <span className="locationLine">
                  <MapPin size={14} />
                  {locationTitle(deal)}
                </span>
                <div className="priceLines">
                  <span>정상가 월 {formatPrice(deal.normalPriceMonthly)}원</span>
                  <strong>핫딜가 월 {formatPrice(deal.dealPriceMonthly)}원</strong>
                </div>
                <div className="cardActionRow">
                  <Link className="cardDetail" href={`/deals/${deal.dealId}`}>
                    상세보기
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    className="cardInquiry"
                    href="#inquiry"
                    onClick={() => setSelectedDealId(deal.dealId)}
                  >
                    본사 상담 문의
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="locationFinder" id="location">
        <div className="mapPreview" aria-hidden="true">
          <span className="mapRoad roadA" />
          <span className="mapRoad roadB" />
          <span className="mapRoad roadC" />
          <span className="mapRoad roadD" />
          <span className="mapPin" />
          <strong>현 위치 주변</strong>
        </div>
        <div className="locationFinderCopy">
          <h2>내 주변 핫딜 찾기</h2>
          <p>위치 권한을 허용하면 가까운 지점부터 보여주고, 권한을 거부해도 지역명이나 지하철역으로 검색할 수 있습니다.</p>
          <button className="bluePill wide" type="button">
            <LocateFixed size={17} />
            내 위치 사용하기
          </button>
          <div className="suggestionRow">
            <button type="button">신중동역</button>
            <button type="button">부평역</button>
            <button type="button">미아사거리역</button>
          </div>
        </div>
      </section>

      <section className="inquiryBand" id="inquiry">
        <div className="inquiryIntro">
          <span>Consultation</span>
          <h2>본사 상담 문의</h2>
          <p>선택한 핫딜 상품을 기준으로 상담원이 연락드립니다. 실제 계약 전 가격, 수량, 입주 가능 여부를 다시 확인합니다.</p>
          {selectedDeal && (
            <div className="selectedDealBox">
              <strong>{selectedDeal.branchName}</strong>
              <span>
                {productLabel(selectedDeal.productType)} · 월 {formatPrice(selectedDeal.dealPriceMonthly)}원 ·{" "}
                {selectedDeal.availableFrom}
              </span>
            </div>
          )}
        </div>

        <form className="figmaInquiryForm" onSubmit={(event) => event.preventDefault()}>
          <label>
            관심 상품
            <select value={selectedDealId} onChange={(event) => setSelectedDealId(event.target.value)}>
              {deals.map((deal) => (
                <option key={deal.dealId} value={deal.dealId}>
                  {deal.branchName} · {productLabel(deal.productType)}
                </option>
              ))}
            </select>
          </label>
          <div className="formColumns">
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
          </div>
          <label className="checkRow">
            <input type="checkbox" />
            개인정보 수집 및 상담 목적 이용에 동의합니다.
          </label>
          <div className="formActions">
            <button className="bluePill" type="submit">
              문의 접수하기
            </button>
            <a className="yellowPill" href="https://pf.kakao.com/" rel="noreferrer" target="_blank">
              <MessageCircle size={17} />
              카카오톡 상담
            </a>
          </div>
        </form>
      </section>

      <aside className="floatingActions" aria-label="빠른 상담">
        <a className="proposalBubble" href="#inquiry">
          입점제안
        </a>
        <a className="inquiryBubble" href="#inquiry">
          문의하기
        </a>
      </aside>

      <section className="trustStrip" aria-label="서비스 안내">
        <div>
          <ShieldCheck size={18} />
          본사 상담 연결
        </div>
        <div>
          <CalendarDays size={18} />
          즉시 입주 우선 노출
        </div>
        <div>
          <CheckCircle2 size={18} />
          조건 확인 후 안내
        </div>
        <div>
          <Users size={18} />
          지점별 잔여 수량 관리
        </div>
        <div>
          <Tag size={18} />
          특가 조건 비교
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export function SiteChrome() {
  return (
    <header className="siteChrome">
      <div className="eventBar">
        <span>NEW</span>
        <strong>신규 이벤트를 확인해보세요!</strong>
        <button aria-label="이벤트 배너 닫기" type="button">
          ×
        </button>
      </div>
      <nav className="siteNav" aria-label="슈가맨워크 핫딜 메뉴">
        <Link className="logoText" href="/">
          SUGARMANWORK
        </Link>
        <div className="navLinks">
          <a href="#deals">온라인비상주</a>
          <a href="#location">지점찾기</a>
          <a href="#deals">제휴혜택</a>
          <a href="#inquiry">가맹안내</a>
        </div>
        <a className="navCta" href="#inquiry">
          방문예약
        </a>
        <button className="navMenu" aria-label="메뉴 열기" type="button">
          ☰
        </button>
      </nav>
    </header>
  );
}

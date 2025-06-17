# 📚 CERTICOS BOOKS - 도서 검색 애플리케이션

> React + TypeScript + Emotion을 활용한 도서 검색 및 찜하기 서비스

## 🌐 배포 URL

**Live Demo:** https://mata0406.github.io/cdri-books-jungjinho/

---

## 🚀 프로젝트 시작하기

### 필수 조건

- Node.js 16+
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/MATA0406/cdri-books-jungjinho.git
cd cdri-books-jungjinho

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 확인
# http://localhost:5173
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

---

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Button, Input, Dropdown 등)
│   ├── book/           # 도서 관련 컴포넌트
│   └── layout/         # 레이아웃 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 훅
├── api/                # API 호출 로직
├── types/              # TypeScript 타입 정의
├── styles/             # 전역 스타일 및 테마
└── assets/             # 정적 리소스
```

---

## ✨ 주요 기능

### 🔍 도서 검색

- **카카오 도서 검색 API** 연동
- **실시간 검색** 및 **검색 기록** 관리
- **무한 스크롤**을 통한 추가 데이터 로딩

### 🎯 상세 검색

- **필터 기능**: 제목/저자/출판사별 검색
- **검색 조건**에 따른 정확한 결과 제공

### ❤️ 찜하기 기능

- **로컬스토리지** 기반 영구 데이터 저장
- **브라우저 종료 후에도 데이터 유지**
- **찜한 책 전용 페이지** 제공

---

## 🛠 기술 스택

### Core

- **React 19** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성 및 개발자 경험 향상
- **Vite** - 빠른 개발 서버 및 빌드 도구

### State Management & Data Fetching

- **TanStack React Query** - 서버 상태 관리 및 캐싱
- **Custom Hooks** - 로직 재사용 및 관심사 분리

### Styling

- **Emotion** - CSS-in-JS 스타일링
- **디자인 시스템** - 일관된 UI/UX를 위한 테마 시스템

### API

- **Axios** - HTTP 클라이언트
- **카카오 도서 검색 API** - 도서 데이터 제공

---

## 🎯 개발 철학 및 설계 원칙

### 1. **코드 가독성**

- **명확한 네이밍 컨벤션** 적용
- **컴포넌트 단위** 파일 분리
- **TypeScript 타입 정의**로 코드 의도 명확화

### 2. **재사용성**

- **Custom Hooks**로 로직 재사용

### 3. **유지보수성**

- **단일 책임 원칙** (SRP) 준수
- **Props 인터페이스** 명확히 정의
- **API 에러 핸들링** 및 **로딩 상태 관리**

### 4. **성능 최적화**

- **React Query**를 통한 **데이터 캐싱**
- **무한 스크롤**로 **점진적 로딩**
- **useCallback**을 활용한 리렌더링 최적화

---

## 🔧 성능 최적화 전략

### 1. **데이터 캐싱**

```typescript
// React Query를 활용한 캐싱 전략
useInfiniteQuery({
  queryKey: ['books', 'search', query, target],
  staleTime: 5 * 60 * 1000, // 5분
  gcTime: 10 * 60 * 1000, // 10분
});
```

### 2. **무한 스크롤**

- **Intersection Observer API** 활용
- **페이지네이션** 대신 **점진적 로딩**
- **사용자 경험** 향상

### 3. **번들 최적화**

- **Vite**의 **코드 스플리팅** 활용
- **트리 쉐이킹**으로 불필요한 코드 제거

---

## 👨‍💻 개발자

**MATA0406** - jinho_46@naver.com

---

_이 프로젝트는 프론트엔드 개발 역량을 보여주기 위한 사전과제입니다._

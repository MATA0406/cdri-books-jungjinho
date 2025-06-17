# 📚 CERTICOS BOOKS - 도서 검색 애플리케이션

> React + TypeScript + Emotion을 활용한 도서 검색 및 찜하기 서비스

## 🌐 배포 URL

**Live Demo:** https://mata0406.github.io/cdri-books-jungjinho/

---

## 📋 프로젝트 개요

카카오 도서 검색 API를 활용한 **모던 웹 애플리케이션**입니다. 사용자가 도서를 검색하고, 상세 필터를 통해 정확한 결과를 찾으며, 관심 있는 책을 찜할 수 있는 기능을 제공합니다. **성능 최적화**와 **사용자 경험**에 중점을 두어 개발되었습니다.

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

## 📁 프로젝트 구조 및 주요 코드

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   │   ├── SearchBox.tsx    # 검색 입력 및 상세 검색 팝업
│   │   ├── Dropdown.tsx     # 필터 선택 드롭다운
│   │   ├── Toast.tsx        # 토스트 알림 시스템
│   │   └── ...
│   ├── book/           # 도서 관련 컴포넌트
│   │   ├── BookList.tsx     # 검색 결과 무한 스크롤 리스트
│   │   ├── BookListItem.tsx # 개별 도서 아이템
│   │   └── LikedBooksList.tsx # 찜한 책 목록
│   └── layout/         # 레이아웃 컴포넌트
├── hooks/              # 커스텀 훅
│   ├── useInfiniteBookSearch.ts # 무한 스크롤 검색 로직
│   └── useLikedBooks.ts         # 찜하기 로컬스토리지 관리
├── api/                # API 호출 로직
│   └── books.ts        # 카카오 도서 검색 API
├── types/              # TypeScript 타입 정의
├── styles/             # 전역 스타일 및 테마
└── assets/             # 정적 리소스
```

### 🔑 핵심 코드 설명

#### 1. **무한 스크롤 구현** (`useInfiniteBookSearch.ts`)

```typescript
export const useInfiniteBookSearch = ({ query, target, enabled }) => {
  return useInfiniteQuery({
    queryKey: ['books', 'search', query, target],
    queryFn: ({ pageParam }) => searchBooks({ query, page: pageParam, target }),
    getNextPageParam: lastPage =>
      !lastPage.meta.is_end ? lastPage.meta.page + 1 : undefined,
    enabled: Boolean(query?.trim()),
  });
};
```

#### 2. **찜하기 로컬스토리지 관리** (`useLikedBooks.ts`)

```typescript
export const useLikedBooks = () => {
  const [likedBooks, setLikedBooks] = useState<Map<string, Book>>(new Map());

  const toggleLike = useCallback((book: Book) => {
    setLikedBooks(prev => {
      const newMap = new Map(prev);
      newMap.has(book.isbn)
        ? newMap.delete(book.isbn)
        : newMap.set(book.isbn, book);
      saveToLocalStorage(newMap);
      return newMap;
    });
  }, []);
};
```

#### 3. **Intersection Observer 활용** (`BookList.tsx`)

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
  });
  if (intersectionRef.current) observer.observe(intersectionRef.current);
  return () => observer.disconnect();
}, [handleIntersection]);
```

---

## ✨ 주요 기능

### 🔍 도서 검색

- **카카오 도서 검색 API** 연동
- **실시간 검색** 및 **검색 기록** 관리
- **무한 스크롤**을 통한 추가 데이터 로딩

### 🎯 상세 검색

- **필터 기능**: 제목/저자/출판사별 검색
- **드롭다운 UI**로 직관적인 필터 선택
- **검색 조건**에 따른 정확한 결과 제공

### ❤️ 찜하기 기능

- **로컬스토리지** 기반 영구 데이터 저장
- **브라우저 종료 후에도 데이터 유지**
- **찜한 책 전용 페이지** 제공
- **10개씩 무한 스크롤** 적용

### 🎉 사용자 피드백

- **토스트 알림**: 찜하기/해제 시 즉시 피드백
- **로딩 상태**: 검색 중, 데이터 로딩 중 표시
- **에러 처리**: API 오류 시 사용자 친화적 메시지

---

## 🛠 기술 스택 및 라이브러리 선택 이유

### Core

- **React 19** - 최신 기능과 성능 향상, 동시성 기능 활용
- **TypeScript** - 컴파일 타임 에러 방지, 코드 가독성 및 유지보수성 향상
- **Vite** - 빠른 개발 서버, ESM 기반 번들링으로 개발 경험 향상

### State Management & Data Fetching

- **TanStack React Query**
  - **선택 이유**: 서버 상태 관리의 표준, 강력한 캐싱 시스템
  - **장점**: 백그라운드 업데이트, 에러 처리, 로딩 상태 자동 관리
- **Custom Hooks**
  - **선택 이유**: 로직 재사용과 관심사 분리
  - **장점**: 컴포넌트 간 로직 공유, 테스트 용이성

### Styling

- **Emotion**
  - **선택 이유**: CSS-in-JS의 성능과 개발자 경험 균형
  - **장점**: 타입스크립트 지원, 동적 스타일링, 번들 크기 최적화
- **디자인 시스템**
  - **선택 이유**: 일관된 UI/UX 제공
  - **장점**: 테마 기반 스타일링, 재사용 가능한 컴포넌트

### API & UI

- **Axios**
  - **선택 이유**: 풍부한 기능과 에러 처리
  - **장점**: 인터셉터, 타임아웃, 자동 JSON 변환
- **react-hot-toast**
  - **선택 이유**: 가볍고 커스터마이징 가능한 토스트 라이브러리
  - **장점**: 작은 번들 크기, 애니메이션, 접근성 지원

---

## 🎯 강조하고 싶은 기능

### 1. 🚀 **성능 최적화된 무한 스크롤**

- **Intersection Observer API** 활용으로 성능 최적화
- **React Query**의 캐싱으로 중복 요청 방지
- **검색 결과와 찜한 책 모두**에 적용

### 2. 🎨 **사용자 중심 UX 설계**

- **즉시 피드백**: 토스트 알림으로 사용자 액션에 즉시 반응
- **직관적 UI**: 드롭다운 필터, 하트 아이콘 상태 변화
- **로딩 상태 관리**: 모든 비동기 작업에 적절한 피드백

### 3. 💾 **안정적인 데이터 관리**

- **로컬스토리지 기반** 찜하기 기능으로 데이터 영속성 보장
- **에러 처리**: 로컬스토리지 오류 상황 대비
- **상태 동기화**: 찜하기 상태의 실시간 반영

### 4. 🔍 **고도화된 검색 기능**

- **다중 필터**: 제목, 저자, 출판사별 정확한 검색
- **검색 기록**: 이전 검색어 저장 및 재사용
- **실시간 검색**: 입력 즉시 결과 반영

### 5. 🛡️ **타입 안전성과 코드 품질**

- **TypeScript** 전면 적용으로 런타임 에러 방지
- **인터페이스 정의**로 컴포넌트 간 계약 명확화
- **ESLint + Prettier**로 일관된 코드 스타일

---

## 🔧 성능 최적화 전략

### 1. **데이터 캐싱**

```typescript
useInfiniteQuery({
  queryKey: ['books', 'search', query, target],
  staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
});
```

### 2. **무한 스크롤**

- **Intersection Observer API** 활용으로 스크롤 이벤트 대비 성능 향상
- **점진적 로딩**으로 초기 렌더링 시간 단축

### 3. **번들 최적화**

- **Vite**의 코드 스플리팅과 트리 쉐이킹
- **동적 import**로 필요한 시점에만 로드

---

## 👨‍💻 개발자

**MATA0406** - jinho_46@naver.com

---

_이 프로젝트는 프론트엔드 개발 역량을 보여주기 위한 사전과제입니다._

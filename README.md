# DCAT project page

NeurIPS 2026 Spotlight project page for **Strong Helps Weak: Directional Cross-Modal Alignment Transfer in Multi-modal LLMs**.

## 미리보기

빌드나 패키지 설치 없이 작동하는 HTML/CSS/JavaScript 페이지입니다.

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

브라우저에서 http://127.0.0.1:4173 을 엽니다. 정적 호스팅의 하위 경로에서도 작동하도록 모든 로컬 링크는 상대 경로입니다.

## 구성

- `index.html`: 논문 제목, 저자, 설명, BibTeX, 페이지 구조
- `style.css`: 반응형 디자인, 모션 감소 설정, 색상 및 타이포그래피
- `app.js`: Table 2 수치, 모달리티/백본별 차트·전체 비교표, 그림 확대, 인용 복사
- `DCAT.pdf`: 비공개 로컬 원본. Git 추적 및 사이트 배포에서 제외합니다.
- `assets/figures/`: 교체 가능한 논문 그림
- `scripts/extract-figures.sh`: Poppler로 300 DPI 그림을 다시 추출
- `.nojekyll`: 정적 파일을 그대로 배포하도록 설정
- `scripts/pages-workflow.example.yml`: 향후 Actions 배포 전환용 예시 (현재 미사용)

## 그림 교체

아래 PNG를 같은 파일명으로 교체하면 즉시 반영됩니다. SVG나 다른 확장자를 쓰려면 `index.html`의 `src`와 `data-figure`를 함께 바꾸세요.

| 파일 | 출처 | 현재 크기 | 사용 |
| --- | --- | --- | --- |
| `alignment-correlation.png` | PDF p.4, Figure 2 | 1670 × 560 | Evidence 왼쪽, 확대 보기 |
| `alignment-layerwise.png` | PDF p.9, Figure 4 | 1670 × 630 | Evidence 오른쪽, 확대 보기 |
| `paper-concept.png` | PDF p.2, Figure 1 | 680 × 685 | 원본 개념 그림 보관용 |

첫 화면의 도식은 HTML/SVG로 만든 개념 설명이며 실험 데이터 시각화가 아닙니다. 논문 그림 자체를 수정하거나 재작성하지 않았습니다. PDF의 레이아웃이 변경되면 추출 좌표도 조정해야 합니다.

## 데이터와 공개 전 확인

- Spotlight 표기는 저자가 제공한 선정 정보를 반영했습니다.
- 헤드라인 +29.55% / +24.92%는 논문의 요약 수치를 그대로 사용했습니다.
- 차트·비교표는 Table 2의 보고 수치입니다. 차트의 상대 개선율은 표에 인쇄된 소수점 두 자리 점수로 계산하므로, 본문의 반올림 수치와 0.01%p 정도 다를 수 있습니다. 예: MuCho-Music 100.93% vs 본문 100.92%.
- 표의 Average 열 역시 논문에 인쇄된 값을 그대로 보존했습니다. 새로 재계산한 평균이 아닙니다.
- 저자 순서와 소속은 PDF 첫 페이지를 따랐습니다.
- BibTeX는 현재 제공된 서지 정보로 구성했습니다. 최종 proceedings 정보가 나오면 업데이트하세요.
- GitHub Code 버튼은 https://github.com/Hyun1A/DCAT 로 연결됩니다.
- arXiv 버튼은 Coming soon으로 표시했습니다. 공개 URL이 확정되면 `resource-actions`의 해당 `<button disabled>`를 실제 URL을 가진 `<a>`로 바꾸고 Coming soon 표시를 제거하세요.
- Hoigi Seo 이름은 https://seohoiki3215.github.io 로 연결됩니다.
- Byung Hyun Lee 이름은 https://hyun1a.github.io 로 연결됩니다.
- Se Young Chun 이름은 https://icl.snu.ac.kr 로 연결됩니다.
- Google Fonts에서 DM Sans/Manrope를 불러옵니다. 연결이 없으면 로컬 sans-serif로 표시되며 사이트 기능은 유지됩니다.

## GitHub Pages 배포

프로젝트 페이지 저장소: https://github.com/seohoiki3215/DCAT_project_page

공개 페이지: https://seohoiki3215.github.io/DCAT_project_page/

현재 GitHub Pages는 `main` 브랜치의 루트 폴더에서 배포합니다. 변경 사항을 `main`에 push하면 자동으로 반영됩니다.

```sh
git add index.html style.css app.js assets README.md
git commit -m "Update project page"
git push origin main
```

저장소 **Settings → Pages**에서 `Deploy from a branch`, `main`, `/ (root)`를 사용합니다. 별도 빌드나 패키지 설치는 필요하지 않습니다. 임시 검토 파일은 `.gitignore`로 제외됩니다.

현재 GitHub 인증에는 workflow 작성 권한이 없어 브랜치 기반 배포를 사용합니다. 추후 Actions로 전환할 경우 `scripts/pages-workflow.example.yml`을 `.github/workflows/pages.yml`로 옮긴 후 필요한 권한을 갖춘 인증으로 push하고 Pages Source를 GitHub Actions로 변경하세요.

# interaction-web

### 각 스크롤 섹션의 높이 세팅

    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum(5) * window.innerHeight;
    윈도우 높이에 heightNum = 5를 곱하여 sceneInfo[i] 배열마다 높이를 세팅.

    type: "sticky" 와 type: "normal" = sticky는 고정 normal은 스크롤이 올라가도록 세팅.

### 스크롤 이벤트 추가

    윈도우 이벤트 scroll, resize를 사용하여 스크롤과 화면 크기 변환 시 이벤트가 적용되도록 세팅.\

### 전체 스크롤 높이중 현재 씬의 높이 계산

    let prevScrollHeight = 0;
    현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션들의 높이값의 합

    let currentScene = 0;
    현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

    prevScrollHeight += sceneInfo[i].scrollHeight;
    반복문을 사용하여 섹션들의 높이를 더해주었다.

### 섹션 구분 수정, 바운스 방지

    yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight
    총 스크롤 한 높이가 현재를 제외한 이전 스크롤된 총 높이와 현재 섹션의 높이 합보다 클 경우 currentScene++ 현재 씬을 올려주고

    yOffset < prevScrollHeight
    총 스크롤 한 높이가 현재를 제외한 이전 스크롤된 총 높이보다 작을 경우 currentScene-- 현재 씬을 내린다.
    if (currentScene === 0) return; 현재 씬이 0일 경우 리턴하여 0보다 아래 값을 가질 수 없도록 한다. (바운스 경우)

### 화면 크기에 따른 캔버스 크기 작업

    Window : 600 * 900 = 6:9
    Canvas : 1920 * 1080 = 16:9

    현재 창 사이즈와 캔버스 사이즈가 이렇다고 할 때,

    const recalculatedInnerWidth(0.31) = window.innerWidth(600) / canvasScaleRatio(1920);
    const recalculatedInnerHeight(0.83) = window.innerHeight(900) / canvasScaleRatio(1080);

    let canvasScaleRatio;
    if (widthRatio <= heightRatio) {
        // 캔버스보다 브라우저 창이 홀쭉한 경우
        canvasScaleRatio = heightRatio;
        console.log("heightRatio로 결정");
    } else {
        // 캔버스보다 브라우저 창이 납작한 경우
        canvasScaleRatio = widthRatio;
        console.log("widthRatio로 결정");
    }

    여기서 heightRatio가 더 크므로 scale(0.83)을 적용하면
    1920 * 0.833 = 1600, 1080 * 0.833 = 900, 즉 1600 * 900의 크기가 된다. (윈도우의 6:9 비율에 맞춰 캔버스의 크기가 줄어듦)


    이 1600 * 900 캔버스의 원본 높이를 유지한 채 ratio를 16:9(캔버스) → 6:9(윈도우)로 변환하면 720 * 1080이 된다. (윈도우와 비슷하게 6:9 비율로 홀쭉해짐)
    이걸 구하는 게 600 / 0.833, 900 / 0.833 계산 식. 줄어든 scale 만큼 나눠서 원래 비율을 찾는다.

### 섹션2 -> 섹션3 갑작스러운 이미지 노출 수정, 스크롤에 따른 이미지 블렌딩 준비

    섹션2에서 scrollRatio > 0.9 일때 섹션 3의 애니메이션을 뺀 캔버스 이미지를 사용하여 섹션3에서 갑작스럽게 나타나는 이미지 노출을 수정

    섹션3에서 이미지가 윈도우 상단에 닿기 전과 후로 나누어 조건문을 만들고 CSS sticky 클래스를 추가하거나 제거한다.

    상단에 닿은 후 (step = 2)를 주고
    objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`
    Transform으로 줄어든 캔버스 비율에 맞게 계산하여 캔버스의 상단 위치를 수정한다.

### 이미지 블렌딩 추가

    values.rect1X[2].end 로 주어 이미지가 전체 화면에 꽉찬 끝나는 지점을 이미지 블렌딩 시작 지점으로 선택한다.

    drawImage 함수의 현재 이미지의 원하는 영역과 넓이, 높이를 캔버스 이미지의 영역에 넓이, 높이를 그린다.

    스크롤에 따른 이미지를 그리는 것이고 현재 이미지의 높이 - blendHeight를 Y값 시작점으로 두어 밑에서 부터 이미지를 그린다.

#### 2022-12-06 이미지 블렌딩 추가

#### 2022-12-05 섹션2 -> 섹션3 갑작스러운 이미지 노출 수정, 스크롤에 따른 이미지 블렌딩 준비 (scroll-section-3)

#### 2022-12-01 화면 크기에 따른 캔버스 크기 작업 (scroll-section-3)

#### 2022-11-30 사진 추가, 스크롤에 따른 비디오 인터랙션 적용 (scroll-section-1,2)

#### 2022-11-21 네비게이션 바 position absolute 고정, 섹션 구분 수정, 바운스 방지

#### 2022-11-20 전체 스크롤 높이중 현재 씬의 높이 계산

#### 2022-11-18 스크롤 이벤트 추가

#### 2022-11-17 HTML, CSS, default CSS 추가, 각 스크롤 섹션의 높이 세팅

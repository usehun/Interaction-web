# interaction-web

## 화면 크기에 따른 캔버스 크기 작업

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
    1920*0.833 = 1600, 1080*0.833 = 900, 즉 1600*900의 크기가 된다. (윈도우의 6:9 비율에 맞춰 캔버스의 크기가 줄어듦)


    이 1600*900 캔버스의 원본 높이를 유지한 채 ratio를 16:9(캔버스) → 6:9(윈도우)로 변환하면 720*1080이 됩니다. (윈도우와 비슷하게 6:9 비율로 홀쭉해짐)
    이걸 구하는 게 600/0.833, 900/0.833 계산 식. 줄어든 scale 만큼 나눠서 원래 비율을 찾는다.

#### 2022-12-01 화면 크기에 따른 캔버스 크기 작업 (scroll-section-3)

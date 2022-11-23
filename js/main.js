(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션들의 높이값의 합
  let currentScene = 0; //현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },

      values: {
        messageA_opacity: [200, 700],
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      //
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollheight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollheight += sceneInfo[i].scrollHeight;

      if (totalScrollheight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    rv = parseInt(scrollRatio * (values[1] - values[0]));
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {
      case 0:
        console.log(calcValues(values.messageA_opacity, currentYOffset));
        // let messageA_opacity_0 = values.messageA_opacity[0];
        // let messageA_opacity_1 = values.messageA_opacity[1];
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      // 이전 진행된 스크롤 값 = i번째 sceneInfo의 scrollHeight값.
      // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
      // += -> 왼쪽의 피연산자에 오른쪽의 피연산자를 더한 후, 그 결괏값을 왼쪽의 피연산자에 대입함.
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  // window.addEventListener("DOMContentLoaded", setLayout);
  window.addEventListener("load", setLayout);
  window.addEventListener("resize", setLayout);
})();

// console.log("dgsfs");

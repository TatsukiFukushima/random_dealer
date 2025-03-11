document.addEventListener("DOMContentLoaded", () => {
  const imageContainers = Array.from(document.getElementsByClassName("image-container"));
  const resetButton = document.getElementById("reset-btn");
  const sortButton = document.getElementById("sort-btn");
  const images = Array.from(document.getElementsByClassName("random-image"));
  const foldimages = Array.from(document.getElementsByClassName("fold-image"));
  const imageCountInput = document.getElementById("image-count");
  let lastTouched = 0;
  
  // 画像ファイル名の配列
  const imageFilenames = [
    "As.png", "Ah.png", "Ad.png", "Ac.png",
    "2s.png", "2h.png", "2d.png", "2c.png",
    "3s.png", "3h.png", "3d.png", "3c.png",
    "4s.png", "4h.png", "4d.png", "4c.png",
    "5s.png", "5h.png", "5d.png", "5c.png",
    "6s.png", "6h.png", "6d.png", "6c.png",
    "7s.png", "7h.png", "7d.png", "7c.png",
    "8s.png", "8h.png", "8d.png", "8c.png",
    "9s.png", "9h.png", "9d.png", "9c.png",
    "Ts.png", "Th.png", "Td.png", "Tc.png",
    "Js.png", "Jh.png", "Jd.png", "Jc.png",
    "Qs.png", "Qh.png", "Qd.png", "Qc.png",
    "Ks.png", "Kh.png", "Kd.png", "Kc.png"
  ];

  // 残っている画像ファイル名の配列
  let existImageFileNames = [];

  // ランダムな画像ファイル名を取得する
  function getRandomImageFilenames(imageCount) {
    let randomFilenames = [];
    existImageFileNames = imageFilenames.slice(0, imageFilenames.length);
    for (let i = 0; i < imageCount*6; i++) {
      let randomIndex = Math.floor(Math.random() * existImageFileNames.length);
      randomFilenames.push(existImageFileNames.splice(randomIndex, 1)[0]);
    }
    return randomFilenames;
  }

  // ランダムな画像ファイルを配置する
  function setRandomImageSources() {
    // ハンドを表示
    imageContainers.forEach((imageContainer) => {
      imageContainer.style.display = "";
    });

    // ランダムなカードの配置
    const imageCount = parseInt(imageCountInput.value);
    const randomFilenames = getRandomImageFilenames(imageCount);
    for (let i = 0; i < 6; i++) {
      images.slice(i*6, i*6+imageCount).forEach((image, index) => {
        image.src = randomFilenames[i*imageCount+index];
        image.style.display = "";
      });
      images.slice(i*6+imageCount, i*6+6).forEach((image) => {
        image.src = '';
        image.style.display = "none";
      });
    }

    // ソート
    onSortClick()
  }

  // 画像をクリックした場合の処理
  function onImageClick(event) {
    const now = new Date();
    if (existImageFileNames.length === 0 || now.getTime()-lastTouched < 200) {
      return;
    }
    lastTouched = now.getTime();


    let randomIndex = Math.floor(Math.random() * existImageFileNames.length);
    event.target.src = "gray.png"
    var setImage = function(event) {
      return function() {
        event.target.src = existImageFileNames.splice(randomIndex, 1)[0];
      };
    };
    setTimeout(setImage(event), 100); 
  }

  // foldをクリックした場合の処理
  function onFoldClick(event) {
    const now = new Date();
    if (now.getTime()-lastTouched < 200) {
      return;
    }
    lastTouched = now.getTime();

    event.target.parentElement.style.display = "none";
  }

  // ソートボタンをクリックした場合の処理
  function onSortClick() {
    const now = new Date();
    if (now.getTime()-lastTouched < 200) {
      return;
    }
    lastTouched = now.getTime();

    // ソート処理
    imageContainers.forEach((imageContainer) => {
      if (imageContainer.style.display === "none") {
        return;
      }

      // ソート前の画像を取得
      const beforeImagesIncludeNone = Array.from(imageContainer.getElementsByClassName("random-image"));
      const beforeImages = beforeImagesIncludeNone.filter(image => image.style.display !== "none");

      // imageFilenamesのインデックスを取得
      const beforeIndexes = beforeImages.map((image) => {
        return imageFilenames.indexOf(image.src.split("/").pop());
      });

      // ソート
      beforeIndexes.sort((a, b) => a - b);

      // ソート後の画像を再配置
      beforeIndexes.forEach((index, i) => {
        beforeImages[i].src = imageFilenames[index];
      });
    });
  }

  images.forEach((image) => {
    image.addEventListener("click", onImageClick);
  });
  foldimages.forEach((foldImage) => {
    foldImage.addEventListener("click", onFoldClick);
  });
  imageCountInput.addEventListener("input", setRandomImageSources);
  resetButton.addEventListener("click", setRandomImageSources);
  sortButton.addEventListener("click", onSortClick);

  setRandomImageSources(); // 初回の画像表示
});
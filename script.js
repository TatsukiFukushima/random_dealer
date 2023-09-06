document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("reset-btn");
  const images = Array.from(document.getElementsByClassName("random-image"));
  const imageCountInput = document.getElementById("image-count");
  let lastTouched = 0;
  
  // 画像ファイル名の配列
  const imageFilenames = [
    "As.png", "2s.png", "3s.png", "4s.png", "5s.png", "6s.png", "7s.png", "8s.png", "9s.png", "Ts.png", "Js.png", "Qs.png", "Ks.png",
    "Ah.png", "2h.png", "3h.png", "4h.png", "5h.png", "6h.png", "7h.png", "8h.png", "9h.png", "Th.png", "Jh.png", "Qh.png", "Kh.png",
    "Ad.png", "2d.png", "3d.png", "4d.png", "5d.png", "6d.png", "7d.png", "8d.png", "9d.png", "Td.png", "Jd.png", "Qd.png", "Kd.png",
    "Ac.png", "2c.png", "3c.png", "4c.png", "5c.png", "6c.png", "7c.png", "8c.png", "9c.png", "Tc.png", "Jc.png", "Qc.png", "Kc.png"
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
  }

  // 画像をクリックした場合の処理
  function onImageClick(event) {
    const now = new Date();
    if (existImageFileNames.length > 0 && now.getTime()-lastTouched > 200) {
      let randomIndex = Math.floor(Math.random() * existImageFileNames.length);
      event.target.src = "gray.png"
      var setImage = function(event) {
        return function() {
          event.target.src = existImageFileNames.splice(randomIndex, 1)[0];
        };
      };
      setTimeout(setImage(event), 100); 
      lastTouched = now.getTime();
    }
  }

  images.forEach((image) => {
    image.addEventListener("click", onImageClick);
    image.addEventListener("touchend", onImageClick);
  });
  
  imageCountInput.addEventListener("input", setRandomImageSources);

  setRandomImageSources(); // 初回の画像表示
  resetButton.addEventListener("click", setRandomImageSources);
});
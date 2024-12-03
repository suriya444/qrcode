const generateButton = document.querySelector("#generate-btn");
const qrText = document.querySelector("#qrText");
const qrImage = document.querySelector("#qr-image");
const qrArea = document.querySelector(".bottom-area");
const downloadButton = document.querySelector("#download-btn");

const generateQR = () => {
  if (qrText.value === "") {
    qrArea.classList.add("hidden");
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);
  } else {
    const qrCodeURL = "https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=" + encodeURIComponent(qrText.value);
    qrImage.src = qrCodeURL;

    qrImage.onload = () => {
      qrArea.classList.remove("hidden");
      convertToCanvasAndDownload(qrCodeURL);
    };
  }
};

const convertToCanvasAndDownload = (qrCodeURL) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous"; // Avoid CORS issues

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);

    const imageURL = canvas.toDataURL("image/png");
    downloadButton.href = imageURL;
    downloadButton.download = "qrcode.png";
    downloadButton.classList.remove("hidden");
  };

  img.src = qrCodeURL;
};

generateButton.addEventListener("click", generateQR);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    generateQR();
  }
});

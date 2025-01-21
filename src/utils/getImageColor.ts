export const getAverageColor = (imageSrc: string): void => {
  const image = new Image();

  // Set the crossOrigin property
  image.crossOrigin = 'anonymous'; // This allows CORS-enabled images

  image.src = imageSrc;

  image.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0, image.width, image.height);

    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let r = 0,
      g = 0,
      b = 0;

    for (let i = 0; i < pixelData.length; i += 4) {
      r += pixelData[i]; // Red
      g += pixelData[i + 1]; // Green
      b += pixelData[i + 2]; // Blue
    }

    const pixelCount = pixelData.length / 4;
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    // Convert the RGB to HEX
    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    console.log(hexColor); // You can use this hex color as needed
  };
};

// Helper function to convert a number to a two-character hex string
const toHex = (n: number): string => {
  return n.toString(16).padStart(2, '0');
};

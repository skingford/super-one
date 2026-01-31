import QRCode from "qrcode";
import jsQR from "jsqr";

export interface QROptions {
  width: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
}

export const defaultQROptions: QROptions = {
  width: 256,
  margin: 2,
  color: {
    dark: "#000000",
    light: "#ffffff",
  },
  errorCorrectionLevel: "M",
};

export async function generateQRCode(
  text: string,
  options: Partial<QROptions> = {}
): Promise<string> {
  const opts = { ...defaultQROptions, ...options };

  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: opts.width,
      margin: opts.margin,
      color: opts.color,
      errorCorrectionLevel: opts.errorCorrectionLevel,
    });
    return dataUrl;
  } catch (error) {
    throw new Error(`Failed to generate QR code: ${(error as Error).message}`);
  }
}

export async function generateQRCodeSVG(
  text: string,
  options: Partial<QROptions> = {}
): Promise<string> {
  const opts = { ...defaultQROptions, ...options };

  try {
    const svg = await QRCode.toString(text, {
      type: "svg",
      width: opts.width,
      margin: opts.margin,
      color: opts.color,
      errorCorrectionLevel: opts.errorCorrectionLevel,
    });
    return svg;
  } catch (error) {
    throw new Error(`Failed to generate QR code SVG: ${(error as Error).message}`);
  }
}

export interface QRParseResult {
  success: boolean;
  data?: string;
  error?: string;
}

export async function parseQRCode(imageFile: File): Promise<QRParseResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve({ success: false, error: "Failed to create canvas context" });
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          resolve({ success: true, data: code.data });
        } else {
          resolve({ success: false, error: "No QR code found in image" });
        }
      };

      img.onerror = () => {
        resolve({ success: false, error: "Failed to load image" });
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      resolve({ success: false, error: "Failed to read file" });
    };

    reader.readAsDataURL(imageFile);
  });
}

export function downloadQRCode(dataUrl: string, filename: string = "qrcode.png"): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadSVG(svgContent: string, filename: string = "qrcode.svg"): void {
  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

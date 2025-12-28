import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToolProcessor } from "@/hooks/useToolProcessor";

interface ColorResult {
	hex: string;
	rgb: string;
	hsl: string;
	isValid: boolean;
}

const processor = (input: string): string => {
	const trimmed = input.trim();

	let r = 0,
		g = 0,
		b = 0;
	let isValid = false;

	// HEX format
	if (/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(trimmed)) {
		isValid = true;
		const hex = trimmed.replace("#", "");
		const fullHex =
			hex.length === 3
				? hex
						.split("")
						.map((c) => c + c)
						.join("")
				: hex;

		r = Number.parseInt(fullHex.substring(0, 2), 16);
		g = Number.parseInt(fullHex.substring(2, 4), 16);
		b = Number.parseInt(fullHex.substring(4, 6), 16);
	}
	// RGB format
	else if (
		/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i.test(trimmed)
	) {
		const match = trimmed.match(/(\d{1,3})/g);
		if (match) {
			r = Number.parseInt(match[0], 10);
			g = Number.parseInt(match[1], 10);
			b = Number.parseInt(match[2], 10);
			isValid = r <= 255 && g <= 255 && b <= 255;
		}
	}
	// HSL format
	else if (
		/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i.test(trimmed)
	) {
		const match = trimmed.match(/(\d{1,3})/g);
		if (match) {
			const h = Number.parseInt(match[0], 10) / 360;
			const s = Number.parseInt(match[1], 10) / 100;
			const l = Number.parseInt(match[2], 10) / 100;

			if (s === 0) {
				r = g = b = l * 255;
			} else {
				const hue2rgb = (p: number, q: number, t: number) => {
					if (t < 0) t += 1;
					if (t > 1) t -= 1;
					if (t < 1 / 6) return p + (q - p) * 6 * t;
					if (t < 1 / 2) return q;
					if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
					return p;
				};

				const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				const p = 2 * l - q;

				r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
				g = Math.round(hue2rgb(p, q, h) * 255);
				b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
			}
			isValid = true;
		}
	}

	if (!isValid) {
		throw new Error(
			"Invalid color format. Use HEX (#FF5733), RGB (rgb(255, 87, 51)), or HSL (hsl(9, 100%, 60%))",
		);
	}

	// Convert to all formats
	const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
	const rgb = `rgb(${r}, ${g}, ${b})`;

	// RGB to HSL
	const rNorm = r / 255;
	const gNorm = g / 255;
	const bNorm = b / 255;

	const max = Math.max(rNorm, gNorm, bNorm);
	const min = Math.min(rNorm, gNorm, bNorm);
	let h = 0,
		s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case rNorm:
				h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
				break;
			case gNorm:
				h = ((bNorm - rNorm) / d + 2) / 6;
				break;
			case bNorm:
				h = ((rNorm - gNorm) / d + 4) / 6;
				break;
		}
	}

	const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

	const result: ColorResult = { hex, rgb, hsl, isValid };
	return JSON.stringify(result);
};

const examples = {
	format: "#FF5733",
};

const ColorConverterTool = () => {
	const { input, setInput, output, error, process, clearAll, loadExample } =
		useToolProcessor({
			processor,
			examples,
		});

	let colorData: ColorResult | null = null;
	try {
		if (output) {
			colorData = JSON.parse(output);
		}
	} catch (_e) {
		// Invalid JSON
	}

	return (
		<div className="space-y-6">
			<div className="grid gap-6 px-2 lg:grid-cols-1">
				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Input Color</h2>
						<div className="flex gap-2">
							<Button onClick={loadExample} size="sm" variant="ghost">
								Example
							</Button>
							<Button onClick={clearAll} size="sm" variant="outline">
								Clear
							</Button>
						</div>
					</div>

					<Input
						className="font-mono"
						onChange={(e) => setInput(e.target.value)}
						placeholder="Enter color (HEX, RGB, or HSL)..."
						value={input}
					/>

					{error && (
						<div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
							<AlertCircle className="h-5 w-5 shrink-0" />
							<span>{error}</span>
						</div>
					)}
				</Card>

				{colorData?.isValid && (
					<Card className="p-6">
						<h2 className="mb-4 font-semibold text-xl">
							Color Preview & Conversions
						</h2>

						<div
							className="mb-6 h-32 rounded-lg border-2 border-border"
							style={{ backgroundColor: colorData.hex }}
						/>

						<div className="space-y-3">
							<div className="rounded-lg bg-muted p-3">
								<div className="mb-1 font-medium text-sm">HEX</div>
								<div className="font-mono text-sm">{colorData.hex}</div>
							</div>

							<div className="rounded-lg bg-muted p-3">
								<div className="mb-1 font-medium text-sm">RGB</div>
								<div className="font-mono text-sm">{colorData.rgb}</div>
							</div>

							<div className="rounded-lg bg-muted p-3">
								<div className="mb-1 font-medium text-sm">HSL</div>
								<div className="font-mono text-sm">{colorData.hsl}</div>
							</div>
						</div>
					</Card>
				)}
			</div>

			<div className="flex justify-center px-2">
				<Button
					className="w-full max-w-xs"
					disabled={!input}
					onClick={process}
					size="lg"
				>
					Convert Color
					<kbd className="ml-2 hidden rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
						⌘↵
					</kbd>
				</Button>
			</div>
		</div>
	);
};

export default ColorConverterTool;

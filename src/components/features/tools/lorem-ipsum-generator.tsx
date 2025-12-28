import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const LOREM_WORDS = [
	"lorem",
	"ipsum",
	"dolor",
	"sit",
	"amet",
	"consectetur",
	"adipiscing",
	"elit",
	"sed",
	"do",
	"eiusmod",
	"tempor",
	"incididunt",
	"ut",
	"labore",
	"et",
	"dolore",
	"magna",
	"aliqua",
	"enim",
	"ad",
	"minim",
	"veniam",
	"quis",
	"nostrud",
	"exercitation",
	"ullamco",
	"laboris",
	"nisi",
	"aliquip",
	"ex",
	"ea",
	"commodo",
	"consequat",
	"duis",
	"aute",
	"irure",
	"in",
	"reprehenderit",
	"voluptate",
	"velit",
	"esse",
	"cillum",
	"fugiat",
	"nulla",
	"pariatur",
	"excepteur",
	"sint",
	"occaecat",
	"cupidatat",
	"non",
	"proident",
	"sunt",
	"culpa",
	"qui",
	"officia",
	"deserunt",
	"mollit",
	"anim",
	"id",
	"est",
	"laborum",
];

const LoremIpsumGeneratorTool = () => {
	const [output, setOutput] = useState("");
	const [paragraphs, setParagraphs] = useState(3);
	const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
	const [copied, setCopied] = useState(false);

	const generateLoremIpsum = () => {
		const result: string[] = [];

		for (let i = 0; i < paragraphs; i++) {
			const words: string[] = [];
			for (let j = 0; j < wordsPerParagraph; j++) {
				words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
			}

			// Capitalize first letter
			words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

			// Add period at the end
			const paragraph = `${words.join(" ")}.`;
			result.push(paragraph);
		}

		setOutput(result.join("\n\n"));
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(output);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const clearAll = () => {
		setOutput("");
	};

	return (
		<div className="space-y-6">
			<div className="grid gap-6 px-2 lg:grid-cols-1">
				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Settings</h2>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label
								className="mb-2 block font-medium text-sm"
								htmlFor="paragraphs-input"
							>
								Paragraphs
							</label>
							<Input
								id="paragraphs-input"
								max={20}
								min={1}
								onChange={(e) => setParagraphs(Number(e.target.value))}
								type="number"
								value={paragraphs}
							/>
						</div>
						<div>
							<label
								className="mb-2 block font-medium text-sm"
								htmlFor="words-per-paragraph-input"
							>
								Words per Paragraph
							</label>
							<Input
								id="words-per-paragraph-input"
								max={200}
								min={10}
								onChange={(e) => setWordsPerParagraph(Number(e.target.value))}
								type="number"
								value={wordsPerParagraph}
							/>
						</div>
					</div>
				</Card>

				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Generated Text</h2>
						<div className="flex gap-2">
							{output && (
								<Button onClick={copyToClipboard} size="sm" variant="outline">
									{copied ? (
										<>
											<Check className="mr-1 h-4 w-4" />
											Copied!
										</>
									) : (
										<>
											<Copy className="mr-1 h-4 w-4" />
											Copy
										</>
									)}
								</Button>
							)}
							<Button onClick={clearAll} size="sm" variant="outline">
								Clear
							</Button>
						</div>
					</div>

					<Textarea
						className="min-h-96 bg-muted font-mono text-sm"
						placeholder="Generated lorem ipsum text will appear here..."
						readOnly
						value={output}
					/>
				</Card>
			</div>

			<div className="flex justify-center gap-3 px-2">
				<Button
					className="w-full max-w-xs"
					onClick={generateLoremIpsum}
					size="lg"
					variant="default"
				>
					<RefreshCw className="mr-2 h-5 w-5" />
					Generate Text
					<kbd className="ml-2 hidden rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
						⌘↵
					</kbd>
				</Button>
			</div>
		</div>
	);
};

export default LoremIpsumGeneratorTool;

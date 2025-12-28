import { AlertCircle, Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type CaseType =
	| "upper"
	| "lower"
	| "title"
	| "camel"
	| "pascal"
	| "snake"
	| "kebab";

const caseTypes = [
	{ value: "upper", label: "UPPER" },
	{ value: "lower", label: "lower" },
	{ value: "title", label: "Title" },
	{ value: "camel", label: "camel" },
	{ value: "pascal", label: "Pascal" },
	{ value: "snake", label: "snake_case" },
	{ value: "kebab", label: "kebab-case" },
] as const;

const TextCaseConverterTool = () => {
	const [caseType, setCaseType] = useState<CaseType>("upper");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);

	const convertCase = useCallback(() => {
		if (!input) return;

		try {
			let result: string;

			switch (caseType) {
				case "upper":
					result = input.toUpperCase();
					break;
				case "lower":
					result = input.toLowerCase();
					break;
				case "title":
					result = input.replace(
						/\w\S*/g,
						(txt) =>
							txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
					);
					break;
				case "camel":
					result = input
						.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
							index === 0 ? word.toLowerCase() : word.toUpperCase(),
						)
						.replace(/\s+/g, "");
					break;
				case "pascal":
					result = input
						.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
						.replace(/\s+/g, "");
					break;
				case "snake":
					result = input
						.replace(/\W+/g, " ")
						.split(/ |\B(?=[A-Z])/)
						.map((word) => word.toLowerCase())
						.join("_");
					break;
				case "kebab":
					result = input
						.replace(/\W+/g, " ")
						.split(/ |\B(?=[A-Z])/)
						.map((word) => word.toLowerCase())
						.join("-");
					break;
				default:
					result = input;
			}

			setOutput(result);
			setError("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Conversion failed");
			setOutput("");
		}
	}, [input, caseType]);

	useEffect(() => {
		if (output && input) {
			convertCase();
		}
	}, [output, input, convertCase]);

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
		setInput("");
		setOutput("");
		setError("");
	};

	const loadExample = () => {
		setInput("hello world example text");
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-center">
				<div className="inline-flex flex-wrap gap-1 rounded-lg border bg-muted p-1">
					{caseTypes.map((type) => (
						<Button
							className="rounded-md"
							key={type.value}
							onClick={() => setCaseType(type.value)}
							size="sm"
							variant={caseType === type.value ? "default" : "ghost"}
						>
							{type.label}
						</Button>
					))}
				</div>
			</div>

			<div className="grid gap-6 px-2 lg:grid-cols-2">
				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Input Text</h2>
						<div className="flex gap-2">
							<Button onClick={loadExample} size="sm" variant="ghost">
								Example
							</Button>
							<Button onClick={clearAll} size="sm" variant="outline">
								Clear
							</Button>
						</div>
					</div>

					<Textarea
						className="min-h-32 font-mono text-sm"
						onChange={(e) => setInput(e.target.value)}
						placeholder="Enter text to convert..."
						value={input}
					/>
				</Card>

				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Converted Text</h2>
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
					</div>

					<Textarea
						className="min-h-32 bg-muted font-mono text-sm"
						placeholder="Converted text will appear here..."
						readOnly
						value={output}
					/>

					{error && (
						<div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
							<AlertCircle className="h-5 w-5 shrink-0" />
							<span>{error}</span>
						</div>
					)}
				</Card>
			</div>

			<div className="flex justify-center gap-3 px-2">
				<Button
					className="w-full max-w-xs"
					disabled={!input}
					onClick={convertCase}
					size="lg"
					variant="default"
				>
					Convert
					<kbd className="ml-2 hidden rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
						⌘↵
					</kbd>
				</Button>
			</div>
		</div>
	);
};

export default TextCaseConverterTool;

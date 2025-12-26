import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Mode = "encode" | "decode";

const UrlEncoderTool = () => {
	const [mode, setMode] = useState<Mode>("encode");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);

	const process = useCallback(() => {
		try {
			if (mode === "encode") {
				// Encode URL
				const encoded = encodeURIComponent(input);
				setOutput(encoded);
				setError("");
			} else {
				// Decode URL
				const decoded = decodeURIComponent(input);
				setOutput(decoded);
				setError("");
			}
		} catch (_err) {
			setError(
				mode === "encode"
					? "Failed to encode URL."
					: "Invalid encoded URL. Please check your input.",
			);
			setOutput("");
		}
	}, [input, mode]);

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
		if (mode === "encode") {
			setInput("https://example.com/search?q=hello world&lang=en");
		} else {
			setInput(
				"https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den",
			);
		}
	};

	const swapMode = () => {
		setMode((prev) => (prev === "encode" ? "decode" : "encode"));
		const temp = input;
		setInput(output);
		setOutput(temp);
		setError("");
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
				e.preventDefault();
				if (input) process();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [input, process]);

	return (
		<>
			{/* Back Navigation */}
			<div className="container py-4">
				<Link
					className="inline-flex items-center pl-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
					to="/"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Tools
				</Link>
			</div>

			<div className="space-y-6">
				<div className="flex justify-center">
					<div className="inline-flex rounded-lg border bg-muted p-1">
						<Button
							className="rounded-md"
							onClick={() => setMode("encode")}
							size="sm"
							variant={mode === "encode" ? "default" : "ghost"}
						>
							Encode
						</Button>
						<Button
							className="rounded-md"
							onClick={() => setMode("decode")}
							size="sm"
							variant={mode === "decode" ? "default" : "ghost"}
						>
							Decode
						</Button>
					</div>
				</div>

				<div className="grid gap-6 px-2 lg:grid-cols-2">
					<Card className="p-6">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="font-semibold text-xl">
								{mode === "encode" ? "URL to Encode" : "Encoded URL"}
							</h2>
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
							className="min-h-125 font-mono text-sm"
							onChange={(e) => setInput(e.target.value)}
							placeholder={
								mode === "encode"
									? "Enter URL to encode...\ne.g., https://example.com/search?q=hello world"
									: "Enter encoded URL to decode...\ne.g., https%3A%2F%2Fexample.com"
							}
							value={input}
						/>
					</Card>

					<Card className="p-6">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="font-semibold text-xl">
								{mode === "encode" ? "Encoded URL" : "Decoded URL"}
							</h2>
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
							className="min-h-125 bg-muted font-mono text-sm"
							placeholder={
								mode === "encode"
									? "Encoded URL will appear here..."
									: "Decoded URL will appear here..."
							}
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
						onClick={process}
						size="lg"
						variant="default"
					>
						{mode === "encode" ? "Encode URL" : "Decode URL"}
						<kbd className="ml-2 hidden rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
							⌘↵
						</kbd>
					</Button>

					{output && (
						<Button
							onClick={swapMode}
							size="lg"
							title={`Switch to ${mode === "encode" ? "decode" : "encode"} mode`}
							variant="outline"
						>
							<ArrowRight className="h-5 w-5" />
						</Button>
					)}
				</div>

				<Card className="mx-2 bg-muted/50 p-4">
					<h3 className="mb-2 font-semibold text-sm">
						What does URL encoding do?
					</h3>
					<p className="text-muted-foreground text-sm">
						URL encoding converts special characters into a format that can be
						transmitted over the internet. For example, spaces become{" "}
						<code className="rounded bg-background px-1">%20</code> and special
						characters like{" "}
						<code className="rounded bg-background px-1">?</code>,{" "}
						<code className="rounded bg-background px-1">&</code>, and{" "}
						<code className="rounded bg-background px-1">=</code> are encoded
						for safe transmission in URLs.
					</p>
				</Card>
			</div>
		</>
	);
};

export default UrlEncoderTool;

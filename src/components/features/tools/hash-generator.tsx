import { AlertCircle, Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type HashAlgorithm = "sha1" | "sha256" | "sha512";

const hashAlgorithms = [
	{ value: "sha1", label: "SHA-1" },
	{ value: "sha256", label: "SHA-256" },
	{ value: "sha512", label: "SHA-512" },
] as const;

const HashGeneratorTool = () => {
	const [algorithm, setAlgorithm] = useState<HashAlgorithm>("sha256");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);

	const generateHash = useCallback(async () => {
		if (!input) return;

		try {
			const encoder = new TextEncoder();
			const data = encoder.encode(input);

			let hashBuffer: ArrayBuffer;

			switch (algorithm) {
				case "sha1":
					hashBuffer = await crypto.subtle.digest("SHA-1", data);
					break;
				case "sha256":
					hashBuffer = await crypto.subtle.digest("SHA-256", data);
					break;
				case "sha512":
					hashBuffer = await crypto.subtle.digest("SHA-512", data);
					break;
			}

			const hashArray = Array.from(new Uint8Array(hashBuffer));
			const hashHex = hashArray
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("");
			setOutput(hashHex);
			setError("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Hash generation failed");
			setOutput("");
		}
	}, [input, algorithm]);

	useEffect(() => {
		if (output && input) {
			generateHash();
		}
	}, [output, input, generateHash]);

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
		setInput("Hello, World!");
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-center">
				<div className="inline-flex rounded-lg border bg-muted p-1">
					{hashAlgorithms.map((alg) => (
						<Button
							className="rounded-md"
							key={alg.value}
							onClick={() => setAlgorithm(alg.value)}
							size="sm"
							variant={algorithm === alg.value ? "default" : "ghost"}
						>
							{alg.label}
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
						placeholder="Enter text to hash..."
						value={input}
					/>
				</Card>

				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">
							{algorithm.toUpperCase()} Hash
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
						className="min-h-32 bg-muted font-mono text-sm"
						placeholder="Hash will appear here..."
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
					onClick={generateHash}
					size="lg"
					variant="default"
				>
					Generate Hash
					<kbd className="ml-2 hidden rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
						⌘↵
					</kbd>
				</Button>
			</div>
		</div>
	);
};

export default HashGeneratorTool;

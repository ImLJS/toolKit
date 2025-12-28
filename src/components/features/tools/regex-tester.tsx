import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const RegexTesterTool = () => {
	const [pattern, setPattern] = useState("");
	const [flags, setFlags] = useState("g");
	const [testString, setTestString] = useState("");
	const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
	const [error, setError] = useState("");

	const testRegex = () => {
		try {
			setError("");
			const regex = new RegExp(pattern, flags);
			const allMatches: RegExpMatchArray[] = [];

			if (flags.includes("g")) {
				let match = regex.exec(testString);
				while (match !== null) {
					allMatches.push(match);
					if (match.index === regex.lastIndex) {
						regex.lastIndex++;
					}
					match = regex.exec(testString);
				}
			} else {
				const match = regex.exec(testString);
				if (match) {
					allMatches.push(match);
				}
			}

			setMatches(allMatches);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Invalid regular expression",
			);
			setMatches([]);
		}
	};

	const clearAll = () => {
		setPattern("");
		setFlags("g");
		setTestString("");
		setMatches([]);
		setError("");
	};

	const loadExample = () => {
		setPattern("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b");
		setFlags("g");
		setTestString(
			"Contact us at support@example.com or sales@example.org for more information.",
		);
	};

	const getHighlightedText = () => {
		if (matches.length === 0) return testString;

		const parts: Array<{ text: string; isMatch: boolean }> = [];
		let lastIndex = 0;

		matches.forEach((match) => {
			if (match.index !== undefined) {
				// Add non-matching part
				if (match.index > lastIndex) {
					parts.push({
						text: testString.slice(lastIndex, match.index),
						isMatch: false,
					});
				}

				// Add matching part
				parts.push({
					text: match[0],
					isMatch: true,
				});

				lastIndex = match.index + match[0].length;
			}
		});

		// Add remaining non-matching part
		if (lastIndex < testString.length) {
			parts.push({
				text: testString.slice(lastIndex),
				isMatch: false,
			});
		}

		return parts;
	};

	const highlightedParts = getHighlightedText();

	return (
		<div className="space-y-6">
			<div className="grid gap-6 px-2 lg:grid-cols-1">
				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Regular Expression</h2>
						<div className="flex gap-2">
							<Button onClick={loadExample} size="sm" variant="ghost">
								Example
							</Button>
							<Button onClick={clearAll} size="sm" variant="outline">
								Clear
							</Button>
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<label
								className="mb-2 block font-medium text-sm"
								htmlFor="regular-expression-pattern"
							>
								Pattern
							</label>
							<Input
								className="font-mono"
								id="regular-expression-pattern"
								onChange={(e) => setPattern(e.target.value)}
								placeholder="Enter regex pattern... e.g., \d{3}-\d{3}-\d{4}"
								value={pattern}
							/>
						</div>

						<div>
							<label
								className="mb-2 block font-medium text-sm"
								htmlFor="regex-flags-input"
							>
								Flags
							</label>
							<input
								aria-label="Regex Flags"
								className="sr-only"
								id="regex-flags-input"
								onChange={(e) => setFlags(e.target.value)}
								readOnly
								tabIndex={-1}
								type="text"
								value={flags}
							/>
							<div className="flex gap-2">
								{["g", "i", "m", "s", "u", "y"].map((flag) => (
									<Button
										className="w-12"
										key={flag}
										onClick={() => {
											if (flags.includes(flag)) {
												setFlags(flags.replace(flag, ""));
											} else {
												setFlags(flags + flag);
											}
										}}
										size="sm"
										variant={flags.includes(flag) ? "default" : "outline"}
									>
										{flag}
									</Button>
								))}
							</div>
							<div className="mt-2 text-muted-foreground text-xs">
								g: global, i: case insensitive, m: multiline, s: dotAll, u:
								unicode, y: sticky
							</div>
						</div>
					</div>

					{error && (
						<div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
							<AlertCircle className="h-5 w-5 shrink-0" />
							<span>{error}</span>
						</div>
					)}
				</Card>

				<Card className="p-6">
					<div className="mb-4">
						<h2 className="font-semibold text-xl">Test String</h2>
					</div>

					<Textarea
						className="min-h-32 font-mono text-sm"
						onChange={(e) => setTestString(e.target.value)}
						placeholder="Enter test string..."
						value={testString}
					/>
				</Card>

				{matches.length > 0 && (
					<>
						<Card className="p-6">
							<div className="mb-4 flex items-center gap-2">
								<Check className="h-5 w-5 text-green-500" />
								<h2 className="font-semibold text-xl">
									{matches.length} Match{matches.length !== 1 ? "es" : ""} Found
								</h2>
							</div>

							<div className="rounded-lg bg-muted p-4 font-mono text-sm leading-relaxed">
								{Array.isArray(highlightedParts)
									? highlightedParts.map((part, idx) => (
											<span
												className={
													part.isMatch ? "bg-yellow-300 dark:bg-yellow-700" : ""
												}
												key={`${part.text}-${idx}-${part.isMatch}`}
											>
												{part.text}
											</span>
										))
									: highlightedParts}
							</div>
						</Card>

						<Card className="p-6">
							<div className="mb-4">
								<h2 className="font-semibold text-xl">Match Details</h2>
							</div>

							<div className="space-y-3">
								{matches.map((match, idx) => {
									const key = `${match.index}-${match[0]}`;
									return (
										<div className="rounded-lg bg-muted p-3" key={key}>
											<div className="mb-1 font-medium text-sm">
												Match {idx + 1}
											</div>
											<div className="font-mono text-sm">
												<div>
													<span className="text-muted-foreground">Text: </span>
													<span className="font-semibold">{match[0]}</span>
												</div>
												<div>
													<span className="text-muted-foreground">Index: </span>
													{match.index}
												</div>
												{match.length > 1 && (
													<div>
														<span className="text-muted-foreground">
															Groups:{" "}
														</span>
														{match.slice(1).join(", ")}
													</div>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</Card>
					</>
				)}

				{testString && pattern && matches.length === 0 && !error && (
					<Card className="p-6">
						<div className="flex items-start gap-2 rounded-lg bg-muted p-3 text-sm">
							<AlertCircle className="h-5 w-5 shrink-0" />
							<span>No matches found</span>
						</div>
					</Card>
				)}
			</div>

			<div className="flex justify-center px-2">
				<Button
					className="w-full max-w-xs"
					disabled={!pattern || !testString}
					onClick={testRegex}
					size="lg"
				>
					Test Regex
					<kbd className="ml-2 hidden rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
						⌘↵
					</kbd>
				</Button>
			</div>
		</div>
	);
};

export default RegexTesterTool;

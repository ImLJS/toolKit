import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToolProcessor } from "@/hooks/useToolProcessor";

const processor = (input: string): string => {
	const token = input.trim();
	const parts = token.split(".");

	if (parts.length !== 3) {
		throw new Error(
			"Invalid JWT format. JWT must have three parts separated by dots.",
		);
	}

	try {
		// Decode header
		const header = JSON.parse(
			atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")),
		);

		// Decode payload
		const payload = JSON.parse(
			atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
		);

		// Signature (we don't decode this, just show it exists)
		const signature = parts[2];

		const result = {
			header,
			payload,
			signature: `${signature.substring(0, 20)}...`,
			isExpired: payload.exp ? Date.now() / 1000 > payload.exp : false,
			expiresAt: payload.exp
				? new Date(payload.exp * 1000).toISOString()
				: null,
			issuedAt: payload.iat ? new Date(payload.iat * 1000).toISOString() : null,
		};

		return JSON.stringify(result, null, 2);
	} catch (_err) {
		throw new Error(
			"Failed to decode JWT. Invalid base64 encoding or malformed token.",
		);
	}
};

const examples = {
	format:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
};

const JwtDecoderTool = () => {
	const { input, setInput, output, error, process, clearAll, loadExample } =
		useToolProcessor({
			processor,
			examples,
		});

	let decodedData = null;
	try {
		if (output) {
			decodedData = JSON.parse(output);
		}
	} catch (_e) {
		// Invalid JSON
	}

	return (
		<div className="space-y-6">
			<div className="grid gap-6 px-2 lg:grid-cols-1">
				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">JWT Token</h2>
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
						placeholder="Paste your JWT token here..."
						value={input}
					/>

					{error && (
						<div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
							<AlertCircle className="h-5 w-5 shrink-0" />
							<span>{error}</span>
						</div>
					)}
				</Card>

				{decodedData && (
					<>
						{decodedData.isExpired && (
							<div className="px-2">
								<div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
									<AlertCircle className="h-5 w-5 shrink-0" />
									<span>This token has expired!</span>
								</div>
							</div>
						)}

						<Card className="p-6">
							<h2 className="mb-4 font-semibold text-xl">Header</h2>
							<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
								{JSON.stringify(decodedData.header, null, 2)}
							</pre>
						</Card>

						<Card className="p-6">
							<h2 className="mb-4 font-semibold text-xl">Payload</h2>
							<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
								{JSON.stringify(decodedData.payload, null, 2)}
							</pre>

							<div className="mt-4 space-y-2">
								{decodedData.issuedAt && (
									<div className="text-sm">
										<span className="font-medium">Issued At:</span>{" "}
										<span className="font-mono">{decodedData.issuedAt}</span>
									</div>
								)}
								{decodedData.expiresAt && (
									<div className="text-sm">
										<span className="font-medium">Expires At:</span>{" "}
										<span className="font-mono">{decodedData.expiresAt}</span>
									</div>
								)}
							</div>
						</Card>

						<Card className="p-6">
							<h2 className="mb-4 font-semibold text-xl">Signature</h2>
							<div className="break-all rounded-lg bg-muted p-4 font-mono text-sm">
								{decodedData.signature}
							</div>
							<p className="mt-2 text-muted-foreground text-sm">
								Signature verification requires the secret key and is not shown
								here.
							</p>
						</Card>
					</>
				)}
			</div>

			<div className="flex justify-center px-2">
				<Button
					className="w-full max-w-xs"
					disabled={!input}
					onClick={process}
					size="lg"
				>
					Decode JWT
					<kbd className="ml-2 hidden rounded bg-primary-foreground/20 px-1.5 py-0.5 font-mono text-xs sm:inline-block">
						⌘↵
					</kbd>
				</Button>
			</div>
		</div>
	);
};

export default JwtDecoderTool;

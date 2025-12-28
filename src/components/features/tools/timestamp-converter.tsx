import { AlertCircle, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const TimestampConverterTool = () => {
	const [timestamp, setTimestamp] = useState("");
	const [dateTime, setDateTime] = useState("");
	const [error, setError] = useState("");
	const [currentTime, setCurrentTime] = useState(Date.now());

	const convertTimestampToDate = () => {
		try {
			setError("");
			const ts = Number(timestamp);
			if (Number.isNaN(ts)) {
				throw new Error("Invalid timestamp");
			}

			// Handle both seconds and milliseconds
			const ms = ts.toString().length === 10 ? ts * 1000 : ts;
			const date = new Date(ms);

			if (Number.isNaN(date.getTime())) {
				throw new Error("Invalid timestamp");
			}

			setDateTime(date.toISOString());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Conversion failed");
			setDateTime("");
		}
	};

	const convertDateToTimestamp = () => {
		try {
			setError("");
			const date = new Date(dateTime);

			if (Number.isNaN(date.getTime())) {
				throw new Error("Invalid date format");
			}

			setTimestamp(Math.floor(date.getTime() / 1000).toString());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Conversion failed");
			setTimestamp("");
		}
	};

	const useCurrentTime = () => {
		const now = Date.now();
		setCurrentTime(now);
		setTimestamp(Math.floor(now / 1000).toString());
		setDateTime(new Date(now).toISOString());
		setError("");
	};

	const clearAll = () => {
		setTimestamp("");
		setDateTime("");
		setError("");
	};

	const formatDate = (ms: number) => {
		const date = new Date(ms);
		return {
			iso: date.toISOString(),
			utc: date.toUTCString(),
			local: date.toLocaleString(),
			date: date.toLocaleDateString(),
			time: date.toLocaleTimeString(),
		};
	};

	const current = formatDate(currentTime);

	return (
		<div className="space-y-6">
			<div className="grid gap-6 px-2 lg:grid-cols-2">
				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="flex items-center gap-2 font-semibold text-xl">
							<Clock className="h-5 w-5" />
							Timestamp to Date
						</h2>
					</div>

					<div className="space-y-4">
						<div>
							<label
								className="mb-2 block font-medium text-sm"
								htmlFor="timestamp-input"
							>
								Unix Timestamp (seconds)
							</label>
							<Input
								className="font-mono"
								id="timestamp-input"
								onChange={(e) => setTimestamp(e.target.value)}
								placeholder="1640000000"
								type="text"
								value={timestamp}
							/>
						</div>

						<Button
							className="w-full"
							disabled={!timestamp}
							onClick={convertTimestampToDate}
						>
							Convert to Date
						</Button>
					</div>
				</Card>

				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="flex items-center gap-2 font-semibold text-xl">
							<Calendar className="h-5 w-5" />
							Date to Timestamp
						</h2>
					</div>

					<div className="space-y-4">
						<div>
							<label
								className="mb-2 block font-medium text-sm"
								htmlFor="datetime-input"
							>
								Date/Time (ISO format)
							</label>
							<Input
								className="font-mono"
								id="datetime-input"
								onChange={(e) => setDateTime(e.target.value)}
								placeholder="2023-12-20T10:30:00Z"
								type="text"
								value={dateTime}
							/>
						</div>

						<Button
							className="w-full"
							disabled={!dateTime}
							onClick={convertDateToTimestamp}
						>
							Convert to Timestamp
						</Button>
					</div>
				</Card>
			</div>

			{error && (
				<div className="px-2">
					<div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
						<AlertCircle className="h-5 w-5 shrink-0" />
						<span>{error}</span>
					</div>
				</div>
			)}

			<div className="px-2">
				<Card className="p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">Current Time</h2>
						<Button onClick={useCurrentTime} size="sm" variant="outline">
							Use Current Time
						</Button>
					</div>

					<div className="space-y-3">
						<div className="rounded-lg bg-muted p-3">
							<div className="mb-1 font-medium text-sm">Unix Timestamp</div>
							<div className="font-mono text-sm">
								{Math.floor(currentTime / 1000)}
							</div>
						</div>

						<div className="rounded-lg bg-muted p-3">
							<div className="mb-1 font-medium text-sm">ISO 8601</div>
							<div className="font-mono text-sm">{current.iso}</div>
						</div>

						<div className="rounded-lg bg-muted p-3">
							<div className="mb-1 font-medium text-sm">UTC</div>
							<div className="font-mono text-sm">{current.utc}</div>
						</div>

						<div className="rounded-lg bg-muted p-3">
							<div className="mb-1 font-medium text-sm">Local</div>
							<div className="font-mono text-sm">{current.local}</div>
						</div>
					</div>
				</Card>
			</div>

			<div className="flex justify-center gap-3 px-2">
				<Button onClick={clearAll} size="lg" variant="outline">
					Clear All
				</Button>
			</div>
		</div>
	);
};

export default TimestampConverterTool;

import { useCallback, useEffect, useState } from "react";

type Mode = "encode" | "decode";

interface Examples {
	encode?: string;
	decode?: string;
	format?: string;
}

interface UseToolProcessorOptions {
	processor: (input: string, mode?: Mode) => string | Promise<string>;
	initialMode?: Mode;
	examples: Examples;
	autoProcess?: boolean;
}

export const useToolProcessor = ({
	processor,
	initialMode,
	examples,
	autoProcess = false,
}: UseToolProcessorOptions) => {
	const [mode, setMode] = useState<Mode | undefined>(initialMode);
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);

	const process = useCallback(async () => {
		try {
			const result = await processor(input, mode);
			setOutput(result);
			setError("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Processing failed");
			setOutput("");
		}
	}, [input, mode, processor]);

	useEffect(() => {
		if (autoProcess && output && input) {
			process();
		}
	}, [autoProcess, input, output, process]);

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
		const key = mode || "format";
		setInput(examples[key] || "");
	};

	const swapMode = () => {
		if (!mode) return;
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

	return {
		mode,
		setMode,
		input,
		setInput,
		output,
		error,
		copied,
		process,
		copyToClipboard,
		clearAll,
		loadExample,
		swapMode,
	};
};

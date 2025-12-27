export const TOOLS = [
	{
		id: 1,
		name: "JSON Formatter",
		description: "Format and beautify JSON data.",
		info: "This tool helps you format and validate JSON data. Paste your JSON string in the input field, and it will parse and display it in a nicely indented, readable format. It also validates the JSON and shows errors if the input is invalid.",
		url: "/tools/json-formatter",
		tags: ["json"],
		category: "formatters",
		image:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=832&fit=crop",
	},
	{
		id: 2,
		name: "Base64 Encoder & Decoder",
		description: "Encode and decode Base64 strings.",
		info: "Base64 encoding converts binary data into a text format using 64 characters. This tool allows you to encode text into Base64 or decode Base64 back to text. Useful for handling data in formats that require text-only transmission.",
		url: "/tools/base64",
		tags: ["encoder", "decoder", "base64"],
		category: "encoders",
		image:
			"https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1280&h=832&fit=crop",
	},
	{
		id: 3,
		name: "URL Encoder",
		description:
			"Encode URLs for safe transmission or decode back to readable format.",
		info: "URL encoding replaces unsafe characters in URLs with percent-encoded equivalents. This tool encodes URLs to make them safe for web transmission or decodes them back to readable form. Essential for handling URLs with special characters or spaces.",
		url: "/tools/url-encoder",
		tags: ["url", "encoder", "decoder"],
		category: "encoders",
		image:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=832&fit=crop",
	},
	{
		id: 4,
		name: "UUID Generator",
		description: "Generate unique UUIDs (v4).",
		info: "This tool generates universally unique identifiers (UUIDs) using version 4, which are randomly generated. UUIDs are 128-bit numbers used to uniquely identify information in computer systems.",
		url: "/tools/uuid-generator",
		tags: ["uuid", "generator", "random"],
		category: "generators",
		image:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=832&fit=crop",
	},
	{
		id: 5,
		name: "Hash Generator",
		description: "Generate SHA-1, SHA-256, and SHA-512 hashes.",
		info: "This tool generates cryptographic hash values using various algorithms including SHA-1, SHA-256, and SHA-512. Hash functions are one-way functions that convert input data of any size into a fixed-size string of characters.",
		url: "/tools/hash-generator",
		tags: ["hash", "sha", "crypto"],
		category: "generators",
		image:
			"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1280&h=832&fit=crop",
	},
	{
		id: 6,
		name: "Text Case Converter",
		description: "Convert text between different cases.",
		info: "This tool allows you to convert text between different case formats including uppercase, lowercase, title case, camel case, pascal case, snake case, and kebab case. Useful for formatting text according to different programming conventions.",
		url: "/tools/text-case-converter",
		tags: ["text", "case", "converter", "format"],
		category: "formatters",
		image:
			"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1280&h=832&fit=crop",
	},
];

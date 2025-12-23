import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute="class" disableTransitionOnChange enableSystem>
			{children}
		</ThemeProvider>
	);
};

export default Providers;

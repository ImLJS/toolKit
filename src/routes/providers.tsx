import { ThemeProvider } from "next-themes";
import { FavoritesProvider } from "@/hooks/useFavorites";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute="class" disableTransitionOnChange enableSystem>
			<FavoritesProvider>{children}</FavoritesProvider>
		</ThemeProvider>
	);
};

export default Providers;

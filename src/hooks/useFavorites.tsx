import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface FavoritesContextType {
	favoritedTools: Set<number>;
	toggleFavorite: (toolId: number) => void;
	isFavorited: (toolId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
	const [favoritedTools, setFavoritedTools] = useState<Set<number>>(new Set());

	// Load from localStorage on mount
	useEffect(() => {
		const savedFavorites = localStorage.getItem("favoritedTools");

		if (savedFavorites) {
			setFavoritedTools(new Set(JSON.parse(savedFavorites)));
		}
	}, []);

	const toggleFavorite = (toolId: number) => {
		setFavoritedTools((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(toolId)) {
				newSet.delete(toolId);
			} else {
				newSet.add(toolId);
			}
			localStorage.setItem("favoritedTools", JSON.stringify([...newSet]));
			return newSet;
		});
	};

	const isFavorited = (toolId: number) => favoritedTools.has(toolId);

	return (
		<FavoritesContext.Provider
			value={{
				favoritedTools,
				toggleFavorite,
				isFavorited,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used within a FavoritesProvider");
	}
	return context;
};

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface FavoritesContextType {
	likedTools: Set<number>;
	favoritedTools: Set<number>;
	toggleLike: (toolId: number) => void;
	toggleFavorite: (toolId: number) => void;
	isLiked: (toolId: number) => boolean;
	isFavorited: (toolId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
	const [likedTools, setLikedTools] = useState<Set<number>>(new Set());
	const [favoritedTools, setFavoritedTools] = useState<Set<number>>(new Set());

	// Load from localStorage on mount
	useEffect(() => {
		const savedLikes = localStorage.getItem("likedTools");
		const savedFavorites = localStorage.getItem("favoritedTools");

		if (savedLikes) {
			setLikedTools(new Set(JSON.parse(savedLikes)));
		}
		if (savedFavorites) {
			setFavoritedTools(new Set(JSON.parse(savedFavorites)));
		}
	}, []);

	const toggleLike = (toolId: number) => {
		setLikedTools((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(toolId)) {
				newSet.delete(toolId);
			} else {
				newSet.add(toolId);
			}
			localStorage.setItem("likedTools", JSON.stringify([...newSet]));
			return newSet;
		});
	};

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

	const isLiked = (toolId: number) => likedTools.has(toolId);
	const isFavorited = (toolId: number) => favoritedTools.has(toolId);

	return (
		<FavoritesContext.Provider
			value={{
				likedTools,
				favoritedTools,
				toggleLike,
				toggleFavorite,
				isLiked,
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

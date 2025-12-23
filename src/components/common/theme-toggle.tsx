import { useTheme } from "next-themes";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			aria-label="Toggle theme"
			className="cursor-pointer"
			onClick={toggleTheme}
			size="icon"
			variant="ghost"
		>
			<IoSunny className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<IoMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}

export const Footer = () => {
	return (
		<footer className="mt-10 border-t">
			<div className="container mx-auto py-6 text-center text-muted-foreground text-sm">
				&copy; {new Date().getFullYear()} ImLJS. All rights reserved.
			</div>
		</footer>
	);
};

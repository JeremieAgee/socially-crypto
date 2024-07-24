"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/authUtils";

const LogoutButton = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/"); // Redirect to the main page after logout
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<button
			onClick={handleLogout}
			className="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
		>
			Logout
		</button>
	);
};

export default LogoutButton;

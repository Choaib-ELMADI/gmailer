import { getCurrentTab, handleNotMailTab } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
	let currentTab = "";

	// .- -- --- //

	currentTab = await getCurrentTab();
	if (!currentTab.url || !currentTab.url.includes("mail.google.com/mail/u/")) {
		handleNotMailTab();
		return;
	}
});

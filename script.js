import {
	getCurrentTab,
	handleNotMailTab,
	updateUI,
	getMailIndexAndTab,
	updateCurrentTabUrl,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
	const mailLeftBtn = document.getElementById("prev-mail");
	const mailRightBtn = document.getElementById("next-mail");
	const tabLeftBtn = document.getElementById("prev-tab");
	const tabRightBtn = document.getElementById("next-tab");

	// .- -- --- //

	let currentTab = "";
	let res = [];

	// .- -- --- //

	currentTab = await getCurrentTab();
	if (!currentTab.url || !currentTab.url.includes("mail.google.com/mail/u/")) {
		handleNotMailTab();
		return;
	}

	updateUI(currentTab);

	mailLeftBtn.addEventListener("click", async () => {
		res = getMailIndexAndTab(currentTab);
		if (res[0] >= 1) {
			res[0]--;
			currentTab = await updateCurrentTabUrl(res[0], res[1]);
			updateUI(currentTab);
		}
	});

	mailRightBtn.addEventListener("click", async () => {
		res = getMailIndexAndTab(currentTab);
		res[0]++;
		currentTab = await updateCurrentTabUrl(res[0], res[1]);
		updateUI(currentTab);
	});

	tabLeftBtn.addEventListener("click", async () => {
		res = getMailIndexAndTab(currentTab);
		if (res[1] >= 1) {
			res[1]--;
		} else {
			res[1] = 4;
		}

		currentTab = await updateCurrentTabUrl(res[0], res[1]);
		updateUI(currentTab);
	});

	tabRightBtn.addEventListener("click", async () => {
		res = getMailIndexAndTab(currentTab);
		if (res[1] >= 4) {
			res[1] = 0;
		} else {
			res[1]++;
		}

		currentTab = await updateCurrentTabUrl(res[0], res[1]);
		updateUI(currentTab);
	});
});

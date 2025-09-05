import {
	getCurrentTab,
	getMailIndexAndTab,
	handleNotMailTab,
	updateUI,
} from "./utils.js";

const mailTabs = [
	{ id: "inbox", title: "Inbox" },
	{ id: "sent", title: "Sent" },
	{ id: "all", title: "All Mail" },
	{ id: "spam", title: "Spam" },
	{ id: "trash", title: "Bin" },
];

document.addEventListener("DOMContentLoaded", async () => {
	const mailLeftBtn = document.getElementById("prev-mail");
	const mailRightBtn = document.getElementById("next-mail");
	const tabLeftBtn = document.getElementById("prev-tab");
	const tabRightBtn = document.getElementById("next-tab");

	// .- -- --- //

	let currentTab = "";
	let mailIndex = 0;
	let mailTabIndex = 0;

	// .- -- --- //

	currentTab = await getCurrentTab();
	if (!currentTab.url || !currentTab.url.includes("mail.google.com/mail/u/")) {
		handleNotMailTab();
		return;
	}

	let res = getMailIndexAndTab(currentTab);
	mailIndex = res[0];
	mailTabIndex = res[1];

	updateUI(mailIndex, mailTabs[mailTabIndex].title, mailTabs[mailTabIndex].id);

	mailLeftBtn.addEventListener("click", () => {
		if (mailIndex >= 1) {
			mailIndex--;
			updateUI(
				mailIndex,
				mailTabs[mailTabIndex].title,
				mailTabs[mailTabIndex].id
			);
		}
	});

	mailRightBtn.addEventListener("click", () => {
		mailIndex++;
		updateUI(
			mailIndex,
			mailTabs[mailTabIndex].title,
			mailTabs[mailTabIndex].id
		);
	});

	tabLeftBtn.addEventListener("click", () => {
		if (mailTabIndex >= 1) {
			mailTabIndex--;
		} else {
			mailTabIndex = 4;
		}

		updateUI(
			mailIndex,
			mailTabs[mailTabIndex].title,
			mailTabs[mailTabIndex].id
		);
	});

	tabRightBtn.addEventListener("click", () => {
		if (mailTabIndex >= 4) {
			mailTabIndex = 0;
		} else {
			mailTabIndex++;
		}

		updateUI(
			mailIndex,
			mailTabs[mailTabIndex].title,
			mailTabs[mailTabIndex].id
		);
	});
});

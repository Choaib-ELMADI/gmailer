const mailTabs = [
	{ id: "inbox", title: "Inbox" },
	{ id: "sent", title: "Sent" },
	{ id: "all", title: "All Mail" },
	{ id: "spam", title: "Spam" },
	{ id: "trash", title: "Bin" },
];

export async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

export function handleNotMailTab() {
	const contentContainer = document.getElementById("content-container");

	contentContainer.innerHTML = "";

	const notMailContainer = document.createElement("div");
	notMailContainer.className = "not-mail-container";

	const notMailContent = document.createElement("h1");
	notMailContent.className = "not-mail-content";
	notMailContent.innerText =
		"This is not a Gmail tab! Please select a valid one.";
	notMailContainer.appendChild(notMailContent);

	contentContainer.appendChild(notMailContainer);
}

export function updateUI(currentTab) {
	const mailIndexContainer = document.getElementById("mail-index");
	const currentTabContainer = document.getElementById("current-tab");

	const res = getMailIndexAndTab(currentTab);
	const mailIndex = res[0];
	const mailTabTitle = mailTabs[res[1]].title;

	if (mailTabTitle === "Inbox") {
		currentTabContainer.classList.add("active");
	} else {
		currentTabContainer.classList.remove("active");
	}

	mailIndexContainer.innerText = mailIndex;
	currentTabContainer.innerText = mailTabTitle;
}

export function getMailIndexAndTab(currentTab) {
	const mailTabs = ["#inbox", "#sent", "#all", "#spam", "#trash"];
	let mailIndex = currentTab.url.split("/")[5];
	let mailTabIndex = mailTabs.indexOf(currentTab.url.split("/")[6]);
	return [parseInt(mailIndex), mailTabIndex];
}

export function updateCurrentTabUrl(mailIndex, mailTabIndex) {
	return new Promise((resolve) => {
		const newUrl = `https://mail.google.com/mail/u/${mailIndex}/#${mailTabs[mailTabIndex].id}`;
		chrome.tabs.update({ url: newUrl }, (tab) => {
			chrome.tabs.onUpdated.addListener(function listener(
				tabId,
				changeInfo,
				updatedTab
			) {
				if (tabId === tab.id && changeInfo.status === "complete") {
					chrome.tabs.onUpdated.removeListener(listener);
					resolve(updatedTab);
				}
			});
		});
	});
}

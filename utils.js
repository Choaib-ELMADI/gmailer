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

export function getMailIndexAndTab(currentTab) {
	const mailTabs = ["#inbox", "#sent", "#all", "#spam", "#trash"];
	let mailIndex = currentTab.url.split("/")[5];
	let mailTabIndex = mailTabs.indexOf(currentTab.url.split("/")[6]);
	return [parseInt(mailIndex), mailTabIndex];
}

export async function updateUI(mailIndex, mailTitle, mailId) {
	const currentTab = await getCurrentTab();
	await chrome.tabs.update(currentTab.id, {
		url: `https://mail.google.com/mail/u/${mailIndex}/#${mailId}`,
	});

	const mailIndexContainer = document.getElementById("mail-index");
	const currentTabContainer = document.getElementById("current-tab");

	if (mailTitle === "Inbox") {
		currentTabContainer.classList.add("active");
	} else {
		currentTabContainer.classList.remove("active");
	}

	mailIndexContainer.innerText = mailIndex;
	currentTabContainer.innerText = mailTitle;
}

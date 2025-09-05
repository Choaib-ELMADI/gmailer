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

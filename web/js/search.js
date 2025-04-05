// Search function for mod-entry with searchBar
function searchMods() {
    const searchText = document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll("mod-entry").forEach(entry => {
        const titleText = entry.getAttribute("title")?.toLowerCase() || "";
        entry.style.display = titleText.includes(searchText) ? "block" : "none";
    });
}
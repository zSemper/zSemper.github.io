// Search function for mod-entry with searchBar
function searchMods() {
    const searchText = document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll("mod-entry").forEach(entry => {
        const titleText = entry.getAttribute("title")?.toLowerCase() || "";
        entry.style.display = titleText.includes(searchText) ? "block" : "none";
    });
}

// Search function for mod-elements
function searchModElement() {
    const searchText = document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll("mod-element-list").forEach(mod_element_list => {
        let anyVisible = false;
        const mod_elements = mod_element_list.shadowRoot.querySelectorAll(".grid > mod-element");

        mod_elements.forEach(mod_element => {
            const text = mod_element.getAttribute("text")?.toLocaleLowerCase() || "";
            const matches = text.includes(searchText);

            mod_element.style.display = matches ? "block" : "none";
            if (matches) {
                anyVisible = true;
            }
        });
        
        mod_element_list.style.display = anyVisible ? "block" : "none";
    });
}


// Select 
function selectModElement() {
    const select = document.getElementById("list-selector");
    const selectedId = select.value;

    document.querySelectorAll("mod-element-list").forEach(mod_element_list => {
        if (selectedId === "all") {
            mod_element_list.style.display = "block";
        } else {
            mod_element_list.style.display = mod_element_list.id === selectedId ? "block" : "none";
        }
    });
}

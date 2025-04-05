// Mod Tag
class ModTag extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"});
        const template = document.createElement("template");

        template.innerHTML = `
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-radius: 8px;
                    width: fit-content;
                }
                
                img {
                    max-width: 50px;
                    height: auto;
                    border-radius: 5px;
                }

                .text {
                    font-size: 1.2em;
                    color: rgb(150, 150, 150);
                }
            </style>

            <img src="" alt="Image">
            <div class="text"></div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
        this._image = shadow.querySelector("img");
        this._text = shadow.querySelector(".text");
    }

    connectedCallback() {
        this._image.src = this.getAttribute("image") || "https://via.placeholder.com/50";
        this._text.textContent = this.getAttribute("text") || "Default text";
    }

    static get observedAttributes() {
        return ["image", "text"];
    }
}
customElements.define("mod-tag", ModTag);


// Mod Entry
class ModEntry extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const template = document.createElement("template");

        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    width: 1000px;
                    cursor: pointer;
                }
                .container {
                    display: flex;
                    align-items: flex-start;
                    gap: 20px;
                    background-color: rgb(45,45,45);
                    border-radius: 10px;
                }
                .container:hover {
                    background-color: rgb(55, 55, 55);
                }
                .image {
                    width: 150px;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 10px;
                }
                .content {
                    display: flex;
                    flex-direction: column;
                }
                .title {
                    font-size:2em;
                    font-family:monospace;
                    color: rgb(200,200,200);                
                }
                .description {
                    font-size:1em;
                    color: rgb(150,150,150);                
                }
                .mod-tag {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
            </style>

            <div class="container">
                <img class="image" />
                <div class="content">
                    <div class="title"></div>
                    <div class="description"></div>
                    <div class="mod-tag"></div>
                </div>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
        this._container = shadow.querySelector(".mod-tag");
        this._title = shadow.querySelector(".title");
        this._description = shadow.querySelector(".description");
        this._image = shadow.querySelector(".image");
    }

    connectedCallback() {
        const tags = JSON.parse(this.getAttribute("tags")) || [];
        tags.forEach(item => {
            const mod_tag = document.createElement("mod-tag");
            mod_tag.setAttribute("image", item.image);
            mod_tag.setAttribute("text", item.text);
            this._container.appendChild(mod_tag);
        });

        this.addEventListener("click", () => {
            const url = this.getAttribute("website");
            if (url) {
                window.open(url, "_blank");
            }
        })
        this._title.textContent = this.getAttribute("title") || "Default text";
        this._description.textContent = this.getAttribute("desc") || "Default text2";
        this._image.src = this.getAttribute("logo") || "";
    }

    static get observedAttributes() {
        return ["data"];
    }
}
customElements.define("mod-entry", ModEntry);


const screenWidth = window.screen.width / 10;

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
                    color: rgb(200, 200, 200);
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
        this._image.src = this.getAttribute("image") || "";
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
                    width: 100%;
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
                    color: rgb(255, 255, 255);                
                }
                .description {
                    font-size:1em;
                    color: rgb(200, 200, 200);                
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
                window.location.href = url;
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


// Mod Element
class ModElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                display: block;
                cursor: pointer;
                width: 212px;
            }
            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                border-radius: 10px;
                background-color: rgb(45, 45, 45);
                padding-top: 10px;
            }
            .container:hover {
                background-color: rgb(55, 55, 55);
            }
            .image {
                margin-top: 8px;
                width: 192px;
                height: 192px;
                object-fit: cover;
                border-radius: 10px;
            }
            .text {
                font-size: 1.2em;
                font-family: monospace;
                margin-top: -5px;
                margin-bottom: 8px;
                text-align: center;
                color: rgb(255, 255, 255);
            }
        </style>

        <div class="container">
            <img class="image" />
            <div class="text"></div>
        </div>
    `;
    shadow.appendChild(template.content.cloneNode(true));
    this._image = shadow.querySelector(".image");
    this._text = shadow.querySelector(".text");
  }

  connectedCallback() {
    this._image.src = this.getAttribute("image") || "";
    this._text.textContent = this.getAttribute("text") || "";

    this.addEventListener("click", () => {
        const url = this.getAttribute("website");
        if (url && url.trim() !== "") {
            window.location.href = url;
        }
    })
  }
}
customElements.define("mod-element", ModElement);


// Mod Element List
class ModElementList extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    width: 100%;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    border-radius: 10px;
                    background-color: rgb(45, 45, 45);
                    margin-left: var(--margin, 0px);
                }
                .grid {
                    display: inline-grid;
                    padding: 20px;
                    gap: var(--gap, 0px);
                    grid-auto-column: 1fr;
                }
                .text {
                    font-size: 2em;
                    font-family: monospace;
                    color: white;
                    margin-bottom: -20px;
                    margin-top: 10px;
                }
            </style>

            <div class="container">
                <div class="text"></div>
                <div class="grid"></div>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
        this._text = shadow.querySelector(".text");
        this._container = shadow.querySelector(".grid");
        this._test = shadow.querySelector(".container");
    }

    connectedCallback() {
        const elements = JSON.parse(this.getAttribute("elements") || "[]");

        elements.forEach(element => {
            const mod_element = document.createElement("mod-element");
            mod_element.setAttribute("image", element.image);
            mod_element.setAttribute("text", element.text);
            mod_element.setAttribute("website", element.website);
            mod_element.setAttribute("title", element.text);
            this._container.appendChild(mod_element);
        });

        this._text.textContent = this.getAttribute("title") || "";

        this.updateGridSpacing = this.updateGridSpacing.bind(this);
        window.addEventListener("resize", this.updateGridSpacing());
    }

    updateGridSpacing() {
      const modElementWidth = 212;
      const innerWidth = this.getBoundingClientRect().width;
  
      const modElementAmount = Math.floor(innerWidth / modElementWidth);
      const totalGap = innerWidth - (modElementAmount * modElementWidth);
      var gap = 0;
      var margin = (innerWidth - ((modElementAmount * modElementWidth) + totalGap)) / 2;
      if (modElementAmount > 1) {
        gap = Math.round(totalGap / (modElementAmount - 1)) / 4;
      } else {
        margin = Math.round((innerWidth - modElementWidth) / 2);
      }
      this._container.style.setProperty('--gap', `${gap}px`);
      this._test.style.setProperty("--margin", `${margin}px`);
      this._container.style.gridTemplateColumns = `repeat(${modElementAmount}, 212px)`;


      
      console.log('Precise Width:', innerWidth);
      console.log("Elements per row:", modElementAmount);
      console.log("Margin:", margin);
      console.log("Gap:", gap);
    }
}
customElements.define("mod-element-list", ModElementList);


// Multiblock Viewer
class MultiblockViewer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 400px;
          margin: 20px auto;
          font-family: sans-serif;
        }
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .button {
          background-color:rgb(86, 101, 117);
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 18px;
          border-radius: 5px;
          width:197px;
        }
        .button.disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .content {
          text-align: center;
        }
        .image {
          width: 400px;
          height: 400px;
          border-radius: 10px;
        }
        .title {
          margin-bottom: 10px;
          font-size: 18px;
          font-weight: bold;
          color:rgb(255, 255, 255);
        }
      </style>

      <div class="container">
        <div class="content">
          <div class="title"></div>
          <img class="image" />
        <button id="prev" class="button">&larr;  Previous Layer</button>
        <button id="next" class="button">Next Layer  &rarr;</button>
        </div>
      </div>
    `;
    shadow.appendChild(template.content.cloneNode(true));

    this._prev = shadow.getElementById("prev");
    this._next = shadow.getElementById("next");
    this._img = shadow.querySelector(".image");
    this._title = shadow.querySelector(".title");

    this._data = [];
    this._index = 0;

    this._prev.addEventListener("click", () => this.navigate(-1));
    this._next.addEventListener("click", () => this.navigate(1));
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") {
      try {
        this._data = JSON.parse(newValue);
        this._index = 0;
        this.render();
      } catch (e) {
        console.error("Invalid JSON data attribute:", e);
      }
    }
  }

  connectedCallback() {
    this._data = JSON.parse(data);
    if (this._data.length) this.render();
  }

  navigate(direction) {
    const newIndex = this._index + direction;
    if (newIndex >= 0 && newIndex < this._data.length) {
      this._index = newIndex;
      this.render();
    }
  }

  render() {
    const current = this._data[this._index];
    if (!current) return;

    this._img.src = current.img;
    this._img.alt = current.title;
    this._title.textContent = current.title;

    this._prev.classList.toggle("disabled", this._index === 0);
    this._next.classList.toggle("disabled", this._index === this._data.length - 1);
  }
}
customElements.define("multiblock-viewer", MultiblockViewer);

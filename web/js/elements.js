import { VERSIONS } from "./global.js";

// Mod Entry
class ModEntry extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode:"open"});
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
          object-fit: cover;
          border-radius: 10px;
        }
        .content {
          display: flex;
          flex-direction: column;
          padding-right: 10px;
        }
        .title {
          font-family: monospace;
          color: rgb(255, 255, 255);                
        }
        .description {
          color: rgb(200, 200, 200);                
        }

        @media (orientation: landscape) {
          .container {
            margin-bottom: 20px;
          }
          .image {
            width: 150px;
            height: 150px;
          }
          .title {
            font-size: 30px;
          }
          .description {
            font-size: 20px;  
          }
        }
        @media (orientation: portrait) {
          .container {
            margin-top: 30px;
          }
          .image {
            width: 300px;
            height: 300px;
          }
          .title {
            font-size: 50px;
          }
          .description {
            font-size: 30px;
          }
        }
      </style>

      <div class="container">
        <img class="image" part="image" />
        <div class="content">
          <div class="title" part="title"></div>
          <div class="description" part="description"></div>
        </div>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));
    this._title = shadow.querySelector(".title");
    this._description = shadow.querySelector(".description");
    this._image = shadow.querySelector(".image");
  }

  connectedCallback() {
    this.addEventListener("click", () => {
      const url = this.getAttribute("website");
      if (url) {
        window.location.href = url;
      }
    });
    this._title.textContent = this.getAttribute("title") || "";
    this._description.textContent = this.getAttribute("desc") || "";
    this._image.src = this.getAttribute("src") || "";
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
          object-fit: cover;
          border-radius: 10px;
        }
        .text {
          font-family: monospace;
          margin-top: -5px;
          margin-bottom: 8px;
          text-align: center;
          color: rgb(255, 255, 255);

        }

        @media (orientation: landscape) {
          :host {
            width: 212px;
          }
          .container {
            height: 260px;
          }
          .image {
            width: 192px;
            height: 192px;
          }
          .text {
            font-size: 1.2em;
          }
        }
        @media (orientation: portrait) {
          :host {
            width: 318px;
          }
          .container {
            height: 390px;
          }
          .image {
            width: 288px;
            height: 288px;
          }
          .text {
            font-size: 1.8em;
          }
        }
      </style>

      <div class="container">
        <img class="image" part="image"/>
        <div class="text" part="text"></div>
      </div>
    `;
    shadow.appendChild(template.content.cloneNode(true));
    this._image = shadow.querySelector(".image");
    this._text = shadow.querySelector(".text");
  }

  connectedCallback() {
    this._image.src = this.getAttribute("src") || "";
    this._text.textContent = this.getAttribute("title") || "";

    this.addEventListener("click", () => {
      const url = this.getAttribute("website");
      if (url && url.trim() !== "") {
          window.location.href = url;
      }
    });
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
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          border-radius: 10px;
          background-color: rgb(45, 45, 45);
          margin-bottom: 20px;
        }
        .grid {
          display: inline-grid;
          padding: 20px;
          gap: var(--gap, 0px);
          grid-auto-column: 1fr;
          border-radius: 10px;
        }
        .grid ::slotted(*) {
          border-radius: 10px;
        }
        .text {
          font-family: monospace;
          color: white;
          margin-bottom: -20px;
          margin-top: 10px;
        }

        @media (orientation: landscape) {
          .text {
            font-size: 2em;
          }
        }
        @media (orientation: portrait) {
          .text {
            font-size: 3em;
          }
        }
      </style>

      <div class="container">
        <div class="text" part="text"></div>
        <div class="grid">
          <slot></slot>
        </div>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));
    this._text = shadow.querySelector(".text");
    this._container = shadow.querySelector(".grid");
    this._slot = shadow.querySelector("slot");
  }

  connectedCallback() {
    this._text.textContent = this.getAttribute("title") || "";

    this.updateGridSpacing = this.updateGridSpacing.bind(this);
    window.addEventListener("resize", this.updateGridSpacing);
    this.updateGridSpacing();
  }

  updateGridSpacing() {
    const slot = this._slot;
    const slottedElements = slot.assignedElements({flatten: true});

    if (slottedElements.length === 0) return;

    const modElementWidth = slottedElements[0].getBoundingClientRect().width;
    const innerWidth = this.getBoundingClientRect().width;

    const modElementAmount = Math.floor(innerWidth / modElementWidth);
    const totalGap = innerWidth - (modElementAmount * modElementWidth);
    let gap = 0;
    if (modElementAmount > 1) {
      gap = Math.round(totalGap / (modElementAmount - 1)) / 4;
    }

    this._container.style.setProperty('--gap', `${gap}px`);
    this._container.style.gridTemplateColumns = `repeat(${modElementAmount}, ${modElementWidth}px)`;
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


// Info Panel
class InfoPanel extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: monospace;
          width: 100%;
        }
        .container {
          border-radius: 10px;
          background-color: rgb(45, 45, 45);
          padding: 10px;
          margin-bottom: 10px;
        }
        button {
          width: 100%;
          padding: 5px;
          cursor: pointer;
          background-color: rgb(55, 55, 55);
          color: white;
          border: none;
          border-radius: 5px;
        }
        button:hover {
          background-color: rgb(65, 65, 65);
        }
        .content {
          display: none;
          background-color: rgb(45, 45, 45);
        }
        .content.open {
          display: block;
        }
        @media (orientation: landscape) {
          button {
            font-size: 30px;
          }
        }
        @media (orientation: portrait) {
          button {
            font-size: 50px;
          }
        }
      </style>

      <div class="container">
        <button></button>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));

    this.button = shadow.querySelector("button");
    this.content = shadow.querySelector(".content");

    this.toggle = this.toggle.bind(this);
  }

  connectedCallback() {
    this.button.textContent = this.getAttribute("title") || "";
    this.button.addEventListener("click", this.toggle);

    this.content.classList.add("open");
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.toggle);
    this.slot.removeEventListener("slotchange", this.wrapSlottedContent);
  }

  toggle() {
    this.content.classList.toggle("open");
  }
}
customElements.define("info-panel", InfoPanel);


// Update Info
class UpdateInfo extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode:"open"});

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: monospace;
          width: 100%;
        }
        .content {
          display: flex;
          padding: 5px;
          background-color: rgb(45, 45, 45);
          align-items: center;
          border-radius: 8px;
          justify-content: center;
        }
        .text {
          text-align: center;
          word-wrap: break-word;
        }
        .symbol {
          padding-left: 10px;
          padding-right: 10px;
        }
        .hidden {
          display: none;
          margin-bottom: 0px;
        }

        @media (orientation: landscape) {
          .content {
            margin-bottom: 10px;
          }
          .symbol {
            font-size: 30px;
          }
          .text {
            font-size: 25px;
          }
        }
        @media (orientation: portrait) {
          .content {
            margin-bottom: 20px;
          }
          .symbol {
            font-size: 50px;
          }
          .text {
            font-size: 45px;
          }
        }
      </style>
      
      <div class="content">
        <div class="symbol" part="symbol"></div>
        <div class="text" part="text"></div>
        <div class="symbol" part="symbol"></div>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));

    this._content = shadow.querySelector(".content");
    this._text = shadow.querySelector(".text");
    this._symbol = shadow.querySelectorAll(".symbol");

    this.version_info = VERSIONS[this.getAttribute("mod") || "default"];
  }

  connectedCallback() {
    const status = this.getAttribute("status") || "";
    const mod_version = this.getAttribute("version") || "";
    const minecraft_version = this.getAttribute("minecraft") || "";

    var text;
    var color;
    var symbol;

    if(status == "checked") {
      symbol = "⚠";
      color = "red";

      if (minecraft_version == this.version_info.minecraft && mod_version == this.version_info.mod) {
        this._content.classList.add("hidden");
      } else if (minecraft_version != this.version_info.minecraft && (mod_version == this.version_info.mod || mod_version == "")) {
        text = "This page is currently only updated until minecraft version " + minecraft_version;
      } else if ((minecraft_version == this.version_info.minecraft || minecraft_version == "") && mod_version != this.version_info.mod) {
        text = "This page is currently only updated until mod version " + mod_version;    
      } else if ((minecraft_version != this.version_info.minecraft && minecraft_version != "") && (mod_version != this.version_info.mod && mod_version != "")) {
        text = "This page is currently only updated until mod version " + mod_version + " for minecraft version " + minecraft_version; 
      }
    } else if (status == "stopped") {
      symbol = "⨂";
      color = "dodgerBlue";

      if (minecraft_version == "" && mod_version == "") {
        text = "This page won't be updated anymore";
      } else if (minecraft_version != "" && mod_version == "") {
        text = "This page won't be updated anymore after minecraft version " + minecraft_version;
      } else if (minecraft_version == "" && mod_version != "") {
        text = "This page won't be updated anymore after mod version " + mod_version;      
      } else if (minecraft_version != "" && mod_version != "") {
        text = "This page won't be updated anymore after mod version " + mod_version + " for minecraft version " + minecraft_version;       
      }      
    }

    this._symbol.forEach(sym =>{
      sym.textContent = symbol;
      sym.style.color = color;
    });
    this._text.textContent = text;
    this._text.style.color = color;
  }

  static get observedAttributes() {
    return ["mod", "status", "version", "minecraft"];
  }
}
customElements.define("update-info", UpdateInfo);


// Info Box
class InfoBox extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode:"open"});

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .container {
          width: 100%;
          padding: 10px;
          background-color: rgb(45, 45, 45);
          border-radius: 10px;
          font-family: monospace;
          margin-bottom: 20px;
        }
        .text {
          color: rgb(255, 255, 255);
          background-color: rgb(45, 45, 45);
        }
        .content {
          padding-left: 10px;
          background-color: rgb(45, 45, 45);
        }
        ::slotted(*) {
          color: rgb(200, 200, 200);
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          margin-top: 10px;
          text-decoration: none;
        }
        ::slotted(a:hover) {
          text-decoration: underline;
        }

        @media (orientation: landscape) {
          .text {
            font-size: 30px;
          }
          ::slotted(*) {
            font-size: 20px;
          }
        }

        @media (orientation: portrait) {
          .text {
            font-size: 50px;
          }
          ::slotted(*) {
            font-size: 40px;
          }
        }
      </style>

      <div class="container">
        <div class=text></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));

    this._text = shadow.querySelector(".text");
  }

  connectedCallback() {
    this._text.textContent = this.getAttribute("title") || "";
  }
}
customElements.define("info-box", InfoBox);

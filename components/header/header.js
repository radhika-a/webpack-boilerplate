// Creating a class for component specific
class HeaderDetails {
    constructor($element) {
        this._element = $element;
        this.btn = this._element.querySelector(".btn");
        this.count = this._element.querySelector(".count");
        this.clickCount = 1;
        let thisRef = this;
        this.btn.addEventListener("click",function(e){ thisRef.triggerBtn(e);});
    }

    triggerBtn(e){
        let el = e.target;
        el.classList.toggle("highlight");
        el.innerText = el.classList.contains("highlight")? "Selected" : "Select";
        this._element.classList.toggle("selected");
        this.count.innerHTML = "Triggered: " + this.clickCount++ + " times";
    }
}

// Initialising the header component
(() => {
    const header = document.querySelectorAll(".header");
    for (let i = 0; i < header.length; i++) {
        new HeaderDetails(header[i]);
    }
})();
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuHandler = document
  .querySelectorAll(".menu-handler")
  .forEach((btn) =>
    btn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      if (window.screen.width < 768 && mobileMenu.classList.contains("open")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      if (mobileMenu.classList.contains("open")) {
        document.addEventListener("click", menuOutClickWatcher);
      } else {
        document.removeEventListener("click", menuOutClickWatcher);
      }
    })
  );

function menuOutClickWatcher(e) {
  const targetElement = e.target;
  if (
    !targetElement.closest(".mobile-menu") &&
    !targetElement.closest(".menu-handler")
  ) {
    document.body.style.overflow = "auto";
    mobileMenu.classList.remove("open");
  } else if (
    typeof targetElement.href !== "undefined" &&
    !targetElement.closest(".lang-block")
  ) {
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "auto";
  }
}

////////////////// перемикач табів
let tabsContent = document.querySelectorAll(".payment-details-blocks");
let paymentSwitchBlock = document.querySelector(".payment-switch-block");
let sDonateContainer = document.querySelector(".s-donate .container");
let buttons = document.querySelectorAll(".switchable");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    buttons.forEach((tab) => {
      tab.classList.remove("active");
    });
    e.target.classList.add("active");
    tabsContent.forEach((tabContent) => {
      if (tabContent.classList[0] === e.target.classList[1]) {
        tabContent.style.display = "flex";
        let activeTab = document.querySelector(".donate-btn.active");
        if (activeTab.classList.contains("first")) {
          paymentSwitchBlock.style.borderBottom = `1px solid #482FF7`;
        } else if (activeTab.classList.contains("second")) {
          paymentSwitchBlock.style.borderBottom = `1px solid #2D6CDF`;
        } else if (activeTab.classList.contains("third")) {
          paymentSwitchBlock.style.borderBottom = `1px solid #46C3DB`;
        } else if (activeTab.classList.contains("fourth")) {
          paymentSwitchBlock.style.borderBottom = `1px solid #0F0B30`;
        }
      } else {
        tabContent.style.display = "none";
      }
    });
  });
});

//////////////////////// копі іконки
const copyButtons = document.querySelectorAll(".copy-btn");
copyButtons.forEach((copyButton) => {
  const copyContent = async () => {
    try {
      if (copyButton.parentElement.children[0].children.length == 0) {
        console.log(copyButton.parentElement.children[0].innerText);
        await navigator.clipboard.writeText(
          copyButton.parentElement.children[0].innerText
        );
      } else if (
        copyButton.parentElement.children[0].children[0].innerText == ""
      ) {
        console.log(copyButton.parentElement.children[0].childNodes[0].data);
        await navigator.clipboard.writeText(
          copyButton.parentElement.children[0].childNodes[0].data
        );
      } else {
        console.log(copyButton.parentElement.children[0].children[0].innerText);
        await navigator.clipboard.writeText(
          copyButton.parentElement.children[0].children[0].innerText
        );
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  copyButton.addEventListener("click", copyContent);
});

//////////////// акордеон в мобайлі
let accSwitch = document.querySelectorAll(".acc-switch");

const donateAccFunc = () => {
  if (accSwitch.length) {
    accSwitch[0].nextElementSibling.style.maxHeight =
      accSwitch[0].nextElementSibling.scrollHeight + "px";
    accSwitch.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let panel = btn.nextElementSibling;
        btn.classList.toggle("active");
        panel.classList.toggle("active");
        if (panel.classList.contains("active")) {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } else {
          panel.style.maxHeight = 0;
        }
      });
    });
  }
};

donateAccFunc();

//////////////// моб. наша команда

const swifferContainer = document.querySelector(".swiffy-slider ul");

const swiffer = document.querySelector(".swiffy-slider");
const swifferResizer = () => {
  if (
    window.screen.width >= 768 &&
    swifferContainer.classList.contains("slider-container")
  ) {
    swifferContainer.classList.remove("slider-container");
    swifferContainer.classList.add("our-team-static");
  } else if (
    window.screen.width < 768 &&
    swifferContainer.classList.contains("our-team-static")
  ) {
    swifferContainer.classList.add("slider-container");
    swifferContainer.classList.remove("our-team-static");
  }
};
window.addEventListener("resize", swifferResizer);

const swifferHandler = () => {
  if (window.screen.width >= 768) {
    swifferContainer.classList.remove("slider-container");
    swifferContainer.classList.add("our-team-static");
  }
};
swifferHandler();

///////////// збір коштів

const circleFunction = () => {
  let circleColor1 = "rgba(243, 241, 105, 1)";
  let circleColor2 = "rgba(70, 195, 219, 1)";
  let circleColor3 = "rgba(45, 108, 223, 1)";
  let circleColor4 = "rgba(72, 47, 247, 1)";

  const received = document.querySelector("#received").innerText;
  const totalSum = document.querySelector("#total-sum").innerText;
  const percentage =
    parseFloat(received.replace(/,/g, "")) /
    parseFloat(totalSum.replace(/,/g, ""));
  const circle = document.querySelector(".circle");
  const circleRadius = +circle.attributes["r"].value;
  const compStyles = window.getComputedStyle(circle);

  const newLenghtPercentage =
    +percentage * (6.28319 * circleRadius).toFixed() + "px";
  const newCircleLength = (6.28319 * circleRadius).toFixed(2) + "px";

  // console.log(+circle.attributes["r"].value);
  circle.style.strokeDasharray = newLenghtPercentage + "," + newCircleLength;

  if (percentage <= 1 || percentage > 1) {
    circle.style.stroke = circleColor4;
    if (percentage <= 0.75) {
      circle.style.stroke = circleColor3;
      if (percentage <= 0.5) {
        circle.style.stroke = circleColor2;
        if (percentage <= 0.25) {
          circle.style.stroke = circleColor1;
        }
      }
    }
  }
};

circleFunction();

////////// imgs carousel

class InfiniteSlider {
  constructor(
    animTime = "10000",
    selector = ".slider",
    container = "#slider-container"
  ) {
    this.slider = document.querySelector(selector);
    this.container = document.querySelector(container);
    this.width = 0;
    this.oldWidth = 0;
    this.duration = parseInt(animTime);
    this.start = 0;
    this.refresh = 0; //0, 1, or 2, as in steps of the animation
    this._prevStop = false;
    this._stop = false;
    this._oldTimestamp = 0;
  }

  animate() {
    /* fix for browsers who like to run JS before images are loaded */
    const imgs = Array.prototype.slice
      .call(this.slider.querySelectorAll("img"))
      .filter((img) => {
        return img.naturalWidth === 0;
      });
    if (imgs.length > 0) {
      window.requestAnimationFrame(this.animate.bind(this));
      return;
    }

    /* Add another copy of the slideshow to the end, keep track of original width */
    this.oldWidth = this.slider.offsetWidth;
    const sliderText =
      '<span class="slider-extra">' + this.slider.innerHTML + "</span>";
    this.slider.innerHTML += sliderText;

    /* can have content still when we move past original slider */
    this.width = this.slider.offsetWidth;
    const minWidth = 2 * screen.width;

    /* Add more slideshows if needed to keep a continuous stream of content */
    while (this.width < minWidth) {
      this.slider.innerHTML += sliderText;
      this.width = this.slider.width;
    }
    this.slider
      .querySelector(".slider-extra:last-child")
      .classList.add("slider-last");

    /* loop animation endlesssly (this is pretty cool) */
    window.requestAnimationFrame(this.controlAnimation.bind(this));
  }

  halt() {
    this._stop = true;
    this._prevStop = false;
  }

  go() {
    this._stop = false;
    this._prevStop = true;
  }

  stagnate() {
    this.container.style.overflowX = "scroll";
  }

  controlAnimation(timestamp) {
    //console.log('this.stop: ' + this._stop + '\nthis.prevStop: ' + this._prevStop)
    if (this._stop === true) {
      if (this._prevStop === false) {
        this.slider.style.marginLeft = getComputedStyle(this.slider).marginLeft;
        this._prevStop = true;
        this._oldTimestamp = timestamp;
      }
    } else if (this._stop === false && this._prevStop === true) {
      this._prevStop = false;
      this.start = this.start + (timestamp - this._oldTimestamp);
    } else {
      //reset animation
      if (this.refresh >= 1) {
        this.start = timestamp;
        this.slider.style.marginLeft = 0;
        this.refresh = 0;
        window.requestAnimationFrame(this.controlAnimation.bind(this));
        return;
      }
      if (timestamp - this.start >= this.duration) {
        this.refresh = 1;
      }

      const perc = ((timestamp - this.start) / this.duration) * this.oldWidth;
      this.slider.style.marginLeft = -perc + "px";
    }
    window.requestAnimationFrame(this.controlAnimation.bind(this));
    return;
  }

  getIeWidth() {
    this.slider.style.marginLeft = "-99999px";
  }

  ie11Fix() {
    this.slider.querySelector(".slider-last").style.position = "absolute";
  }
}

function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  const slider = new InfiniteSlider(20000);
  const ie = detectIE();

  //Dont animate under IE10, just place the images
  if (ie !== false && ie < 10) {
    slider.stagnate();
    return;
  }
  //IE 11 and lower, fix for width *increasing* as more of the slider is shown
  if (ie !== false && ie < 12) {
    slider.getIeWidth();
  }

  slider.animate();
  document
    .querySelector("#slider-container")
    .addEventListener("mouseenter", slider.halt.bind(slider));
  document
    .querySelector("#slider-container")
    .addEventListener("mouseleave", slider.go.bind(slider));

  if (ie === 11) {
    setTimeout(slider.ie11Fix.bind(slider), 1000);
  }
});
///////////////////////

//////// faq-accordion
const acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

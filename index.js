let accSwitch = document.querySelectorAll(".acc-switch");
let buttons = document.querySelectorAll(".switchable");
let tabsContent = document.querySelectorAll(".payment-details-blocks");
let paymentSwitchBlock = document.querySelector(".payment-switch-block");
let sDonateContainer = document.querySelector(".s-donate ._container");
let menu = document.querySelector("header ._container");
let header = document.querySelector("header");

  // let opener = document.querySelectorAll(".open");
  // opener.forEach((item) => {
  //   item.addEventListener("click", () => {
  //     menu.classList.toggle("active-menu");
  //   });
  // });


// перемикач табів
buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    e.preventDefault();
    buttons.forEach((tab) => {
      tab.classList.remove("active");
    });
    e.target.classList.add("active");
    tabsContent.forEach((tabContent) => {
      if (tabContent.classList[0] === e.target.classList[1]) {
        tabContent.style.display = "flex";
        let a = window.getComputedStyle(button);
        paymentSwitchBlock.style.borderBottom = `1px solid ${a.backgroundColor}`;
      } else {
        tabContent.style.display = "none";
      }
    });
  })
);

// копі іконки
let copyButtons = document.querySelectorAll(".copy-button");
copyButtons.forEach((copyButton) => {
  const copyContent = async () => {
    try {
      if (copyButton.parentElement.children[0].children.length == 0) {
        await navigator.clipboard.writeText(
          copyButton.parentElement.children[0].innerText
        );
        console.log(
          `Content ${copyButton.parentElement.children[0].innerText} copied to clipboard`
        );
      } else if (
        copyButton.parentElement.children[0].children[0].innerText == ""
      ) {
        await navigator.clipboard.writeText(
          copyButton.parentElement.children[0].childNodes[0].data
        );
        console.log(
          `Content ${copyButton.parentElement.children[0].childNodes[0].data} copied to clipboard`
        );
      } else {
        await navigator.clipboard.writeText(
          copyButton.parentElement.children[0].children[0].innerText
        );
        console.log(
          `Content ${copyButton.parentElement.children[0].children[0].innerText} copied to clipboard`
        );
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  copyButton.addEventListener("click", copyContent);
});

// акордеон в мобайлі

accSwitch.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.classList.toggle("active");
    let panel = btn.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

//

// плавний перехід
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//       e.preventDefault();

//       document.querySelector(this.getAttribute('href')).scrollIntoView({
//           behavior: 'smooth'
//       });
//   });
// });
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (+screen.width < 1149) {
    if (+window.scrollY.toFixed() > 40) {
      document.getElementById("scroll-to-small").classList.add("smaller-pd");
      header.classList.add("bg-header");
    } else if (+window.scrollY.toFixed() < 10) {
      header.classList.remove("bg-header");
      document
        .getElementById("scroll-to-small")
        .classList.remove("backsmaller-pd");
    }
  }
  // else if (+screen.width < 582) {
  //   if (+window.scrollY.toFixed() > 40) {
  //     document.getElementById("scroll-to-small").classList.add("smaller-pd");
  //     header.classList.add("bg-header");
  //   } else if (+window.scrollY.toFixed() < 10) {
  //     header.classList.remove("bg-header");
  //     document
  //       .getElementById("scroll-to-small")
  //       .classList.remove("backsmaller-pd");
  //   }
  // }
  else {
    if (+window.scrollY.toFixed() > 80) {
      document.getElementById("scroll-to-small").classList.add("smaller-pd");
      header.classList.add("bg-header");
    } else if (+window.scrollY.toFixed() < 10) {
      header.classList.remove("bg-header");
      document
        .getElementById("scroll-to-small")
        .classList.remove("backsmaller-pd");
    }
  }
}

// збір коштів

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

// console.log(+circle.attributes['r'].value)
circle.style.strokeDasharray = newLenghtPercentage + "," + newCircleLength;

if (percentage <= 1 || percentage > 1) {
  // console.log('>=1');
  circle.style.stroke = circleColor4;
  if (percentage <= 0.75) {
    // console.log('<=0.75');
    circle.style.stroke = circleColor3;
    if (percentage <= 0.5) {
      // console.log('<=0.50');
      circle.style.stroke = circleColor2;
      if (percentage <= 0.25) {
        // console.log('<=0.25');
        circle.style.stroke = circleColor1;
      }
    }
  }
}

//////////////// карусель
function carousel() {
  let carouselSlider = document.querySelector(".carousel__slider");
  let list = document.querySelector(".carousel__list");
  let item = document.querySelectorAll(".carousel__item");
  let list2;

  const speed = 0.6;

  const width = list.offsetWidth;
  let x = 0;
  let x2 = width;

  function clone() {
    list2 = list.cloneNode(true);
    carouselSlider.appendChild(list2);
    list2.style.left = `${width}px`;
  }

  function moveFirst() {
    x -= speed;

    if (width >= Math.abs(x)) {
      list.style.left = `${x}px`;
    } else {
      x = width;
    }
  }

  function moveSecond() {
    x2 -= speed;

    if (list2.offsetWidth >= Math.abs(x2)) {
      list2.style.left = `${x2}px`;
    } else {
      x2 = width;
    }
  }

  function hover() {
    clearInterval(a);
    clearInterval(b);
  }

  function unhover() {
    a = setInterval(moveFirst, 10);
    b = setInterval(moveSecond, 10);
  }

  clone();

  let a = setInterval(moveFirst, 10);
  let b = setInterval(moveSecond, 10);

  carouselSlider.addEventListener("mouseenter", hover);
  carouselSlider.addEventListener("mouseleave", unhover);
}

carousel();

// //////////////// закривання меню

let hamMenu = document.querySelector('.hamburger-menu');
let hamStyle = window.getComputedStyle(hamMenu)

let hamburgerWidth =  hamStyle.width;
// console.log(hamburgerWidth.length);
// console.log(hamburgerWidth.substring(0, hamburgerWidth.length - 2));
let widthToRight = '-' + (+hamburgerWidth.substring(0, +hamburgerWidth.length - 2) + 50).toFixed()+'px';
// console.log(widthToRight); 
document.addEventListener("click", (e) => {
  // console.dir(e.target)
  if (
    // menu.classList.contains("active-menu") &&
    !e.target.classList.contains("hamburger-menu") &&
    !e.target.classList.contains("open") &&
    e.target.alt !== 'ua' &&
    !e.target.classList.contains("lang-switch") &&
    !e.target.localName !== "img" &&
    !e.target.classList.contains("icon-in-hamburger") &&
    !e.target.classList.contains("lang-switch")
  ) {
    if(hamStyle.right == '0px'){
      b.classList.remove("show");
      a.classList.add("show");
      hamMenu.style.right = widthToRight;
     }
  }
});

// ////////////////

let a = document.querySelector("#svg");
let b = document.querySelector("#non");
a.addEventListener("click", () => {
  if(hamStyle.right == '0px'){
    a.classList.remove("show");
    b.classList.add("show");
    hamMenu.style.right = widthToRight
    // console.log(hamStyle.right);
  }
  else if(hamStyle.right !== '0px'){
    a.classList.remove("show");
    b.classList.add("show");
    hamMenu.style.right = '0px'
    // console.log(hamStyle.right);
  }

});
b.addEventListener("click", () => {
  if(hamStyle.right == '0px'){
    a.classList.add("show");
    b.classList.remove("show");
    hamMenu.style.right = widthToRight
    // console.log(hamStyle.right);
  }
  else if(hamStyle.right !== '0px'){
    a.classList.add("show");
    b.classList.remove("show");
    hamMenu.style.right = '0px'
    // console.log(hamStyle.right);
  }
});

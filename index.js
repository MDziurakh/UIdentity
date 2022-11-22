let buttons = document.querySelectorAll(".switchable");
let tabsContent = document.querySelectorAll(".payment-details-blocks");
let paymentSwitchBlock = document.querySelector(".payment-switch-block");
let sDonateContainer = document.querySelector(".s-donate ._container");

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
      } else if(copyButton.parentElement.children[0].children[0].innerText == ''){
        await navigator.clipboard.writeText(
          copyButton.parentElement.children[0].childNodes[0].data
        );
        console.log(
          `Content ${copyButton.parentElement.children[0].childNodes[0].data} copied to clipboard`
        );
        }
      else {
        await navigator.clipboard.writeText(
          copyButton.parentElement.children[0].children[0].innerText
        );
      console.log(
        `Content ${copyButton.parentElement.children[0].children[0].innerText} copied to clipboard`
      );
    } 
  }
  catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  copyButton.addEventListener("click", copyContent);
});

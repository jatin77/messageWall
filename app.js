//class details
class Details {
  constructor(msg, msgFrom, msgTo) {
    this.msg = msg;
    this.msgFrom = msgFrom;
    this.msgTo = msgTo;
  }
}
//Class ui
class UI {
  //get details
  static showDetails() {
    const details = Store.getMsgs();
    details.forEach((detail) => UI.displayDetails(detail));
  }

  //show alert
  static showAlert(message, className) {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add(`alert`, `${className}`)
    const msgForm = document.querySelector(".msg-form");
    alertDiv.textContent = `${message}`
    msgForm.insertBefore(alertDiv, msgForm.childNodes[0]);
    //hide alert after 4sec
    setTimeout(() => {
      alertDiv.remove();
    }, 4000)
  }
  //display message in Dom
  static displayDetails(detail) {
    const msgForm = document.querySelector(".msg-form")
    const displayMsg = document.querySelector(".display-msg");
    const displayLi = document.createElement("li");
    displayLi.innerHTML = ` <div>
    <i class="fas fa-quote-left text"></i>
    <span class="display-text">
    ${detail.msg}
    </span>
    <i class="fas fa-quote-right"></i>
  </div>
  <div class="display-location">
    <h5 class="display-from">From: ${detail.msgFrom}</h5>
    <i class="fas fa-trash-alt delete"></i>
    <h5 class="display-to">To: ${detail.msgTo}</h5>
  </div>`;
    displayMsg.appendChild(displayLi)

    msgForm.reset();
  }
  //delete message 
  static deleteMessage(e) {
    if (e.target.classList.contains("delete")) {
      const targetLi = e.target.parentElement.parentElement;
      targetLi.remove();
      UI.showAlert("Your message has been removed", "success");
    }
  }

}
//class for local storage
class Store {
  //get messages
  static getMsgs() {
    let details;
    if (localStorage.getItem("details") === null) {
      details = []
    } else {
      details = JSON.parse(localStorage.getItem("details"));

    }
    return details;
  }
  //add messages
  static addMsg(detail) {
    const details = Store.getMsgs();
    details.push(detail);
    localStorage.setItem("details", JSON.stringify(details));

  }

  static remove(msg) {
    const details = JSON.parse(localStorage.getItem("details"));
    details.forEach((detail, index) => {
      if (detail.msg.trim() == msg) {
        details.splice(index, 1);
      }
    })
    localStorage.setItem("details", JSON.stringify(details))
  }

}
//events
//form submit
document.querySelector(".msg-form").addEventListener("submit", (e) => {
  //prevent from submitting
  e.preventDefault();
  //get input values
  const msg = document.querySelector("#message").value;
  const msgFrom = document.querySelector("#from").value;
  const msgTo = document.querySelector("#to").value;
  //validation of input
  if (msg === "" || msgFrom === "" || msgTo === "") {
    UI.showAlert("Enter Valid Details", "danger");
    return;
  }
  const detail = new Details(msg, msgFrom, msgTo);
  //call display input on screen
  UI.displayDetails(detail);
  UI.showAlert("Your message has been displayed on screen", "success");
  //call save messsage on local storage
  Store.addMsg(detail)
  // Store.addStoredMsg(details)
})
//delete message
document.querySelector(".display-msg").addEventListener("click", (e) => {
  UI.deleteMessage(e);
  Store.remove(e.target.parentElement.parentElement.querySelector(".display-text").textContent.trim());

});
document.addEventListener("DOMContentLoaded", UI.showDetails);
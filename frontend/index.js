 
 function CountW() {
    const urlInput = document.getElementById("urlInput");
    const url = urlInput.value.trim();

// check url
    if (url === "") {
      alert("Please enter a valid URL.");
      return;
    }

    
    fetch('http://localhost:8080/api/wordcount', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      count: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
      
      const searchTable = document.getElementById("table");
      const newRow = searchTable.insertRow(-1);

      const urlCell = newRow.insertCell(0);
      const favCell = newRow.insertCell(1);
      const wordCountCell = newRow.insertCell(2);
      const actionCell = newRow.insertCell(3);
      const actionCell2 = newRow.insertCell(4);
      urlCell.innerHTML = url;
      favCell.innerHTML = "false";
      wordCountCell.innerHTML = data.wordCount;
      actionCell.innerHTML = '<button onclick="remove(this)">Remove</button>';
      actionCell2.innerHTML = '<button onclick="AddF(this)">Add-to-fav</button>';
      
      // to clear input 
      urlInput.value = "";
    })
    .catch(error => {
      console.log(error);
      alert("An error occurred while fetching the word count. Please try again.");
    });
  }
  function remove(button) {
    const row = button.parentNode.parentNode;
    const table = row.parentNode;
    table.removeChild(row);
  }

  function AddF(button) {
    const row = button.parentNode.parentNode;
    const favCell = row.cells[1];
    const isFavorite = favCell.innerHTML === "true";
    favCell.innerHTML = isFavorite ? "false" : "true";
  }

  const checkButton = document.getElementById("checkButton");
  checkButton.addEventListener("click", CountW); 


const getData=()=>{
    fetch("http://localhost:8080/api/previous",{

    }).then(res=>res.json())
    
        .then(totalPreS => {
      const parent = document.getElementById("parent");
      for (let total of totalPreS) {
        const div = document.createElement("div");
        const url = document.createElement("h2");
        const count = document.createElement("h3");
       
       url.textContent = total.url;
        count.textContent = total.wordCount;

       div.appendChild(url);
        div.appendChild(count);
       parent.appendChild(div);
      }
    })
    .catch(err => console.log(err));
};

const previous = document.getElementById("pre");
previous.addEventListener("click", getData)
 
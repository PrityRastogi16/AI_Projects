document.addEventListener("DOMContentLoaded", function() {
    let generateBtn = document.getElementById("genBtn");
    let contentTypeSelect = document.getElementById("contentType");
    let userInput = document.getElementById("userInp");
    let dataBox = document.getElementById("data");

    generateBtn.addEventListener("click", async (event) => {
        event.preventDefault(); 
        let selectedContentType = contentTypeSelect.value;
        let userInputValue = userInput.value.trim();
        try {
            let response = await fetch(`http://localhost:4000/${selectedContentType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userInputValue })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data = await response.json();
            displayData(data.response);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
    function displayData(data) {
        dataBox.innerHTML = "";
        let responseData = document.createElement("p");
        responseData.textContent = data;
        dataBox.appendChild(responseData);
    }
});

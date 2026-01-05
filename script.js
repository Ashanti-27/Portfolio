const filterButtons = document.querySelectorAll('.fb-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Handle Button Colors
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 2. Get the category
        const filterValue = button.getAttribute('data-filter');

        // 3. Show/Hide cards instantly
        skillCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'flex'; 
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const form = document.getElementById("my-form");
const toast = document.getElementById("status-popup");
const toastText = document.getElementById("status-text");

async function handleSubmit(event) {
    event.preventDefault(); // Prevents the redirect to Formspree page
    const data = new FormData(event.target);
    
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            showToast("Success: Message Sent Successfully!", "#c1121f");
            form.reset();
        } else {
            showToast("Error: Something went wrong.", "#ff0000");
        }
    }).catch(error => {
        showToast("Error: Problem connecting to server.", "#ff0000");
    });
}

function showToast(message, color) {
    toastText.innerText = message;
    toast.style.display = "block";
    toast.style.borderLeftColor = color;
    
    // Automatically hide after 5 seconds
    setTimeout(() => {
        closeToast();
    }, 5000);
}

function closeToast() {
    toast.style.display = "none";
}

form.addEventListener("submit", handleSubmit);


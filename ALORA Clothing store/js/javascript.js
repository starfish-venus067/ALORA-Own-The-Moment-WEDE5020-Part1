
document.addEventListener("DOMContentLoaded", function () {

    // PRODUCT CATEGORY FILTER AND SEARCH

    const buttons = document.querySelectorAll(".filter-btn");
    const products = document.querySelectorAll(".product-card");
    const noProducts = document.getElementById("no-products");
    const searchInput = document.getElementById("product-search");
    const sortSelect = document.getElementById("sort-price");
    

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category") || "all";

    let currentCategory = selectedCategory;

    function updateProducts() {

        let visibleProducts = 0;

        const searchTerm = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        products.forEach(function (product) {

            const matchesCategory =
                currentCategory === "all" ||
                product.dataset.category === currentCategory;

            const matchesSearch =
                product.textContent.toLowerCase().includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                product.style.display = "";
                visibleProducts++;
            } else {
                product.style.display = "none";
            }
                

        });



        if (noProducts) {
            noProducts.hidden = visibleProducts !== 0;
        }

        buttons.forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.filter === currentCategory
            );
        });
    }
// SORT PRODUCTS BY PRICE

    if (sortSelect) {

    sortSelect.addEventListener("change", function () {

        const productList = products[0].parentElement;

        const sortedProducts = Array.from(products);

        if (sortSelect.value === "low-high") {

            sortedProducts.sort(function (a, b) {
                const priceA = parseFloat(
                    a.querySelector(".price").textContent.replace("R", "")
                );

                const priceB = parseFloat(
                    b.querySelector(".price").textContent.replace("R", "")
                );

                return priceA - priceB;
            });

        } else if (sortSelect.value === "high-low") {

            sortedProducts.sort(function (a, b) {
                const priceA = parseFloat(
                    a.querySelector(".price").textContent.replace("R", "")
                );

                const priceB = parseFloat(
                    b.querySelector(".price").textContent.replace("R", "")
                );

                return priceB - priceA;
            });

        }

        sortedProducts.forEach(function (product) {
            productList.appendChild(product);
        });

    });

}

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            currentCategory = button.dataset.filter;

            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set("category", currentCategory);

            window.history.replaceState({}, "", newUrl);

            updateProducts();

        });

    });

    if (searchInput) {
        searchInput.addEventListener("input", updateProducts);
    }

    const validCategory = Array.from(buttons).some(function (button) {
        return button.dataset.filter === selectedCategory;
    });

    currentCategory = validCategory ? selectedCategory : "all";

    updateProducts();

// PRODUCT IMAGE POPUP

const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

products.forEach(function (product) {

    const image = product.querySelector("img");

    image.addEventListener("click", function () {

        modalImage.src = image.src;
        modalImage.alt = image.alt;

        imageModal.style.display = "flex";

    });

});

if (closeModal) {
    closeModal.addEventListener("click", function () {
        imageModal.style.display = "none";
    });
}

if (imageModal) {
    imageModal.addEventListener("click", function (event) {

        if (event.target === imageModal) {
            imageModal.style.display = "none";
        }

    });
}

// FAQ ACCORDION

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem = question.parentElement;

        faqItem.classList.toggle("active");

        const symbol = question.querySelector("span");

        if (faqItem.classList.contains("active")) {
            symbol.textContent = "-";
        } else {
            symbol.textContent = "+";
        }

    });

});

});


// ALORA ENQUIRY FORM

document.addEventListener("DOMContentLoaded", function () {

    const enquiryForm = document.getElementById("enquiry-form");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            alert("Thank you! Your enquiry has been received successfully.");

            enquiryForm.reset();

        });

    }

});


// ALORA CONTACT FORM

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("contact-name").value;
            const email = document.getElementById("contact-email").value;
            const type = document.getElementById("message-type").value;
            const message = document.getElementById("contact-message").value;

            const recipient = "desirevenus042@gmail.com";

            const subject = encodeURIComponent("ALORA - " + type);

            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\nMessage Type: " + type +
                "\n\nMessage:\n" + message
            );

            window.location.href =
                "mailto:" + recipient +
                "?subject=" + subject +
                "&body=" + body;

        });

    }

});


// DYNAMIC ALORA PICKS

document.addEventListener("DOMContentLoaded", function () {

    const dynamicProducts = [
        {
            name: "THE EVERYDAY TEE",
            price: "R449.99",
            image: "Images/swag down.jpg",
            link: "Enquiry.html"
        },
        {
            name: "THE CLASSIC SWEATER",
            price: "R699.99",
            image: "Images/alora jorts.jpg",
            link: "Enquiry.html"
        },
        {
            name: "THE SIGNATURE HOODIE",
            price: "R749.99",
            image: "Images/darker pants.jpg",
            link: "Enquiry.html"
        },
        {
            name: "THE COMFORT JOGGERS",
            price: "R399.99",
            image: "Images/flame hoodie.jpg",
            link: "Enquiry.html"
        }
    ];

    const productContainer = document.getElementById("dynamic-products");

    if (productContainer) {

        dynamicProducts.forEach(function (product) {

            const card = document.createElement("div");
            card.className = "arrival-card";

            card.innerHTML = `
                <div class="arrival-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <a href="${product.link}">ENQUIRE NOW →</a>
            `;

            productContainer.appendChild(card);

        });

    }

});
// Create Order Form
const create_order_form = document.getElementById("create-order-form");

// Form Elements
const service = document.getElementById("service");
const client_name = document.getElementById("client-name");
const client_location = document.getElementById("client-location");
const site_email = document.getElementById('site-email')
const rate = document.getElementById("rate");
const qtv = document.getElementById("qtv");
const invoice_number_input = document.getElementById("invoice-number-input");
const currency = document.getElementById("currency");

// UI elements
const client_name_display = document.getElementById('client-name-display')
const client_location_display = document.getElementById('client-location-display')
const site_email_display = document.getElementById('site-email-display')
const invoice_number = document.getElementById("invoice-number");

// Order List Item
const orderList = document.getElementById("order-list");

let total = [];

document.addEventListener("DOMContentLoaded", function (e) {


    // --> Get Data From Local Storage
    const invoice_data = localStorage.getItem('invoice_data');
    const formData = JSON.parse(invoice_data)

    if (formData) {
        site_email.value = formData.email
        site_email_display.textContent = formData.email
        invoice_number_input.value = formData.invoice_number
        invoice_number.textContent = formData.invoice_number
    }

    create_order_form.addEventListener("submit", function (e) {

        e.preventDefault();

        const order = document.querySelectorAll(".order");

        invoice_number.innerHTML = invoice_number_input.value;
        client_name_display.innerHTML = client_name.value;

        client_location_display.innerHTML = client_location.value;
        site_email_display.innerHTML = site_email.value

        const data = {
            email: site_email.value,
            invoice_number: invoice_number_input.value,
        };

        // Save Data on Local Storage
        const dataJSON = JSON.stringify(data);
        localStorage.setItem('invoice_data', dataJSON);


        // Add id for order
        if (order[0]) {
            const lastOrder = order[order.length - 1];
            var newid = Number(lastOrder.id) + 1;

        } else {
            var newid = 1;
            qtv.value == '' ? total.push(Number(rate.value)) : total.push(Number(rate.value) * Number(qtv.value));
        }

        // Total orders

        // Create New Order in UI
        if (service.value && rate.value && client_name.value && site_email) {
            let newOrder = `
                <tr id="${newid}" class="order">
                    <td>${service.value}</td>
                    <td>${currency.value} <span>${rate.value}</span></td>
                    <td>${qtv.value == '' ? 0 : qtv.value}</td>
                    <td class="text-end">${currency.value} <span class="rate">${qtv.value == '' || qtv.value == 0 ? rate.value : (rate.value * qtv.value)}</span> </td>
                    <td><button class="remove-btn  btn btn-danger" onclick="remove(${newid}, ${rate.value * qtv.value})">حذف</button></td>
                </tr>
            `;
            orderList.innerHTML += newOrder;
        }
        createTotal()
    });
});


// --> Preint Invoice
const createOrderPage = document.getElementById('create-order-page')
function printInvoice() {
    window.print();
}

// --> Remove Order
const remove = (id, rate) => {
    const removeOrder = document.getElementById(id);

    for (let i = 0; i < total.length; i++) {
        if (total[i] === rate) {
            total.splice(i, 1);
            break;
        }
    }

    removeOrder.remove();
    createTotal()

}

// --> Show Date
function showDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    document.getElementById('date').innerHTML = today;
}

showDate()

const createTotal = () => {
    var total2 = [];


    const total_display = document.getElementById("total");
    const rateOrders = document.querySelectorAll(".rate");

    let newTotal = 0;

    rateOrders.forEach(rate => {
        total2.push(Number(rate.innerHTML));
    })

    for (let i = 0; i < total2.length; i++) {
        newTotal += total2[i];
    }

    total_display.innerText = `${currency.value} ${newTotal}`;

    console.log(newTotal);
    console.log(total2);
}

 const main_nav = document.querySelector("main-nav");
 window.onscroll = () => showbtnup(); const showbtnup = () => {
     document.body.scrollTop > 60 || document.documentElement.scrollTop > 60 ?  main_nav.classList.add('sticky') : main_nav.classList.remove('sticky') 
};

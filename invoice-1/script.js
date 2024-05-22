const addBtn = document.getElementById("add-btn");

const service = document.getElementById("service");
const client_name = document.getElementById("client-name");
const client_name_display = document.getElementById('client-name-display')

const description = document.getElementById("description");
const rate = document.getElementById("rate");
const qtv = document.getElementById("qtv");

const currency = document.getElementById("currency");
const tribute = document.getElementById("tribute");

const invoice_number_input = document.getElementById("invoice-number-input");
const invoice_number = document.getElementById("invoice-number");

const orderList = document.getElementById("order-list");

let total = [];

document.addEventListener("DOMContentLoaded", function (e) {


    const tribute_count = document.getElementById("tribute-count");


    addBtn.addEventListener("click", function (e) {

        // Add id for order && Total
        const order = document.querySelectorAll(".order");
        const totalEle = document.getElementById("total");

        invoice_number.innerHTML = invoice_number_input.value;
        client_name_display.innerHTML = client_name.value;

        if (order[0]) {
            const lastOrder = order[order.length - 1];
            var newid = Number(lastOrder.id) + 1;

            const rateOrders = document.querySelectorAll(".rate");
            rateOrders.forEach( ratesd => {
                total.push(Number(ratesd.innerHTML));
            })

            let newTotal = 0;

            for (let i = 0; i < total.length; i++) {
                newTotal += total[i];
            }

            totalEle.innerText = newTotal - tribute.value;
            console.log(total);

        }else{

            var newid = 1;

            if (qtv.value == '') {
                totalEle.innerText = rate.value - tribute.value
                total.push(Number(rate.value));
            }else{
                totalEle.innerText = `${currency.value} ${(qtv.value  *  rate.value) - tribute.value}`
                total.push(Number(rate.value) * Number(qtv.value));
            }

        }

        tribute_count.innerHTML = `${currency.value} ${tribute.value}`;

        // Total orders
        
        // if (service.value && rate.value) {
            let newOrder = `
                <tr id="${newid}" class="order">
                    <td>${service.value}</td>
                    <td>${description.value}</td>
                    <td>${currency.value} <span>${rate.value}</span></td>
                    <td>${qtv.value}</td>
                    <td class="text-end">${currency.value} <span class="rate">${rate.value * qtv.value}</span> </td>
                    <td><button class="remove-btn  btn btn-danger" onclick="remove(${newid}, ${rate.value * qtv.value})">حذف</button></td>
                </tr>
            `;
            orderList.innerHTML += newOrder;
        // }
    });
});

// --> Preint Invoice
const createOrderPage = document.getElementById('create-order-page')
function printInvoice(){
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

    console.log(total);

    const totalEle = document.getElementById("total");
    let newTotal = 0;

    for (let i = 0; i < total.length; i++) {
        newTotal += total[i];
    }

    totalEle.innerText = newTotal - tribute.value;

    removeOrder.remove();
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
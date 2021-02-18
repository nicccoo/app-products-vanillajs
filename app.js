class Products {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        //dentro de este div va a crear el elemento y renderizarlo
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4"> 
                <div class="card-body">
                    <strong>Product</strong>: ${product.name} 
                    <strong>Price</strong>: ${product.price}
                    <strong>Year</strong>: ${product.year}
                    <a href"#" name="delete" class="btn btn-danger">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);


    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            console.log(element.parentElement.parentElement.parentElement.remove());
            this.showMessage('Product Deleted Successfully' , 'info');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //Show in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app')

        container.insertBefore(div, app);
        setTimeout(()=> {
            document.querySelector('.alert').remove();
        },2500)
    }

}

//DOM EVENTS

document.getElementById('product-form')
    .addEventListener('submit', (e) => {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        const product = new Products(name, price, year);
     
        
        const ui = new UI();
        if (name === '' || price === '' || year === '') {
            return ui.showMessage('Complete Fields', 'danger');
        } 
        
        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Product added successfully', 'success');

        e.preventDefault();
    })

document.getElementById('product-list')
    .addEventListener('click', (e) => {
        const ui = new UI();

        ui.deleteProduct(e.target);
    })


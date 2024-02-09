console.log('Moda Shoes')

const getProducts = async () => { 
    const response = await fetch('js/products.json')
    const data = await response.json()
    // console.log(data)
    return data
}

const generateCard = async () => {
    const products = await getProducts()
    
    products.map(product => {
        //console.log(product)
        let card = document.createElement('div')
        card.classList.add('card__produto')
        card.innerHTML = ` <figure>
        <img src="img/${product.image}" alt=${product.product_name} />
    </figure>
    <div class="card__produto_detalhes">
        <h4>${product.product_name}</h4>
        <h5>Modelo:${product.product_model}</h5>
    </div>
    <h6 class="card__produto_preco">Preço: R$ ${product.price}</h6>`
    const listaProdutos = document.querySelector('.lista__produtos')
    listaProdutos.appendChild(card)
    })
}

generateCard()


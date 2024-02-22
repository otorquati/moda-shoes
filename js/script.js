const botaoVoltar = document.querySelector('.voltar')
const sectionDetalhesProduto = document.querySelector('.produto__detalhes')
const sectionProdutos = document.querySelector('.produtos')
// Oculta botão voltar e detalhes de produto
botaoVoltar.style.display = 'none'
sectionDetalhesProduto.style.display = 'none'

const formatCurrency = (number) => {
    return number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

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
    <h6 class="card__produto_preco">Preço: ${formatCurrency(product.price)}</h6>`
    const listaProdutos = document.querySelector('.lista__produtos')
    listaProdutos.appendChild(card)

    card.addEventListener('click', () => {
        // Oculta a lista de produtos
        sectionProdutos.style.display = 'none'
        // mostrar pagina detalhes
        botaoVoltar.style.display = 'block'
        sectionDetalhesProduto.style.display = 'grid'
    })

    })
}

generateCard()

botaoVoltar.addEventListener('click', () => {
    // Mostrar a lista de produtos
    sectionProdutos.style.display = 'flex'
    // Ocultar pagina detalhes
    botaoVoltar.style.display = 'none'
    sectionDetalhesProduto.style.display = 'none'
})

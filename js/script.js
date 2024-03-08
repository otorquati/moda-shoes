const botaoVoltar = document.querySelector('.voltar')
const sectionDetalhesProduto = document.querySelector('.produto__detalhes')
const sectionProdutos = document.querySelector('.produtos')
const sectionHero = document.querySelector('.hero')
// Oculta botão voltar e detalhes de produto
const ocultarBotaoeSecao = () => {
    botaoVoltar.style.display = 'none'
    sectionDetalhesProduto.style.display = 'none'
}

ocultarBotaoeSecao()

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
        card.id = product.id
        card.classList.add('card__produto')
        card.innerHTML = ` 
        <figure>
            <img src="img/${product.image}" alt=${product.product_name} />
        </figure>
        <div class="card__produto_detalhes">
            <h4>${product.product_name}</h4>
            <h5>Modelo:${product.product_model}</h5>
        </div>
        <h6 class="card__produto_preco">Preço: ${formatCurrency(product.price)}</h6>`
        const listaProdutos = document.querySelector('.lista__produtos')
        listaProdutos.appendChild(card)
        preencherCard(card, products)
    })
}

generateCard()

botaoVoltar.addEventListener('click', () => {
    // Mostrar a lista de produtos
    sectionProdutos.style.display = 'flex'
    // Ocultar pagina detalhes
    ocultarBotaoeSecao()
    resetarSelecao(radios)
    
})

const preencherDadosProdutos = (product) => {
    //preencher imagem
    const images = document.querySelectorAll('.produto__detalhes_imagens figure img')
    const imagesArray = Array.from(images)
    imagesArray.map( image => {
        image.src = `./img/${product.image}`
    })
    // preencher nome, modelo e preço
    document.querySelector('.detalhes span').innerHTML = product.id // adjust all
    document.querySelector('.detalhes h4').innerHTML = product.product_name
    document.querySelector('.detalhes h5').innerHTML = product.product_model
    document.querySelector('.detalhes h6').innerHTML = formatCurrency(product.price)
}

// Mudar icone do details frete
const details = document.querySelector('details')
details.addEventListener('toggle', () => {
    const summary = document.querySelector('summary')
    summary.classList.toggle('icone-expandir')
    summary.classList.toggle('icone-recolher')
})

const preencherCard = (card, products) => {
    card.addEventListener('click', (e) => {
        // Oculta a lista de produtos
        sectionProdutos.style.display = 'none'
        // mostrar pagina detalhes
        botaoVoltar.style.display = 'block'
        sectionDetalhesProduto.style.display = 'grid'
        // Identificar o card clicado
        const carClicado = e.currentTarget
        const idProduto = carClicado.id
        const produtoClicado = products.find(product => product.id == idProduto)     
        // Preencher dados de detalhes de produtos
        preencherDadosProdutos(produtoClicado)
    })
}

/* Aula 11 */
const btnCarrinho = document.querySelector('.btn__carrinho .icons')
const sectionCarrinho = document.querySelector('.carrinho')

btnCarrinho.addEventListener('click', () => {
    sectionCarrinho.style.display = 'block'
    sectionHero.style.display = 'none'
    sectionProdutos.style.display = 'none'
    sectionDetalhesProduto.style.display = 'nome' 
})

const btnHome = document.querySelector('.link_home')
btnHome.addEventListener('click', (event) => {
    event.preventDefault()
    sectionCarrinho.style.display = 'none'
    sectionHero.style.display = 'flex'
    sectionProdutos.style.display = 'flex'
    /* ajuste aula 12 */
    ocultarBotaoeSecao()
})

// Aula 12 */
const radios = document.querySelectorAll('input[type="radio"]')
radios.forEach(radio => {
    radio.addEventListener('change', () =>{
        const label = document.querySelector(`label[for="${radio.id}"]`)
        label.classList.add('selecionado')
        console.log(label)
        radios.forEach(radioAtual => {
            if (radioAtual !== radio) {
                const outroLabel = document.querySelector(`label[for="${radioAtual.id}"]`)
                outroLabel.classList.remove('selecionado')
            }
        })
    })
})

const resetarSelecao = (radios => { 
    radios.forEach(radio => {
        radios.forEach(radioAtual => {
            if (radioAtual !== radio) {
                const outroLabel = document.querySelector(`label[for="${radioAtual.id}"]`)
                outroLabel.classList.remove('selecionado')
            }
        })
    })
})

const cart = []
const btnAddCarrinho = document.querySelector('.btn__add_cart')
btnAddCarrinho.addEventListener('click', () => {
    const produto = {
        id: document.querySelector('.detalhes span').innerHTML,
        nome: document.querySelector('.detalhes h4').innerHTML,
        modelo: document.querySelector('.detalhes h5').innerHTML,
        preco: document.querySelector('.detalhes h6').innerHTML,
        tamanho: document.querySelector('input[type="radio"][name="size"]:checked').value
    }
    cart.push(produto)
    console.log(cart)
    // Ocultar Botão Voltar e detalhes_produtos
    ocultarBotaoeSecao()
    sectionHero.style.display='none'
    sectionCarrinho.style.display='block'

    atualizarCarrinho(cart)
    atualizarNumeroItens()
})

const corpoTabela = document.querySelector('.carrinho tbody') 
const atualizarCarrinho = (cart) => {
        corpoTabela.innerHTML = ""
    cart.map(produto => {
        corpoTabela.innerHTML += `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td class='coluna_tamanho'>${produto.tamanho}</td>
            <td class='coluna_preco'>${produto.preco}</td>
            <td class='coluna_apagar'>
                <span class="material-symbols-outlined" data-id="${produto.id}">
                    delete
                </span>
            </td>
        </tr>`
    })
}

const numeroItens = document.querySelector('.numero_itens')
const atualizarNumeroItens = () => {
    numeroItens.innerHTML = cart.length
}



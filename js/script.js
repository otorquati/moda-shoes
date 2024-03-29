const sectionHero = document.querySelector('.hero')
const sectionProdutos = document.querySelector('.produtos')
const botaoVoltar = document.querySelector('.voltar')
const sectionDetalhesProduto = document.querySelector('.produto__detalhes')
const sectionCarrinho = document.querySelector('.carrinho')

// NAVEGAÇÃO
// Oculta botão voltar e detalhes de produto
const ocultarVoltarEsecaoDetalhes = () => {
    botaoVoltar.style.display = 'none'
    sectionDetalhesProduto.style.display = 'none'
}
ocultarVoltarEsecaoDetalhes()

botaoVoltar.addEventListener('click', () => {
    // Mostrar a lista de produtos
    sectionProdutos.style.display = 'flex'
    // Ocultar pagina detalhes
    ocultarVoltarEsecaoDetalhes()
    resetarSelecao(radios)
})

/* Aula 11 */
const btnCarrinho = document.querySelector('.btn__carrinho .icons')

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
    ocultarVoltarEsecaoDetalhes()
})
// Aula 13 e 14
// ajuste para ocultar o span dos itens do carrinho
// NUMERO DE ITENS DO CARRINHO
const numeroItens = document.querySelector('.numero_itens')
numeroItens.style.display = 'none'

const atualizarNumeroItens = () => {
    (cart.length > 0) ? numeroItens.style.display = 'block' : numeroItens.style.display = 'none'
    numeroItens.innerHTML = cart.length
}

//  Formatar numeros para formato monetario brasileiro e exibir o simbolo R$
const formatCurrencyBR = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    })

const limparFormatoReal = (valor) => {
    return parseFloat(valor.replace('R$&nbsp;', '').replace('.', '').replace(',', '.'))
}

const formatCurrencyUS = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        useGrouping: false,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

// PAGE PRODUTOS
const getProducts = async () => { 
    const response = await fetch('js/products.json')
    const data = await response.json()
     return data
}

// gerar dinamicamente os cards de cada produto
const generateCard = async () => {
    const products = await getProducts()
    products.map(product => {
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
        <h6 class="card__produto_preco">Preço: ${formatCurrencyBR.format(product.price)}</h6>`
        const listaProdutos = document.querySelector('.lista__produtos')
        listaProdutos.appendChild(card)
        preencherCard(card, products)
    })
}

generateCard()

// preencher card
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

// PAGE DETALHES
// preencher dados do produto na pagina detalhes do produto
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
    document.querySelector('.detalhes h6').innerHTML = formatCurrencyBR.format(product.price)
}

// ajuste para ocultar o span do id
const spanId = document.querySelector('.detalhes span')
spanId.style.display = 'none' 

// Mudar icone do details frete
const details = document.querySelector('details')
details.addEventListener('toggle', () => {
    const summary = document.querySelector('summary')
    summary.classList.toggle('icone-expandir')
    summary.classList.toggle('icone-recolher')
})

// Aula 12 */
// controlar seleção dos inputs radio
const radios = document.querySelectorAll('input[type="radio"]')
radios.forEach(radio => {
    radio.addEventListener('change', () =>{
        const label = document.querySelector(`label[for="${radio.id}"]`)
        label.classList.add('selecionado')
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

// PAGE CARRINHO
// criar array do carrinho
const cart = []
const btnAddCarrinho = document.querySelector('.btn__add_cart')
btnAddCarrinho.addEventListener('click', () => {
    const produto = {
        id: document.querySelector('.detalhes span').innerHTML,
        nome: document.querySelector('.detalhes h4').innerHTML,
        modelo: document.querySelector('.detalhes h5').innerHTML,
        preco: document.querySelector('.detalhes h6').innerHTML.replace('R$&nbsp;',''),        
        tamanho: document.querySelector('input[type="radio"][name="size"]:checked').value
    }
    cart.push(produto)
    // Ocultar Botão Voltar e detalhes_produtos
    ocultarVoltarEsecaoDetalhes()
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
    // Aula 14 - R$nbsp;1.124,45 -> 112445
    const total = cart.reduce( (valorAcumulado, item) => {
        return valorAcumulado + limparFormatoReal(item.preco)
    },0)
    document.querySelector('.coluna_total').innerHTML = formatCurrencyBR.format(total)

    acaoBotaoApagar()
}

const acaoBotaoApagar = () => {
    const btnApagar = document.querySelectorAll('.coluna_apagar span')
    btnApagar.forEach( botao => {
        botao.addEventListener('click', () => {
            const id = botao.getAttribute("data-id")
            console.log(id)
            const posicao = cart.findIndex(item => item.id == id)
            cart.splice(posicao, 1)
            atualizarCarrinho(cart)
        })
    })
    atualizarNumeroItens()
}

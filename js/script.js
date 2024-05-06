import { formatCurrencyBR, formatCurrencyUS, limparFormatoReal } from "./utils.js" 
const sectionHero = document.querySelector('.hero')
const sectionProdutos = document.querySelector('.produtos')
const botaoVoltar = document.querySelector('.voltar')
const sectionDetalhesProduto = document.querySelector('.produto__detalhes')
const sectionCarrinho = document.querySelector('.carrinho')

// FUNÇÕES ÚTEIS
const ocultarElemento = (elemento) => {
    elemento.style.display='none'
}

const mostrarElemento = (elemento, display='block') => {
    elemento.style.display = display
}

// NAVEGAÇÃO
// Oculta botão voltar e detalhes de produto
const ocultarVoltarEsecaoDetalhes = () => {
    ocultarElemento(botaoVoltar)
    ocultarElemento(sectionDetalhesProduto)
}
ocultarVoltarEsecaoDetalhes()

botaoVoltar.addEventListener('click', () => {
    // Mostrar a lista de produtos
    mostrarElemento(sectionProdutos,'flex')
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
    const subtotal = cart.reduce( (valorAcumulado, item) => {
        return valorAcumulado + limparFormatoReal(item.preco)
    },0)
    document.querySelector('.coluna_total').innerHTML = formatCurrencyBR.format(subtotal)
    // Aula 17
    spanSubTotal.innerHTML=formatCurrencyBR.format(subtotal)
    spanTotalCompra.innerHTML=formatCurrencyBR.format(subtotal+valorFrete+valorDesconto)

    acaoBotaoApagar()
}

const acaoBotaoApagar = () => {
  const btnApagar = document.querySelectorAll(".coluna_apagar span");
  btnApagar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = botao.getAttribute("data-id");
      //console.log(id)
      const posicao = cart.findIndex((item) => item.id == id);
      cart.splice(posicao, 1);
      atualizarCarrinho(cart);
    });
  });
  atualizarNumeroItens();
};
// Aula 17
let valorFrete = 0;
let valorDesconto = 0;
const spanSubTotal = document.querySelector(".sub_total");
const spanFrete = document.querySelector(".valor_frete");
const spanDesconto = document.querySelector(".valor_desconto");
const spanTotalCompra = document.querySelector(".total_compra");

spanFrete.innerHTML = formatCurrencyBR.format(valorFrete);
spanDesconto.innerHTML = formatCurrencyBR.format(valorDesconto);

const sectionIdentificacao = document.querySelector(".identificacao");
const sectionPagamento = document.querySelector(".pagamento");

ocultarElemento(sectionIdentificacao);
ocultarElemento(sectionPagamento);

const btnContinuarCarrinho = document.querySelector(".btn_continuar");
btnContinuarCarrinho.addEventListener("click", () => {
  ocultarElemento(sectionCarrinho);
  mostrarElemento(sectionIdentificacao);
});

// Aula 20 - Validações
const formularioIdentificacao = document.querySelector(".form_identificacao");
const todosCamposObrigatorios =
  formularioIdentificacao.querySelectorAll("[required]");
const todosCampos = formularioIdentificacao.querySelectorAll("input");

const pegarDados = () => {
  const dados = {};
  todosCampos.forEach((campo) => {
    dados[campo.id] = campo.value.trim();
  });
  return dados;
};

const validacaoDoFormulario = () => {
  let formularioValido = true;
  todosCamposObrigatorios.forEach((campoObrigatorio) => {
    const isEmpty = campoObrigatorio.value.trim() === "";
    const isNotChecked =
      campoObrigatorio.type === "checkbox" && !campoObrigatorio.checked;

    if (isEmpty) {
      campoObrigatorio.classList.add("campo-invalido");
      campoObrigatorio.nextElementSibling.textContent = `${campoObrigatorio.id} obrigatório`;
      formularioValido = false;
    } else {
      campoObrigatorio.classList.add("campo-valido");
      campoObrigatorio.classList.remove("campo-invalido");
      campoObrigatorio.nextElementSibling.textContent = "";
    }
    if (isNotChecked) {
      campoObrigatorio.parentElement.classList.add("erro");
      formularioValido = false;
    } else {
      campoObrigatorio.parentElement.classList.remove("erro");
    }
  });
  return formularioValido;
};

const btnFinalizarCadastro = document.querySelector(".btn_finalizar_cadastro");
btnFinalizarCadastro.addEventListener("click", (event) => {
  event.preventDefault();

  // Validações de envio
  validacaoDoFormulario();

  // Pegar dados
  if (validacaoDoFormulario()) {
    console.log(pegarDados());
  }
});

// Validação onBlur
todosCamposObrigatorios.forEach((campo) => {
  const emailRegex = /\S+@\S+\.\S+/;
  campo.addEventListener("blur", (e) => {
    if (campo.value !== "" && e.target.type !== "email") {
      campo.classList.add("campo-valido");
      campo.classList.remove("campo-invalido");
      campo.nextElementSibling.textContent = "";
    } else {
      campo.classList.add("campo-invalido");
      campo.classList.remove("campo-valido");
      campo.nextElementSibling.textContent = `${campo.id} é obrigatório`;
    }

    if (emailRegex.test(e.target.value)) {
      campo.classList.add("campo-valido");
      campo.classList.remove("campo-invalido");
      campo.nextElementSibling.textContent = "";
    }
    if (e.target.type === "checkbox" && !e.target.checked) {
      campo.parentElement.classList.add("erro");
    } else {
      campo.parentElement.classList.remove("erro");
    }
  });
});

const btnFinalizarCompra = document.querySelector(".btn_finalizar_compra");
btnFinalizarCompra.addEventListener("click", () => {
  ocultarElemento(sectionPagamento);
  mostrarElemento(sectionHero, "flex");
  mostrarElemento(sectionProdutos, "flex");
});



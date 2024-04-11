export const formatCurrencyBR = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

export const limparFormatoReal = (valor) => {
    return parseFloat(valor.replace('R$&nbsp;', '').replace('.', '').replace(',', '.'))
}
    
export const formatCurrencyUS = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

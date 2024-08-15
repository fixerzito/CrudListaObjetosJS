import readline from 'readline';

let inventario = [];

inventario.push({
    id: 0,
    nome: "Produto populado",
    preco: 1.0,
    quantidade: 1,
    categoria: "teste"
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fazerPergunta = (pergunta) => {
    return new Promise((resolve) => rl.question(pergunta, (resposta) => resolve(resposta)));
};

async function adicionarInventario(lista) {
    console.log("Dados do produto a ser cadastrado:");

    const idProduto = await fazerPergunta('Id: ');
    const nomeProduto = await fazerPergunta('Nome: ');
    const precoProduto = await fazerPergunta('Preço: ');
    const quantidadeProduto = await fazerPergunta('Quantidade: ');
    const categoriaProduto = await fazerPergunta('Categoria: ');

    lista.push({
        id: parseInt(idProduto),
        nome: nomeProduto,
        preco: parseFloat(precoProduto),
        quantidade: parseInt(quantidadeProduto),
        categoria: categoriaProduto
    });
}

function exibirInventario(lista) {
    lista.forEach(x => console.log(`
        Id #${x.id}
        Produto: ${x.nome}
        Preço: R$${x.preco.toFixed(2)}
        Quantidade: ${x.quantidade} unidades
        Categoria: ${x.categoria}
    `));
}

async function removerInventario(lista) {
    exibirInventario(lista);
    const idRemover = parseInt(await fazerPergunta('Id do produto a ser removido: '));

    const idRemovido = lista.findIndex(x => x.id === idRemover);

    if (idRemovido === -1) {
        console.log("Id não encontrado");
        return;
    }

    lista.splice(idRemovido, 1);
}

async function editarInventario(lista) {
    let listaFormatada = lista.map(x => ({
        id: x.id,
        nome: x.nome
    }));

    listaFormatada.forEach(x => console.log(`
        Id: ${x.id}
        Nome: ${x.nome}
    `));

    const idEditar = parseInt(await fazerPergunta('Id do produto a ser editado: '));

    const idEditado = lista.findIndex(x => x.id === idEditar);

    if (idEditado === -1) {
        console.log("Id não encontrado");
        return;
    }

    lista.splice(idEditado, 1);

    await adicionarInventario(lista);
}

async function main() {
    await adicionarInventario(inventario);
    exibirInventario(inventario);
    
    await removerInventario(inventario);
    await editarInventario(inventario);
    
    console.log("Inventário final:");
    exibirInventario(inventario);
    
    rl.close(); 
}
main();

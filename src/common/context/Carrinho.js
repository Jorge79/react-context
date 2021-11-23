import { createContext, useState, useContext, useEffect } from "react";
import { usePagamentoContext } from "./Pagamento";
import { UsuarioContext } from "./Usuario";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [qtdProduto, setQtdProduto] = useState(0);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        qtdProduto,
        setQtdProduto,
        valorTotalCarrinho,
        setValorTotalCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    qtdProduto,
    setQtdProduto,
    valorTotalCarrinho,
    setValorTotalCarrinho,
  } = useContext(CarrinhoContext);

  const { formaPagamento } = usePagamentoContext();
  const { setSaldo } = useContext(UsuarioContext);

  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemCarrinho) => {
      if (itemCarrinho.id === id) itemCarrinho.quantidade += quantidade;
      return itemCarrinho;
    });
  }

  function adicionarProduto(novoProduto) {
    const temProduto = carrinho.some(
      (itemCarrinho) => itemCarrinho.id === novoProduto.id
    );

    if (!temProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }
    setCarrinho(mudarQuantidade(novoProduto.id, 1));
  }

  function removerProduto(id) {
    const produto = carrinho.find((itemCarrinho) => itemCarrinho.id === id);
    const ultimo = produto.quantidade === 1;

    if (ultimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemCarrinho) => itemCarrinho.id !== id)
      );
    }
    setCarrinho(mudarQuantidade(id, -1));
  }

  function efetuarCompra() {
    setCarrinho([]);
    setSaldo((saldoAtual) => saldoAtual - valorTotalCarrinho);
  }

  useEffect(() => {
    const { novoTotal, novaQtd } = carrinho.reduce(
      (contador, produto) => ({
        novaQtd: contador.novaQtd + produto.quantidade,
        novoTotal: contador.novoTotal + produto.quantidade * produto.valor,
      }),
      {
        novaQtd: 0,
        novoTotal: 0,
      }
    );
    setQtdProduto(novaQtd);
    setValorTotalCarrinho(novoTotal * formaPagamento.juros);
  }, [carrinho, setQtdProduto, setValorTotalCarrinho, formaPagamento]);

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    qtdProduto,
    setQtdProduto,
    valorTotalCarrinho,
    efetuarCompra,
  };
};

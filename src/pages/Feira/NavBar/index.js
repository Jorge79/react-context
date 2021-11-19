import { Nav } from "./styles";
import { ReactComponent as Logo } from "assets/logo.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { useCarrinhoContext } from "common/context/Carrinho";
import { useHistory } from "react-router";

export default function NavBar() {
  const { qtdProduto } = useCarrinhoContext();
  const history = useHistory();
  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={qtdProduto === 0}
        onClick={() => history.push("/carrinho")}
      >
        <Badge color="primary" badgeContent={qtdProduto}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  );
}

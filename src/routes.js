import Login from "pages/Login";
import Feira from "pages/Feira";
import Carrinho from "pages/Carrinho";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UsuarioProvider } from "common/context/Usuario";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <UsuarioProvider>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/feira">
            <Feira />
          </Route>
        </UsuarioProvider>
        <Route path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

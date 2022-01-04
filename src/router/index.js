import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import FirstStep from "../components/RegisterLogin/FirstStep";
import Login from "../components/RegisterLogin/Login";
import PasswordStep from "../components/RegisterLogin/PasswordStep";
import SucessStep from "../components/RegisterLogin/SucessStep";
import Home from "../components/Home";
import ClientsHome from "../components/ClientsHome";
import { RegisterProvider } from "../context/registerSteps";
import AuthProvider from "../context/loginStep";
import useAuthLogin from "../Hooks/useAuthContext";
import ClientDetail from "../components/ClientDetail";
import ClientCharges from "../components/ClientCharges";

const VerifyToken = (props) => {
  const {getToken} = useAuthLogin();

  return (
    <Route
      render={() => (getToken() ? props.children : <Redirect to="/" />)}
    ></Route>
  );
};

export const RouterDom = () => {
  return (
    <BrowserRouter>
      <Switch>
        <RegisterProvider>
          <Route path="/firstStep" exact component={FirstStep} />
          <Route path="/passwordStep" exact component={PasswordStep} />
          <Route path="/sucessStep" exact component={SucessStep} />

          <AuthProvider>
            <VerifyToken>
              <Route path="/home" component={Home} />
              <Route path="/clients" exact component={ClientsHome} />
              <Route path="/clients/:status" exact component={ClientsHome} />

              <Route path="/clientInfo/:id" exact component={ClientDetail} />
              <Route path="/charges" exact component={ClientCharges} />
              <Route path="/charges/:status" exact component={ClientCharges} />
            </VerifyToken>
            <Route path={["/login", "/"]} exact component={Login} />
          </AuthProvider>
        </RegisterProvider>
      </Switch>
    </BrowserRouter>
  );
};

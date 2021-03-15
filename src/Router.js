import { Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Filter from './Components/Filter';
import navigation_name from './Components/navigation_name';
import Header from './Components/Header';
import Details from './Components/Details';
import Transaction from './Components/Transaction';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/filter" component={Filter} />
            <Route path="/restaurant" component={Details} />
            <Route path="/transaction" component={Transaction} />
        </BrowserRouter>
    )
}

export default Router;
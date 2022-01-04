import "./styles.css";
import Menu from "./Menu";
import Header from "./Header";
import Content from "./Content";


function Home() {


  return (
    <div className="home">
      <Menu />
      <div className="card-home--header">

        <Header />
        <div className="card-home">

          <Content />
        </div>
      </div>
    </div>
  );
}

export default Home;

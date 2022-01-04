import "./styles.css";
import { Expired, Futures, Paid } from "./Abstract-v1";
import { OverdueCharges, ChargesPaid, FutureCharges } from "./CardCharges";
import { Defaulters, PunctualPayment } from "./Customers";

const Content = () => {
  return (
    <div className="content">
      <div className="cards-abstract">
        <Futures />
        <Paid />
        <Expired />
      </div>
      <div className="detailed-charges">
        <ChargesPaid />
        <OverdueCharges />
        <FutureCharges />
      </div>
      <div className="customrs">
        <Defaulters />
        <PunctualPayment />
      </div>
    </div>
  );
};
export default Content;

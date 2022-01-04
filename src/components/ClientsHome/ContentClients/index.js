import HeaderContent from "./HeaderContent";
import InfoClients from "./InfoClients";
import { useState } from "react";

const ContentClients = () => {
  const [notFound, setNotFound] = useState(false);

  return (
    <div>
      <HeaderContent
       notFound={notFound}
       setNotFound={setNotFound}
      
      />
      <InfoClients
        notFound={notFound}
      />
    </div>
  );
};
export default ContentClients;

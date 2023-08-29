import { useState, useEffect } from "react";
import {Card} from "../general/card";
import jsonData from "../../db.json"
const OtherCards = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        try {
            setData(jsonData[0]);
        } catch (error) {
            console.log(error);
        }
        
    }, []);
  
  return (
    <div className="mx-10 w-full">

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white border-solid border-px rounded-md shadow-lg shadow-gray-400 border-white col-span-1 min-w-[200px] min-h-[200px]">
          <img src="../../assets/userimage-placeholder.png" alt="userImg" />
        </div>

        <Card
          title="Datos Personales"
          data={data}
          fieldsToShow={[]} 
          fieldDisplayConfig={{
            clave: { label: "Clave única", stringify: true },
            curp: { label: "CURP", stringify: true },
        }}
          className="col-span-2"
        />
      </div>

      
    </div>
  );
};


export default OtherCards;
//         

import iconAdd from "./../lib/assets/icon/add-circle-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import {DatatableCustom, ColumnCustom} from './../lib/components/DatatableCustom';

function Datatable() {
    let navigate = useNavigate();
    let id = "Datable";
    let data = [{name:"John",lastname:"Doe",country:"US",birthdate:"1977-07-17T13:50:04.114Z"},{name:"Azerty",lastname:"Doe",country:"US",birthdate:"1983-03-28T22:21:55.201Z"},{name:"John",lastname:"Doe",country:"US",birthdate:"1994-02-05T15:47:52.395Z"}]
    let buttonAdd = (<div className='container-button'>
            
            <button className="button-add" onClick={(e)=>{ navigate("/addElement") }}>
                <img src={iconAdd} />
            </button>
        </div>
    );
    return (
        <>
         <DatatableCustom id={id} data={data} searchGlobal paginator={[5,15,25,50,100]} addElement={buttonAdd} formatdateType="Fr-fr">
            <ColumnCustom field="name" sortable search></ColumnCustom>
            <ColumnCustom field="lastname" ></ColumnCustom>
            <ColumnCustom field="country"></ColumnCustom>
            <ColumnCustom field="birthdate" dataType="date" sortable search></ColumnCustom>
         </DatatableCustom>
        </>
    );
}

export default Datatable;
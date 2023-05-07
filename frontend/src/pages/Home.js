import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RestService } from "../rest";
import Header from "../components/navbar/Header"
import { TextBox } from "../components/textbox/TextBox";
import { TableComponent } from "../components/table/Table"; 

export let HomePage = () => {
  let navigate = useNavigate();  

  const [lists, setLists] = useState([])
    let loadData = async () => {
        let token = localStorage.getItem("token")
        let user = JSON.parse(localStorage.getItem('user'))
        let userId = user?._id
        if(token && userId){
            let result = await RestService.getAllUrl(userId, token)
            setLists(result?.urls)
        }
    }

  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      navigate("/");
    }
    if (token) {
      loadData();
    }
  }, []);

  return (
    <>
      <Header/>  
      <Container>
        <TextBox handleChange={(changes)=>{
          if(changes){
            loadData()
          }}
        }/>
        <TableComponent 
          handleChange={(changes)=>{
            if(changes){
              loadData()
            }}
          }
          list={lists}/>
      </Container>
    </>
  );
};

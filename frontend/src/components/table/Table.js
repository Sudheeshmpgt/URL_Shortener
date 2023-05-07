import { Card, Container, Table } from "react-bootstrap"
import { RestService } from "../../rest"
import Swal from "sweetalert2";
import Toast from "../sweetAlert/sweetAlert";

export let TableComponent = ({list, handleChange}) => {
    let handleClick = (short_url) => {
        let token = localStorage.getItem("token")
        RestService.redirectToLongURL(short_url, token)
        .then((res)=>{
            handleChange(true)
            window.open(res.long_Url)
        })
        .catch((error)=>{
            Toast.fire({
                icon: "error",
                title: "URL not found!",
            });
        })
    }

    let handleDelete = (urlId) => {
        let token = localStorage.getItem("token")
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            RestService.deleteUrl(urlId, token)
              .then((res) => {
                handleChange(true);
              })
              .catch((error) => {
                console.log(error)
              });
            Swal.fire("Deleted!", "URL data has been deleted.", "success");
          }
        });
      };
    return(
        <Container>
            <Card className="mt-5" style={{boxShadow:'1px 1px 7px #c2c4c4'}}>
                <Card.Header className="text-center">
                    <h4 className="text-primary">Your URL Lists</h4>
                </Card.Header>
                <Card.Body className="bg-light">
                    {
                        list?.length <= 0 ? (
                            <div className="text-center mt-2">
                                <h5>No Data Found!</h5>
                            </div>
                        ) : (
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Full URL</th>
                                        <th>Short URL</th>
                                        <th>Clicks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list?.map((l, index)=>(
                                            <tr key={l._id}>
                                                <td>{index + 1}</td>
                                                <td>{l.long_url}</td>
                                                <td 
                                                className="text-info" 
                                                style={{cursor:'pointer'}}
                                                onClick={() => handleClick(l.short_url)}
                                                >
                                                    {l.short_url}
                                                </td>
                                                <td>{l.visit}</td>
                                                <td><div className="btn btn-danger btn-sm" onClick={()=>handleDelete(l._id)}>Delete</div></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}
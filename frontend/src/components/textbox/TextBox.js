import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { RestService } from "../../rest";
import Toast from "../sweetAlert/sweetAlert";

export let TextBox = ({handleChange}) => {
    const [url, setUrl] = useState("")
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(false)
    const [accessToken, setAccessToken] = useState("")
    const [result, setResult] = useState({})

    let urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
    );

    let handleSubmit = () => {
        let errors = {
            url: false
        }
        let setError = false
        if(url === ""){
            errors.url = "Please Enter URL";
            setError = true
        }
        if(!urlPattern.test(url)){
            errors.url = "Invalid URL";
            setError = true
        }
        setErrors(errors)
        if(!setError){
            let user = JSON.parse(localStorage.getItem('user'))
            let body = {
                long_url:url,
                userId: user?._id
            }
            RestService.createShortUrl(body, accessToken)
            .then((res)=>{
                if(res?.error){
                    Toast.fire({
                        icon: "error",
                        title: res?.error,
                    });
                }else{
                    setResult(res.short_url)
                    setUrl("")
                    setStatus(true)
                    handleChange(true)
                    Toast.fire({
                        icon: "success",
                        title: res?.message,
                    });
                }
            })
            .catch((error)=>{
                console.log(error, 'error')
                Toast.fire({
                    icon: "error",
                    title: "Short URL creation failed",
                });
            })
        }
    }

    useEffect(()=>{
        let token = localStorage.getItem("token");
        setAccessToken(token)
    },[])

    let handleClick = (short_url) => {
        let token = localStorage.getItem("token")
        RestService.redirectToLongURL(short_url, token)
        .then((res)=>{
            handleChange(true)
            window.open(res.long_url)
        })
        .catch((error)=>{
            Toast.fire({
                icon: "error",
                title: "URL not found!",
            });
        })
    }

    return(
        <Container>
            <Card className="mt-5" style={{boxShadow:'1px 1px 7px #c2c4c4'}}>
                <Card.Body className="p-3 bg-light">
                    <Row>
                        <Col md>
                            <Form.Control
                            size="lg"
                            placeholder="Enter long URL here!"
                            type='text'
                            name='url'
                            isInvalid={errors.url}
                            value={url}
                            onChange={(e)=>setUrl(e.target.value)}
                            />
                            {errors?.url && (
                                <span className='text-danger'>*{errors?.url}</span>
                            )}
                        </Col>
                        <Col md="auto">
                            <Button 
                            size="lg" 
                            onClick={handleSubmit}>Submit</Button> 
                        </Col>
                    </Row>
                    {
                        status && 
                        <Row className="mt-4">
                            <Col md>
                                <div className="border rounded p-3 text-center d-flex justify-content-between bg-primary text-white">
                                    <h5>{result?.long_url}</h5>
                                    <h5 style={{cursor:"pointer"}} onClick={()=>handleClick(result?.short_url)}>{result?.short_url}</h5>
                                </div>
                            </Col>
                            <Col md="auto">
                                <div onClick={()=>setStatus(false)} className="btn btn-sm btn-danger p-3">X</div>
                            </Col>
                        </Row>
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}
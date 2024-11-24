import React from 'react'
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function BMIcalculator() {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [heightUnit,setHeightUnit]=useState("")
    const [weightUnit,setWeightUnit]=useState("")
    const [uploadedDetails,setUploadedDetails]=useState({height:"",weight:""})
    const [Result,setResult]=useState(null)
    const [category,setCategory]=useState("")

   
    

   const HeightUnit=(value)=>{
        setHeightUnit(value)
    }

    const WeightUnit=(value)=>{
        setWeightUnit(value)
    }

    
    console.log(heightUnit);
    console.log(weightUnit);
    console.log(uploadedDetails);
    let result=0
    const caluclateBMI=(height,weight)=>{
        const BMI=weight/(height**2)
        console.log(BMI);
        return BMI.toFixed(2)

        
    }
    
     const handleBMI=()=>{
       if(heightUnit && weightUnit && uploadedDetails.height && uploadedDetails.weight){
        switch(`${heightUnit}_${weightUnit}`){
            case "meter_Kg":
                 result=caluclateBMI(uploadedDetails.height,uploadedDetails.weight)
                break;
            case "centi meter_Kg":
                const convertedHeight=uploadedDetails.height/100
                 result=caluclateBMI(convertedHeight,uploadedDetails.weight)
                 break;
            case "feet_Kg":
                const Feet=uploadedDetails.height.split(" ")[0]
                const Inch=uploadedDetails.height.split(" ")[1]
                console.log(Feet,Inch);
                 const convertedHeight1=(Feet*0.3048)+(Inch*0.0254) 
                 result=caluclateBMI(convertedHeight1,uploadedDetails.weight)
                break;
             case "meter_Pound":
                 const convertWeight=uploadedDetails.weight*0.454  
                 result=caluclateBMI(uploadedDetails.height,convertWeight)
                 break;
            case "centi meter_Pound":
                const convertWeight1=uploadedDetails.weight*0.454  
                const convertedHeight2=uploadedDetails.height/100

                result=caluclateBMI(convertedHeight2,convertWeight1)
                break;
            case "feet_Pound":
                const Feet1=uploadedDetails.height.split(" ")[0]
                const Inch1=uploadedDetails.height.split(" ")[1]
                 const convertedHeight3=(Feet1*0.3048)+(Inch1*0.0254)
                 const convertWeight2=uploadedDetails.weight*0.454  
 
                 result=caluclateBMI(convertedHeight3,convertWeight2)
                 break; 
            default:
                console.log('select units');
                

        }
        
        setResult(result)
        if(result<18.5)(
            setCategory("UnderWeight")
    )
        else if(18.5<=result && result<25)(
            setCategory("Normal")
        )
        else if(25<=result && result<30)(
            setCategory("OverWeight")
        )
        else(
            setCategory("Obese")
        )

        
        handleShow()

    }
    else{
        alert("select units and fill the fields")
        }
     }
    
     

  return (
    <div className='d-flex align-items-center justify-content-center  ' style={{height:"100vh",backgroundColor:"black"}}>
        <div className="rounded shadow p-3 main"style={{height:"80vh",backgroundColor:"#FDE7BB"}}>
            <h1 className='text-center fw-bold m-4'style={{color:"#AA5486"}}>BMI-CALCULATOR</h1>

            {/* height */}
            <div className='d-flex justify-content-center m-4' >
                    <FloatingLabel
                controlId="floatingInput"
                label="height"
                className="mb-3"
                 >
                <Form.Control onChange={(e)=>setUploadedDetails({...uploadedDetails,height:e.target.value})} type="text" placeholder="name@example.com" />
            </FloatingLabel>

            <Dropdown >
            <Dropdown.Toggle style={{height:"58px"}} variant="success" id="dropdown-basic">
            {heightUnit || "Select Unit"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1"  onClick={()=>HeightUnit("meter")} >meter</Dropdown.Item>
                <Dropdown.Item href="#/action-2"  onClick={()=>HeightUnit("centi meter")}>centi meter</Dropdown.Item>
                <Dropdown.Item href="#/action-3"  onClick={()=>HeightUnit("feet")}>feet</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

            </div>

        {/* weight */}

            <div className='d-flex justify-content-center m-4' >
                    <FloatingLabel
                controlId="floatingInput"
                label="weight"
                className="mb-3"
                 >
                <Form.Control onChange={(e)=>setUploadedDetails({...uploadedDetails,weight:e.target.value})} type="text" placeholder="name@example.com" />
            </FloatingLabel>

            <Dropdown >
            <Dropdown.Toggle style={{height:"58px"}} variant="success" id="dropdown-basic">
            {weightUnit || "Select Unit"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1"  onClick={()=>WeightUnit("Kg")} >Kg</Dropdown.Item>
                <Dropdown.Item href="#/action-3"  onClick={()=>WeightUnit("Pound")}>Pound</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

            </div>

            {/* button */}

            <div className="d-flex justify-content-center">

                <Button onClick={handleBMI} variant="primary">Calculate BMI</Button>

            </div>

            {/* modal */}

                    <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Calculated BMI</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h3 className='text-center fw-bold text-info'>
                    {`${Result}`}
                    </h3>
                   <h3 className='text-center fw-bold text-danger'>
                    {
                   ` You are ${category}`
                }
                    </h3> 
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                
                </Modal.Footer>
            </Modal>





        </div>
    </div>
  )
}

export default BMIcalculator

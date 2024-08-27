import { useNavigate,useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext,useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  const [showModal,setShowModal]=useState(false);
  const navigate=useNavigate();
  const[_,setAdoptedPet]=useContext(AdoptedPetContext)

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀🎶🎶🎶🎶</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={()=>setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {
          showModal ? (
            <Modal>
              <div>
                <h1>Would uou like to adopt {pet.name}</h1>
                <div className="buttons">
                  <button 
                    onClick={()=>{
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >Yes</button>
                  <button onClick={()=>setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ):[]
        }
      </div>
    </div>
  );
};

export default function DetailsEroorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

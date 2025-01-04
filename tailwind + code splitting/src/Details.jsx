import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { lazy, useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

const Modal = lazy(() => import('./Modal'))

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const results = useQuery(["details", id], fetchPet);
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="flex flex-col gap-4 h-auto w-8/12 mx-auto">
      <Carousel images={pet.images} />
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <div className="flex flex-col">
            <h1 className='text-3xl'>{pet.name}</h1>
            <h2 className='text-xl'>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
          </div>
          <button className='rounded bg-orange-400 text-white p-4 w-3/12' >Adopt {pet.name}</button>
        </div>
        <p className="mb-12">{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

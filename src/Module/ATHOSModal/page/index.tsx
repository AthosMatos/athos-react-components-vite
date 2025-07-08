import { useState } from "react";
import { ATHOSButton } from "../../ATHOSButton/component";
import { ATHOSModal } from "../component";

const ATHOSModalPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      Page
      <ATHOSButton onClick={() => setShowModal(true)}>Open Modal</ATHOSButton>
      <ATHOSModal show={showModal} hide={() => setShowModal(false)} backdrop="rgba(0, 0, 0, 0.5)" blur="md">
        <div className="text-black">
          <h1 className="text-2xl font-bold">ATHOS Modal</h1>
          <p>This is a modal component.</p>
        </div>
      </ATHOSModal>
    </div>
  );
};

export default ATHOSModalPage;

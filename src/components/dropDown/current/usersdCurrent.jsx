import React, { useState } from "react";
import TabComponent from "../../tabComponent";
import InvitationModal from "./usersdCurrent/invitationModal";

const UsersdCurrent = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form Data:", formData);
    setIsModalOpen(false);
  };

  const tabs = [
    { 
      label: "امور جاری/کاربران", 
      content: (
        <div className="d-flex justify-content-start">
          <button className="btn btn-primary mt-3" onClick={handleOpenModal}>
            ارسال دعوتنامه
          </button>
        </div>
      )
    },
  ];

  return (
    <>
      <TabComponent
        tabs={tabs}
        activeTabIndex={0}
        disabledTabIndex={0}
      />
      <InvitationModal 
        show={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleFormSubmit} 
      />
    </>
  );
};

export default UsersdCurrent;

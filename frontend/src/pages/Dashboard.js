import { useState } from "react";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { MainBox } from "../components/MainBox";
import { Modal } from "../components/Modal";
import { Footer } from "../components/Footer";

export const Dashboard = () => {
  const [menuActive, setMenuActive] = useState("apartment");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [tabActive, setTabActive] = useState("add");

  const handleNavigation = menu => {
    setTabActive("add");
    setMenuActive(menu);
  };

  const toggleModal = (ata) => {
    setModalContent(ata);
    setShowModal(!showModal);
  };

  return(
    <div className="page-wrapper">
      <Header isDashboard={true} />
      <Menu 
        menuActive={menuActive}
        handleNavigation={handleNavigation}
      />
      <MainBox
        tabActive={tabActive}
        menuActive={menuActive}
        toggleModal={toggleModal}
        setTabActive={setTabActive}
      />

      {showModal && <Modal modalContent={modalContent} toggleModal={toggleModal} />}
      <Footer />
    </div>
  )
}
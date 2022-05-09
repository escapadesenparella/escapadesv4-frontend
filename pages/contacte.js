import Head from "next/head";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/global/Footer";
import NavigationBar from "../components/global/NavigationBar";
import ToastNotification from "../components/toasts/ToastNotification";
import EmailService from "../services/emailService";

const Contacte = ({ user }) => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  };

  const [toastState, setToastState] = useState({
    isVisible: false,
    duration: 0,
  });
  const [alertState, setAlertState] = useState({
    isVisible: false,
    message: "Sisplau, omple tots els camps per enviar el formulari",
  });
  const [formsState, setFormState] = useState(initialState);

  const handleChange = (e) =>
    setFormState({ ...formsState, [e.target.name]: e.target.value });

  const validateForm = (e) => {
    e.preventDefault();
    const { name, phone, email, website, message } = formsState;
    if (
      name !== "" &&
      phone !== "" &&
      email !== "" &&
      website !== "" &&
      message !== ""
    ) {
      handleSubmit(name, phone, email, website, message);
      console.log("submitt!");
    } else {
      setAlertState({ ...alertState, isVisible: true });
      setTimeout(
        () => setAlertState({ ...alertState, isVisible: false }),
        5000
      );
    }
  };

  const emailService = new EmailService();

  const handleSubmit = (name, phone, email, website, message) => {
    emailService
      .sendContactFormEmail(name, phone, email, website, message)
      .then((res) => {
        if (res.status === 200) {
          setFormState({
            name: "",
            phone: "",
            email: "",
            website: "",
            message: "",
            serverMessage: res.message,
          });
          setToastState({ ...formsState, isVisible: true, duration: 5000 });
          setTimeout(
            () => setToastState({ ...toastState, isVisible: false }),
            5000
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const notification = toastState.isVisible ? (
    <ToastNotification message={formsState.serverMessage} />
  ) : null;

  const alertContainer = alertState.isVisible ? (
    <div className="w-full rounded-md bg-tertiary-100 text-secondary-100 py-3 px-3 transition-all duration-300 ease-in-out flex items-center text-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-alert-circle mr-2"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#ffffff"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {alertState.message}
    </div>
  ) : null;

  return (
    <>
      <Head>
        <title>Contacta amb nosaltres - Escapadesenparella.cat</title>
      </Head>
      <main>
        <NavigationBar
          logo_url={
            "https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
          }
          user={user}
        />
        <section className="relative overflow-hidden">
          <div className="box flex flex-wrap">
            <div className="w-full md:w-2/3 py-8 md:py-16 px-12 lg:px-20 h-full">
              <div className="w-full lg:w-11/12 xl:w-7/12 mx-auto">
                <div className="w-full lg:w-10/12">
                  <h1 className="mt-0">Contacte</h1>
                  <p>
                    Vols que col·laborem per donar a conèixer el teu allotjament
                    o activitat? Tens dubtes sobre com podem donar a conèixer la
                    teva marca? No saps on escapar-te? Contacta'ns! 👇{" "}
                  </p>
                  {alertContainer}
                  <form name="" id="" className="mt-8">
                    <fieldset className="form-group">
                      <label htmlFor="name" className="form-label">
                        Nom i cognom
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Escriu el teu nom i cognom"
                        className="form-control"
                        onChange={handleChange}
                        value={formsState.name}
                        required
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="email" className="form-label">
                        Correu electrònic
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Escriu el teu correu electrònic"
                        className="form-control"
                        onChange={handleChange}
                        value={formsState.email}
                        required
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Telèfon
                      </label>
                      <input
                        type="phone"
                        name="phone"
                        placeholder="Escriu el teu nom i cognom"
                        className="form-control"
                        onChange={handleChange}
                        value={formsState.phone}
                        required
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="name" className="form-label">
                        Pàgina web
                      </label>
                      <input
                        type="url"
                        name="website"
                        placeholder="Escriu la pàgina web del teu negoci"
                        className="form-control"
                        onChange={handleChange}
                        value={formsState.website}
                        required
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="message" className="form-label">
                        Missatge
                      </label>
                      <textarea
                        name="message"
                        placeholder="En què et podem ajudar?"
                        className="form-control"
                        onChange={handleChange}
                        value={formsState.message}
                        required
                      ></textarea>
                    </fieldset>
                    <fieldset className="form-group mt-4">
                      <button
                        type="submit"
                        className="button button__primary button__med px-12 lg:px-16"
                        onClick={validateForm}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-brand-telegram mr-2.5"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          strokeWidth="1.2"
                          stroke="#ffffff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                        </svg>
                        Enviar formulari
                      </button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 md:absolute right-0 top-0 max-h-96 md:max-h-full md:h-full bg-red-100 order-last lg:order-none">
              <picture>
                <img
                  src="https://res.cloudinary.com/juligoodie/image/upload/v1651513521/getaways-guru/contacta-amb-nosaltres_sg47zn.jpg"
                  alt="Escapadesenparella.cat a la platja d'Itzurun, Zumaia, País Basc"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                  loading="lazy"
                />
              </picture>
              <figcaption className="absolute bottom-2.5 left-3 text-xs text-white">
                Andrea i Juli, Platja d'Itzurun, Zumaia (País Basc) / ©
                Escapadesenparella.cat
              </figcaption>
            </div>
          </div>
        </section>
        {notification}
      </main>
      <Footer
        logo_url={
          "https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
        }
      />
    </>
  );
};

export default Contacte;

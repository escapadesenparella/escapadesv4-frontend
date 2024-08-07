import { useEffect, useState } from "react";
import ContentService from "../../services/contentService";
import EditorNavbar from "../../components/editor/EditorNavbar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import slugify from "slugify";

const CreateRegionModal = ({ visibility, hideModal, fetchData }) => {
  const service = new ContentService();

  const initialState = {
    name: "",
    pluralName: "",
    title: "",
    richTitle: "",
    subtitle: "",
    image: "",
    blopImage: "",
    cloudImage: "",
    cloudImageUploaded: false,
    seoTextHeader: "",
    reviewText: "",
    carouselImages: [],
    images: [],
    blopImages: [],
    cloudImages: [],
    cloudImagesUploaded: false,
    reasonsText: "",
    relatedStory: "",
    mostLikedText: "",
    pointsOfInterestText: "",
    mustSeeText: "",
    googleMapsIframe: "",
    seoText: "",
    isFeatured: false,
    isSponsored: false,
    sponsorURL: "",
    sponsorLogo: "",
    blopSponsorLogo: "",
    cloudSponsorLogo: "",
    cloudSponsorLogoUploaded: false,
    sponsorClaim: "",
  };

  const [region, setRegion] = useState(initialState);
  const { seoTextHeader, seoText } = region;
  const [editorDataHeader, setEditorDataHeader] = useState(seoTextHeader);
  const [editorData, setEditorData] = useState(seoText);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: seoText !== "" ? seoText : "",
    onUpdate: (props) => {
      const data = {
        html: props.editor.getHTML(),
        text: props.editor.state.doc.textContent,
      };
      setEditorData(data.html);
    },
    autofocus: false,
    parseOptions: {
      preserveWhitespace: true,
    },
  });

  const editorHeader = useEditor({
    extensions: [StarterKit, Image],
    content: seoTextHeader !== "" ? seoTextHeader : "",
    onUpdate: (props) => {
      const data = {
        html: props.editor.getHTML(),
        text: props.editor.state.doc.textContent,
      };
      setEditorDataHeader(data.html);
    },
    autofocus: false,
    parseOptions: {
      preserveWhitespace: true,
    },
  });

  const handleChange = (e) => {
    setRegion({ ...region, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {

    if (e.target.checked === true) {
      setRegion({ ...region, isSponsored: true });
    } else {
      setRegion({ ...region, isSponsored: false });
    }


    if (e.target.name === "isFeatured") {
      e.target.checked
        ? setRegion({ ...region, isFeatured: true })
        : setRegion({ ...region, isFeatured: false });
    }
  };

  const saveFileToStatus = (e) => {
    const fileToUpload = e.target.files[0];
    if (e.target.name === "illustration") {
      setRegion({
        ...region,
        blopIllustration: URL.createObjectURL(fileToUpload),
        illustration: fileToUpload,
        updatedIllustration: true,
      });
    }
    if (e.target.name === "image") {
      setRegion({
        ...region,
        blopImage: URL.createObjectURL(fileToUpload),
        image: fileToUpload,
        updatedImage: true,
      });
    }
    if (e.target.name === "sponsorLogo") {
      setRegion({
        ...region,
        blopSponsorLogo: URL.createObjectURL(fileToUpload),
        sponsorLogo: fileToUpload,
        updatedSponsorLogo: true,
      });
    }
  };

  let imageUploaded, sponsorLogoUploaded, illustrationUploaded;

  const handleFileUpload = async (e) => {
    if (region.updatedImage) {
      const image = region.image;
      const uploadData = new FormData();
      uploadData.append("imageUrl", image);
      imageUploaded = await service.uploadFile(uploadData);
    }
    if (region.updatedSponsorLogo) {
      const sponsorLogo = region.sponsorLogo;
      const uploadData = new FormData();
      uploadData.append("imageUrl", sponsorLogo);
      sponsorLogoUploaded = await service.uploadFile(uploadData);
    }
    if (region.updatedIllustration) {
      const illustration = region.illustration;
      const uploadData = new FormData();
      uploadData.append("imageUrl", illustration);
      illustrationUploaded = await service.uploadFile(uploadData);
    }

    setRegion({
      ...region,
      cloudImage: imageUploaded != undefined ? imageUploaded.path : "",
      cloudImageUploaded: imageUploaded != undefined ? true : false,
      cloudSponsorLogo:
        sponsorLogoUploaded != undefined
          ? sponsorLogoUploaded.path
          : "",
      cloudSponsorLogoUploaded:
        sponsorLogoUploaded != undefined ? true : false,
      cloudIllustration:
        illustrationUploaded != undefined
          ? illustrationUploaded.path
          : "",
      cloudIllustrationUploaded:
        illustrationUploaded != undefined ? true : false,
      isSubmitable: true,
    });
  };

  const submitRegion = async () => {
    const slug = await slugify(region.title, {
      remove: /[*+~.,()'"!:@]/g,
      lower: true,
    });
    const {
      isFeatured,
      isSponsored,
      name,
      pluralName,
      title,
      richTitle,
      subtitle,
      cloudIllustration,
      cloudImage,
      imageCaption,
      icon,
      sponsorURL,
      cloudSponsorLogo,
      sponsorClaim,
    } = region;
    service
      .createRegion(
        isFeatured,
        isSponsored,
        slug,
        name,
        pluralName,
        title,
        richTitle,
        subtitle,
        cloudIllustration,
        cloudImage,
        imageCaption,
        icon,
        editorDataHeader,
        editorData,
        sponsorURL,
        cloudSponsorLogo,
        sponsorClaim
      )
      .then(() => {
        hideModal();
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFileUpload();
  };

  useEffect(() => {
    if (
      region.cloudImageUploaded === true ||
      region.cloudSponsorLogoUploaded === true ||
      (region.cloudImageUploaded === true &&
        region.cloudSponsorLogoUploaded === true)
    ) {
      submitRegion();
    }
  }, [region]);

  useEffect(() => {
    if (!region.isSponsored) {
      if (
        region.sponsorURL !== "" ||
        region.sponsorLogo !== "" ||
        region.blopSponsorLogo !== "" ||
        region.sponsorClaim !== ""
      ) {
        setRegion({
          ...region,
          sponsorURL: "",
          sponsorLogo: "",
          blopSponsorLogo: "",
          sponsorClaim: "",
        });
      }
    }
  });

  let illustrationPreview, imagePreview, sponsorLogoPreview;
  if (region.blopIllustration) {
    illustrationPreview = (
      <div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
        <img src={region.blopIllustration} />
      </div>
    );
  } else {
    illustrationPreview = (
      <div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
        <img src={region.illustration} />
      </div>
    );
  }

  if (region.blopImage) {
    imagePreview = (
      <div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
        <img src={region.blopImage} />
      </div>
    );
  } else {
    imagePreview = (
      <div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
        <img src={region.image} />
      </div>
    );
  }

  if (region.blopSponsorLogo) {
    sponsorLogoPreview = (
      <div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
        <img src={region.blopSponsorLogo} />
      </div>
    );
  } else {
    sponsorLogoPreview = (
      <div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
        <img src={region.sponsorLogo} />
      </div>
    );
  }

  let isChecked;
  if (region.isSponsored === true) {
    isChecked = "checked";
  }

  return (
    <div className={`modal ${visibility == true ? "active" : ""}`}>
      <div className="modal__wrapper">
        <div className="modal__header">
          <span>Crea una nova regió</span>
          <button
            onClick={() => hideModal()}
            className="modal__close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
              ></path>
              <line x1={18} y1={6} x2={6} y2={18}></line>
              <line x1={6} y1={6} x2={18} y2={18}></line>
            </svg>
          </button>
        </div>
        <div className="modal__body">
          <form className="form">
            <div className="form__group ">
              <label htmlFor="name" className="form__label">
                Nom en singular de la regió
              </label>
              <input
                type="text"
                name="name"
                placeholder="Entra el nom en singular de la regió"
                className="form__control"
                value={region.name}
                onChange={handleChange}
              />
            </div>
            <div className="form__group ">
              <label htmlFor="pluralName" className="form__label">
                Nom en plural de la regió
              </label>
              <input
                type="text"
                name="pluralName"
                placeholder="Entra el nom en plural de la regió"
                className="form__control"
                value={region.pluralName}
                onChange={handleChange}
              />
            </div>
            <div className="form__group ">
              <label htmlFor="title" className="form__label">
                Títol de la regió
              </label>
              <input
                type="text"
                name="title"
                placeholder="Entra el títol de la regió"
                className="form__control"
                value={region.title}
                onChange={handleChange}
              />
            </div>
            <div className="form__group ">
              <label htmlFor="richTitle" className="form__label">
                Títol enriquit de la regió
              </label>
              <input
                type="text"
                name="richTitle"
                placeholder="Entra el títol de la regió"
                className="form__control"
                value={region.richTitle}
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <label htmlFor="subtitle" className="form__label">
                Subtítol de la regió
              </label>
              <input
                type="text"
                name="subtitle"
                placeholder="Entra el subtítol de la regió"
                className="form__control"
                value={region.subtitle}
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <label htmlFor="textSeo" className="form__label">
                Text SEO header de la regió
              </label>
              <EditorNavbar editor={editorHeader} />
              <EditorContent
                editor={editorHeader}
                className="form-composer__editor"
              />
            </div>
            <div className="form__group">
              <span className="form__label">
                Il·lustració de la regió
              </span>
              <div className="flex items-center flex-col max-w-full mb-4">
                <div className="bg-white border border-primary-100 rounded-tl-md rounded-tr-md w-full">
                  <div className="bg-white border-none h-auto p-4 justify-start">
                    <label className="form__label m-0 bg-white rounded-md shadow py-3 px-5 inline-flex items-center cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        name="illustration"
                        onChange={saveFileToStatus}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#0d1f44"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        />
                        <circle cx="12" cy="13" r="3" />
                        <path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                        <line
                          x1="15"
                          y1="6"
                          x2="21"
                          y2="6"
                        />
                        <line
                          x1="18"
                          y1="3"
                          x2="18"
                          y2="9"
                        />
                      </svg>
                      {region.illustration
                        ? "Canviar imatge"
                        : "Seleccionar imatge"}
                    </label>
                  </div>
                </div>
                <div className="w-full border border-primary-100 rounded-br-md rounded-bl-md -mt-px p-4 flex">
                  <div className="-m-2.5 flex flex-wrap items-center">
                    {illustrationPreview}
                  </div>
                </div>
              </div>
            </div>
            <div className="form__group">
              <span className="form__label">
                Imatge de la regió
              </span>
              <div className="flex items-center flex-col max-w-full mb-4">
                <div className="bg-white border border-primary-100 rounded-tl-md rounded-tr-md w-full">
                  <div className="bg-white border-none h-auto p-4 justify-start">
                    <label className="form__label m-0 bg-white rounded-md shadow py-3 px-5 inline-flex items-center cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        name="image"
                        onChange={saveFileToStatus}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#0d1f44"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        />
                        <circle cx="12" cy="13" r="3" />
                        <path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                        <line
                          x1="15"
                          y1="6"
                          x2="21"
                          y2="6"
                        />
                        <line
                          x1="18"
                          y1="3"
                          x2="18"
                          y2="9"
                        />
                      </svg>
                      {region.image
                        ? "Canviar imatge"
                        : "Seleccionar imatge"}
                    </label>
                  </div>
                </div>
                <div className="w-full border border-primary-100 rounded-br-md rounded-bl-md -mt-px p-4 flex">
                  <div className="-m-2.5 flex flex-wrap items-center">
                    {imagePreview}
                  </div>
                </div>
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="subtitle" className="form__label">
                Image caption de la regió
              </label>
              <input
                type="text"
                name="imageCaption"
                placeholder="Entra la image caption de la regió"
                className="form__control"
                value={region.imageCaption}
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <label htmlFor="title" className="form__label">
                Icona de la regió
              </label>
              <textarea
                rows="3"
                cols="3"
                placeholder="Entra text svg de l'icona de la regió"
                className="form__control"
                name="icon"
                onChange={handleChange}
                value={region.icon}
              ></textarea>
            </div>
            <div className="form__group">
              <label htmlFor="textSeo" className="form__label">
                Text SEO de la regió
              </label>
              <EditorNavbar editor={editor} />
              <EditorContent
                editor={editor}
                className="form-composer__editor"
              />
            </div>
            <div className="form__group">
              <label htmlFor="slug" className="form__label">
                URL de la regió
              </label>
              <input
                type="text"
                name="slug"
                placeholder="Entra l'slug de la regió"
                className="form__control"
                value={region.slug}
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <label
                htmlFor="isFeatured"
                className="form__label flex items-center"
              >
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  className="mr-2"
                  checked={region.isFeatured}
                  onChange={handleCheck}
                />
                Regió destacada?
              </label>
            </div>
            <div className="form__group">
              <label
                htmlFor="isSponsored"
                className="form__label flex items-center"
              >
                <input
                  type="checkbox"
                  name="isSponsored"
                  id="isSponsored"
                  className="mr-2"
                  checked={isChecked}
                  onChange={handleCheck}
                />
                Regió patrocinada?
              </label>
            </div>
            <div className="form__group">
              <label htmlFor="sponsorURL" className="form__label">
                URL del patrocinador
              </label>
              <input
                type="text"
                name="sponsorURL"
                placeholder="Entra la URL del patrocinador"
                className="form__control"
                value={region.sponsorURL}
                onChange={handleChange}
              />
            </div>
            <div className="image">
              <span className="form__label">
                Logo del patrocinador
              </span>
              <div className="flex items-center flex-col max-w-full mb-4">
                <div className="bg-white border border-primary-100 rounded-tl-md rounded-tr-md w-full">
                  <div className="bg-white border-none h-auto p-4 justify-start">
                    <label className="form__label m-0 bg-white rounded-md shadow py-3 px-5 inline-flex items-center cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        name="sponsorLogo"
                        onChange={saveFileToStatus}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#0d1f44"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        />
                        <circle cx="12" cy="13" r="3" />
                        <path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                        <line
                          x1="15"
                          y1="6"
                          x2="21"
                          y2="6"
                        />
                        <line
                          x1="18"
                          y1="3"
                          x2="18"
                          y2="9"
                        />
                      </svg>
                      {region.sponsorLogo
                        ? "Canviar imatge"
                        : "Seleccionar imatge"}
                    </label>
                  </div>
                </div>
                <div className="w-full border border-primary-100 rounded-br-md rounded-bl-md -mt-px p-4 flex">
                  <div className="-m-2.5 flex flex-wrap items-center">
                    {sponsorLogoPreview}
                  </div>
                </div>
              </div>
            </div>
            <div className="form__group">
              <label
                htmlFor="sponsorClaim"
                className="form__label"
              >
                Claim del patrocinador
              </label>
              <input
                type="text"
                name="sponsorClaim"
                placeholder="Entra el claim del patrocinador"
                className="form__control"
                value={region.sponsorClaim}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className="modal__footer">
          <button
            className="button button__primary button__med"
            onClick={handleSubmit}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRegionModal;

import { useState, useEffect } from "react";
import ContentService from "../../services/contentService";
import EditorNavbar from "../editor/EditorNavbar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { removeImage } from "../../utils/helpers";

const EditTripCategoryModal = ({
	visibility,
	hideModal,
	id,
	title,
	richTitle,
	image,
	carouselImages,
	country,
	mapLocation,
	reviewText,
	mostLikedText,
	pointsOfInterestText,
	mustSeeText,
	seoTextHeader,
	seoText,
	slug,
	isSponsored,
	isFeatured,
	sponsorURL,
	sponsorLogo,
	sponsorClaim,
	fetchData,
}) => {
	const service = new ContentService();
	const initialState = {
		id: id,
		title: title,
		richTitle: richTitle,
		image: image,
		blopImage: "",
		cloudImage: "",
		cloudImageUploaded: false,
		carouselImages: carouselImages,
		blopCarouselImages: carouselImages,
		cloudCarouselImages: [],
		cloudCarouselImagesUploaded: false,
		country: country,
		mapLocation: mapLocation,
		reviewText: reviewText,
		mostLikedText: mostLikedText,
		pointsOfInterestText: pointsOfInterestText,
		mustSeeText: mustSeeText,
		seoTextHeader: seoTextHeader,
		seoText: seoText,
		slug: slug,
		isSponsored: isSponsored,
		isFeatured: isFeatured,
		sponsorURL: sponsorURL,
		sponsorLogo: sponsorLogo,
		blopSponsorLogo: "",
		cloudSponsorLogo: "",
		cloudSponsorLogoUploaded: false,
		sponsorClaim: sponsorClaim,
		updatedImage: false,
		updatedCarouselImages: false,
		updatedSponsorLogo: false,
		isSubmitable: false,
	};

	const [tripCategory, setTripCategory] = useState(initialState);

	const [editorDataReviewText, setEditorDataReviewText] =
		useState(reviewText);
	const [editorDataMostLikedText, setEditorDataMostLikedText] =
		useState(mostLikedText);
	const [editorDataPointsOfInterestText, setEditorDataPointsOfInterestText] =
		useState(pointsOfInterestText);
	const [editorDataMustSeeText, setEditorDataMustSeeText] =
		useState(mustSeeText);
	const [editorDataHeader, setEditorDataHeader] = useState(seoTextHeader);
	const [editorData, setEditorData] = useState(seoText);

	const editorReviewText = useEditor({
		extensions: [StarterKit, Image],
		content: reviewText !== "" ? reviewText : "",
		onUpdate: (props) => {
			const data = {
				html: props.editor.getHTML(),
				text: props.editor.state.doc.textContent,
			};
			setEditorDataReviewText(data.html);
		},
		autofocus: false,
		parseOptions: {
			preserveWhitespace: true,
		},
	});

	const editorMostLikedText = useEditor({
		extensions: [StarterKit, Image],
		content: mostLikedText !== "" ? mostLikedText : "",
		onUpdate: (props) => {
			const data = {
				html: props.editor.getHTML(),
				text: props.editor.state.doc.textContent,
			};
			setEditorDataMostLikedText(data.html);
		},
		autofocus: false,
		parseOptions: {
			preserveWhitespace: true,
		},
	});

	const editorPointsOfInterestText = useEditor({
		extensions: [StarterKit, Image],
		content: pointsOfInterestText !== "" ? pointsOfInterestText : "",
		onUpdate: (props) => {
			const data = {
				html: props.editor.getHTML(),
				text: props.editor.state.doc.textContent,
			};
			setEditorDataPointsOfInterestText(data.html);
		},
		autofocus: false,
		parseOptions: {
			preserveWhitespace: true,
		},
	});

	const editorMustSeeText = useEditor({
		extensions: [StarterKit, Image],
		content: mustSeeText !== "" ? mustSeeText : "",
		onUpdate: (props) => {
			const data = {
				html: props.editor.getHTML(),
				text: props.editor.state.doc.textContent,
			};
			setEditorDataMustSeeText(data.html);
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

	const handleChange = (e) =>
		setTripCategory({ ...tripCategory, [e.target.name]: e.target.value });

	const handleCheck = (e) => {
		if (e.target.checked === true) {
			setTripCategory({ ...tripCategory, isSponsored: true });
		} else {
			setTripCategory({ ...tripCategory, isSponsored: false });
		}

		if (e.target.name === "isFeatured") {
			e.target.checked
				? setTripCategory({ ...tripCategory, isFeatured: true })
				: setTripCategory({ ...tripCategory, isFeatured: false });
		}
	};

	const saveFileToStatus = (e) => {
		const fileToUpload = e.target.files[0];

		if (e.target.name === "image") {
			setTripCategory({
				...tripCategory,
				blopImage: URL.createObjectURL(fileToUpload),
				image: fileToUpload,
				updatedImage: true,
			});
		}
		if (e.target.name === "sponsorLogo") {
			setTripCategory({
				...tripCategory,
				blopSponsorLogo: URL.createObjectURL(fileToUpload),
				sponsorLogo: fileToUpload,
				updatedSponsorLogo: true,
			});
		}
		if (e.target.name === "carouselImages") {
			const choosenFiles = Array.prototype.slice.call(e.target.files);
			const filesToUpload = [];

			choosenFiles.forEach((file) => filesToUpload.push(file));

			const blopCarouselImages = filesToUpload.map((file) =>
				URL.createObjectURL(file)
			);
			const carouselImages = filesToUpload.map((image) => image);
			setTripCategory({
				...tripCategory,
				blopCarouselImages: [
					...tripCategory.blopCarouselImages,
					...blopCarouselImages,
				],
				carouselImages: [
					...tripCategory.carouselImages,
					...carouselImages,
				],
				updatedCarouselImages: true,
			});
		}
	};

	const imagesList = tripCategory.blopCarouselImages.map((el, idx) => (
		<div
			className="relative overflow-hidden rounded-md border-8 border-white shadow mb-5"
			key={idx}
		>
			<button
				type="button"
				onClick={() => {
					const objImages = removeImage(
						idx,
						tripCategory.blopCarouselImages,
						tripCategory.carouselImages
					);
					setTripCategory({
						...tripCategory,
						carouselImages: objImages.arrImages,
						blopCarouselImages: objImages.arrBlopImages,
					});
				}}
				className="w-7 h-7 bg-black bg-opacity-70 text-white hover:bg-opacity-100 transition-all duration-300 ease-in-out absolute top-2 right-2 rounded-full flex items-center justify-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="icon icon-tabler icon-tabler-trash"
					width={16}
					height={16}
					viewBox="0 0 24 24"
					strokeWidth="2"
					stroke="currentColor"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M4 7l16 0"></path>
					<path d="M10 11l0 6"></path>
					<path d="M14 11l0 6"></path>
					<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
					<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
				</svg>
			</button>
			<img src={el} />
		</div>
	));

	let imageUploaded, sponsorLogoUploaded;
	let carouselImagesUploaded = [];

	const uploadCarouselImages = async (index, carouselImages) => {
		const uploadData = new FormData();
		uploadData.append("imageUrl", carouselImages[index]);

		try {
			const uploadedFile = await service.uploadFile(uploadData);
			carouselImagesUploaded.push(uploadedFile.path);
			if (index + 1 < carouselImages.length) {
				await uploadCarouselImages(index + 1, carouselImages);
			}
			if (carouselImagesUploaded.length === carouselImages.length) {
				return;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleFileUpload = async (e) => {
		if (tripCategory.updatedImage) {
			const image = tripCategory.image;
			const uploadData = new FormData();
			uploadData.append("imageUrl", image);
			imageUploaded = await service.uploadFile(uploadData);
		}
		if (tripCategory.updatedSponsorLogo) {
			const sponsorLogo = tripCategory.sponsorLogo;
			const uploadData = new FormData();
			uploadData.append("imageUrl", sponsorLogo);
			sponsorLogoUploaded = await service.uploadFile(uploadData);
		}
		if (tripCategory.updatedCarouselImages) {
			await uploadCarouselImages(0, tripCategory.carouselImages);
		}

		setTripCategory({
			...tripCategory,
			cloudImage: imageUploaded != undefined ? imageUploaded.path : "",
			cloudImageUploaded: imageUploaded != undefined ? true : false,
			cloudSponsorLogo:
				sponsorLogoUploaded != undefined
					? sponsorLogoUploaded.path
					: "",
			cloudSponsorLogoUploaded:
				sponsorLogoUploaded != undefined ? true : false,
			cloudCarouselImages:
				carouselImagesUploaded.length > 0
					? carouselImagesUploaded
					: null,
			cloudCarouselImagesUploaded:
				carouselImagesUploaded.length > 0 ? true : false,
			isSubmitable: true,
		});
	};

	const submitTripCategory = async () => {
		const {
			id,
			slug,
			title,
			richTitle,
			country,
			mapLocation,
			image,
			cloudImage,
			carouselImages,
			cloudCarouselImages,
			isSponsored,
			isFeatured,
			sponsorURL,
			sponsorLogo,
			cloudSponsorLogo,
			sponsorClaim,
		} = tripCategory;
		let categoryImage, categorySponsorLogo, categoryCarouselImages;
		cloudImage !== ""
			? (categoryImage = cloudImage)
			: (categoryImage = image);
		cloudSponsorLogo !== ""
			? (categorySponsorLogo = cloudSponsorLogo)
			: (categorySponsorLogo = sponsorLogo);
		cloudCarouselImages !== null
			? (categoryCarouselImages = cloudCarouselImages)
			: (categoryCarouselImages = carouselImages);
		service
			.editTripCategoryDetails(
				id,
				slug,
				title,
				richTitle,
				categoryImage,
				categoryCarouselImages,
				country,
				mapLocation,
				editorDataReviewText,
				editorDataMostLikedText,
				editorDataPointsOfInterestText,
				editorDataMustSeeText,
				editorDataHeader,
				editorData,
				isSponsored,
				isFeatured,
				sponsorURL,
				categorySponsorLogo,
				sponsorClaim
			)
			.then(() => {
				hideModal();
				fetchData();
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		if (tripCategory.isSubmitable) {
			submitTripCategory();
		}
	}, [tripCategory]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			tripCategory.updatedCarouselImages ||
			tripCategory.updatedImage ||
			tripCategory.updatedSponsorLogo
		) {
			handleFileUpload();
		} else {
			submitTripCategory();
		}
	};

	let imagePreview, sponsorLogoPreview;

	if (tripCategory.blopImage) {
		imagePreview = (
			<div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
				<img src={tripCategory.blopImage} />
			</div>
		);
	} else {
		imagePreview = (
			<div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
				<img src={tripCategory.image} />
			</div>
		);
	}

	if (tripCategory.blopSponsorLogo) {
		sponsorLogoPreview = (
			<div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
				<img src={tripCategory.blopSponsorLogo} />
			</div>
		);
	} else {
		sponsorLogoPreview = (
			<div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
				<img src={tripCategory.sponsorLogo} />
			</div>
		);
	}

	let isChecked;
	if (tripCategory.isSponsored === true) {
		isChecked = "checked";
	}

	return (
		<div className={`modal ${visibility == true ? "active" : ""}`}>
			<div className="modal__wrapper">
				<div className="modal__header">
					<span>Edita la categoria de viatge</span>
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
							<label htmlFor="title" className="form__label">
								Títol de la categoria
							</label>
							<input
								type="text"
								name="title"
								placeholder="Entra el títol de la categoria"
								className="form__control"
								value={tripCategory.title}
								onChange={handleChange}
							/>
						</div>
						<div className="form__group ">
							<label htmlFor="richTitle" className="form__label">
								Títol enriquit de la categoria
							</label>
							<input
								type="text"
								name="richTitle"
								placeholder="Entra el títol enriquit de la categoria"
								className="form__control"
								value={tripCategory.richTitle}
								onChange={handleChange}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="country" className="form__label">
								País de la categoria
							</label>
							<input
								type="text"
								name="country"
								placeholder="Entra el país de la categoria"
								className="form__control"
								value={tripCategory.country}
								onChange={handleChange}
							/>
						</div>
						<div className="form__group">
							<label
								htmlFor="mapLocation"
								className="form__label"
							>
								Localització de la categoria (iframe)
							</label>
							<textarea
								name="mapLocation"
								id="mapLocation"
								rows="6"
								className="form__control"
								placeholder="Entra l'iframe de la localitzacio de la categoria"
								onChange={handleChange}
							>
								{tripCategory.mapLocation}
							</textarea>
						</div>
						<div className="form__group">
							<span className="form__label">
								Imatge de la catagoria
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
											{tripCategory.image
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
							<span className="form__label">
								Carousel d'imatges
							</span>
							<div className="flex items-center flex-col max-w-full">
								<div className="bg-white border border-primary-100 rounded-tl-md rounded-tr-md w-full overflow-hidden">
									<div className="bg-white border-none h-auto p-3 justify-start">
										<label className="form__label m-0 bg-white rounded-md shadow py-3 px-5 inline-flex items-center cursor-pointer">
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
											Afegir imatge
											<input
												type="file"
												className="hidden"
												multiple="multiple"
												name="carouselImages"
												onChange={saveFileToStatus}
												required
											/>
										</label>
									</div>
								</div>
								<div className="w-full border border-primary-100 rounded-br-md rounded-bl-md -mt-px p-4 flex">
									<div className="columns-3 gap-5">
										{imagesList}
									</div>
								</div>
							</div>
						</div>
						<div className="form__group">
							<label htmlFor="slug" className="form__label">
								URL de la categoria
							</label>
							<input
								type="text"
								name="slug"
								placeholder="Entra l'slug de la categoria"
								className="form__control"
								value={tripCategory.slug}
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
									checked={isFeatured}
									onChange={handleCheck}
								/>
								Categoria destacada?
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
								Categoria patrocinada?
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
								value={tripCategory.sponsorURL}
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
											{tripCategory.sponsorLogo
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
								value={tripCategory.sponsorClaim}
								onChange={handleChange}
							/>
						</div>
					</form>
					<div className="form__group">
						<label htmlFor="textSeo" className="form__label">
							reviewText - Review del viatge
						</label>
						<EditorNavbar editor={editorReviewText} />
						<EditorContent
							editor={editorReviewText}
							className="form-composer__editor"
						/>
					</div>
					<div className="form__group">
						<label htmlFor="textSeo" className="form__label">
							mostLikedText - El que ens ha agradat més del viatge
						</label>
						<EditorNavbar editor={editorMostLikedText} />
						<EditorContent
							editor={editorMostLikedText}
							className="form-composer__editor"
						/>
					</div>
					<div className="form__group">
						<label htmlFor="textSeo" className="form__label">
							pointsOfInterestText - Punts d'interès del viatge
						</label>
						<EditorNavbar editor={editorPointsOfInterestText} />
						<EditorContent
							editor={editorPointsOfInterestText}
							className="form-composer__editor"
						/>
					</div>
					<div className="form__group">
						<label htmlFor="textSeo" className="form__label">
							mustSeeText - Què s'ha de fer sí o sí
						</label>
						<EditorNavbar editor={editorMustSeeText} />
						<EditorContent
							editor={editorMustSeeText}
							className="form-composer__editor"
						/>
					</div>
					<div className="form__group">
						<label htmlFor="textSeo" className="form__label">
							Text SEO header de la categoria
						</label>
						<EditorNavbar editor={editorHeader} />
						<EditorContent
							editor={editorHeader}
							className="form-composer__editor"
						/>
					</div>
					<div className="form__group">
						<label htmlFor="textSeo" className="form__label">
							Text SEO de la categoria
						</label>
						<EditorNavbar editor={editor} />
						<EditorContent
							editor={editor}
							className="form-composer__editor"
						/>
					</div>
				</div>
				<div className="modal__footer">
					<button
						className="button button__primary button__med"
						onClick={handleSubmit}
					>
						Editar categoria
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditTripCategoryModal;

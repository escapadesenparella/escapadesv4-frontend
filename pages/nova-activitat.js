import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import NavigationBar from "../components/global/NavigationBar";
import UserContext from "../contexts/UserContext";
import ContentService from "../services/contentService";
import Autocomplete from "react-google-autocomplete";
import PaymentService from "../services/paymentService";
import { useEditor, EditorContent } from "@tiptap/react";
import EditorNavbar from "../components/editor/EditorNavbar";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { handleFilesUpload, removeImage } from "../utils/helpers";
import Link from "@tiptap/extension-link";

const ActivityForm = () => {
	// Validate if user is allowed to access this view
	const { user } = useContext(UserContext);
	const [loadPage, setLoadPage] = useState(false);
	// End validation

	const router = useRouter();

	useEffect(() => {
		if (!user || user === "null" || user === undefined) {
			router.push("/login");
		} else {
			if (user) {
				if (user.accountCompleted === false) {
					router.push("/signup/complete-account");
				}
				if (user.hasConfirmedEmail === false) {
					router.push("/signup/confirmacio-correu");
				}
			}
		}
	}, [user]);

	const initialState = {
		formData: {
			emptyForm: true,
			type: "activity",
			isVerified: false,
			title: "",
			subtitle: "",
			slug: "",
			categories: [],
			seasons: [],
			region: "",
			cover: "",
			blopCover: "",
			images: [],
			blopImages: [],
			cloudImages: [],
			coverCloudImage: "",
			cloudImagesUploaded: false,
			coverCloudImageUploaded: false,
			phone: "",
			website: "",
			activity_full_address: "",
			activity_locality: "",
			activity_province: "",
			activity_state: "",
			activity_country: "",
			activity_lat: "",
			activity_lng: "",
			activity_rating: 0,
			activity_place_id: "",
			activity_opening_hours: "",
			duration: "",
			price: "",
			discountCode: "",
			discountInfo: "",
			review: "",
			relatedStory: "",
			organization: "",
			isReadyToSubmit: false,
			metaTitle: "",
			metaDescription: "",
		},
		characteristics: [],
		stories: [],
	};

	const [state, setState] = useState(initialState);
	const [queryId, setQueryId] = useState(null);
	const [activeTab, setActiveTab] = useState("main");
	const [editorData, setEditorData] = useState({});
	const [reasonsEditorData, setReasonsEditorData] = useState({});

	useEffect(() => {
		if (router && router.route) {
			setQueryId(router.route);
		}
	}, [router]);

	const service = new ContentService();
	const paymentService = new PaymentService();

	// Fetch data
	useEffect(() => {
		const fetchData = async () => {
			const userOrganizations = await service.checkOrganizationsOwned();
			let hasOrganizations;
			userOrganizations.number > 0
				? (hasOrganizations = true)
				: (hasOrganizations = false);
			const stories = await service.getStories();
			if (user && stories) {
				setLoadPage(true);
			}
			setState({
				...state,
				formData: {
					...state.formData,
					userOrganizations: userOrganizations,
				},
				stories: stories.allStories,
			});
		};
		fetchData();
	}, []);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Image.configure({
				inline: false,
				HTMLAttributes: {
					class: "img-frame",
				},
			}),
			Placeholder.configure({
				placeholder: "Comença a descriure l'activitat...",
			}),
			Link.configure({
				openOnClick: false,
				autolink: false,
				defaultProtocol: "https",
			}),
		],
		content: "",
		onUpdate: (props) => {
			const data = {
				html: props.editor.getHTML(),
				text: props.editor.state.doc.textContent,
			};
			setEditorData(data);
		},
		autofocus: false,
		parseOptions: {
			preserveWhitespace: true,
		},
	});

	const reasonsEditor = useEditor({
		extensions: [
			StarterKit,
			Image.configure({
				inline: false,
				HTMLAttributes: {
					class: "img-frame",
				},
			}),
			Placeholder.configure({
				placeholder:
					"Comença a escriure raons per realitzar l'activitat...",
			}),
		],
		content: "",
		onUpdate: (props) => {
			const data = {
				html: props.editor.getHTML(),
				text: props.editor.state.doc.textContent,
			};
			setReasonsEditorData(data);
		},
		autofocus: false,
		parseOptions: {
			preserveWhitespace: true,
		},
	});

	const saveFileToStatus = (e) => {
		if (e.target.name === "cover") {
			const fileToUpload = e.target.files[0];
			setState({
				...state,
				formData: {
					...state.formData,
					blopCover: URL.createObjectURL(fileToUpload),
					cover: fileToUpload,
				},
			});
		} else {
			const choosenFiles = Array.prototype.slice.call(e.target.files);
			const filesToUpload = [];

			choosenFiles.forEach((file) => filesToUpload.push(file));

			const blopImages = filesToUpload.map((file) =>
				URL.createObjectURL(file)
			);
			const images = filesToUpload.map((image) => image);
			setState({
				...state,
				formData: {
					...state.formData,
					blopImages: [...state.formData.blopImages, ...blopImages],
					images: [...state.formData.images, ...images],
				},
			});
		}
	};

	const imagesList = state.formData.blopImages.map((el, idx) => (
		<div
			className="relative overflow-hidden rounded-md border-8 border-white shadow mb-5"
			key={idx}
		>
			<button
				type="button"
				onClick={() => {
					const objImages = removeImage(
						idx,
						state.formData.blopImages,
						state.formData.images
					);
					setState({
						...state,
						formData: {
							...state.formData,
							images: objImages.arrImages,
							blopImages: objImages.arrBlopImages,
						},
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

	let coverImage;
	if (state.formData.blopCover) {
		coverImage = (
			<div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
				<img src={state.formData.blopCover} />
			</div>
		);
	}

	const checkIfCategoryChecked = (val) => {
		if (state.formData.categories) {
			return state.formData.categories.includes(val) ? true : false;
		}
	};

	const checkIfSeasonChecked = (val) => {
		if (state.formData.seasons) {
			return state.formData.seasons.includes(val) ? true : false;
		}
	};

	const checkIfRegionChecked = (val) => {
		if (state.formData.region) {
			return state.formData.region.includes(val) ? true : false;
		}
	};

	const handleCheckCategory = (e) => {
		setState({
			...state,
			formData: { ...state.formData, categories: e.target.id },
		});
	};

	const handleCheckSeason = (e) => {
		let seasons = state.formData.seasons;
		if (e.target.checked === true) {
			seasons.push(e.target.id);
		} else {
			let index = seasons.indexOf(e.target.id);
			seasons.splice(index, 1);
		}
		setState({
			...state,
			formData: { ...state.formData, seasons: seasons },
		});
	};

	const handleCheckRegion = (e) => {
		setState({
			...state,
			formData: { ...state.formData, region: e.target.id },
		});
	};

	const handleCheckOrganization = (e) => {
		setState({
			...state,
			formData: { ...state.formData, organization: e.target.id },
		});
	};

	const handleChange = (e) => {
		if (e.target.nodeName == "TEXTAREA") {
			e.target.style.height = "0px";
			const scrollHeight = e.target.scrollHeight;
			e.target.style.height = scrollHeight + "px";
		}
		setState({
			...state,
			formData: {
				...state.formData,
				[e.target.name]: e.target.value,
				emptyForm: false,
			},
		});
	};

	const submitActivity = async () => {
		const {
			type,
			isVerified,
			title,
			subtitle,
			slug,
			categories,
			seasons,
			region,
			coverCloudImage,
			cloudImages,
			phone,
			website,
			activity_full_address,
			activity_locality,
			activity_province,
			activity_state,
			activity_country,
			activity_lat,
			activity_lng,
			activity_rating,
			activity_place_id,
			activity_opening_hours,
			duration,
			price,
			discountCode,
			discountInfo,
			review,
			relatedStory,
			organization,
			metaTitle,
			metaDescription,
		} = state.formData;
		service
			.activity(
				type,
				isVerified,
				slug,
				title,
				subtitle,
				categories,
				seasons,
				region,
				coverCloudImage,
				cloudImages,
				editorData.html,
				reasonsEditorData.html,
				phone,
				website,
				activity_full_address,
				activity_locality,
				activity_province,
				activity_state,
				activity_country,
				activity_lat,
				activity_lng,
				activity_rating,
				activity_place_id,
				activity_opening_hours,
				duration,
				price,
				discountCode,
				discountInfo,
				review,
				relatedStory,
				organization,
				metaTitle,
				metaDescription
			)
			.then(() => {
				/**
				 * Comentat temporalment
				 * Revisar - Ara per ara les dues funcions
				 * priven de poder publicar l'allotjament
				 */

				// service.editUserPlan(user._id, true, true, true, true);
				// paymentService.editUserSubscription();
				Router.push("/2i8ZXlkM4cFKUPBrm3-admin-panel");
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { uploadedCover, uploadedImages, success } =
			await handleFilesUpload(
				state.formData.cover,
				state.formData.images
			);

		if (success.status === 200) {
			setState({
				...state,
				formData: {
					...state.formData,
					cloudImages: uploadedImages,
					coverCloudImage: uploadedCover,
					cloudImagesUploaded: true,
					coverCloudImageUploaded: true,
				},
			});
		}
	};

	useEffect(() => {
		if (
			state.formData.cloudImagesUploaded === true &&
			state.formData.coverCloudImageUploaded === true
		) {
			submitActivity();
		}
	}, [state.formData]);

	useEffect(() => {
		const {
			isVerified,
			title,
			subtitle,
			slug,
			categories,
			seasons,
			region,
			activity_full_address,
			phone,
			website,
			coverImage,
			images,
			price,
			duration,
			organization,
			metaTitle,
			metaDescription,
		} = state.formData;

		if (
			(isVerified,
			title &&
				subtitle &&
				slug &&
				categories &&
				seasons &&
				region &&
				activity_full_address &&
				phone &&
				website &&
				images.length > 0 &&
				coverImage !== "" &&
				editorData &&
				reasonsEditorData &&
				duration &&
				price &&
				organization &&
				metaTitle &&
				metaDescription)
		) {
			setState((state) => ({ ...state, isReadyToSubmit: true }));
		}
	}, [state.formData, editorData, reasonsEditorData]);

	useEffect(() => {
		if (router.query.step) {
			setStateStep({ step: "publicacio-fitxa" });
		}
	}, [router]);

	let organizationsList = [];
	if (state.formData.userOrganizations !== undefined) {
		organizationsList = state.formData.userOrganizations.organizations.map(
			(el, idx) => (
				<label key={idx} className="flex items-center m-2">
					<input
						value={el.orgName}
						name="orgName"
						type="radio"
						id={el._id}
						onChange={handleCheckOrganization}
					/>
					<div className="flex items-center p-2">
						<div className="rounded-md w-10 h-10 border border-primary-100 overflow-hidden mr-2">
							<img
								src={el.orgLogo}
								alt={el.orgName}
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="text-sm">{el.orgName}</span>
					</div>
				</label>
			)
		);
	}

	const handleCheck = (e) => {
		if (e.target.name === "isVerified") {
			e.target.checked
				? setState({
						...state,
						formData: { ...state.formData, isVerified: true },
				  })
				: setState({
						...state,
						formData: { ...state.formData, isVerified: false },
				  });
		}
	};

	return (
		<>
			<Head>
				<title>
					Potencia la visibilitat de la teva activitat -
					Escapadesenparella.cat
				</title>
			</Head>
			<div id="activity">
				<NavigationBar
					logo_url={
						"https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
					}
					user={user}
					path={queryId}
				/>

				<section className="pb-10">
					<div className="container">
						<div className="pt-7 pb-12">
							<div className="flex flex-wrap items-center justify-between">
								<div className="w-full">
									<h1 className="text-3xl">
										Potencia la visibilitat de la teva
										activitat
									</h1>
									<p className="text-base">
										Descriu l'activitat per arribar a
										parelles d'arreu de Catalunya
									</p>
								</div>
							</div>
							<div className="form-composer__body">
								<div className="flex items-center justify-between overflow-hidden border border-primary-100 mb-4 bg-white shadow rounded-md">
									<button
										className={`flex-1 bg-none px-4 py-4 text-primary-500 !rounded-md-none focus:border-t-4 focus:border-primary-500 text-sm ${
											activeTab === "main"
												? "border-t-4 border-primary-500"
												: ""
										}`}
										onClick={() => setActiveTab("main")}
									>
										Contingut principal
									</button>
									<button
										className={`flex-1 bg-none px-4 py-4 text-primary-500 !rounded-md-none focus:border-t-4 focus:border-primary-500 text-sm ${
											activeTab === "seo"
												? "border-t-4 border-primary-500"
												: ""
										}`}
										onClick={() => setActiveTab("seo")}
									>
										SEO
									</button>
								</div>
								{activeTab === "main" ? (
									<div className="form__wrapper">
										<form
											className="form"
											onSubmit={handleSubmit}
										>
											<div className="form__group">
												<label
													htmlFor="title"
													className="form__label"
												>
													Títol
												</label>
												<input
													type="text"
													name="title"
													placeholder="Títol de l'activitat"
													className="form__control"
													value={state.formData.title}
													onChange={handleChange}
												/>
											</div>
											<div className="form__group">
												<label
													htmlFor="subtitle"
													className="form__label"
												>
													Subtítol
												</label>
												<input
													type="text"
													name="subtitle"
													placeholder="Subtítol de l'activitat"
													className="form__control"
													value={
														state.formData.subtitle
													}
													onChange={handleChange}
												/>
											</div>

											<div className="flex flex-wrap items-stretch mt-2">
												<div className="form__group w-3/12">
													<label
														htmlFor="categoria"
														className="form__label"
													>
														Categoria d'escapada
													</label>
													<label
														htmlFor="romantica"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityCategory"
															id="romantica"
															className="mr-2"
															onChange={
																handleCheckCategory
															}
															checked={checkIfCategoryChecked(
																"romantica"
															)}
														/>
														Romàntica
													</label>
													<label
														htmlFor="aventura"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityCategory"
															id="aventura"
															className="mr-2"
															onChange={
																handleCheckCategory
															}
															checked={checkIfCategoryChecked(
																"aventura"
															)}
														/>
														Aventura
													</label>
													<label
														htmlFor="gastronomica"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityCategory"
															id="gastronomica"
															className="mr-2"
															onChange={
																handleCheckCategory
															}
															checked={checkIfCategoryChecked(
																"gastronomica"
															)}
														/>
														Gastronòmica
													</label>
													<label
														htmlFor="cultural"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityCategory"
															id="cultural"
															className="mr-2"
															onChange={
																handleCheckCategory
															}
															checked={checkIfCategoryChecked(
																"cultural"
															)}
														/>
														Cultural
													</label>
													<label
														htmlFor="relax"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityCategory"
															id="relax"
															className="mr-2"
															onChange={
																handleCheckCategory
															}
															checked={checkIfCategoryChecked(
																"relax"
															)}
														/>
														Relax
													</label>
												</div>
												<div className="form__group w-3/12">
													<label
														htmlFor="categoria"
														className="form__label"
													>
														Estacions recomanades
													</label>
													<label
														htmlFor="hivern"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="hivern"
															id="hivern"
															className="mr-2"
															onChange={
																handleCheckSeason
															}
															checked={checkIfSeasonChecked(
																"hivern"
															)}
														/>
														Hivern
													</label>
													<label
														htmlFor="primavera"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="primavera"
															id="primavera"
															className="mr-2"
															onChange={
																handleCheckSeason
															}
															checked={checkIfSeasonChecked(
																"primavera"
															)}
														/>
														Primavera
													</label>
													<label
														htmlFor="estiu"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="estiu"
															id="estiu"
															className="mr-2"
															onChange={
																handleCheckSeason
															}
															checked={checkIfSeasonChecked(
																"estiu"
															)}
														/>
														Estiu
													</label>
													<label
														htmlFor="tardor"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="tardor"
															id="tardor"
															className="mr-2"
															onChange={
																handleCheckSeason
															}
															checked={checkIfSeasonChecked(
																"tardor"
															)}
														/>
														Tardor
													</label>
												</div>
												<div className="form__group w-3/12">
													<label
														htmlFor="categoria"
														className="form__label"
													>
														Regió de l'allotjament
													</label>
													<label
														htmlFor="barcelona"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="placeRegion"
															id="barcelona"
															className="mr-2"
															onChange={
																handleCheckRegion
															}
															checked={checkIfRegionChecked(
																"barcelona"
															)}
														/>
														Barcelona
													</label>
													<label
														htmlFor="tarragona"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="placeRegion"
															id="tarragona"
															className="mr-2"
															onChange={
																handleCheckRegion
															}
															checked={checkIfRegionChecked(
																"tarragona"
															)}
														/>
														Tarragona
													</label>
													<label
														htmlFor="girona"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="placeRegion"
															id="girona"
															className="mr-2"
															onChange={
																handleCheckRegion
															}
															checked={checkIfRegionChecked(
																"girona"
															)}
														/>
														Girona
													</label>
													<label
														htmlFor="lleida"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="placeRegion"
															id="lleida"
															className="mr-2"
															onChange={
																handleCheckRegion
															}
															checked={checkIfRegionChecked(
																"lleida"
															)}
														/>
														Lleida
													</label>
													<label
														htmlFor="costaBrava"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="placeRegion"
															id="costaBrava"
															className="mr-2"
															onChange={
																handleCheckRegion
															}
															checked={checkIfRegionChecked(
																"costaBrava"
															)}
														/>
														Costa Brava
													</label>
													<label
														htmlFor="costaDaurada"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="placeRegion"
															id="costaDaurada"
															className="mr-2"
															onChange={
																handleCheckRegion
															}
															checked={checkIfRegionChecked(
																"costaDaurada"
															)}
														/>
														Costa Daurada
													</label>
													<label
														htmlFor="pirineus"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="placeRegion"
															id="pirineus"
															className="mr-2"
															onChange={
																handleCheckRegion
															}
															checked={checkIfRegionChecked(
																"pirineus"
															)}
														/>
														Pirineus
													</label>
												</div>
											</div>

											<div className="form__group">
												<label
													htmlFor="loaction"
													className="form__label"
												>
													Localització
												</label>
												<Autocomplete
													className="form__control"
													apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
													style={{ width: "100%" }}
													onPlaceSelected={(
														activity
													) => {
														let activity_full_address,
															activity_locality,
															activity_province,
															activity_state,
															activity_country,
															activity_lat,
															activity_lng,
															activity_rating,
															activity_id,
															activity_opening_hours;

														activity_full_address =
															activity.formatted_address;
														activity.address_components.forEach(
															(el) => {
																if (
																	el
																		.types[0] ===
																	"locality"
																) {
																	activity_locality =
																		el.long_name;
																}
																if (
																	el
																		.types[0] ===
																	"administrative_area_level_2"
																) {
																	activity_province =
																		el.long_name;
																}
																if (
																	el
																		.types[0] ===
																	"administrative_area_level_1"
																) {
																	activity_state =
																		el.long_name;
																}
																if (
																	el
																		.types[0] ===
																	"country"
																) {
																	activity_country =
																		el.long_name;
																}
															}
														);

														if (
															activity.geometry
																.viewport
														) {
															activity_lat =
																Object.values(
																	activity
																		.geometry
																		.viewport
																)[0].hi;
															activity_lng =
																Object.values(
																	activity
																		.geometry
																		.viewport
																)[1].hi;
														}

														activity_rating =
															activity.rating;
														activity_id =
															activity.place_id;

														if (
															activity.opening_hours
														) {
															activity_opening_hours =
																activity
																	.opening_hours
																	.weekday_text;
														}
														setState({
															...state,
															formData: {
																...state.formData,
																activity_full_address:
																	activity_full_address,
																activity_locality:
																	activity_locality,
																activity_province:
																	activity_province,
																activity_state:
																	activity_state,
																activity_country:
																	activity_country,
																activity_lat:
																	activity_lat,
																activity_lng:
																	activity_lng,
																activity_rating:
																	activity_rating,
																activity_id:
																	activity_id,
																activity_opening_hours:
																	activity_opening_hours,
															},
														});
													}}
													types={["establishment"]}
													placeholder={
														"Escriu la direcció de l'activitat"
													}
													fields={[
														"rating",
														"place_id",
														"opening_hours",
														"address_components",
														"formatted_address",
														"geometry",
													]}
												/>
											</div>

											<div className="flex flex-wrap items-center">
												<div className="form__group w-3/12">
													<label
														htmlFor="phone"
														className="form__label"
													>
														Número de telèfon
													</label>
													<input
														type="tel"
														name="phone"
														placeholder="Número de telèfon de l'allotjament"
														className="form__control"
														value={
															state.formData.phone
														}
														onChange={handleChange}
													/>
												</div>

												<div className="form__group w-3/12">
													<label
														htmlFor="website"
														className="form__label"
													>
														Pàgina web de reserva o
														contacte
													</label>
													<input
														type="url"
														name="website"
														placeholder="Pàgina web de reserva o contacte"
														className="form__control"
														value={
															state.formData
																.website
														}
														onChange={handleChange}
													/>
												</div>

												<div className="form__group w-3/12">
													<label
														htmlFor="price"
														className="form__label"
													>
														Preu (€)
													</label>
													<input
														type="number"
														name="price"
														placeholder="Preu de l'activitat"
														className="form__control"
														value={
															state.formData.price
														}
														onChange={handleChange}
													/>
												</div>

												<div className="form__group w-3/12">
													<label
														htmlFor="price"
														className="form__label"
													>
														Durada (h)
													</label>
													<input
														type="number"
														name="duration"
														placeholder="Durada de l'activitat"
														className="form__control"
														value={
															state.formData
																.duration
														}
														onChange={handleChange}
													/>
												</div>
											</div>
											<div className="flex flex-wrap items-center">
												<div className="form__group w-3/12">
													<label
														htmlFor="discountCode"
														className="form__label"
													>
														Codi de descompte
													</label>
													<input
														type="text"
														name="discountCode"
														placeholder="Eg. 15ESCAPADES24"
														className="form__control"
														value={
															state.formData
																.discountCode
														}
														onChange={handleChange}
													/>
												</div>
												<div className="form__group w-3/12">
													<label
														htmlFor="discountInfo"
														className="form__label"
													>
														Informació descompte
													</label>
													<input
														type="text"
														name="discountInfo"
														placeholder="Eg. 15% descompte"
														className="form__control"
														value={
															state.formData
																.discountInfo
														}
														onChange={handleChange}
													/>
												</div>
											</div>

											<div className="form__group cover">
												<span className="form__label">
													Imatge de portada
												</span>
												<div className="flex items-center flex-col max-w-full mb-4">
													<div className="bg-white border border-primary-100 rounded-tl-md rounded-tr-md w-full">
														<div className="bg-white border-none h-auto p-4 justify-start">
															<label className="form__label m-0 bg-white rounded-md shadow py-3 px-5 inline-flex items-center cursor-pointer">
																<input
																	type="file"
																	className="hidden"
																	name="cover"
																	onChange={
																		saveFileToStatus
																	}
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
																	<circle
																		cx="12"
																		cy="13"
																		r="3"
																	/>
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
																{state.formData
																	.cover
																	? "Canviar imatge"
																	: "Seleccionar imatge"}
															</label>
														</div>
													</div>
													<div className="w-full border border-primary-100 rounded-br-md rounded-bl-md -mt-px p-4 flex">
														<div className="-m-2.5 flex flex-wrap items-center">
															{coverImage}
														</div>
													</div>
												</div>
											</div>

											<div className="form__group images">
												<span className="form__label">
													Imatges d'aquesta activitat
												</span>
												<div className="flex items-center flex-col max-w-full mb-4">
													<div className="bg-white border border-primary-100 rounded-tl-md rounded-tr-md w-full">
														<div className="bg-white border-none h-auto p-4 justify-start">
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
																	<circle
																		cx="12"
																		cy="13"
																		r="3"
																	/>
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
																Seleccionar
																imatges
																<input
																	type="file"
																	className="hidden"
																	multiple="multiple"
																	onChange={
																		saveFileToStatus
																	}
																/>
															</label>
														</div>
													</div>
													<div className="w-full border border-primary-100 rounded-br-md rounded-bl-md -mt-px p-4 flex">
														<div className="columns-7 gap-5">
															{imagesList}
														</div>
													</div>
												</div>
											</div>
											<div className="flex flex-wrap items-stretch mt-2">
												<div className="form__group w-1/2">
													<label className="form__label">
														Escapada verificada?
													</label>
													<div className="flex items-center">
														<label
															htmlFor="isVerified"
															className="form__label flex items-center"
														>
															<input
																type="checkbox"
																name="isVerified"
																id="isVerified"
																className="mr-2"
																onClick={
																	handleCheck
																}
																checked={
																	state
																		.formData
																		.isVerified
																}
															/>
															Verificada
														</label>
													</div>
												</div>
												{state.formData.isVerified ? (
													<>
														<div className="form__group w-full">
															<label
																htmlFor="review"
																className="form__label"
															>
																Review de
																l'escapada
															</label>
															<div className="flex items-center">
																<textarea
																	id="review"
																	name="review"
																	placeholder="Review de l'activitat"
																	className="form__control"
																	value={
																		state
																			.formData
																			.review
																	}
																	onChange={
																		handleChange
																	}
																/>
															</div>
														</div>
														<div className="form__group w-full">
															<label
																htmlFor="review"
																className="form__label"
															>
																Selecciona la
																"Història"
																relacionada
															</label>
															<div className="flex items-center">
																<select
																	id="relatedStory"
																	name="relatedStory"
																	className="form__control"
																	onChange={
																		handleChange
																	}
																>
																	<option
																		value=""
																		default
																		hidden
																	>
																		Selecciona
																		una
																		història
																	</option>
																	{state.stories &&
																	state
																		.stories
																		.length >
																		0
																		? state.stories.map(
																				(
																					el
																				) => {
																					return (
																						<option
																							value={
																								el._id
																							}
																							key={
																								el._id
																							}
																						>
																							{
																								el.title
																							}
																						</option>
																					);
																				}
																		  )
																		: null}
																</select>
															</div>
														</div>
													</>
												) : null}
											</div>
										</form>
										<div className="form__group mt-2">
											<label
												htmlFor="description"
												className="form__label"
											>
												Descripció
											</label>
											<EditorNavbar editor={editor} />
											<EditorContent
												editor={editor}
												className="form-composer__editor"
											/>
										</div>
										<div className="form__group mt-2">
											<label
												htmlFor="reasons"
												className="form__label"
											>
												Raons per realitzar l'escapada
											</label>
											<EditorNavbar
												editor={reasonsEditor}
											/>
											<EditorContent
												editor={reasonsEditor}
												className="form-composer__editor"
											/>
										</div>
									</div>
								) : (
									<div className="form__wrapper">
										<form
											className="form"
											onSubmit={handleSubmit}
										>
											<div className="form__group">
												<label
													htmlFor="metaTitle"
													className="form__label"
												>
													Meta títol{" "}
												</label>
												<input
													type="text"
													name="metaTitle"
													placeholder="Meta títol"
													className="form__control"
													value={
														state.formData.metaTitle
													}
													onChange={handleChange}
												/>
												<span className="form__text_info">
													Cada publicació hauria de
													tenir un meta títol únic,
													idealment de menys de 60
													caràcters de llargada
												</span>
											</div>

											<div className="form__group">
												<label
													htmlFor="metaDescription"
													className="form__label"
												>
													Meta descripció{" "}
												</label>
												<input
													type="text"
													name="metaDescription"
													placeholder="Meta descripció"
													className="form__control"
													value={
														state.formData
															.metaDescription
													}
													onChange={handleChange}
												/>
												<span className="form__text_info">
													Cada publicació hauria de
													tenir una meta descripció
													única, idealment de menys de
													160 caràcters de llargada
												</span>
											</div>

											<div className="form__group">
												<label
													htmlFor="slug"
													className="form__label"
												>
													Slug{" "}
												</label>
												<input
													type="text"
													name="slug"
													placeholder="Slug de l'allotjament"
													className="form__control"
													value={state.formData.slug}
													onChange={handleChange}
												/>
											</div>
										</form>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				<div className="w-full fixed bottom-0 inset-x-0 bg-white border-t border-primary-200 py-2.5 z-50">
					<div className="container flex items-center justify-end">
						<div className="px-5">
							<button
								className="button button__primary button__lg"
								type="submit"
								onClick={handleSubmit}
							>
								Guardar canvis
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ActivityForm;

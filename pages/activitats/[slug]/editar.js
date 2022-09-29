import { useState, useEffect, useContext } from "react";
import NavigationBar from "../../../components/global/NavigationBar";
import { Col, Form } from "react-bootstrap";
import ContentService from "../../../services/contentService";
import { useRouter } from "next/router";
import Autocomplete from "react-google-autocomplete";
import UserContext from "../../../contexts/UserContext";
import Head from "next/head";
import FetchingSpinner from "../../../components/global/FetchingSpinner";

const ActivityEditionForm = () => {
	// Validate if user is allowed to access this view
	const { user } = useContext(UserContext);
	const [loadPage, setLoadPage] = useState(false);
	useEffect(() => {
		if (user) {
			setLoadPage(true);
		}
	}, []);
	// End validation

	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
		if (
			router.pathname.includes("editar") ||
			router.pathname.includes("nova-activitat") ||
			router.pathname.includes("nou-allotjament") ||
			router.pathname.includes("nova-historia")
		) {
			document.querySelector("body").classList.add("bg-primary-100");
		} else {
			document.querySelector("body").classList.remove("bg-primary-100");
		}
	}, [user, router]);

	const initialState = {
		activity: {},
		formData: {
			emptyForm: true,
			type: "activity",
			title: "",
			subtitle: "",
			slug: "slug",
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
			description: "",
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
			userOrganizations: "",
			isReadyToSubmit: false,
			metaTitle: "",
			metaDescription: "",
		},
		isActivityLoaded: false,
	};
	const [state, setState] = useState(initialState);
	const [queryId, setQueryId] = useState(null);
	const [activeTab, setActiveTab] = useState("main");

	useEffect(() => {
		if (router && router.query) {
			setQueryId(router.query.slug);
		}
	}, [router]);

	const service = new ContentService();

	useEffect(() => {
		if (router.query.slug !== undefined) {
			const fetchData = async () => {
				const userOrganizations = await service.checkOrganizationsOwned();
				let hasOrganizations;
				userOrganizations.number > 0
					? (hasOrganizations = true)
					: (hasOrganizations = false);
				let activityDetails = await service.activityDetails(router.query.slug);
				setState({
					activity: activityDetails,
					formData: {
						_id: activityDetails._id,
						type: activityDetails.type,
						title: activityDetails.title,
						subtitle: activityDetails.subtitle,
						description: activityDetails.description,
						slug: activityDetails.slug,
						categories: activityDetails.categories,
						seasons: activityDetails.seasons,
						region: activityDetails.region,
						cover: activityDetails.cover,
						blopCover: "",
						images: [],
						blopImages: [],
						cloudImages: [],
						coverCloudImage: "",
						cloudImagesUploaded: false,
						coverCloudImageUploaded: false,
						phone: activityDetails.phone,
						website: activityDetails.website,
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
						duration: activityDetails.duration,
						price: activityDetails.price,
						metaTitle: activityDetails.metaTitle,
						metaDescription: activityDetails.metaDescription,
						userOrganizations: userOrganizations,
					},
					isActivityLoaded: true,
				});
			};
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryId]);

	const saveFileToStatus = (e) => {
		const fileToUpload = e.target.files[0];
		if (e.target.name === "cover") {
			setState({
				...state,
				formData: {
					...state.formData,
					blopCover: URL.createObjectURL(fileToUpload),
					cover: fileToUpload,
					updatedCover: true,
				},
			});
		} else {
			setState({
				...state,
				formData: {
					...state.formData,
					blopImages: [
						...state.formData.blopImages,
						URL.createObjectURL(fileToUpload),
					],
					images: [...state.formData.images, fileToUpload],
					updatedImages: true,
				},
			});
		}
	};

	let imagesList, coverImage;

	if (
		state.activity.images ||
		state.formData.blopImages ||
		state.formData.images
	) {
		let stateImages;
		state.formData.blopImages.length > 0
			? (stateImages = state.formData.blopImages)
			: (stateImages = state.activity.images);
		if (stateImages) {
			imagesList = stateImages.map((el, idx) => (
				<div
					className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow"
					key={idx}
				>
					<img src={el} />
					<button className="w-auto p-0 bg-black bg-opacity-60 rounded-full absolute top-3 right-3"></button>
				</div>
			));
		}
	}

	if (
		state.activity.cover ||
		state.formData.blopCover ||
		state.formData.cover
	) {
		let stateCover;
		state.formData.blopCover !== ""
			? (stateCover = state.formData.blopCover)
			: (stateCover = state.activity.cover);
		coverImage = (
			<div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
				<img src={stateCover} />
				<button className="w-auto p-0 bg-black bg-opacity-60 rounded-full absolute top-3 right-3"></button>
			</div>
		);
	}

	let selectedOrganization;
	if (state.formData.userOrganizations) {
		if (state.formData.userOrganizations.organizations) {
			state.formData.userOrganizations.organizations.forEach((el) => {
				if (state.activity.organization) {
					if (el._id === state.activity.organization._id) {
						selectedOrganization = state.activity.organization._id;
					}
				}
			});
		}
	}

	let isRomantic,
		isAdventure,
		isGastronomic,
		isCultural,
		isRelax,
		isWinter,
		isSpring,
		isSummer,
		isAutumn,
		isBarcelona,
		isTarragona,
		isGirona,
		isLleida,
		isCostaBrava,
		isCostaDaurada,
		isPirineus;

	if (state.activity.categories) {
		state.activity.categories.includes("romantica")
			? (isRomantic = true)
			: (isRomantic = false);
		state.activity.categories.includes("aventura")
			? (isAdventure = true)
			: (isAdventure = false);
		state.activity.categories.includes("gastronomica")
			? (isGastronomic = true)
			: (isGastronomic = false);
		state.activity.categories.includes("cultural")
			? (isCultural = true)
			: (isCultural = false);
		state.activity.categories.includes("relax")
			? (isRelax = true)
			: (isRelax = false);
	}
	if (state.activity.seasons) {
		state.activity.seasons.includes("hivern")
			? (isWinter = true)
			: (isWinter = false);
		state.activity.seasons.includes("primavera")
			? (isSpring = true)
			: (isSpring = false);
		state.activity.seasons.includes("estiu")
			? (isSummer = true)
			: (isSummer = false);
		state.activity.seasons.includes("tardor")
			? (isAutumn = true)
			: (isAutumn = false);
	}
	if (state.activity.region) {
		state.activity.region.includes("barcelona")
			? (isBarcelona = true)
			: (isBarcelona = false);
		state.activity.region.includes("tarragona")
			? (isTarragona = true)
			: (isTarragona = false);
		state.activity.region.includes("girona")
			? (isGirona = true)
			: (isGirona = false);
		state.activity.region.includes("lleida")
			? (isLleida = true)
			: (isLleida = false);
		state.activity.region.includes("costaBrava")
			? (isCostaBrava = true)
			: (isCostaBrava = false);
		state.activity.region.includes("costaDaurada")
			? (isCostaDaurada = true)
			: (isCostaDaurada = false);
		state.activity.region.includes("pirineus")
			? (isPirineus = true)
			: (isPirineus = false);
	}

	const submitActivity = async () => {
		const {
			_id,
			categories,
			seasons,
			region,
			cover,
			images,
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
		} = state.activity;
		const {
			title,
			subtitle,
			slug,
			coverCloudImage,
			cloudImages,
			metaTitle,
			metaDescription,
			description,
			phone,
			website,
			duration,
			price,
		} = state.formData;
		const { organization } = state;
		let activityCover, activityImages;
		coverCloudImage !== ""
			? (activityCover = coverCloudImage)
			: (activityCover = cover);
		cloudImages.length > 0
			? (activityImages = cloudImages)
			: (activityImages = images);
		service
			.editActivity(
				_id,
				slug,
				title,
				subtitle,
				categories,
				seasons,
				region,
				activityCover,
				activityImages,
				description,
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
				organization,
				metaTitle,
				metaDescription
			)
			.then(() => router.push("/dashboard"));
	};

	const handleFileUpload = (e) => {
		const cover = state.formData.cover;
		let uploadedCover = "";
		const uploadData = new FormData();
		if (state.formData.updatedCover) {
			uploadData.append("imageUrl", cover);
			service.uploadFile(uploadData).then((res) => {
				setState({
					...state,
					formData: {
						...state.formData,
						coverCloudImage: res.path,
						coverCloudImageUploaded: true,
					},
				});
			});
		}
		if (state.formData.updatedImages) {
			const imagesList = state.formData.images;
			let uploadedImages = [];
			imagesList.forEach((el) => {
				const uploadData = new FormData();
				uploadData.append("imageUrl", el);
				service.uploadFile(uploadData).then((res) => {
					uploadedImages.push(res.path);
					if (uploadedImages.length === state.formData.images.length) {
						setState({
							...state,
							formData: {
								...state.formData,
								cloudImages: uploadedImages,
								cloudImagesUploaded: true,
							},
						});
					}
				});
			});
		}
		if (state.formData.updatedImages && state.formData.updatedCover) {
			const imagesList = state.formData.images;
			const cover = state.formData.cover;
			let uploadedImages = [];
			let uploadedCover = "";
			const uploadData = new FormData();
			uploadData.append("imageUrl", cover);
			service.uploadFile(uploadData).then((res) => {
				uploadedCover = res.path;
			});

			imagesList.forEach((el) => {
				const uploadData = new FormData();
				uploadData.append("imageUrl", el);
				service.uploadFile(uploadData).then((res) => {
					uploadedImages.push(res.path);
					if (uploadedImages.length === state.formData.images.length) {
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
				});
			});
		}
	};

	const handleCheckCategory = (e) => {
		let categories = state.activity.categories;
		if (e.target.checked === true) {
			categories.push(e.target.id);
		} else {
			let index = categories.indexOf(e.target.id);
			categories.splice(index, 1);
		}
		setState({
			...state,
			activity: { ...state.activity, categories: categories },
		});
	};

	const handleCheckSeason = (e) => {
		let seasons = state.activity.seasons;
		if (e.target.checked === true) {
			seasons.push(e.target.id);
		} else {
			let index = seasons.indexOf(e.target.id);

			seasons.splice(index, 1);
		}
		setState({
			...state,
			activity: { ...state.activity, seasons: seasons },
		});
	};

	const handleCheckRegion = (e) => {
		setState({
			...state,
			activity: { ...state.activity, region: e.target.id },
		});
	};

	const handleCheckOrganization = (e) => {
		setState({
			...state,
			organization: e.target.id,
		});
	};

	const handleChange = (e) =>
		setState({
			...state,
			formData: { ...state.formData, [e.target.name]: e.target.value },
		});

	useEffect(() => {
		if (
			state.formData.cloudImagesUploaded === true ||
			state.formData.coverCloudImageUploaded === true
		) {
			submitActivity();
		}
	}, [state.formData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.formData.updatedImages || state.formData.updatedCover) {
			handleFileUpload();
		} else {
			submitActivity();
		}
	};

	let organizationsList = [];
	if (state.formData.userOrganizations !== undefined) {
		if (state.formData.userOrganizations.organizations !== undefined) {
			organizationsList = state.formData.userOrganizations.organizations.map(
				(el, idx) => {
					let isChecked;
					if (!state.organization) {
						if (selectedOrganization === el._id) {
							isChecked = true;
						}
					}
					return (
						<label key={idx} className="flex items-center m-2">
							<input
								value={el.orgName}
								name="orgName"
								type="radio"
								id={el._id}
								onChange={handleCheckOrganization}
								checked={isChecked}
							/>
							<div className="flex items-center p-2">
								<div className="rounded-md w-10 h-10 border border-primary-300 overflow-hidden mr-2">
									<img
										src={el.orgLogo}
										alt={el.orgName}
										className="w-full h-full object-cover"
									/>
								</div>
								<span className="text-sm">{el.orgName}</span>
							</div>
						</label>
					);
				}
			);
		}
	}

	if (!loadPage) {
		return <FetchingSpinner />;
	}

	return (
		<>
			<Head>
				<title>Edita l'activitat - Escapadesenparella.cat</title>
			</Head>
			<div id="activity">
				<NavigationBar
					logo_url={
						"https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
					}
					user={user}
					path={queryId}
				/>

				<section>
					<div className="container">
						<div className="pt-7 pb-12">
							<div className="flex items-center justify-between">
								<div className="w-full lg:w-1/2">
									<h1 className="text-3xl">Editar l'activitat</h1>
									<p className="text-base">
										Edita i desa els canvis de la teva activitat
									</p>
								</div>
								<div className="w-full lg:w-1/2 flex justify-end">
									<button
										className="button__primary button__lg"
										type="submit"
										onClick={handleSubmit}
									>
										Guardar canvis
									</button>
								</div>
							</div>
							<div className="form-composer__body">
								<div className="flex items-center justify-between overflow-hidden border border-primary-300 mb-4 bg-white shadow rounded-md">
									<button
										className={`flex-1 bg-none px-4 py-4 text-primary-500 !rounded-none focus:border-t-4 focus:border-primary-500 text-sm ${
											activeTab === "main"
												? "border-t-4 border-primary-500"
												: ""
										}`}
										onClick={() => setActiveTab("main")}
									>
										Contingut principal
									</button>
									<button
										className={`flex-1 bg-none px-4 py-4 text-primary-500 !rounded-none focus:border-t-4 focus:border-primary-500 text-sm ${
											activeTab === "seo" ? "border-t-4 border-primary-500" : ""
										}`}
										onClick={() => setActiveTab("seo")}
									>
										SEO
									</button>
								</div>
								{activeTab === "main" ? (
									<div className="form__wrapper">
										<form className="form" onSubmit={handleSubmit}>
											<div className="form__group">
												<label className="form__label">
													Empresa propietària
												</label>
												<div className="flex items-center -mt-4 -mx-2 -mb-2">
													{organizationsList}
												</div>
											</div>
											<div className="form__group">
												<label htmlFor="title" className="form__label">
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
												<label htmlFor="subtitle" className="form__label">
													Subtítol
												</label>
												<input
													type="text"
													name="subtitle"
													placeholder="Subtítol de l'activitat"
													className="form__control"
													value={state.formData.subtitle}
													onChange={handleChange}
												/>
											</div>

											<div className="flex flex-wrap items-stretch mt-2">
												<div className="form__group w-3/12">
													<label htmlFor="categoria" className="form__label">
														Categoria d'escapada
													</label>
													<label
														htmlFor="romantica"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="romantica"
															id="romantica"
															className="mr-2"
															onChange={handleCheckCategory}
															checked={isRomantic}
														/>
														Romàntica
													</label>
													<label
														htmlFor="aventura"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="aventura"
															id="aventura"
															className="mr-2"
															onChange={handleCheckCategory}
															checked={isAdventure}
														/>
														Aventura
													</label>
													<label
														htmlFor="gastronomica"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="gastronomica"
															id="gastronomica"
															className="mr-2"
															onChange={handleCheckCategory}
															checked={isGastronomic}
														/>
														Gastronòmica
													</label>
													<label
														htmlFor="cultural"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="cultural"
															id="cultural"
															className="mr-2"
															onChange={handleCheckCategory}
															checked={isCultural}
														/>
														Cultural
													</label>
													<label
														htmlFor="relax"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="relax"
															id="relax"
															className="mr-2"
															onChange={handleCheckCategory}
															checked={isRelax}
														/>
														Relax
													</label>
												</div>
												<div className="form__group w-3/12">
													<label htmlFor="categoria" className="form__label">
														Estació recomanada
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
															onChange={handleCheckSeason}
															checked={isWinter}
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
															onChange={handleCheckSeason}
															checked={isSpring}
														/>
														Primavera
													</label>
													<label
														htmlFor="romantica"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="estiu"
															id="estiu"
															className="mr-2"
															onChange={handleCheckSeason}
															checked={isSummer}
														/>
														Estiu
													</label>
													<label
														htmlFor="romantica"
														className="form__label flex items-center"
													>
														<input
															type="checkbox"
															name="tardor"
															id="tardor"
															className="mr-2"
															onChange={handleCheckSeason}
															checked={isAutumn}
														/>
														Tardor
													</label>
												</div>
												<div className="form__group w-3/12">
													<label htmlFor="categoria" className="form__label">
														Regió de l'activitat
													</label>
													<label
														htmlFor="barcelona"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityRegion"
															id="barcelona"
															className="mr-2"
															onChange={handleCheckRegion}
															checked={isBarcelona}
														/>
														Barcelona
													</label>
													<label
														htmlFor="tarragona"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityRegion"
															id="tarragona"
															className="mr-2"
															onChange={handleCheckRegion}
															checked={isTarragona}
														/>
														Tarragona
													</label>
													<label
														htmlFor="girona"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityRegion"
															id="girona"
															className="mr-2"
															onChange={handleCheckRegion}
															checked={isGirona}
														/>
														Girona
													</label>
													<label
														htmlFor="lleida"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityRegion"
															id="lleida"
															className="mr-2"
															onChange={handleCheckRegion}
															checked={isLleida}
														/>
														Lleida
													</label>
													<label
														htmlFor="costabrava"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityRegion"
															id="costabrava"
															className="mr-2"
															onChange={handleCheckRegion}
															checked={isCostaBrava}
														/>
														Costa Brava
													</label>
													<label
														htmlFor="costaDaurada"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityRegion"
															id="costaDaurada"
															className="mr-2"
															onChange={handleCheckRegion}
															checked={isCostaDaurada}
														/>
														Costa Daurada
													</label>
													<label
														htmlFor="pirineus"
														className="form__label flex items-center"
													>
														<input
															type="radio"
															name="activityRegion"
															id="pirineus"
															className="mr-2"
															onChange={handleCheckRegion}
															checked={isPirineus}
														/>
														Pirineus
													</label>
												</div>
											</div>

											<div className="form__group">
												<label htmlFor="loaction" className="form__label">
													Localització
												</label>
												<Autocomplete
													className="form__control"
													apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
													style={{ width: "100%" }}
													defaultValue={state.formData.activity_full_address}
													onPlaceSelected={(activity) => {
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

														activity_full_address = activity.formatted_address;
														activity.address_components.forEach((el) => {
															if (el.types[0] === "locality") {
																activity_locality = el.long_name;
															}
															if (
																el.types[0] === "administrative_area_level_2"
															) {
																activity_province = el.long_name;
															}
															if (
																el.types[0] === "administrative_area_level_1"
															) {
																activity_state = el.long_name;
															}
															if (el.types[0] === "country") {
																activity_country = el.long_name;
															}
														});

														if (activity.geometry.viewport) {
															activity_lat = Object.values(
																activity.geometry.viewport
															)[0].hi;
															activity_lng = Object.values(
																activity.geometry.viewport
															)[1].hi;
														}

														activity_rating = activity.rating;
														activity_id = activity.place_id;

														if (activity.opening_hours) {
															activity_opening_hours =
																activity.opening_hours.weekday_text;
														}

														setState({
															...state,
															activity: {
																...state.activity,
																activity_full_address: activity_full_address,
																activity_locality: activity_locality,
																activity_province: activity_province,
																activity_state: activity_state,
																activity_country: activity_country,
																activity_lat: activity_lat,
																activity_lng: activity_lng,
																activity_rating: activity_rating,
																activity_id: activity_id,
																activity_opening_hours: activity_opening_hours,
															},
														});
													}}
													types={["establishment"]}
													placeholder={"Escriu la localització de l'activitat"}
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
													<label htmlFor="phone" className="form__label">
														Número de telèfon
													</label>
													<input
														type="tel"
														name="phone"
														placeholder="Número de telèfon de l'activitat"
														className="form__control"
														value={state.formData.phone}
														onChange={handleChange}
													/>
												</div>

												<div className="form__group w-3/12">
													<label htmlFor="website" className="form__label">
														Pàgina web
													</label>
													<input
														type="url"
														name="website"
														placeholder="Pàgina web de l'activitat"
														className="form__control"
														value={state.formData.website}
														onChange={handleChange}
													/>
												</div>

												<div className="form__group w-3/12">
													<label htmlFor="price" className="form__label">
														Preu per persona (€)
													</label>
													<input
														type="number"
														name="price"
														placeholder="Preu de l'activitat"
														className="form__control"
														value={state.formData.price}
														onChange={handleChange}
													/>
												</div>

												<div className="form__group w-3/12">
													<label htmlFor="price" className="form__label">
														Durada (h)
													</label>
													<input
														type="number"
														name="duration"
														placeholder="Durada de l'activitat"
														className="form__control"
														value={state.formData.duration}
														onChange={handleChange}
													/>
												</div>
											</div>

											<div className="cover">
												<span className="form__label">Imatge de portada</span>
												<div className="flex items-center flex-col max-w-full mb-4">
													<div className="bg-white border border-primary-300 rounded-tl-md rounded-tr-md w-full">
														<div className="bg-white border-none h-auto p-4 justify-start">
															<label className="form__label m-0 bg-white rounded shadow py-3 px-5 inline-flex items-center cursor-pointer">
																<input
																	type="file"
																	name="cover"
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
																	<line x1="15" y1="6" x2="21" y2="6" />
																	<line x1="18" y1="3" x2="18" y2="9" />
																</svg>
																{state.formData.cover
																	? "Canviar imatge"
																	: "Seleccionar imatge"}
															</label>
														</div>
													</div>
													<div className="w-full border border-primary-300 rounded-br-md rounded-bl-md -mt-px p-4 flex">
														<div className="-m-2.5 flex flex-wrap items-center">
															{coverImage}
														</div>
													</div>
												</div>
											</div>

											<div className="images">
												<span className="form__label">
													Imatges d'aquesta història
												</span>
												<div className="flex items-center flex-col max-w-full mb-4">
													<div className="bg-white border border-primary-300 rounded-tl-md rounded-tr-md w-full">
														<div className="bg-white border-none h-auto p-4 justify-start">
															<label className="form__label m-0 bg-white rounded shadow py-3 px-5 inline-flex items-center cursor-pointer">
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
																	<line x1="15" y1="6" x2="21" y2="6" />
																	<line x1="18" y1="3" x2="18" y2="9" />
																</svg>
																Seleccionar imatges
																<input
																	type="file"
																	className="hidden"
																	onChange={saveFileToStatus}
																/>
															</label>
														</div>
													</div>
													<div className="w-full border border-primary-300 rounded-br-md rounded-bl-md -mt-px p-4 flex">
														<div className="-m-2.5 flex flex-wrap items-center">
															{imagesList}
														</div>
													</div>
												</div>
											</div>

											<div className="form__group">
												<label htmlFor="description" className="form__label">
													Descripció
												</label>
												<textarea
													name="description"
													rows={10}
													placeholder="Descripció de l'activitat"
													className="form__control"
													value={state.formData.description}
													onChange={handleChange}
												></textarea>
											</div>
										</form>
									</div>
								) : (
									<div className="form__wrapper">
										<form className="form" onSubmit={handleSubmit}>
											<div className="form__group">
												<label htmlFor="metaTitle" className="form__label">
													Meta títol{" "}
												</label>
												<input
													type="text"
													name="metaTitle"
													placeholder="Meta títol"
													className="form__control"
													value={state.formData.metaTitle}
													onChange={handleChange}
												/>
												<span className="form__text_info">
													Cada publicació hauria de tenir un meta títol únic,
													idealment de menys de 60 caràcters de llargada
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
													value={state.formData.metaDescription}
													onChange={handleChange}
												/>
												<span className="form__text_info">
													Cada publicació hauria de tenir una meta descripció
													única, idealment de menys de 160 caràcters de llargada
												</span>
											</div>

											<div className="form__group">
												<label htmlFor="slug" className="form__label">
													Slug{" "}
												</label>
												<input
													type="text"
													name="slug"
													placeholder="Slug de l'activitat"
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
			</div>
		</>
	);
};

export default ActivityEditionForm;

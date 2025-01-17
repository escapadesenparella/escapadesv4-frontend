import { useEffect, useState, useContext, useCallback } from "react";
import NavigationBar from "../components/global/NavigationBar";
import ContentService from "../services/contentService";
import ContentBox from "../components/dashboard/ContentBox";
import Head from "next/head";
import UserContext from "../contexts/UserContext";
import FetchingSpinner from "../components/global/FetchingSpinner";
import { useRouter } from "next/router";
import CategoryBox from "../components/dashboard/CategoryBox";
import CharacteristicBox from "../components/dashboard/CharacteristicBox";
import CreateCategoryModal from "../components/modals/CreateCategoryModal";
import CreateTripCategoryModal from "../components/modals/CreateTripCategoryModal";
import CreateRegionModal from "../components/modals/CreateRegionModal";
import TripCategoryBox from "../components/dashboard/TripCategoryBox";
import CreateCharacteristicModal from "../components/modals/CreateCharacteristicModal";
import RegionBox from "../components/dashboard/RegionBox";

const AdminPanel = () => {
	// Validate if user is allowed to access this view
	const { user } = useContext(UserContext);
	const [loadPage, setLoadPage] = useState(false);
	useEffect(() => {
		if (user && user.userType == "admin") {
			setLoadPage(true);
		}
	}, []);
	// End validation

	const router = useRouter();

	useEffect(() => {
		if (!user || user === "null" || user === undefined) {
			router.push("/login");
		}
	}, [user]);

	const service = new ContentService();

	const initialState = {
		activities: [],
		places: [],
		stories: [],
		lists: [],
		categories: [],
		characteristics: [],
		tripCategories: [],
		tripEntries: [],
		regions: [],
		isFetching: false,
		activeTab: "activities",
	};

	const [state, setState] = useState(initialState);
	const [toggleButton, setToggleButton] = useState(false);
	const [categoryModalVisibility, setCategoryModalVisibility] =
		useState(false);
	const [characteristicModalVisibility, setCharacteristicModalVisibility] =
		useState(false);
	const [tripCategoryModalVisibility, setTripCategoryModalVisibility] =
		useState(false);
	const [regionModalVisibility, setRegionModalVisibility] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setState({ ...state, isFetching: true });
			const activities = await service.activities();
			const places = await service.getAllPlaces();
			const stories = await service.getAllStories();
			const lists = await service.getAllLists();
			const categories = await service.getCategories();
			const characteristics = await service.getCharacteristics();
			const tripCategories = await service.getTripCategories();
			const tripEntries = await service.getAllTripEntries();
			const regions = await service.getRegions();

			setState({
				...state,
				activities: activities.allActivities,
				places: places.allPlaces,
				stories: stories.allStories,
				lists: lists,
				categories: categories,
				characteristics: characteristics,
				tripCategories: tripCategories,
				tripEntries: tripEntries.allTrips,
				regions: regions,
				isFetching: false,
			});
		};
		fetchData();
	}, []);

	const fetchData = useCallback(async () => {
		setState({ ...state, isFetching: true });
		const activities = await service.activities();
		const places = await service.getAllPlaces();
		const stories = await service.getAllStories();
		const lists = await service.getAllLists();
		const categories = await service.getCategories();
		const characteristics = await service.getCharacteristics();
		const tripCategories = await service.getTripCategories();
		const tripEntries = await service.getAllTripEntries();
		const regions = await service.getRegions();

		setState({
			...state,
			activities: activities.allActivities,
			places: places.allPlaces,
			stories: stories.allStories,
			lists: lists,
			categories: categories,
			characteristics: characteristics,
			tripCategories: tripCategories,
			tripEntries: tripEntries.allTrips,
			regions: regions,
			isFetching: false,
		});
	});

	const entitiesMenu = [
		{
			title: "Activitats",
			stateLabel: state.activities,
		},
		{
			title: "Allotjaments",
			stateLabel: state.places,
		},
		{
			title: "Històries",
			stateLabel: state.stories,
		},
		{
			title: "Llistes",
			stateLabel: state.lists,
		},
		{
			title: "Categories",
			stateLabel: state.categories,
		},
		{
			title: "Categories de viatge",
			stateLabel: state.tripCategories,
		},
		{
			title: "Entrades de viatge",
			stateLabel: state.tripEntries,
		},
		{
			title: "Regions",
			stateLabel: state.regions,
		},
	];

	let listResults;

	if (state.isFetching) {
		listResults = <FetchingSpinner />;
	} else {
		if (state.activeTab === "activities") {
			listResults = state.activities.map((el, idx) => (
				<ContentBox
					key={idx}
					type={el.type}
					id={el._id}
					image={el.images[0]}
					title={el.title}
					subtitle={el.subtitle}
					publicationDate={el.createdAt}
					slug={el.slug}
				/>
			));
		}
		if (state.activeTab === "places") {
			listResults = state.places.map((el, idx) => (
				<ContentBox
					key={idx}
					type={el.type}
					id={el._id}
					image={el.images[0]}
					title={el.title}
					subtitle={el.subtitle}
					publicationDate={el.createdAt}
					slug={el.slug}
				/>
			));
		}
		if (state.activeTab === "stories") {
			listResults = state.stories.map((el, idx) => (
				<ContentBox
					key={idx}
					type={el.type}
					id={el._id}
					image={el.images[0]}
					title={el.title}
					subtitle={el.subtitle}
					publicationDate={el.createdAt}
					slug={el.slug}
				/>
			));
		}
		if (state.activeTab === "lists") {
			listResults = state.lists.map((el, idx) => (
				<ContentBox
					key={idx}
					type={el.type}
					id={el._id}
					image={el.cover}
					title={el.title}
					subtitle={el.subtitle}
					publicationDate={el.createdAt}
					slug={el.slug}
				/>
			));
		}
		if (state.activeTab === "categories") {
			listResults = state.categories.map((el, idx) => (
				<CategoryBox
					key={idx}
					type={"category"}
					id={el._id}
					name={el.name}
					pluralName={el.pluralName}
					isPlace={el.isPlace}
					illustration={el.illustration}
					image={el.image}
					imageCaption={el.imageCaption}
					title={el.title}
					subtitle={el.subtitle}
					slug={el.slug}
					seoTextHeader={el.seoTextHeader}
					seoText={el.seoText}
					icon={el.icon}
					isSponsored={el.isSponsored}
					sponsorURL={el.sponsorURL}
					sponsorLogo={el.sponsorLogo}
					sponsorClaim={el.sponsorClaim}
					fetchData={fetchData}
				/>
			));
		}
		if (state.activeTab === "characteristics") {
			listResults = state.characteristics.map((el, idx) => (
				<CharacteristicBox
					key={idx}
					type={"characteristic"}
					id={el._id}
					name={el.name}
					pluralName={el.pluralName}
					isPlace={el.isPlace}
					illustration={el.illustration}
					image={el.image}
					imageCaption={el.imageCaption}
					title={el.title}
					subtitle={el.subtitle}
					slug={el.slug}
					seoTextHeader={el.seoTextHeader}
					seoText={el.seoText}
					icon={el.icon}
					isSponsored={el.isSponsored}
					sponsorURL={el.sponsorURL}
					sponsorLogo={el.sponsorLogo}
					sponsorClaim={el.sponsorClaim}
					fetchData={fetchData}
				/>
			));
		}
		if (state.activeTab === "tripCategories") {
			listResults = state.tripCategories.map((el, idx) => (
				<TripCategoryBox
					key={idx}
					type={"tripCategory"}
					id={el._id}
					slug={el.slug}
					title={el.title}
					richTitle={el.richTitle}
					country={el.country}
					mapLocation={el.mapLocation}
					image={el.image}
					carouselImages={el.carouselImages}
					reviewText={el.reviewText}
					mostLikedText={el.mostLikedText}
					pointsOfInterestText={el.pointsOfInterestText}
					mustSeeText={el.mustSeeText}
					seoTextHeader={el.seoTextHeader}
					seoText={el.seoText}
					isSponsored={el.isSponsored}
					sponsorURL={el.sponsorURL}
					sponsorLogo={el.sponsorLogo}
					sponsorClaim={el.sponsorClaim}
					fetchData={fetchData}
				/>
			));
		}
		if (state.activeTab === "tripEntries") {
			listResults = state.tripEntries.map((el, idx) => {
				const category = state.tripCategories.find(
					(tripCategory) => tripCategory._id === el.trip._id
				);
				return (
					<ContentBox
						key={idx}
						trip={category.slug}
						type={el.type}
						id={el._id}
						image={el.cover}
						title={el.title}
						subtitle={el.subtitle}
						publicationDate={el.createdAt}
						slug={el.slug}
					/>
				);
			});
		}
		if (state.activeTab === "regions") {
			listResults = state.regions.map((el, idx) => {
				return (
					<RegionBox
						key={idx}
						type={"category"}
						id={el._id}
						name={el.name}
						pluralName={el.pluralName}
						illustration={el.illustration}
						image={el.image}
						imageCaption={el.imageCaption}
						title={el.title}
						richTitle={el.richTitle}
						subtitle={el.subtitle}
						slug={el.slug}
						seoTextHeader={el.seoTextHeader}
						seoText={el.seoText}
						icon={el.icon}
						isSponsored={el.isSponsored}
						sponsorURL={el.sponsorURL}
						sponsorLogo={el.sponsorLogo}
						sponsorClaim={el.sponsorClaim}
						fetchData={fetchData}
					/>
				);
			});
		}
	}

	const isActive =
		"bg-primary-500 border-primary-500 text-white hover:bg-primary-700";

	if (!loadPage) {
		return <FetchingSpinner />;
	}

	return (
		<>
			<Head>
				<title>Panell d'administració - Escapadesenparella.cat</title>
				<link rel="icon" href="/favicon.ico" />
				<link meta="robots" rel="noindex,nofollow" />
			</Head>
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
				}
				user={user}
			/>
			<main className="bg-primary-50 p-6 relative">
				<div className="bg-white rounded-md shadow p-5">
					<h1 className="text-2xl">Panell d'administració</h1>

					{/* Grid de mètriques */}
					<div className="mt-4 flex items-center -mx-2">
						{entitiesMenu.map((item) => {
							return (
								<div className="px-2 flex-1 min-w-[1/6]">
									<div className="p-6 border border-primary-100 rounded-md text-center flex flex-col justify-center">
										<div className="text-2xl">
											{state.isFetching ? (
												<div className="flex items-center justify-center mb-1">
													<svg
														role="status"
														className="w-6 h-6 text-blue-600 animate-spin dark:text-gray-600 fill-white"
														viewBox="0 0 100 101"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
															fill="currentColor"
														/>
														<path
															d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
															fill="currentFill"
														/>
													</svg>
												</div>
											) : (
												item.stateLabel.length
											)}
										</div>
										<span className="uppercase text-xs inline-block mt-1">
											{item.title}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex flex-wrap items-stretch mt-6 -mx-3">
					<div className="w-2/12 px-3">
						<div className="bg-white rounded-md shadow p-5">
							<h2 className="uppercase text-sm font-normal tracking-wider">
								Menú
							</h2>
							<ul className="list-none mt-3 mx-0 mb-0 p-0">
								<li>
									<button
										className={`py-2.5 px-4 border  transition-all duration-300 ease-in-out mb-2 rounded-md cursor-pointer w-full text-left text-sm ${
											state.activeTab == "activities"
												? isActive
												: "border-primary-100 bg-white hover:bg-primary-50"
										}`}
										onClick={() =>
											setState({
												...state,
												activeTab: "activities",
											})
										}
									>
										Activitats
									</button>
								</li>
								<li>
									<button
										className={`py-2.5 px-4 border transition-all duration-300 ease-in-out mb-2 rounded-md cursor-pointer w-full text-left text-sm ${
											state.activeTab == "places"
												? isActive
												: "border-primary-100 bg-white hover:bg-primary-50"
										}`}
										onClick={() =>
											setState({
												...state,
												activeTab: "places",
											})
										}
									>
										Allotjaments
									</button>
								</li>
								<li>
									<button
										className={`py-2.5 px-4 border transition-all duration-300 ease-in-out mb-2 rounded-md cursor-pointer w-full text-left text-sm ${
											state.activeTab == "stories"
												? isActive
												: "border-primary-100 bg-white hover:bg-primary-50"
										}`}
										onClick={() =>
											setState({
												...state,
												activeTab: "stories",
											})
										}
									>
										Històries
									</button>
								</li>
								<li>
									<button
										className={`py-2.5 px-4 border transition-all duration-300 ease-in-out mb-2 rounded-md cursor-pointer w-full text-left text-sm ${
											state.activeTab == "lists"
												? isActive
												: "border-primary-100 bg-white hover:bg-primary-50"
										}`}
										onClick={() =>
											setState({
												...state,
												activeTab: "lists",
											})
										}
									>
										Llistes
									</button>
								</li>
								<li>
									<button
										className={`py-2.5 px-4 border transition-all duration-300 ease-in-out mb-2 rounded-md cursor-pointer w-full text-left text-sm ${
											state.activeTab == "characteristics"
												? isActive
												: "border-primary-100 bg-white hover:bg-primary-50"
										}`}
										onClick={() =>
											setState({
												...state,
												activeTab: "characteristics",
											})
										}
									>
										Característiques
									</button>
								</li>
								<li>
									<button
										className={`py-2.5 px-4 border transition-all duration-300 ease-in-out mb-2 rounded-md cursor-pointer w-full text-left text-sm ${
											state.activeTab == "categories"
												? isActive
												: "border-primary-100 bg-white hover:bg-primary-50"
										}`}
										onClick={() =>
											setState({
												...state,
												activeTab: "categories",
											})
										}
									>
										Categories
									</button>
								</li>
								<li>
									<button
										className={`py-2.5 px-4 border transition-all duration-300 ease-in-out mb-2 rounded-md cursor-pointer w-full text-left text-sm ${
											state.activeTab == "tripCategories"
												? isActive
												: "border-primary-100 bg-white hover:bg-primary-50"
										}`}
										onClick={() =>
											setState({
												...state,
												activeTab: "tripCategories",
											})
										}
									>
										Categories de viatge
									</button>
								</li>
								<li>
									<button
										className={`py-2.5 px-4 border transition-all duration-300 ease-in-out mb-2 rounded-md cursor-pointer w-full text-left text-sm ${
											state.activeTab == "tripEntries"
												? isActive
												: "border-primary-100 bg-white hover:bg-primary-50"
										}`}
										onClick={() =>
											setState({
												...state,
												activeTab: "tripEntries",
											})
										}
									>
										Entrades de viatges
									</button>
								</li>
								<li>
									<button
										className={`py-2.5 px-4 border transition-all duration-300 ease-in-out mb-2 rounded-md cursor-pointer w-full text-left text-sm ${
											state.activeTab == "regions"
												? isActive
												: "border-primary-100 bg-white hover:bg-primary-50"
										}`}
										onClick={() =>
											setState({
												...state,
												activeTab: "regions",
											})
										}
									>
										Regions
									</button>
								</li>
							</ul>
						</div>
					</div>
					<div className="w-10/12 px-3">
						<div className="bg-white rounded-md shadow p-5">
							<h2 className="uppercase text-sm font-normal tracking-wider">
								Llista de resultats
							</h2>
							<div className="w-full mt-3 flex flex-col items-center justify-center">
								{listResults}
							</div>
						</div>
					</div>
				</div>
				<div
					id="floatingPublishPanel"
					className={`fixed bottom-5 right-4 flex flex-col items-end ${
						toggleButton ? "show" : ""
					}`}
				>
					<div
						id="floatingPublishButton"
						className={`flex flex-col items-end`}
					>
						<a
							href="/nova-activitat"
							title="Publicar nova activitat"
							target="_blank"
							className="bg-white hover:bg-primary-100 border-primary-200 rounded-md py-2.5 px-4 mb-1.5 shadow-lg text-sm"
						>
							Publicar nova activitat
						</a>
						<a
							href="/nou-allotjament"
							title="Publicar nou allotjament"
							target="_blank"
							className="bg-white hover:bg-primary-100 border-primary-200 rounded-md py-2.5 px-4 mb-1.5 shadow-lg text-sm"
						>
							Publicar nou allotjament
						</a>
						<a
							href="/nova-historia"
							title="Publicar nova història"
							target="_blank"
							className="bg-white hover:bg-primary-100 border-primary-200 rounded-md py-2.5 px-4 mb-1.5 shadow-lg text-sm"
						>
							Publicar nova història
						</a>
						<a
							href="/nova-llista"
							title="Publicar nova llista"
							target="_blank"
							className="bg-white hover:bg-primary-100 border-primary-200 rounded-md py-2.5 px-4 mb-1.5 shadow-lg text-sm"
						>
							Publicar nova llista
						</a>
						<button
							className="bg-white hover:bg-primary-100 border-primary-200 rounded-md py-2.5 px-4 mb-1.5 shadow-lg text-sm"
							onClick={() =>
								setCategoryModalVisibility(
									!categoryModalVisibility
								)
							}
						>
							Publicar nova categoria
						</button>
						<button
							className="bg-white hover:bg-primary-100 border-primary-200 rounded-md py-2.5 px-4 mb-1.5 shadow-lg text-sm"
							onClick={() =>
								setCharacteristicModalVisibility(
									!characteristicModalVisibility
								)
							}
						>
							Publicar nova característica
						</button>
						<button
							className="bg-white hover:bg-primary-100 border-primary-200 rounded-md py-2.5 px-4 mb-1.5 shadow-lg text-sm"
							onClick={() =>
								setRegionModalVisibility(!regionModalVisibility)
							}
						>
							Publicar nova regió
						</button>
						<button
							className="bg-white hover:bg-primary-100 border-primary-200 rounded-md py-2.5 px-4 mb-1.5 shadow-lg text-sm"
							onClick={() =>
								setTripCategoryModalVisibility(
									!tripCategoryModalVisibility
								)
							}
						>
							Publicar nova categoria de viatge
						</button>
						<a
							href="/nou-viatge"
							title="Publicar nova entrada de viatge"
							target="_blank"
							className="bg-white hover:bg-primary-100 border-primary-200 rounded-md py-2.5 px-4 mb-1.5 shadow-lg text-sm"
						>
							Publicar nova entrada de viatge
						</a>
					</div>
					<button
						className="button button__primary button__med shadow-xl"
						onClick={() => setToggleButton(!toggleButton)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`mr-2 icon`}
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
							<line x1={12} y1={5} x2={12} y2={19}></line>
							<line x1={5} y1={12} x2={19} y2={12}></line>
						</svg>
						Nou post
					</button>
				</div>
			</main>
			{categoryModalVisibility == true ? (
				<CreateCategoryModal
					visibility={categoryModalVisibility}
					hideModal={setCategoryModalVisibility}
					fetchData={fetchData}
				/>
			) : null}
			{characteristicModalVisibility == true ? (
				<CreateCharacteristicModal
					visibility={characteristicModalVisibility}
					hideModal={setCharacteristicModalVisibility}
					fetchData={fetchData}
				/>
			) : null}
			{tripCategoryModalVisibility == true ? (
				<CreateTripCategoryModal
					visibility={tripCategoryModalVisibility}
					hideModal={setTripCategoryModalVisibility}
					fetchData={fetchData}
				/>
			) : null}
			{regionModalVisibility == true ? (
				<CreateRegionModal
					visibility={regionModalVisibility}
					hideModal={setRegionModalVisibility}
					fetchData={fetchData}
				/>
			) : null}
		</>
	);
};

export default AdminPanel;

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/global/Footer";
import NavigationBar from "../../components/global/NavigationBar";
import GlobalMetas from "../../components/head/GlobalMetas";
import PublicSquareBox from "../../components/listings/PublicSquareBox";
import MapModal from "../../components/modals/MapModal";
import BreadcrumbRichSnippet from "../../components/richsnippets/BreadcrumbRichSnippet";
import UserContext from "../../contexts/UserContext";
import ContentService from "../../services/contentService";
import ListingHeader from "../../components/headers/ListingHeader";

const RegioPage = ({
	regioDetails,
	allResults,
	paginatedResults,
	totalItems,
	numPages,
}) => {
	const { user } = useContext(UserContext);
	const router = useRouter();
	const service = new ContentService();

	useEffect(() => {
		if (
			router.pathname.includes("editar") ||
			router.pathname.includes("nova-activitat") ||
			router.pathname.includes("nou-allotjament") ||
			router.pathname.includes("nova-historia")
		) {
			document.querySelector("body").classList.add("composer");
		} else {
			document.querySelector("body").classList.remove("composer");
		}
	}, [router]);

	const initialState = {
		regioDetails: {},
		results: [],
		allResults: [],
		hasResults: false,
		isFetching: false,
		numResults: 0,
		numPages: 0,
		currentPage: 1,
	};

	const [state, setState] = useState(initialState);
	const [stateModalMap, setStateModalMap] = useState(false);

	useEffect(() => {
		if (regioDetails && paginatedResults) {
			setState({
				...state,
				regioDetails: regioDetails,
				results: paginatedResults,
				allResults: allResults,
				hasResults: paginatedResults.length > 0 ? true : false,
				numResults: totalItems,
				numPages: numPages,
			});
		}
	}, []);

	let resultsList;
	if (state.hasResults) {
		resultsList = state.results.map((el) => {
			let location;
			if (el.type === "activity") {
				location = (
					<span className="listing-location">{`${el.activity_locality === undefined
						? el.activity_country
						: el.activity_locality
						}`}</span>
				);
			}
			if (el.type === "place") {
				location = (
					<span className="listing-location">{`${el.place_locality === undefined
						? el.place_country
						: el.place_locality
						}`}</span>
				);
			}
			return (
				<PublicSquareBox
					key={el._id}
					type={el.type}
					slug={el.slug}
					id={el._id}
					cover={el.cover}
					title={el.title}
					subtitle={el.subtitle}
					rating={el.activity_rating || el.place_rating}
					placeType={el.placeType}
					categoria={el.categories}
					duration={el.duration}
					website={el.website}
					phone={el.phone}
					location={location}
					isVerified={el.isVerified}
				/>
			);
		});
	}

	const sponsorBlock = state.regioDetails.isSponsored ? (
		<div className="sponsor-block">
			<Link href={`${state.regioDetails.sponsorURL}`} target="_blank">
				<a>
					<div className="sponsor-block-top">
						<div className="sponsor-block-left">
							<span>Patrocinat per</span>
						</div>
						<div className="sponsor-block-right">
							<div className="sponsor-logo">
								<img src={state.regioDetails.sponsorLogo} />
							</div>
							<div className="sponsor-block-claim">
								<span>{state.regioDetails.sponsorClaim}</span>
							</div>
						</div>
					</div>
				</a>
			</Link>
		</div>
	) : null;

	const center = {
		lat: 41.3948976,
		lng: 2.0787283,
	};

	const getMapOptions = (maps) => {
		return {
			disableDefaultUI: true,
			styles: [
				{
					featureType: "poi",
					elementType: "labels",
					styles: [{ visibility: "on" }],
				},
			],
		};
	};

	let renderMarker = (map, maps) => {
		state.allResults.forEach((result) => {
			let position, path;
			if (result.type === "activity") {
				position = {
					lat: parseFloat(result.activity_lat),
					lng: parseFloat(result.activity_lng),
				};
				path = "/activitats";
			}
			if (result.type === "place") {
				position = {
					lat: parseFloat(result.place_lat),
					lng: parseFloat(result.place_lng),
				};
				path = "/allotjaments";
			}
			const contentString = `<a href="${path}/${result.slug}" title="${result.title}" class="gmaps-infobox" target="_blank">
        <div class="gmaps-infobox__picture">
          <picture>
            <img src="${result.images[0]}" alt="${result.title}" class="object-cover w-full h-full" width="80" height="80">
          </picture>
        </div>
        <div class="gmaps-infobox__text">
          <span class="gmaps-infobox__title">${result.title}</span>
          <span class="gmaps-infobox__intro">${result.subtitle}</span>
        </div>
        </a>`;
			const infowindow = new maps.InfoWindow({
				content: contentString,
			});
			const marker = new maps.Marker({
				position: position,
				map,
				icon: "../../map-marker.svg",
			});
			marker.addListener("click", () => infowindow.open(map, marker));
		});
	};

	const loadMoreResults = async (categoryName, page) => {
		setState({ ...state, isFetching: true });
		const { paginatedResults } = await service.paginateCategory(
			categoryName,
			page
		);
		setState({
			...state,
			results: [...state.results, ...paginatedResults],
			isFetching: false,
			currentPage: ++state.currentPage,
		});
	};

	return (
		<>
			{/* Browser metas  */}
			<GlobalMetas
				title={state.regioDetails.title}
				description={state.regioDetails.subtitle}
				url={`https://escapadesenparella.cat/${state.regioDetails.slug}`}
				image={state.regioDetails.image}
				canonical={`https://escapadesenparella.cat/${state.regioDetails.slug}`}
			/>
			{/* Rich snippets */}
			<BreadcrumbRichSnippet
				page1Title="Inici"
				page1Url="https://escapadesenparella.cat"
				page2Title={state.regioDetails.title}
				page2Url={`https://escapadesenparella.cat/${state.regioDetails.slug}`}
			/>
			<div id="contentList" className="category relative">
				<NavigationBar
					logo_url={
						"https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
					}
					user={user}
				/>
				<main>
					{/* Main column - Listings */}
					<section className="lg:mt-6">
						<div className="px-5">
							<ul className="breadcrumb max-w-5xl">
								<li className="breadcrumb__item">
									<a
										href="/"
										title="Inici"
										className="breadcrumb__link"
									>
										Inici
									</a>
								</li>
								<li className="breadcrumb__item">
									<a
										href="/"
										title="Escapades per Catalunya"
										className="breadcrumb__link"
									>
										Escapades per Catalunya
									</a>
								</li>
								<li className="breadcrumb__item">
									<span className="breadcrumb__link active">
										{state.regioDetails.title}
									</span>
								</li>
							</ul>
							<ListingHeader
								title={`<span class="capitalize">Escapades
								<span class="text-secondary-500">${state.regioDetails.pluralName}</span>`}
								subtitle={`${state.regioDetails.title}.
							Descobreix ${state.allResults.length} escapades ${state.regioDetails.name} per gaudir com mai en parella.`}
								sponsorBlock={sponsorBlock}

							/>
						</div>
					</section>

					{/* Section listings */}
					<section className="pt-8 md:pt-12">
						<div className="px-5">
							<div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-5">
								{state.results.length > 0 ? (
									<>
										{state.results.map((el, idx) => (
											<PublicSquareBox
												key={el._id}
												type={el.type}
												slug={el.slug}
												id={el._id}
												cover={el.cover}
												title={el.title}
												subtitle={el.subtitle}
												rating={
													el.activity_rating ||
													el.place_rating
												}
												placeType={el.placeType}
												categoria={el.categories}
												duration={el.duration}
												website={el.website}
												phone={el.phone}
												isVerified={el.isVerified}
												location={
													el.activity_locality ||
													el.place_locality
												}
												index={idx}
											/>
										))}

										{state.currentPage !== state.numPages ? (
											<div className="col-span-1 md:col-span-3 2xl:col-span-4 w-full mt-10 flex justify-center">
												{!state.isFetching ? (
													<button
														className="button button__primary button__lg"
														onClick={() =>
															loadMoreResults(
																categoryDetails.name,
																state.currentPage
															)
														}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="icon icon-tabler icon-tabler-plus mr-2"
															width={20}
															height={20}
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
															<line
																x1={12}
																y1={5}
																x2={12}
																y2={19}
															></line>
															<line
																x1={5}
																y1={12}
																x2={19}
																y2={12}
															></line>
														</svg>
														Veure'n més
													</button>
												) : (
													<button className="button button__primary button__lg">
														<svg
															role="status"
															className="w-5 h-5 mr-2.5 text-primary-400 animate-spin dark:text-gray-600 fill-white"
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
														Carregant
													</button>
												)}
											</div>
										) : (
											""
										)}
									</>
								) : (
									<div className="col-span-1 md:col-span-3 2xl:col-span-4">
										<p className="text-center mx-auto text-lg">
											No s'han trobat escapades per aquesta
											categoria.
											<br /> Torna-ho a provar més endavant.
										</p>
									</div>
								)}
							</div>
						</div>
					</section>

					{/* Section text footer */}
					<section>
						<div className="px-5">
							<div className="border-t border-primary-100 py-8 mt-8 md:py-12 md:mt-12 lg:py-20 lg:mt-20">
								<div
									className="w-full max-w-prose mx-auto text-block"
									dangerouslySetInnerHTML={{
										__html: state.regioDetails.seoText,
									}}
								></div>
							</div>
						</div>
					</section>
				</main>
			</div>
			<Footer />
			{stateModalMap == true ? (
				<MapModal
					visibility={stateModalMap}
					hideModal={setStateModalMap}
					center={center}
					getMapOptions={getMapOptions}
					renderMarker={renderMarker}
				/>
			) : null}
		</>
	);
};

export async function getStaticPaths() {
	const service = new ContentService();
	const regions = await service.getRegions();
	const paths = regions.map((regio) => ({
		params: { regio: regio.slug },
	}));
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const service = new ContentService();
	const regioDetails = await service.getRegionDetails(params.regio);

	if (!regioDetails) {
		return {
			notFound: true,
		};
	}

	const { allResults, paginatedResults, totalItems, numPages } =
		await service.getRegionResults(regioDetails.name);

	return {
		props: {
			regioDetails,
			allResults,
			paginatedResults,
			totalItems,
			numPages,
		},
	};
}

export default RegioPage;

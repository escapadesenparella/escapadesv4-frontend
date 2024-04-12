import Link from "next/link";
import { useEffect, useState } from "react";
import PublicSquareBox from "../../components/listings/PublicSquareBox";
import StoryListing from "../listings/StoryListing";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';

const HomePageResults = ({
	featuredRegions,
	featuredActivities,
	mostRecentPlaces,
	mostRecentStories,
}) => {
	const initialState = {
		mostRecentGetaways: [],
		featuredActivities: [],
		featuredRegions: [],
		mostRecentStories: [],
		emptyBlocksPerRow: [0, 1, 2, 3],
	};
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (
			mostRecentPlaces.length > 0 ||
			featuredActivities.length > 0 ||
			mostRecentPlaces.length > 0 ||
			mostRecentStories.length > 0 ||
			featuredRomanticGetaways.length > 0 ||
			featuredAdventureGetaways.length > 0 ||
			featuredGastronomicGetaways.length > 0
		) {
			setState({
				...state,
				featuredActivities: featuredActivities,
				mostRecentGetaways: mostRecentPlaces,
				featuredRegions: featuredRegions,
				mostRecentGetaways: mostRecentPlaces,
				featuredActivities: featuredActivities,
				mostRecentStories: mostRecentStories,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const date = new Date();
	const foundationYears = date.getFullYear() - 2015;

	return (
		<div id="homePageResults" className="relative z-30">

			{/* Most recent places */}
			<section className="pt-8 md:pt-12 lg:pt-20">
				<div className="px-5">
					<h2 className="my-0">
						Nous allotjaments
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-5 mt-4">
						{state.mostRecentGetaways.length > 0
							? state.mostRecentGetaways.map((el, idx) => {
								let location;
								if (el.type === "activity") {
									location = (
										<span className="listing-location">{`${el.activity_locality ===
											undefined
											? el.activity_state
											: el.activity_locality
											}`}</span>
									);
								}
								if (el.type === "place") {
									location = (
										<span className="listing-location">{`${el.place_locality ===
											undefined
											? ""
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
										rating={
											el.activity_rating ||
											el.place_rating
										}
										placeType={el.placeType}
										categoria={el.categories}
										duration={el.duration}
										location={location}
										isVerified={el.isVerified}
										website={el.website}
										phone={el.phone}
									/>
								);
							})
							: state.emptyBlocksPerRow.map((el, idx) => (
								<div
									key={idx}
									className="w-full md:w-1/2 lg:w-1/4 px-2"
									role="status"
								>
									<div className="flex justify-center items-center max-w-sm h-56 bg-gray-300 rounded-md animate-pulse dark:bg-gray-700">
										<div className="flex justify-center items-center w-full h-48 bg-gray-300 rounded-md sm:w-96 dark:bg-gray-700">
											<svg
												className="w-12 h-12 text-gray-200"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
												fill="currentColor"
												viewBox="0 0 640 512"
											>
												<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
											</svg>
										</div>
										<span className="sr-only">
											Loading...
										</span>
									</div>
								</div>
							))}
					</div>
					<a
						href="/allotjaments"
						title="Veure més allotjaments amb encant a Catalunya"
						className="button button__ghost button__med mt-5"
					>

						Veure'n més
					</a>
				</div>
			</section>

			{/* Featured activities */}
			<section className="pt-8 md:pt-12 lg:pt-20">
				<div className="px-5">
					<h2 className="my-0">
						Noves experiències
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-5 mt-4">
						{state.featuredActivities.length > 0
							? state.featuredActivities.map((el, idx) => {
								let location;
								if (el.type === "activity") {
									location = (
										<span className="listing-location">{`${el.activity_locality ===
											undefined
											? el.activity_state
											: el.activity_locality
											}`}</span>
									);
								}
								if (el.type === "place") {
									location = (
										<span className="listing-location">{`${el.place_locality ===
											undefined
											? ""
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
										rating={
											el.activity_rating ||
											el.place_rating
										}
										placeType={el.placeType}
										categoria={el.categories}
										duration={el.duration}
										location={location}
										isVerified={el.isVerified}
										website={el.website}
										phone={el.phone}
									/>
								);
							})
							: state.emptyBlocksPerRow.map((el, idx) => (
								<div
									key={idx}
									className="w-full md:w-1/2 lg:w-1/4 px-2"
									role="status"
								>
									<div className="flex justify-center items-center max-w-sm h-56 bg-gray-300 rounded-md animate-pulse dark:bg-gray-700">
										<div className="flex justify-center items-center w-full h-48 bg-gray-300 rounded-md sm:w-96 dark:bg-gray-700">
											<svg
												className="w-12 h-12 text-gray-200"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
												fill="currentColor"
												viewBox="0 0 640 512"
											>
												<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
											</svg>
										</div>
										<span className="sr-only">
											Loading...
										</span>
									</div>
								</div>
							))}
					</div>
					<a
						href="/activitats"
						title="Veure més experiències originals a Catalunya"
						className="button button__ghost button__med mt-5"
					>

						Veure'n més
					</a>
				</div>
			</section>

			{/* Featured regions */}
			<section className="py-8 md:py-12 lg:py-20 bg-tertiary-50 mt-8 md:mt-12 lg:mt-20">
				<div className="px-5">
					<h2 className="my-0">
						Escapades per Catalunya
					</h2>
					<div className="flex flex-wrap mt-4 rounded-2xl overflow-hidden">
						<Splide options={{
							gap: "20px",
							perMove: 1,
							perPage: 4,
							arrows: true,
							breakpoints: {
								1024: {
									perPage: 3,
								},
								768: {
									perPage: 2
								},
								640: {
									perPage: 1
								}
							}
						}} hasTrack={false} aria-label="Zones per descobrir">
							<SplideTrack>
								{state.featuredRegions
									? state.featuredRegions.map(
										(el, idx) => {
											return (
												<SplideSlide key={idx}>
													<article >
														<Link
															href={
																"escapades-catalunya/" +
																el.slug
															}
														>
															<a
																title={
																	el.title
																}
																className="flex flex-wrap items-center rounded-xl overflow-hidden"
															>
																<picture className="block w-full h-full overflow-hidden">
																	<img
																		src={
																			el.image
																		}
																		alt={
																			el.title
																		}
																		className="w-full h-full object-cover"
																		width={
																			48
																		}
																		height={
																			48
																		}
																		loading="lazy"
																	/>
																</picture>
															</a>
														</Link>
													</article>
												</SplideSlide>
											);
										}
									)
									: null}
							</SplideTrack>
							<div className="splide__arrows">
								<button className="splide__arrow splide__arrow--prev w-12 h-12 bg-white rounded-full shadow flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-7 md:left-9 lg:left-16 2xl:left-20">
									<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M15 6l-6 6l6 6" />
									</svg>
								</button>
								<button className="splide__arrow splide__arrow--next w-12 h-12 bg-white rounded-full shadow flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-7 md:right-9 lg:right-16 2xl:right-20">
									<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M9 6l6 6l-6 6" />
									</svg>
								</button>
							</div>
						</Splide>
					</div>
				</div>
			</section>

			{/* About us section */}
			<section className="pt-8 md:pt-12 lg:pt-20">
				<div className="px-5">
					<div className="flex flex-wrap items-stretch overflow-hidden">
						<div className="relative h-full w-full md:w-1/2 inset-0 order-2">
							<picture className="block aspect-[4/3] lg:col-span-7">
								<source
									srcSet="../../home-about-s-m.webp"
									media="(max-width: 768px)"
									type="image/webp"
								/>
								<source
									srcSet="../../home-about-s-m.jpg"
									media="(max-width: 768px)"
								/>
								<source
									srcSet="../../home-about-s.webp"
									media="(min-width: 768px)"
									type="image/webp"
								/>
								<source
									srcSet="../../home-about-s.webp"
									media="(max-width: 768px)"
								/>
								<img
									src="../../home-about-s.jpg"
									alt="Escapades en parella, i molt més"
									width="400"
									height="300"
									className="w-full h-full object-cover rounded-xl"
									loading="lazy"
								/>
							</picture>
						</div>
						<div className="w-full lg:w-1/2 relative z-10 order-1">
							<div className="relative h-full md:px-16 2xl:px-20 overflow-hidden flex items-center justify-center lg:justify-start">
								<div className="relative z-10 md:min-h-[150px] lg:min-h-[300px] flex items-center justify-center rounded-2xl bg-white md:p-10 mt-6 md:mt-0">
									<div className="max-w-[33rem]">
										<h2 className="mb-4">
											{foundationYears} anys descobrint escapades en parella i racons amb encant a Catalunya
										</h2>
										<p className="text-block font-light leading-normal">
											Fa {foundationYears} anys vam començar a
											compartir les escapades en parella que
											fèiem arreu de Catalunya, amb l'objectiu
											de fer-vos gaudir de <strong>caps de setmana originals</strong>, de sortir a{" "}
											<strong>descobrir Catalunya</strong>, de compartir <strong>ofertes de cap de setmana a Catalunya</strong>, i sobretot
											donar a conèixer llocs únics i <strong>experiències per gaudir
												en parella</strong>, perquè crèiem, i seguim
											creient, que hi ha vida més enllà d'anar
											al cinema o veure Netflix al sofà.
										</p>
										<p className="text-block font-light leading-normal mb-0">
											A dia d'avui estem encantats de poder
											seguir compartint amb tots vosaltres les{" "}
											<strong>
												millors escapades en parella a
												Catalunya
											</strong>.
											Perquè per nosaltres,
											Escapadesenparella.cat és molt més que
											escapades en parella; esperem
											transmetre't aquest sentiment!
										</p>
										<a
											href="/contacte"
											title="Contacta'ns"
											className="button button__primary button__med mt-8"
										>
											Contacta'ns
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
					<div className="lg:col-span-5 self-center">
						<div className="max-w-[31rem] mx-auto lg:ml-0">

						</div>
					</div>

				</div>
			</section >

			{/* Most recent stories */}
			< section className="py-8 md:py-12 lg:py-20" >
				<div className="px-5">
					<h2 className="my-0">
						Noves "Històries en parella"
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
						{state.mostRecentStories.length > 0
							? state.mostRecentStories.map((story, idx) => {
								return (
									<article key={idx}>
										<StoryListing
											story={story}
											index={idx}
										/>
									</article>
								);
							})
							: ""}
					</div>
					<a
						href="/histories"
						title="Veure més històries"
						className="button button__ghost button__med mt-8"
					>
						Veure'n més
					</a>
				</div>
			</section >
		</div >
	);
};

export default HomePageResults;

import { useEffect, useState } from "react";
import ContentService from "../services/contentService";
import NavigationBar from "../components/global/NavigationBar";
import Footer from "../components/global/Footer";
import GlobalMetas from "../components/head/GlobalMetas";
import BreadcrumbRichSnippet from "../components/richsnippets/BreadcrumbRichSnippet";
import StoriesHeader from "../components/headers/StoriesHeader";
import StoryListing from "../components/listings/StoryListing";
import AdBanner from "../components/ads/AdBanner";

const StoriesList = ({
	featuredStories,
	stories,
	totalItems,
	numPages,
}) => {
	const initialResults = stories;

	const initialState = {
		featuredStories: [],
		results: [],
		allResults: [],
		hasResults: false,
		isFetching: false,
		numResults: 0,
		numPages: 0,
		currentPage: 1,
	};

	const [state, setState] = useState(initialState);
	const service = new ContentService();

	useEffect(() => {
		if (initialResults) {
			setState({
				...state,
				featuredStories: featuredStories,
				hasResults: initialResults.length > 0 ? true : false,
				numResults: totalItems,
				numPages: numPages,
			});
		}
	}, []);

	const loadMoreResults = async (page) => {
		setState({ ...state, isFetching: true });
		const { stories } = await service.paginateStories(page);
		setState({
			...state,
			results: [...state.results, ...stories],
			isFetching: false,
			currentPage: ++state.currentPage,
		});
	};

	return (
		<>
			{/* Browser metas  */}
			<GlobalMetas
				title="Històries en parella"
				description="Històries en parella per a inspirar, descobrir nous llocs i, en definitiva, fer-vos venir ganes d'una escapada en parella per recordar."
				url="https://escapadesenparella.cat/histories"
				image="https://escapadesenparella.cat/img/containers/main/img/og-histories.png/69081998ba0dfcb1465f7f878cbc7912.png"
				canonical="https://escapadesenparella.cat/histories"
			/>
			{/* Rich snippets */}
			<BreadcrumbRichSnippet
				page1Title="Inici"
				page1Url="https://escapadesenparella.cat"
				page2Title="Històries en parella"
				page2Url={`https://escapadesenparella.cat/histories`}
			/>
			<div className="stories">
				<NavigationBar />
				<StoriesHeader />
				<main>

					<div className="px-5">
						<div className="pt-4 pb-8 border-y border-primary-100 mt-8 w-full">
							<span className="inline-block text-xs">Anunci</span>
							<div className="flex justify-center">
								<AdBanner data-ad-slot="7418001579"
									data-ad-format="auto"
									data-full-width-responsive="true" />
							</div>
						</div>
					</div>

					<section className="py-8 md:py-12 lg:py-20">
						<div className="px-5">
							{initialResults.length > 0 ? (
								<>
									<div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-5">
										{initialResults.map((el, idx) => (
											<article
												key={idx}
											>
												<StoryListing
													story={el}
													index={idx}
												/>
											</article>
										))}
										{state.results.map((el, idx) => (
											<article
												key={idx}
											>
												<StoryListing
													story={el}
													index={idx}
												/>
											</article>
										))}
									</div>
									{state.currentPage !== state.numPages ? (
										<div className="col-span-1 md:col-span-3 2xl:col-span-4 w-full mt-10 flex justify-center">
											{!state.isFetching ? (
												<button
													className="button button__primary button__lg"
													onClick={() =>
														loadMoreResults(
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
										Encara no hi ha publicacions disponibles.
										Sisplau, torna-ho a provar més endavant.
									</p>
								</div>
							)}
						</div>
					</section>
				</main>
			</div>
			<Footer />
		</>
	);
};

export async function getServerSideProps() {
	const service = new ContentService();
	const { totalItems, stories, featuredStories, numPages } =
		await service.getStories();
	return {
		props: {
			totalItems,
			stories,
			featuredStories,
			numPages,
		},
	};
}

export default StoriesList;

import ContentService from "../services/contentService";
import GlobalMetas from "../components/head/GlobalMetas";
import NavigationBar from "../components/global/NavigationBar";
import HomeHeader from "../components/headers/HomeHeader";
import HomePageResults from "../components/homepage/HomePageResults";
import Footer from "../components/global/Footer";
import LocalBusinessRichSnippet from "../components/richsnippets/LocalBusinessRichSnippet";

const Homepage = (props) => {
	return (
		<>
			{/* Browser metas  */}
			<GlobalMetas
				title="Escapades originals a Catalunya"
				description="Escapades en parella per gaudir i desconnectar. Experiències i allotjaments verificats i originals, pernsats per a una escapada en parella per recordar."
				url="https://escapadesenparella.cat"
				image="https://res.cloudinary.com/juligoodie/image/upload/v1652527292/getaways-guru/IMGP9489-s_izgty6.jpg"
				canonical="https://escapadesenparella.cat"
			/>
			{/* Rich snippets */}
			<LocalBusinessRichSnippet />
			<main id="homepage">
				<NavigationBar />
				<HomeHeader />
				<HomePageResults
					mostRecentPlaces={props.mostRecentPlaces}
					featuredActivities={props.featuredActivities}
					featuredRegions={props.featuredRegions}
					mostRecentStories={props.mostRecentStories}
				/>
				<Footer />
			</main>
		</>
	);
};

export async function getStaticProps() {
	const service = new ContentService();
	const mostRecentPlaces = await service.getMostRecentPlaces();
	const featuredActivities = await service.getFeaturedActivities();
	const featuredRegions = await service.getFeaturedRegions();
	const mostRecentStories = await service.getMostRecentStories();
	const totals = await service.getSiteStats();

	return {
		props: {
			featuredRegions,
			featuredActivities,
			mostRecentPlaces,
			mostRecentStories,
			totals,
		},
		revalidate: 120,
	};
}

export default Homepage;

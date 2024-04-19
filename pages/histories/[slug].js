import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import NavigationBar from "../../components/global/NavigationBar";
import ContentService from "../../services/contentService";
import UserContext from "../../contexts/UserContext";
import parse from "html-react-parser";
import Footer from "../../components/global/Footer";
import FooterHistoria from "../../components/global/FooterHistoria";
import GlobalMetas from "../../components/head/GlobalMetas";
import FancyboxUtil from "../../utils/FancyboxUtils";
import { formatDateTimeToISODate } from "../../utils/helpers";
import BreadcrumbRichSnippet from "../../components/richsnippets/BreadcrumbRichSnippet";
import ArticleRichSnippet from "../../components/richsnippets/ArticleRichSnippet";
import ShareBarModal from "../../components/social/ShareBarModal";
import AdBanner from "../../components/ads/AdBanner";

const StoryListing = ({ storyDetails }) => {
	const { user } = useContext(UserContext);
	const router = useRouter();

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

	let parsedDescription;
	let slicedDescription = [];

	const welcomeText = (
		<div className="mb-5">
			<h2>
				{storyDetails.title}: Benvinguts a l'escapada de la setmana, ens
				hi acompanyeu?
			</h2>
		</div>
	);

	const buildImagesGrid = (start, end) => {
		const images = storyDetails.images.slice(start, end);

		return (
			<FancyboxUtil
				options={{
					infinite: true,
				}}
			>
				<div className="flex flex-wrap -mx-1 cursor-pointer">
					{images.map((image, idx) => {
						return (
							<div
								className="w-1/2 md:w-1/3 px-1 mb-2 flex-auto"
								data-fancybox="gallery"
								data-src={image}
								key={idx}
							>
								<picture
									key={idx}
									className="block rounded-2xl overflow-hidden aspect-1 relative"
								>
									<img src={image} alt={`${storyDetails.title} - ${idx + 1
										}`} className={'w-full h-full object-cover'} width={400} height={300} loading="lazy" />
								</picture>
							</div>
						);
					})}
				</div>
			</FancyboxUtil>
		);
	};

	if (storyDetails.description) {
		parsedDescription = parse(storyDetails.description);
		parsedDescription.map((el) => slicedDescription.push(el));
		if (slicedDescription.length > 1) {
			slicedDescription.splice(1, 0, welcomeText);
			slicedDescription.forEach((el, idx) => {
				if (
					typeof el.props.children == "string" &&
					el.props.children.includes("post_images")
				) {
					const str = el.props.children;

					const found = str.replace(/^\D+/g, "");
					const foundArr = found.slice(0, -2).split(",");
					const startingIndex = foundArr[0];
					const endIndex = foundArr[1];

					slicedDescription[idx] = buildImagesGrid(
						startingIndex,
						endIndex
					);
				}
			});
		}
	}

	const coverPath = storyDetails.cover.substring(0, 51);
	const imageId = storyDetails.cover.substring(63);
	const coverImg = `${coverPath}w_1392,h_783,c_fill/${imageId}`;
	const coverImgMob = `${coverPath}w_400,h_300,c_fill/${imageId}`;

	const coverAuthorPath = storyDetails.owner.avatar.substring(0, 51);
	const imageAuthorId = storyDetails.owner.avatar.substring(63);
	const coverAuthorImg = `${coverAuthorPath}w_32,h_32,c_fill/${imageAuthorId}`;

	return (
		<>
			{/* Browser metas  */}
			<GlobalMetas
				title={storyDetails.metaTitle}
				description={storyDetails.metaDescription}
				url={`https://escapadesenparella.cat/histories/${storyDetails.slug}`}
				image={storyDetails.cover}
				canonical={`https://escapadesenparella.cat/histories/${storyDetails.slug}`}
				preconnect={'https://res.cloudinary.com/'}
			/>
			{/* Rich snippets */}
			<BreadcrumbRichSnippet
				page1Title="Inici"
				page1Url="https://escapadesenparella.cat"
				page2Title="Històries"
				page2Url="https://escapadesenparella.cat/histories"
				page3Title={storyDetails.metaTitle}
				page3Url={`https://escapadesenparella.cat/histories/${storyDetails.slug}`}
			/>
			<ArticleRichSnippet
				headline={storyDetails.title}
				summary={storyDetails.subtitle}
				image={storyDetails.cover}
				author={storyDetails.owner.fullName}
				publicationDate={storyDetails.createdAt}
				modificationDate={storyDetails.updatedAt}
			/>
			<div className="listing-story">
				<NavigationBar />
				<main>
					<article>
						<section className="pt-8 md:pt-10 lg:pt-12 pb-6 md:pb-8 bg-tertiary-50 ">
							{/* Breadcrumb + article header */}
							<div className="w-full">
								<div className="container">
									<ul className="breadcrumb max-w-5xl mx-auto">
										<li className="breadcrumb__item">
											<a
												href="/"
												className="breadcrumb__link"
											>
												Inici
											</a>
										</li>
										<li className="breadcrumb__item">
											<a
												href="/histories"
												className="breadcrumb__link"
											>
												Històries en parella
											</a>
										</li>
									</ul>
								</div>
							</div>

							{/* Article heading + subtitle + meta info */}
							<div className="relative mt-4 md:mt-7">
								<div className="container">
									<div className="md:max-w-xl lg:max-w-5xl lg:mx-auto">
										<h1 className="font-display max-w-2xl my-0">{storyDetails.title}</h1>
										<p className="lg:text-xl font-light mt-2.5 mb-3 md:mt-3 md:mb-4 max-w-2xl">
											{storyDetails.subtitle}
										</p>
										{/* Informació de l'autor */}
										<div className="flex flex-wrap items-center gap-4">
											<div className="flex flex-wrap items-center">
												<div className="rounded-full overflow-hidden w-8 h-8 mr-2.5">
													<picture>
														<img src={coverAuthorImg} alt={storyDetails.owner.fullName} className={'w-full h-full object-cover'} width={32} height={32} loading="eager" fetchpriority="high" />
													</picture>
												</div>
												<span className="text-sm">
													{
														storyDetails
															.owner
															.fullName
													}
												</span>
												<span className="mx-2 text-sm ">
													–
												</span>
												<span className="text-sm ">
													<time
														dateTime={formatDateTimeToISODate(
															storyDetails.createdAt
														)}
													>
														<u>
															{formatDateTimeToISODate(
																storyDetails.createdAt
															)}
														</u>
													</time>
												</span>
											</div>
											<ShareBarModal picture={coverImgMob} title={storyDetails.title} rating={null} slug={`https://escapadesenparella.cat/histories/${storyDetails.slug}`} locality={null} colorClass={'text-primary-500 text-sm'} />
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* Article cover */}
						<div className="relative after:absolute after:top-0 after:inset-x-0 after:bg-tertiary-50 after:h-20">
							<div className="container relative z-10">
								<picture className="block aspect-w-4 aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 h-full rounded-2xl overflow-hidden">
									<source srcSet={coverImgMob} media="(max-width: 768px)" />
									<source srcSet={coverImg} media="(min-width: 768px)" />
									<img src={coverImg} alt={storyDetails.title} className={'w-full h-full object-cover'} width={400} height={300} loading="eager" fetchpriority="high" />
								</picture>
							</div>
						</div>

						{/* Article description */}
						<section className="pt-6">
							<div className="container">
								<div className="max-w-5xl mx-auto">
									<div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 gap-x-12">
										<div className="md:col-span-8">
											<div className="w-full border-b border-primary-50 pb-8">
												<div className="flex flex-col h-full">
													<span className="block text-sm">
														Darrera actualització:{" "}
														<time
															dateTime={formatDateTimeToISODate(
																storyDetails.updatedAt
															)}
														>
															<u>
																{formatDateTimeToISODate(
																	storyDetails.updatedAt
																)}
															</u>
														</time>
													</span>
													<figcaption className="text-sm font-light block">
														Foto d' <u>Andrea Prat</u> i{" "}
														<u>Juli Ramon</u> per
														Escapadesenparella.cat
													</figcaption>
												</div>
											</div>
											<div className="listing-description w-full mt-6 md:mt-8">
												{slicedDescription}
											</div>
										</div>

										{/* Aside */}
										<aside className="md:col-span-4">
											<span className="inline-block text-xs">Anunci</span>
											<AdBanner data-ad-slot="9182372294"
												data-ad-format="auto"
												data-full-width-responsive="true" />
										</aside>
									</div>
								</div>
							</div>
						</section>
					</article>
				</main>
				<section>
					<div className="container">
						<FooterHistoria />
					</div>
				</section>
			</div >
			<Footer
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
				}
			/>
		</>
	);
};

export async function getServerSideProps({ params }) {
	const service = new ContentService();
	const storyDetails = await service.getStoryDetails(params.slug);

	if (!storyDetails) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			storyDetails,
		},
	};
}

export default StoryListing;

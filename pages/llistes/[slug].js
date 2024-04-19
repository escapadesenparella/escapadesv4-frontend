import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/global/Footer";
import NavigationBar from "../../components/global/NavigationBar";
import ShareModal from "../../components/modals/ShareModal";
import SignUpModal from "../../components/modals/SignUpModal";
import UserContext from "../../contexts/UserContext";
import ContentService from "../../services/contentService";
import FooterHistoria from "../../components/global/FooterHistoria";
import GlobalMetas from "../../components/head/GlobalMetas";
import ArticleRichSnippet from "../../components/richsnippets/ArticleRichSnippet";
import BreadcrumbRichSnippet from "../../components/richsnippets/BreadcrumbRichSnippet";
import { formatDateTimeToISODate } from "../../utils/helpers";
import ShareBarModal from "../../components/social/ShareBarModal";
import AdBanner from "../../components/ads/AdBanner";

const ListView = ({ listDetails }) => {
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

	const urlToShare = `https://escapadesenparella.cat/llistes/${router.query.slug}`;

	const [queryId, setQueryId] = useState(null);

	useEffect(() => {
		if (router && router.query) {
			setQueryId(router.query.slug);
		}
	}, [router]);

	const [modalVisibility, setModalVisibility] = useState(false);
	const handleModalVisibility = () => setModalVisibility(true);
	const hideModalVisibility = () => setModalVisibility(false);

	const [shareModalVisibility, setShareModalVisibility] = useState(false);
	const handleShareModalVisibility = () => setShareModalVisibility(true);
	const hideShareModalVisibility = () => setShareModalVisibility(false);

	const coverPath = listDetails.cover.substring(0, 51);
	const imageId = listDetails.cover.substring(63);
	const coverImg = `${coverPath}w_1392,h_783,c_fill/${imageId}`;
	const coverImgMob = `${coverPath}w_400,h_300,c_fill/${imageId}`;

	const coverAuthorPath = listDetails.owner.avatar.substring(0, 51);
	const imageAuthorId = listDetails.owner.avatar.substring(63);
	const coverAuthorImg = `${coverAuthorPath}w_32,h_32,c_fill/${imageAuthorId}`;
	return (
		<>
			{/* Browser metas  */}
			<GlobalMetas
				title={listDetails.metaTitle}
				description={listDetails.metaDescription}
				url={`https://escapadesenparella.cat/llistes/${listDetails.slug}`}
				image={listDetails.cover}
				canonical={`https://escapadesenparella.cat/llistes/${listDetails.slug}`}
			/>
			{/* Rich snippets */}
			<BreadcrumbRichSnippet
				page1Title="Inici"
				page1Url="https://escapadesenparella.cat"
				page2Title="Llistes"
				page2Url="https://escapadesenparella.cat/llistes"
				page3Title={listDetails.metaTitle}
				page3Url={`https://escapadesenparella.cat/llistes/${listDetails.slug}`}
			/>
			<ArticleRichSnippet
				headline={listDetails.title}
				summary={listDetails.subtitle}
				image={listDetails.cover}
				author={listDetails.owner.fullName}
				publicationDate={listDetails.createdAt}
				modificationDate={listDetails.updatedAt}
			/>
			<div className="listing-list">
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
												href="/llistes"
												className="breadcrumb__link"
											>
												Llistes
											</a>
										</li>
									</ul>
								</div>
							</div>

							{/* Article heading + subtitle + meta info */}
							<div className="relative mt-4 md:mt-7">
								<div className="container">
									<div className="md:max-w-xl lg:max-w-5xl lg:mx-auto">
										<h1 className="font-display max-w-2xl my-0">{listDetails.title}</h1>
										<p className="lg:text-xl font-light mt-2.5 mb-3 md:mt-3 md:mb-4 max-w-2xl">
											{listDetails.subtitle}
										</p>
										{/* Informació de l'autor */}
										<div className="flex flex-wrap items-center gap-4">
											<div className="flex flex-wrap items-center">
												<div className="rounded-full overflow-hidden w-8 h-8 mr-2.5">
													<picture>
														<img src={coverAuthorImg} alt={listDetails.owner.fullName} className={'w-full h-full object-cover'} width={32} height={32} loading="eager" fetchpriority="high" />
													</picture>
												</div>
												<span className="text-sm">
													{
														listDetails
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
															listDetails.createdAt
														)}
													>
														<u>
															{formatDateTimeToISODate(
																listDetails.createdAt
															)}
														</u>
													</time>
												</span>
											</div>
											<ShareBarModal picture={coverImg} title={listDetails.title} rating={null} slug={`https://escapadesenparella.cat/llistes/${listDetails.slug}`} locality={null} colorClass={'text-primary-500 text-sm'} />
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* Article cover */}
						<div className="relative after:absolute after:top-0 after:inset-x-0 after:bg-tertiary-50 after:h-20">
							<div className="container relative z-10">
								<picture className="block aspect-w-16 aspect-h-9 h-full rounded-2xl overflow-hidden">
									<picture className="block aspect-w-4 aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 h-full rounded-2xl overflow-hidden">
										<source src={coverImgMob} media="(max-width: 768px)" />
										<source src={coverImg} media="(min-width: 768px)" />
										<img src={coverImg} alt={listDetails.title} className={'w-full h-full object-cover'} width={400} height={300} loading="eager" fetchpriority="high" />
									</picture>
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
																listDetails.updatedAt
															)}
														>
															<u>
																{formatDateTimeToISODate(
																	listDetails.updatedAt
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
											<div className="list__description w-full mt-6 md:mt-8" dangerouslySetInnerHTML={{ __html: listDetails.description }}>
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

				<SignUpModal
					visibility={modalVisibility}
					hideModal={hideModalVisibility}
				/>
				<ShareModal
					visibility={shareModalVisibility}
					hideModal={hideShareModalVisibility}
					url={urlToShare}
				/>
				<Footer
					logo_url={
						"https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
					}
				/>
			</div>
		</>
	);
};

export async function getServerSideProps({ params }) {
	const service = new ContentService();
	const listDetails = await service.getListDetails(params.slug);

	if (!listDetails) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			listDetails,
		},
	};
}

export default ListView;

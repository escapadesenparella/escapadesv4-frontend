import Glide from "@glidejs/glide";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdBanner from "../../components/ads/AdBanner";

const Hero = ({ slideImage }) => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	const slides = [
		{
			picture_webp: slideImage.picture_webp,
			picture_raw: slideImage.picture_raw,
			picture_webp_mob: slideImage.picture_webp_mob,
			picture_raw_mob: slideImage.picture_raw_mob,
			picture_alt:
				"La vostra propera escapada en parella a Catalunya comença aquí",
			title: `Experiències originals i allotjaments amb encant a Catalunya`,
			description: `La vostra propera <strong>escapada en parella a Catalunya</strong> comença aquí. Et recomanem <strong>experiències originals</strong> i <strong>allotjaments amb encant</strong> per a una <strong>escapada en parella</strong> de somni. `,
			button_link_1: "/activitats",
			button_text_1: "Veure experiències",
			button_title_1: "Veure experiències originals a Catalunya",
			button_link_2: "/allotjaments",
			button_text_2: "Veure allotjaments",
			button_title_2: "Veure allotjaments amb encant a Catalunya",
		},
	];

	useEffect(() => {
		const underlinedElement = document.querySelector(".underlined-element");
		if (!underlinedElement) return;

		underlinedElement.classList.add("active");

		const sliderSelector = ".js-glide-homeCover";
		const sliderElement = document.querySelector(sliderSelector);

		if (!sliderElement) return;

		new Glide(sliderSelector, {
			type: "carousel",
			startAt: 0,
			focusAt: "center",
			gap: 12,
			perView: 1,
			autoplay: false,
			animationDuration: 800,
			animationTimingFunc: "ease-in-out",
			breakpoints: {
				1024: {
					perView: 1,
				},
			},
		}).mount();
	});

	return (
		<>
			<section id="hero" className="flex items-stretch lg:mt-6">
				<div className="px-5 w-full">
					<div
						className={`glide ${
							slides.length > 1 ? "js-glide-homeCover" : null
						} overflow-hidden rounded-2xl`}
					>
						<div className="glide__track" data-glide-el="track">
							<div className="glide__slides">
								{slides.length > 0
									? slides.map((slide) => {
											return (
												<div
													key={slide.title}
													className="glide__slide"
												>
													<div className="flex flex-wrap items-stretch overflow-hidden">
														<div className="relative w-full h-full lg:h-auto lg:w-1/2 inset-0 ">
															<picture className="block w-full h-full aspect-[4/3] md:aspect-[16/9]">
																<source
																	srcSet={
																		slide.picture_webp_mob
																	}
																	media="(max-width: 768px)"
																	type="image/webp"
																/>
																<source
																	srcSet={
																		slide.picture_raw_mob
																	}
																	media="(max-width: 768px)"
																/>
																<source
																	srcSet={
																		slide.picture_webp
																	}
																	media="(min-width: 768px)"
																	type="image/webp"
																/>
																<source
																	srcSet={
																		slide.picture_raw
																	}
																	media="(min-width: 768px)"
																/>
																<img
																	src={
																		slide.picture_raw
																	}
																	alt={
																		slide.picture_alt
																	}
																	className="rounded-2xl w-full h-full object-cover"
																	width="400"
																	height="300"
																	loading="eager"
																	fetchpriority="high"
																/>
															</picture>
														</div>
														<div className="w-full lg:w-1/2 relative z-10">
															<div className="relative h-full md:px-16 2xl:px-20 overflow-hidden flex items-center justify-center lg:justify-start">
																<div className="relative z-10 md:min-h-[150px] lg:min-h-[300px] flex items-center justify-center rounded-2xl bg-white md:p-10 mt-6 md:mt-0">
																	<div className="max-w-[33rem]">
																		<div className="breadcrumb">
																			<div className="inline-flex items-center bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-full pr-2.5">
																				<Link href="/descomptes-viatjar">
																					<a className="inline-flex items-center active">
																						<span className="bg-secondary-800 inline-flex items-center px-2.5 py-2 rounded-full text-white mr-2">
																							<svg
																								xmlns="http://www.w3.org/2000/svg"
																								width={
																									16
																								}
																								height={
																									16
																								}
																								viewBox="0 0 24 24"
																								fill="none"
																								stroke="currentColor"
																								strokeWidth={
																									2
																								}
																								strokeLinecap="round"
																								strokeLinejoin="round"
																							>
																								<path
																									stroke="none"
																									d="M0 0h24v24H0z"
																									fill="none"
																								/>
																								<path d="M17 17m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
																								<path d="M7 7m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
																								<path d="M6 18l12 -12" />
																							</svg>
																							<span className="hidden md:inline-block md:ml-1">
																								Descomptes
																							</span>
																						</span>
																						Estalvia
																						amb
																						els
																						descomptes
																						per
																						viatjar
																						<svg
																							xmlns="http://www.w3.org/2000/svg"
																							width={
																								16
																							}
																							height={
																								16
																							}
																							viewBox="0 0 24 24"
																							fill="none"
																							stroke="currentColor"
																							strokeWidth={
																								2
																							}
																							strokeLinecap="round"
																							strokeLinejoin="round"
																							className="ml-1"
																						>
																							<path
																								stroke="none"
																								d="M0 0h24v24H0z"
																								fill="none"
																							/>
																							<path d="M9 6l6 6l-6 6" />
																						</svg>
																					</a>
																				</Link>
																			</div>
																		</div>
																		<h1
																			className="mt-4 md:mt-7 mb-0 max-w-[29rem]"
																			dangerouslySetInnerHTML={{
																				__html: slide.title,
																			}}
																		></h1>
																		<p
																			className="mt-4 text-block font-light leading-normal"
																			dangerouslySetInnerHTML={{
																				__html: slide.description,
																			}}
																		></p>
																		<div className="flex flex-wrap items-center gap-2.5 mt-4 md:mt-7 lg:mt-10">
																			<div className="w-full lg:w-auto">
																				<Link
																					href={
																						slide.button_link_1
																					}
																				>
																					<a
																						title={
																							slide.button_title_1
																						}
																						className="button button__primary button__lg w-full lg:w-auto text-center justify-center"
																					>
																						{
																							slide.button_text_1
																						}
																					</a>
																				</Link>
																			</div>
																			<div className="w-full lg:w-auto">
																				<Link
																					href={
																						slide.button_link_2
																					}
																				>
																					<a
																						title={
																							slide.button_title_2
																						}
																						className="button button__ghost button__lg w-full lg:w-auto text-center justify-center"
																					>
																						{
																							slide.button_text_2
																						}
																					</a>
																				</Link>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											);
									  })
									: null}
							</div>
						</div>
					</div>
					{/* <div className="pt-4 pb-8 border-y border-primary-100 mt-8 w-full">
						<span className="inline-block text-xs">Anunci</span>
						<AdBanner
							data-ad-slot="7418001579"
							data-ad-format="auto"
							data-full-width-responsive="true"
						/>
					</div> */}
				</div>
			</section>
		</>
	);
};

export default Hero;

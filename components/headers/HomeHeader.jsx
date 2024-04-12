import Glide from "@glidejs/glide";
import Link from "next/link";
import { useEffect } from "react";
import { getPicturesBySeason } from "../../utils/helpers";
import Image from "next/image";

const Hero = () => {
	const firstSlidePictures = {
		spring: {
			picture_webp: "/home-cover-primavera.webp",
			picture_raw: "/home-cover-primavera.jpg",
			picture_webp_mob: "/home-cover-primavera-m.webp",
			picture_raw_mob: "/home-cover-primavera-m.jpg",
		},
		summer: {
			picture_webp: "/home-cover-estiu.webp",
			picture_raw: "/home-cover-estiu.jpg",
			picture_webp_mob: "/home-cover-estiu-m.webp",
			picture_raw_mob: "/home-cover-estiu-m.jpg",
		},
		autumn: {
			picture_webp: "/home-cover-tardor.webp",
			picture_raw: "/home-cover-tardor.jpg",
			picture_webp_mob: "/home-cover-tardor-m.webp",
			picture_raw_mob: "/home-cover-tardor-m.jpg",
		},
		winter: {
			picture_webp: "/home-cover-hivern.webp",
			picture_raw: "/home-cover-hivern.jpg",
			picture_webp_mob: "/home-cover-hivern-m.webp",
			picture_raw_mob: "/home-cover-hivern-m.jpg",
		},
	};

	const currentDate = new Date();
	const slideImage = getPicturesBySeason(currentDate, firstSlidePictures);

	const slides = [
		{
			picture_webp: slideImage.picture_webp,
			picture_raw: slideImage.picture_raw,
			picture_webp_mob: slideImage.picture_webp_mob,
			picture_raw_mob: slideImage.picture_raw_mob,
			picture_alt: "La vostra propera escapada en parella a Catalunya comença aquí",
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
						className={`glide ${slides.length > 1 ? "js-glide-homeCover" : null
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
													<div className="relative h-full w-full md:w-1/2 inset-0 ">
														<picture className="block w-full h-full aspect-[4/3] lg:aspect-[16/9] relative">
															<Image src={slide.picture_raw} alt={slide.picture_alt} className="rounded-2xl" layout="fill" objectFit="cover" priority={true} loading="eager" />
														</picture>
													</div>
													<div className="w-full lg:w-1/2 relative z-10">
														<div className="relative h-full md:px-16 2xl:px-20 overflow-hidden flex items-center justify-center lg:justify-start">
															<div className="relative z-10 md:min-h-[150px] lg:min-h-[300px] flex items-center justify-center rounded-2xl bg-white md:p-10 mt-6 md:mt-0">
																<div className="max-w-[33rem]">
																	<div className="breadcrumb">
																		<div className="breadcrumb__item inline-flex items-center">
																			<span className="breadcrumb__link inline-flex items-center active">
																				<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
																					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
																					<path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
																				</svg> Escapadesenparella.cat
																			</span>
																		</div>
																	</div>
																	<h1
																		className="mt-4 md:mt-7 mb-0 max-w-[29rem]"
																		dangerouslySetInnerHTML={{
																			__html: slide.title,
																		}}
																	></h1>
																	<p className="mt-4 text-block font-light leading-normal" dangerouslySetInnerHTML={{
																		__html: slide.description,
																	}}></p>
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
				</div>
			</section>
		</>
	);
};

export default Hero;

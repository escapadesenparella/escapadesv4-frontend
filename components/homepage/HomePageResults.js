import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PublicSquareBox from "../../components/listings/PublicSquareBox";
import FeaturedStoryBox from "../listings/FeaturedStoryBox";
import "swiper/css";
import "swiper/css/navigation";

const HomePageResults = ({
  featuredActivities,
  mostRatedPlaces,
  mostRecentStories,
  featuredRomanticGetaways,
  featuredAdventureGetaways,
  featuredGastronomicGetaways,
  featuredRelaxGetaways,
  totals,
}) => {
  const initialState = {
    mostRatedGetaways: [],
    mostRecentStories: [],
    featuredRomanticGetaways: [],
    featuredAdventureGetaways: [],
    featuredGastronomicGetaways: [],
    featuredRelaxGetaways: [],
    popularRegions: [],
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (
      featuredActivities.length > 0 ||
      mostRatedPlaces.length > 0 ||
      mostRecentStories.length > 0 ||
      featuredRomanticGetaways.length > 0 ||
      featuredAdventureGetaways.length > 0 ||
      featuredGastronomicGetaways.length > 0 ||
      featuredRelaxGetaways.length > 0
    ) {
      setState({
        ...state,
        mostRatedGetaways: mostRatedPlaces,
        mostRecentStories: mostRecentStories,
        featuredRomanticGetaways: featuredRomanticGetaways,
        featuredAdventureGetaways: featuredAdventureGetaways,
        featuredGastronomicGetaways: featuredGastronomicGetaways,
        featuredRelaxGetaways: featuredRelaxGetaways,
        totals: totals,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const date = new Date();
  const foundationYears = date.getFullYear() - 2015;

  let mostRatedSection,
    romanticGetawaysSection,
    adventureGetawaysSection,
    gastronomicGetawaysSection,
    relaxGetawaysSection,
    placeTypeSection;

  if (state.mostRatedGetaways.length > 0) {
    let mostRatedList = state.mostRatedGetaways.map((el, idx) => {
      while (state.mostRatedGetaways.indexOf(el) < 4) {
        let location;
        if (el.type === "activity") {
          location = (
            <span className="listing-location">{`${
              el.activity_locality === undefined
                ? el.activity_state
                : el.activity_locality
            }`}</span>
          );
        }
        if (el.type === "place") {
          location = (
            <span className="listing-location">{`${
              el.place_locality === undefined ? "" : el.place_locality
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
            location={location}
            website={el.website}
            phone={el.phone}
          />
        );
      }
      return undefined;
    });
    mostRatedSection = (
      <section className="pt-12 md:pt-20">
        <h2>Els allotjaments més ben valorats</h2>
        <div className="flex flex-wrap items-start -mx-2 mt-2">
          {mostRatedList}
        </div>
      </section>
    );
  }

  let hotels, apartaments, casesrurals, casesarbre, refugis, carabanes;
  if (state.totals !== undefined) {
    hotels = state.totals.objPlaces.hotels;
    apartaments = state.totals.objPlaces.apartaments;
    casesrurals = state.totals.objPlaces.casesrurals;
    casesarbre = state.totals.objPlaces.casesarbre;
    refugis = state.totals.objPlaces.refugis;
    carabanes = state.totals.objPlaces.carabanes;
  }

  if (state.featuredRomanticGetaways.length > 0) {
    let romanticList = state.featuredRomanticGetaways.map((el, idx) => {
      while (state.featuredRomanticGetaways.indexOf(el) < 4) {
        let location;
        if (el.type === "activity") {
          location = (
            <span className="listing-location">{`${
              el.activity_locality === undefined
                ? el.activity_state
                : el.activity_locality
            }`}</span>
          );
        }
        if (el.type === "place") {
          location = (
            <span className="listing-location">{`${
              el.place_locality === undefined ? "" : el.place_locality
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
            location={location}
            website={el.website}
            phone={el.phone}
          />
        );
      }
      return undefined;
    });
    romanticGetawaysSection = (
      <section className="pt-12">
        <h2>Escapades romàntiques per desconnectar </h2>
        <div className="flex flex-wrap items-start -mx-2 mt-2">
          {romanticList}
        </div>
      </section>
    );
  }
  if (state.featuredAdventureGetaways.length > 0) {
    let adventureList = state.featuredAdventureGetaways.map((el) => {
      while (state.featuredAdventureGetaways.indexOf(el) < 4) {
        let location;
        if (el.type === "activity") {
          location = (
            <span className="listing-location">{`${
              el.activity_locality === undefined
                ? el.activity_state
                : el.activity_locality
            }`}</span>
          );
        }
        if (el.type === "place") {
          location = (
            <span className="listing-location">{`${
              el.place_locality === undefined ? "" : el.place_locality
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
            location={location}
            website={el.website}
            phone={el.phone}
          />
        );
      }
      return undefined;
    });
    adventureGetawaysSection = (
      <section className="pt-12">
        <h2>L'aventura us crida</h2>
        <div className="flex flex-wrap items-start -mx-2 mt-2">
          {adventureList}
        </div>
      </section>
    );
  }
  if (state.featuredGastronomicGetaways.length > 0) {
    let gastronomicList = state.featuredGastronomicGetaways.map((el) => {
      while (state.featuredGastronomicGetaways.indexOf(el) < 4) {
        let location;
        if (el.type === "activity") {
          location = (
            <span className="listing-location">{`${
              el.activity_locality === undefined
                ? el.activity_state
                : el.activity_locality
            }`}</span>
          );
        }
        if (el.type === "place") {
          location = (
            <span className="listing-location">{`${
              el.place_locality === undefined ? "" : el.place_locality
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
            location={location}
            website={el.website}
            phone={el.phone}
          />
        );
      }
      return undefined;
    });
    gastronomicGetawaysSection = (
      <section className="pt-12">
        <h2>La millor cita, als millors restaurants</h2>
        <div className="flex flex-wrap items-start -mx-2 mt-2">
          {gastronomicList}
        </div>
      </section>
    );
  }
  if (state.featuredRelaxGetaways.length > 0) {
    let relaxlIST = state.featuredRelaxGetaways.map((el) => {
      while (state.featuredRelaxGetaways.indexOf(el) < 4) {
        let location;
        if (el.type === "activity") {
          location = (
            <span className="listing-location">{`${
              el.activity_locality === undefined
                ? el.activity_state
                : el.activity_locality
            }`}</span>
          );
        }
        if (el.type === "place") {
          location = (
            <span className="listing-location">{`${
              el.place_locality === undefined ? "" : el.place_locality
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
            location={location}
            website={el.website}
            phone={el.phone}
          />
        );
      }
      return undefined;
    });
    relaxGetawaysSection = (
      <section className="pt-12 pb-12">
        <h2>Escapades en parella per a desconnectar</h2>
        <div className="flex flex-wrap items-start -mx-2 mt-2">{relaxlIST}</div>
      </section>
    );
  }
  placeTypeSection = (
    <section className="pt-12" id="placesTypes">
      <div className="">
        <h2 className="">Allotjaments pensats per a parelles</h2>
      </div>
      <div className="mt-5">
        <div className="flex flex-wrap items-center justify-between -m-4">
          <a
            href={`/hotels-amb-encant`}
            title="Hotels amb encant"
            rel="follow"
            className="flex items-center w-full md:w-1/2 lg:w-1/3 p-4"
          >
            <div className="left">
              <div className="w-40 h-auto mr-5">
                <picture>
                  <source srcSet="../../hotels-amb-encant-escapades-en-parella.png" />
                  <img
                    src="../../hotels-amb-encant-escapades-en-parella.png"
                    data-src="../../hotels-amb-encant-escapades-en-parella.png"
                    alt="Hotels amb encant"
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            <div className="right">
              <h3>Hotels amb encant</h3>
              <span className="block w-full text-base">
                {hotels} hotels amb encant
              </span>
              <span className="flex items-center w-full mt-2">
                Veure'ls tots{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-right ml-1 relative top-0.5"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="15" y1="16" x2="19" y2="12" />
                  <line x1="15" y1="8" x2="19" y2="12" />
                </svg>
              </span>
            </div>
          </a>
          <a
            href={`/apartaments-per-a-parelles`}
            title="Apartaments de somni"
            rel="nofollow"
            className="flex items-center w-full md:w-1/2 lg:w-1/3 p-4"
          >
            <div className="left">
              <div className="w-40 h-auto mr-5">
                <picture>
                  <source srcSet="../../apartamens-escapades-en-parella.png" />
                  <img
                    src="../../apartamens-escapades-en-parella.png"
                    data-src="../../apartamens-escapades-en-parella.png"
                    alt="Apartaments de somni"
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            <div className="right">
              <h3>Apartaments de somni</h3>
              <span className="block w-full text-base">
                {apartaments} apartaments de somni
              </span>
              <span className="flex items-center w-full mt-2">
                Veure'ls tots{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-right ml-1 relative top-0.5"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="15" y1="16" x2="19" y2="12" />
                  <line x1="15" y1="8" x2="19" y2="12" />
                </svg>
              </span>
            </div>
          </a>
          <a
            href={`/cabanyes-als-arbres`}
            title="Cases-arbre"
            rel="follow"
            className="flex items-center w-full md:w-1/2 lg:w-1/3 p-4"
          >
            <div className="left">
              <div className="w-40 h-auto mr-5">
                <picture>
                  <source srcSet="../../cases-arbre-escapades-en-parella.png" />
                  <img
                    src="../../cases-arbre-escapades-en-parella.png"
                    data-src="../../cases-arbre-escapades-en-parella.png"
                    alt="Cases-arbre"
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            <div className="right">
              <h3>Cases-arbre</h3>
              <span className="block w-full text-base">
                {casesarbre} cases-arbre
              </span>
              <span className="flex items-center w-full mt-2">
                Veure'ls tots{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-right ml-1 relative top-0.5"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="15" y1="16" x2="19" y2="12" />
                  <line x1="15" y1="8" x2="19" y2="12" />
                </svg>
              </span>
            </div>
          </a>
          <a
            href={`/cases-rurals`}
            title="Cases rurals"
            rel="follow"
            className="flex items-center w-full md:w-1/2 lg:w-1/3 p-4"
          >
            <div className="left">
              <div className="w-40 h-auto mr-5">
                <picture>
                  <source srcSet="../../cases-rurals-escapades-en-parella.png" />
                  <img
                    src="../../cases-rurals-escapades-en-parella.png"
                    data-src="../../cases-rurals-escapades-en-parella.png"
                    alt="Cases rurals"
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            <div className="right">
              <h3>Cases rurals</h3>
              <span className="block w-full text-base">
                {casesrurals} cases rurals
              </span>
              <span className="flex items-center w-full mt-2">
                Veure'ls tots{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-right ml-1 relative top-0.5"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="15" y1="16" x2="19" y2="12" />
                  <line x1="15" y1="8" x2="19" y2="12" />
                </svg>
              </span>
            </div>
          </a>
          <a
            href={`/carabanes`}
            title="Carabanes"
            rel="nofollow"
            className="flex items-center w-full md:w-1/2 lg:w-1/3 p-4"
          >
            <div className="left">
              <div className="w-40 h-auto mr-5">
                <picture>
                  <source srcSet="../../carabanes-escapades-en-parella.png" />
                  <img
                    src="../../carabanes-escapades-en-parella.png"
                    data-src="../../carabanes-escapades-en-parella.png"
                    alt="Carabanes"
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            <div className="right">
              <h3>Carabanes</h3>
              <span className="block w-full text-base">
                {carabanes} carabanes
              </span>
              <span className="flex items-center w-full mt-2">
                Veure'ls tots{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-right ml-1 relative top-0.5"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="15" y1="16" x2="19" y2="12" />
                  <line x1="15" y1="8" x2="19" y2="12" />
                </svg>
              </span>
            </div>
          </a>
          <a
            href={`/refugis`}
            title="Refugis"
            rel="nofollow"
            className="flex items-center w-full md:w-1/2 lg:w-1/3 p-4"
          >
            <div className="left">
              <div className="w-40 h-auto mr-5">
                <picture>
                  <source srcSet="../../refugis-escapades-en-parella.png" />
                  <img
                    src="../../refugis-escapades-en-parella.png"
                    data-src="../../refugis-escapades-en-parella.png"
                    alt="Refugis"
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            <div className="right">
              <h3>Refugis</h3>
              <span className="block w-full text-base">{refugis} refugis</span>
              <span className="flex items-center w-full mt-2">
                Veure'ls tots{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-right ml-1 relative top-0.5"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="15" y1="16" x2="19" y2="12" />
                  <line x1="15" y1="8" x2="19" y2="12" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
  return (
    <div id="homePageResults" className="relative z-40">
      <div className="container">
        <div className="w-full">
          {mostRatedSection}
          {romanticGetawaysSection}
          {placeTypeSection}
          {adventureGetawaysSection}
          {gastronomicGetawaysSection}
          {/* <section className="pt-12">
            <h2>Darreres històries en parella</h2>
            <div className="flex flex-wrap items-center relative mt-3 -mx-1.5">
              <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-prev",
                  prevEl: ".swiper-next",
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                }}
              >
                {state.mostRecentStories.map((el) => (
                  <SwiperSlide>
                    <FeaturedStoryBox
                      key={el._id}
                      slug={el.slug}
                      cover={el.cover}
                      title={el.title}
                      avatar={el.owner.avatar}
                      owner={el.owner.fullName}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="bg-white shadow-xl w-10 h-10 flex items-center justify-center swiper-next absolute top-1/2 -left-4 z-40 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-left text-primary-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="5" y1="12" x2="9" y2="16" />
                  <line x1="5" y1="12" x2="9" y2="8" />
                </svg>
              </button>
              <button className="bg-white shadow-xl w-10 h-10 flex items-center justify-center swiper-prev absolute top-1/2 -right-4 z-40 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-right text-primary-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="15" y1="16" x2="19" y2="12" />
                  <line x1="15" y1="8" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </section> */}
          {relaxGetawaysSection}
        </div>
      </div>
      <section className="py-12 md:py-24 bg-primary-100">
        <div className="container">
          <div className="w-full flex flex-wrap items-stretch justify-center">
            <div className="w-full md:w-1/3">
              <picture>
                <img
                  src="https://res.cloudinary.com/juligoodie/image/upload/v1652535865/getaways-guru/about-home_mikxom.jpg"
                  alt="Escapades en parella, i molt més"
                  className="w-full h-full object-cover object-center rounded-lg"
                  width={300}
                  height={400}
                  loading="lazy"
                ></img>
              </picture>
              <figcaption className="text-xs mt-2.5">
                Andrea i Juli, Castell de Rocabruna (Ripollès) / ©
                Escapadesenparella.cat
              </figcaption>
            </div>
            <div className="w-full md:w-1/2 md:pl-6 lg:pl-10 xl:pl-20 py-8 xl:py-16 flex justify-center flex-col mt-14 md:mt-0">
              <div className="mb-4">
                <h2>Escapades en parella, i molt més</h2>
              </div>
              <p>
                Hola, som l'Andrea i en Juli, i et volem donar la benvinguda a
                Escapadesenparella.cat, el recomanador d'escapades en parella de
                referència a Catalunya. Busques{" "}
                <strong>escapades en parella</strong>? No sabeu&nbsp;
                <strong>què fer aquest cap de setmana</strong>? Cansats de fer
                sempre el mateix? A Escapadesenparella.cat tenim la sol·lució!
              </p>
              <p>
                Fa {foundationYears} anys vam començar a compartir les escapades
                en parella que fèiem arreu de Catalunya, amb l'objectiu de
                motivar a sortir a <strong>descobrir Catalunya</strong>, i donar
                a conèixer llocs únics per gaudir en parella, perquè crèiem, i
                seguim creient, que hi ha vida més enllà d'anar al cinema o
                veure Netflix al sofà.
              </p>
              <p>
                A dia d'avui estem encantats de poder seguir compartint amb tots
                vosaltres les{" "}
                <strong>millors escapades en parella a Catalunya</strong>, així
                que gràcies per ser aquí llegint aquesta nota. Perquè per
                nosaltres, Escapadesenparella.cat és molt més que escapades en
                parella; esperem transmetre't aquest sentiment!
              </p>
              <div className="flex flex-wrap items-center -mx-2 mt-5">
                <div className="px-2">
                  <Link href="#">
                    <a className="button button__primary button__lg inline-flex">
                      Conèix-nos millor
                    </a>
                  </Link>
                </div>
                <div className="px-2">
                  <Link href="/contacte">
                    <a className="button button__secondary button__lg inline-flex">
                      Contacta'ns
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageResults;

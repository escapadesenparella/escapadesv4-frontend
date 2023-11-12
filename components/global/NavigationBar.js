import Router, { useRouter } from "next/router";
import { useContext, useState } from "react";
import Link from "next/link";
import UserContext from "../../contexts/UserContext";

const NavigationBar = ({ logo_url, path }) => {
	const { user } = useContext(UserContext);
	const router = useRouter();
	const initialState = {
		searchQuery: "",
		isResponsiveMenuOpen: false,
	};
	const [state, setState] = useState(initialState);

	const notLoggedHeader = {
		boxShadow: "none",
		borderBottom: "1px solid #e8e8e8",
	};
	const handleKeyPress = (e) => {
		let searchQuery = e.target.value;
		setState({ ...state, searchQuery: searchQuery });
		if (e.keyCode === 13) {
			e.preventDefault();
			Router.push(`/search?query=${searchQuery}`);
		}
	};

	const handleResponsiveMenu = () => {
		if (!state.isResponsiveMenuOpen) {
			setState({ ...state, isResponsiveMenuOpen: true });
		} else {
			setState({ ...state, isResponsiveMenuOpen: false });
		}
	};

	let logoLink =
		user === "null" || !user || user === undefined
			? "/"
			: "/2i8ZXlkM4cFKUPBrm3-admin-panel";

	const responsiveMenu = (
		<>
			<div
				className={`menu__responsive ${
					state.isResponsiveMenuOpen ? "open shadow-md" : null
				}`}
			>
				<button
					className="menu__close"
					aria-label="Botó tancar menu"
					onClick={() => handleResponsiveMenu()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#00206B"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>

				<div className="search-box">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-search"
						width="15"
						height="15"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#00206B"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<circle cx="10" cy="10" r="7" />
						<line x1="21" y1="21" x2="15" y2="15" />
					</svg>
					<form className="form">
						<fieldset>
							<input
								type="text"
								onKeyDown={handleKeyPress}
								className="form__control"
								type="text"
								placeholder="Cerca la vostra propera escapada..."
							/>
						</fieldset>
					</form>
				</div>
				<span className="flex items-center text-xs mt-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-corner-down-left"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#00206B"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<path d="M18 6v6a3 3 0 0 1 -3 3h-10l5 -5m0 10l-5 -5" />
					</svg>
					Prem "Enter" per cercar
				</span>
				<div className="mt-8">
					<Link href="/activitats">
						<a className="menu__link flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-route mr-2"
								width="25"
								height="25"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="#00206B"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" />
								<circle cx="6" cy="19" r="2" />
								<circle cx="18" cy="5" r="2" />
								<path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
							</svg>
							Activitats
						</a>
					</Link>
					<Link href="/allotjaments">
						<a className="menu__link flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-tent mr-2"
								width="25"
								height="25"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="#00206B"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								/>
								<path d="M11 14l4 6h6l-9 -16l-9 16h6l4 -6" />
							</svg>
							Allotjaments
						</a>
					</Link>
					<Link href="/histories">
						<a className="menu__link flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-notebook mr-2"
								width="25"
								height="25"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="#00206B"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								/>
								<path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
								<line x1="13" y1="8" x2="15" y2="8" />
								<line x1="13" y1="12" x2="15" y2="12" />
							</svg>
							Històries
						</a>
					</Link>
					<Link href="/llistes">
						<a className="menu__link flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-layout-list mr-2"
								width="25"
								height="25"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="#00206B"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								/>
								<rect
									x="4"
									y="4"
									width="16"
									height="6"
									rx="2"
								/>
								<rect
									x="4"
									y="14"
									width="16"
									height="6"
									rx="2"
								/>
							</svg>
							Llistes
						</a>
					</Link>
				</div>
				{/* {navRight} */}
			</div>
		</>
	);

	return (
		<header className="z-50 bg-white w-full sticky top-0">
			<nav className="px-6 py-3 menu">
				<div className="w-full flex flex-wrap items-center justify-between lg:justify-start">
					<div className="flex-1 ">
						<form className="hidden lg:flex items-center bg-primary-100 relative rounded-md overflow-hidden max-w-[400px]">
							<input
								onKeyDown={handleKeyPress}
								type="text"
								id="search"
								placeholder="Cerca la vostra propera escapada..."
								className="flex-auto rounded-md bg-primary-50 px-5 py-2.5 placeholder:text-sm focus:ring-primary-500 focus:bg-white focus:text-primary-500"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-search absolute right-3 text-primary-400"
								width="22"
								height="22"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" />
								<circle cx="10" cy="10" r="7" />
								<line x1="21" y1="21" x2="15" y2="15" />
							</svg>
						</form>
					</div>
					<Link href={logoLink}>
						<a title="Escapadesenparella.cat">
							<svg
								width="165"
								height="auto"
								viewBox="0 0 638 173"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g
									id="Logo-v5"
									stroke="none"
									stroke-width="1"
									fill="none"
									fill-rule="evenodd"
								>
									<g
										id="Logo-Text---Vectoritzat"
										transform="translate(-236.000000, -124.000000)"
										fill-rule="nonzero"
									>
										<g
											id="Group"
											transform="translate(236.000000, 124.000000)"
										>
											<path
												d="M269.56,85.96 C275.64,85.96 280.84,83.96 284.52,80.28 C285.4,79.32 285.24,77.72 284.04,77 L281.64,75.48 C280.84,74.92 279.8,75 279.08,75.64 C276.68,77.8 273.24,79.08 269.56,79.08 C261.56,79.08 256.68,74.52 255.48,67.88 L285.16,67.88 C286.68,67.88 287.96,66.6 287.96,65.08 C288.36,51.64 278.6,43.48 268.28,43.48 C256.36,43.48 247.8,53 247.8,64.76 C247.8,76.44 256.12,85.96 269.56,85.96 Z M280.36,61.56 L255.48,61.56 C256.6,54.84 261.32,50.36 268.28,50.36 C275.16,50.36 279.4,54.76 280.36,61.56 Z M307.24,85.96 C317.96,85.96 323.16,79.96 323.16,72.84 C323.16,66.68 319.8,63.56 309.88,61.48 C309.382857,61.3771429 308.875612,61.2816327 308.366137,61.1874672 L307.346545,60.9991509 L307.346545,60.9991509 L306.838892,60.9030029 C303.127755,60.1881633 299.72,59.2228571 299.72,55.64 C299.72,52.28 302.6,49.96 306.6,49.96 C310.28,49.96 312.6,51.56 313.72,53.32 C314.2,54.12 315.16,54.44 316.04,54.2 L318.92,53.4 C320.2,53.08 320.84,51.56 320.2,50.36 C317.96,45.96 312.92,43.48 307.32,43.48 C298.44,43.48 292.28,48.76 292.28,56.2 C292.28,62.12 295.64,65.8 303.16,67.56 C304.076129,67.7664516 305.021394,67.9375234 305.962565,68.0993978 L306.526509,68.1956282 C311.217523,68.9918418 315.64,69.6890323 315.64,73.56 C315.64,77.16 312.68,79.32 307.4,79.32 C302.28,79.32 299.8,77.56 298.68,75.8 C298.12,75 297.16,74.6 296.2,74.92 L293,76.04 C291.8,76.44 291.16,77.88 291.8,79.08 C294.36,83.56 300.28,85.96 307.24,85.96 Z M347.96,85.96 C354.92,85.96 360.76,82.84 364.52,78.04 C365.32,77 365,75.48 363.88,74.84 L361.4,73.48 C360.52,73 359.32,73.24 358.68,74.04 C356.28,77.16 352.44,79.08 347.96,79.08 C339.96,79.08 334.2,73 334.2,64.76 C334.2,56.44 339.96,50.36 347.96,50.36 C352.44,50.36 356.28,52.28 358.68,55.4 C359.32,56.2 360.52,56.44 361.4,55.96 L363.88,54.6 C365,53.96 365.32,52.44 364.52,51.4 C360.76,46.6 354.92,43.48 347.96,43.48 C335.72,43.48 326.68,53 326.68,64.76 C326.68,76.44 335.72,85.96 347.96,85.96 Z M388.12,85.96 C395.16,85.96 399.88,83.08 402.84,79.32 L402.84,82.84 C402.84,84.04 403.8,85 405,85 L408.04,85 C409.24,85 410.2,84.04 410.2,82.84 L410.2,46.6 C410.2,45.4 409.24,44.44 408.04,44.44 L405,44.44 C403.8,44.44 402.84,45.4 402.84,46.6 L402.84,50.12 C399.88,46.36 395.16,43.48 388.12,43.48 C375.48,43.48 367.96,54.12 367.96,64.76 C367.96,75.32 375.48,85.96 388.12,85.96 Z M388.84,79.08 C380.44,79.08 375.4,72.92 375.4,64.76 C375.4,56.52 380.44,50.36 388.84,50.36 C397.8,50.36 402.84,56.68 402.84,64.76 C402.84,72.76 397.8,79.08 388.84,79.08 Z M424.12,100.44 C425.32,100.44 426.28,99.48 426.28,98.28 L426.28,79.32 C429.32,83.08 433.96,85.96 441,85.96 C453.64,85.96 461.24,75.32 461.24,64.76 C461.24,54.12 453.64,43.48 441,43.48 C433.96,43.48 429.32,46.36 426.28,50.12 L426.28,46.6 C426.28,45.4 425.32,44.44 424.12,44.44 L421.08,44.44 C419.96,44.44 419,45.4 419,46.6 L419,98.28 C419,99.48 419.96,100.44 421.08,100.44 L424.12,100.44 Z M440.28,79.08 C431.4,79.08 426.28,72.76 426.28,64.76 C426.28,56.68 431.4,50.36 440.28,50.36 C448.68,50.36 453.72,56.52 453.72,64.76 C453.72,72.92 448.68,79.08 440.28,79.08 Z M485.4,85.96 C492.44,85.96 497.16,83.08 500.12,79.32 L500.12,82.84 C500.12,84.04 501.08,85 502.28,85 L505.32,85 C506.52,85 507.48,84.04 507.48,82.84 L507.48,46.6 C507.48,45.4 506.52,44.44 505.32,44.44 L502.28,44.44 C501.08,44.44 500.12,45.4 500.12,46.6 L500.12,50.12 C497.16,46.36 492.44,43.48 485.4,43.48 C472.76,43.48 465.24,54.12 465.24,64.76 C465.24,75.32 472.76,85.96 485.4,85.96 Z M486.12,79.08 C477.72,79.08 472.68,72.92 472.68,64.76 C472.68,56.52 477.72,50.36 486.12,50.36 C495.08,50.36 500.12,56.68 500.12,64.76 C500.12,72.76 495.08,79.08 486.12,79.08 Z M534.04,85.96 C541.08,85.96 545.8,83.08 548.84,79.32 L548.84,82.84 C548.84,84.04 549.8,85 550.92,85 L553.96,85 C555.16,85 556.12,84.04 556.12,82.84 L556.12,31.16 C556.12,29.96 555.16,29 553.96,29 L550.92,29 C549.8,29 548.84,29.96 548.84,31.16 L548.84,50.12 C545.8,46.36 541.08,43.48 534.04,43.48 C521.4,43.48 513.88,54.12 513.88,64.76 C513.88,75.32 521.4,85.96 534.04,85.96 Z M534.76,79.08 C526.44,79.08 521.32,72.92 521.32,64.76 C521.32,56.52 526.44,50.36 534.76,50.36 C543.72,50.36 548.84,56.68 548.84,64.76 C548.84,72.76 543.72,79.08 534.76,79.08 Z M584.28,85.96 C590.36,85.96 595.56,83.96 599.24,80.28 C600.12,79.32 599.96,77.72 598.76,77 L596.36,75.48 C595.56,74.92 594.52,75 593.8,75.64 C591.4,77.8 587.96,79.08 584.28,79.08 C576.28,79.08 571.4,74.52 570.2,67.88 L599.88,67.88 C601.4,67.88 602.68,66.6 602.68,65.08 C603.08,51.64 593.32,43.48 583,43.48 C571.08,43.48 562.52,53 562.52,64.76 C562.52,76.44 570.84,85.96 584.28,85.96 Z M595.08,61.56 L570.2,61.56 C571.32,54.84 576.04,50.36 583,50.36 C589.88,50.36 594.12,54.76 595.08,61.56 Z M621.96,85.96 C632.68,85.96 637.88,79.96 637.88,72.84 C637.88,66.68 634.52,63.56 624.6,61.48 C624.102857,61.3771429 623.595612,61.2816327 623.086137,61.1874672 L622.066545,60.9991509 L622.066545,60.9991509 L621.558892,60.9030029 L621.558892,60.9030029 L621.055,60.80375 C617.545,60.095 614.44,59.06 614.44,55.64 C614.44,52.28 617.32,49.96 621.32,49.96 C625,49.96 627.32,51.56 628.44,53.32 C628.92,54.12 629.88,54.44 630.76,54.2 L633.64,53.4 C634.92,53.08 635.56,51.56 634.92,50.36 C632.68,45.96 627.64,43.48 622.04,43.48 C613.16,43.48 607,48.76 607,56.2 C607,62.12 610.36,65.8 617.88,67.56 C618.796129,67.7664516 619.741394,67.9375234 620.682565,68.0993978 L621.246509,68.1956282 C625.937523,68.9918418 630.36,69.6890323 630.36,73.56 C630.36,77.16 627.4,79.32 622.12,79.32 C617,79.32 614.52,77.56 613.4,75.8 C612.84,75 611.88,74.6 610.92,74.92 L607.72,76.04 C606.52,76.44 605.88,77.88 606.52,79.08 C609.08,83.56 615,85.96 621.96,85.96 Z M269.56,157.96 C275.64,157.96 280.84,155.96 284.52,152.28 C285.4,151.32 285.24,149.72 284.04,149 L281.64,147.48 C280.84,146.92 279.8,147 279.08,147.64 C276.68,149.8 273.24,151.08 269.56,151.08 C261.56,151.08 256.68,146.52 255.48,139.88 L285.16,139.88 C286.68,139.88 287.96,138.6 287.96,137.08 C288.36,123.64 278.6,115.48 268.28,115.48 C256.36,115.48 247.8,125 247.8,136.76 C247.8,148.44 256.12,157.96 269.56,157.96 Z M280.36,133.56 L255.48,133.56 C256.6,126.84 261.32,122.36 268.28,122.36 C275.16,122.36 279.4,126.76 280.36,133.56 Z M299.56,157 C300.76,157 301.72,156.04 301.72,154.84 L301.72,133.72 C301.72,129 304.76,122.36 312.44,122.36 C320.04,122.36 322.52,128.04 322.52,133.72 L322.52,154.84 C322.52,156.04 323.48,157 324.6,157 L327.64,157 C328.84,157 329.8,156.04 329.8,154.84 L329.8,131.64 C329.8,123 323.32,115.48 314.2,115.48 C308.04,115.48 304.12,118.52 301.72,122.12 L301.72,118.6 C301.72,117.4 300.76,116.44 299.56,116.44 L296.52,116.44 C295.32,116.44 294.44,117.4 294.44,118.6 L294.44,154.84 C294.44,156.04 295.32,157 296.52,157 L299.56,157 Z M343.72,172.44 C344.92,172.44 345.88,171.48 345.88,170.28 L345.88,151.32 C348.92,155.08 353.56,157.96 360.6,157.96 C373.24,157.96 380.84,147.32 380.84,136.76 C380.84,126.12 373.24,115.48 360.6,115.48 C353.56,115.48 348.92,118.36 345.88,122.12 L345.88,118.6 C345.88,117.4 344.92,116.44 343.72,116.44 L340.68,116.44 C339.56,116.44 338.6,117.4 338.6,118.6 L338.6,170.28 C338.6,171.48 339.56,172.44 340.68,172.44 L343.72,172.44 Z M359.88,151.08 C351,151.08 345.88,144.76 345.88,136.76 C345.88,128.68 351,122.36 359.88,122.36 C368.28,122.36 373.32,128.52 373.32,136.76 C373.32,144.92 368.28,151.08 359.88,151.08 Z M405,157.96 C412.04,157.96 416.76,155.08 419.72,151.32 L419.72,154.84 C419.72,156.04 420.68,157 421.88,157 L424.92,157 C426.12,157 427.08,156.04 427.08,154.84 L427.08,118.6 C427.08,117.4 426.12,116.44 424.92,116.44 L421.88,116.44 C420.68,116.44 419.72,117.4 419.72,118.6 L419.72,122.12 C416.76,118.36 412.04,115.48 405,115.48 C392.36,115.48 384.84,126.12 384.84,136.76 C384.84,147.32 392.36,157.96 405,157.96 Z M405.72,151.08 C397.32,151.08 392.28,144.92 392.28,136.76 C392.28,128.52 397.32,122.36 405.72,122.36 C414.68,122.36 419.72,128.68 419.72,136.76 C419.72,144.76 414.68,151.08 405.72,151.08 Z M441.08,157 C442.2,157 443.16,156.04 443.16,154.84 L443.16,138.84 C443.16,131.64 444.6,123 455.24,123.56 C456.04,123.56 456.76,122.92 456.76,122.12 L456.76,116.92 C456.76,116.12 456.04,115.48 455.16,115.56 C450.44,115.96 445.64,118.52 443.16,123.48 L443.16,118.6 C443.16,117.4 442.2,116.44 441.08,116.44 L438.04,116.44 C436.84,116.44 435.88,117.4 435.88,118.6 L435.88,154.84 C435.88,156.04 436.84,157 438.04,157 L441.08,157 Z M480.84,157.96 C486.92,157.96 492.12,155.96 495.8,152.28 C496.68,151.32 496.52,149.72 495.32,149 L492.92,147.48 C492.12,146.92 491.08,147 490.36,147.64 C487.96,149.8 484.52,151.08 480.84,151.08 C472.84,151.08 467.96,146.52 466.76,139.88 L496.44,139.88 C497.96,139.88 499.24,138.6 499.24,137.08 C499.64,123.64 489.88,115.48 479.56,115.48 C467.64,115.48 459.08,125 459.08,136.76 C459.08,148.44 467.4,157.96 480.84,157.96 Z M491.64,133.56 L466.76,133.56 C467.88,126.84 472.6,122.36 479.56,122.36 C486.44,122.36 490.68,126.76 491.64,133.56 Z M510.92,157 C512.12,157 513,156.04 513,154.84 L513,103.16 C513,101.96 512.12,101 510.92,101 L507.88,101 C506.68,101 505.72,101.96 505.72,103.16 L505.72,154.84 C505.72,156.04 506.68,157 507.88,157 L510.92,157 Z M527,157 C528.2,157 529.08,156.04 529.08,154.84 L529.08,103.16 C529.08,101.96 528.2,101 527,101 L523.96,101 C522.76,101 521.8,101.96 521.8,103.16 L521.8,154.84 C521.8,156.04 522.76,157 523.96,157 L527,157 Z M555.64,157.96 C562.68,157.96 567.4,155.08 570.36,151.32 L570.36,154.84 C570.36,156.04 571.32,157 572.52,157 L575.56,157 C576.76,157 577.72,156.04 577.72,154.84 L577.72,118.6 C577.72,117.4 576.76,116.44 575.56,116.44 L572.52,116.44 C571.32,116.44 570.36,117.4 570.36,118.6 L570.36,122.12 C567.4,118.36 562.68,115.48 555.64,115.48 C543,115.48 535.48,126.12 535.48,136.76 C535.48,147.32 543,157.96 555.64,157.96 Z M556.36,151.08 C547.96,151.08 542.92,144.92 542.92,136.76 C542.92,128.52 547.96,122.36 556.36,122.36 C565.32,122.36 570.36,128.68 570.36,136.76 C570.36,144.76 565.32,151.08 556.36,151.08 Z"
												id="escapadesenparella"
												fill="#001233"
											></path>
											<path
												d="M135.344965,25.3544184 C136.385313,25.9819263 137.267807,26.8373612 137.926891,27.8545654 L138.101054,28.1359458 L208.73886,147.717257 C210.986005,151.521402 209.723806,156.426942 205.919661,158.674086 C204.782084,159.346063 203.497321,159.724958 202.18062,159.779273 L201.850846,159.786072 L8,159.786072 C3.581722,159.786072 0,156.20435 0,151.786072 C0,150.357987 0.382274069,148.955934 1.10713228,147.725484 L59.2321368,49.0580072 C61.4747376,45.2511815 66.3787667,43.9831267 70.1855924,46.2257275 C71.3545801,46.914378 72.3292217,47.8890196 73.0178722,49.0580072 L133.535,151.786 L201.850846,151.786072 L173.988296,104.618966 C162.778989,105.169232 151.805618,102.476771 141.142354,96.58473 C135.980672,93.7326164 131.524134,89.4821982 126.997086,83.6645533 L126.428383,82.9253567 L126.028988,82.3894326 L125.213904,81.268887 L123.634723,79.0562217 L119.58868,73.3387814 L118.474428,71.7898959 L117.975612,71.1179884 L117.766701,70.8504911 C115.802621,68.4296188 113.323313,67.2906258 109.988616,67.3926014 L102.830525,79.2602901 C101.689525,81.1519599 99.2310608,81.7604983 97.339391,80.6194986 C95.5087428,79.5153053 94.8797786,77.1772741 95.8752092,75.3131356 L95.9801825,75.1283646 L124.362697,28.0728354 C126.644696,24.2894957 131.561625,23.072419 135.344965,25.3544184 Z M66.1250045,53.1185952 L8,151.786072 L49.8978096,151.786612 C49.9725417,151.539081 50.0724114,151.295669 50.198275,151.059835 L50.303206,150.87504 L76.2917696,107.7661 C77.4323354,105.874169 79.8906601,105.265067 81.7825916,106.405632 C83.6134931,107.509406 84.2429936,109.847293 83.2479906,111.711659 L83.1430596,111.896454 L59.095,151.786 L124.25007,151.786072 L66.1250045,53.1185952 Z M131.213039,32.2047609 L114.543969,59.8399706 C118.243709,60.6747025 121.431477,62.6699129 123.979227,65.810202 L124.324273,66.2535308 L124.915923,67.0507573 L126.150378,68.7629566 L131.329696,76.0681729 L132.29759,77.4096612 L132.897023,78.2153984 C136.968755,83.5355295 140.815093,87.2638624 145.011432,89.582571 C153.002917,93.9983064 161.078219,96.3466234 169.283099,96.6541405 L131.213039,32.2047609 Z M187.01507,0 C200.269904,0 211.01507,10.745166 211.01507,24 C211.01507,37.254834 200.269904,48 187.01507,48 C173.760236,48 163.01507,37.254834 163.01507,24 C163.01507,10.745166 173.760236,0 187.01507,0 Z M187.01507,8 C178.178514,8 171.01507,15.163444 171.01507,24 C171.01507,32.836556 178.178514,40 187.01507,40 C195.851626,40 203.01507,32.836556 203.01507,24 C203.01507,15.163444 195.851626,8 187.01507,8 Z"
												id="Combined-Shape"
												fill="#E5654B"
											></path>
										</g>
									</g>
								</g>
							</svg>
						</a>
					</Link>
					<div className="flex flex-wrap items-center justify-end flex-1">
						<div className="hidden lg:flex flex-wrap items-center">
							<Link href="/activitats">
								<a className="flex items-center menu__item relative group">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-route text-primary-500 mr-1"
										width="22"
										height="22"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<circle cx="6" cy="19" r="2" />
										<circle cx="18" cy="5" r="2" />
										<path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
									</svg>
									Activitats
								</a>
							</Link>
							<Link href="/allotjaments">
								<a className="flex items-center menu__item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-tent mr-1"
										width="22"
										height="22"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#00206B"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<path d="M11 14l4 6h6l-9 -16l-9 16h6l4 -6" />
									</svg>
									Allotjaments
								</a>
							</Link>
							<Link href="/histories">
								<a className="flex items-center menu__item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-notebook text-primary-500 mr-1"
										width="22"
										height="22"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
										<line x1="13" y1="8" x2="15" y2="8" />
										<line x1="13" y1="12" x2="15" y2="12" />
									</svg>
									Històries
								</a>
							</Link>
							<Link href="/llistes">
								<a className="flex items-center menu__item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-layout-list text-primary-500 mr-1"
										width="22"
										height="22"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#00206B"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<rect
											x="4"
											y="4"
											width="16"
											height="6"
											rx="2"
										/>
										<rect
											x="4"
											y="14"
											width="16"
											height="6"
											rx="2"
										/>
									</svg>
									Llistes
								</a>
							</Link>
							<Link href="/viatges">
								<a className="flex items-center menu__item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-globe text-primary-500 mr-1"
										width={22}
										height={22}
										viewBox="0 0 24 24"
										strokeWidth={1.5}
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
										<path d="M7 9a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
										<path d="M5.75 15a8.015 8.015 0 1 0 9.25 -13"></path>
										<path d="M11 17v4"></path>
										<path d="M7 21h8"></path>
									</svg>
									Viatges
								</a>
							</Link>
							<Link href="/contacte">
								<a className="flex items-center button button__primary button__med px-8 ml-6">
									Contacta'ns
								</a>
							</Link>
						</div>
						{/* {navRight} */}
						<div className="flex items-center lg:hidden">
							<button
								className=""
								aria-label="Botó obrir menú"
								onClick={() => handleResponsiveMenu()}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-menu-2"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="#00206B"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<line x1="4" y1="6" x2="20" y2="6" />
									<line x1="4" y1="12" x2="20" y2="12" />
									<line x1="4" y1="18" x2="20" y2="18" />
								</svg>
							</button>
						</div>
					</div>
				</div>
				{state.isResponsiveMenuOpen ? responsiveMenu : null}
			</nav>
		</header>
	);
};

export default NavigationBar;

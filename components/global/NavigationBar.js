import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import UserContext from "../../contexts/UserContext";
import ContentBar from "../homepage/ContentBar";

const NavigationBar = () => {
	const { user } = useContext(UserContext);
	const searchInputRef = useRef(null);

	const initialState = {
		searchQuery: "",
		isResponsiveMenuOpen: false,
		isSearchPanelOpen: false,
		isMenuDropdownOpen: false,
		logoUrl: "/",
	};
	const [state, setState] = useState(initialState);

	const handleKeyPress = (e) => {
		let searchQuery = e.target.value;
		setState({ ...state, searchQuery: searchQuery });
		if (e.keyCode === 13) {
			e.preventDefault();
			Router.push(`/search?query=${searchQuery}`);
		}
	};

	const handleSearchSubmit = (e) => {
		if (state.searchQuery !== "") {
			Router.push(`/search?query=${state.searchQuery}`);
		} else {
			e.preventDefault();
			searchInputRef.current.focus();
		}
	};

	const handleResponsiveMenu = () =>
		!state.isResponsiveMenuOpen
			? setState({ ...state, isResponsiveMenuOpen: true })
			: setState({ ...state, isResponsiveMenuOpen: false });

	const handleSearchPanel = () =>
		!state.isSearchPanelOpen
			? setState({ ...state, isSearchPanelOpen: true })
			: setState({ ...state, isSearchPanelOpen: false });

	const handleMenuDropdownVisibility = () =>
		!state.isMenuDropdownOpen
			? setState({ ...state, isMenuDropdownOpen: true })
			: setState({ ...state, isMenuDropdownOpen: false });

	useEffect(() => {
		if (user) {
			setState({
				...initialState,
				logoUrl: "/2i8ZXlkM4cFKUPBrm3-admin-panel",
			});
		}
	}, [user]);

	const dropdownItems = [
		{
			href: "/histories",
			title: "Històries en parella",
			icon: `<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						stroke="none"
						d="M0 0h24v24H0z"
						fill="none"
					/>
					<path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
					<path d="M13 8l2 0" />
					<path d="M13 12l2 0" />
				</svg>`,
			text: "Històries",
		},
		{
			href: "/llistes",
			title: "Llistes",
			icon: `<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						stroke="none"
						d="M0 0h24v24H0z"
						fill="none"
					/>
					<path d="M13 5h8" />
					<path d="M13 9h5" />
					<path d="M13 15h8" />
					<path d="M13 19h5" />
					<path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
					<path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
				</svg>`,
			text: "Llistes",
		},
		{
			href: "/viatges",
			title: "Viatges",
			icon: `<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						stroke="none"
						d="M0 0h24v24H0z"
						fill="none"
					/>
					<path d="M10 19m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
					<path d="M12 16c3.314 0 6 -4.686 6 -8a6 6 0 1 0 -12 0c0 3.314 2.686 8 6 8z" />
					<path d="M12 9m-2 0a2 7 0 1 0 4 0a2 7 0 1 0 -4 0" />
				</svg>`,
			text: "Viatges",
		},
		{
			href: "/sobre-nosaltres",
			title: "Sobre nosaltres",
			icon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>`,
			text: "Sobre nosaltres",
		},
		{
			href: "/premsa-i-mitjans",
			title: "Premsa i mitjans",
			icon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M16 3l-4 4l-4 -4" /></svg>`,
			text: "Premsa i mitjans"
		},
		{
			href: "/contacte",
			title: "Contacta'ns",
			liClassName: "mt-2",
			aClassName: "button button__primary button__med",
			text: "Contacta'ns",
		},
	];

	return (
		<header className="z-50 bg-white w-full sticky top-0 border-b border-primary-50">
			<nav className="px-5 py-4 md:py-5 menu">
				<div className="w-full flex items-center justify-between lg:justify-start">
					{/* Search input */}
					<div className="flex xl:w-5/12 order-2 xl:order-1 lg:flex-1 lg:mr-8">
						<button
							className="search__open"
							onClick={() => handleSearchPanel()}
							aria-label="Obrir panell de cerca"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="26"
								height="26"
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
						</button>
						<div
							className={`search__panel ${
								state.isSearchPanelOpen ? "open" : ""
							}`}
						>
							{/* Button close */}
							<button
								className="search__close"
								aria-label="Botó tancar menu"
								onClick={() => handleSearchPanel()}
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
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
							<form className="search__form xl:max-w-md">
								<fieldset className="search__fieldset">
									<label
										htmlFor="search"
										className="search__label"
									>
										Cerca experiències i allotjaments
									</label>

									<input
										onKeyDown={handleKeyPress}
										type="text"
										name="search"
										id="search"
										ref={searchInputRef}
										placeholder="Cerca escapades..."
										className="search__input"
									/>

									<button
										type="submit"
										className="search__submit button button__med button__primary"
										onClick={handleSearchSubmit}
									>
										<span>Buscar</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
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
											/>
											<circle cx="10" cy="10" r="7" />
											<line
												x1="21"
												y1="21"
												x2="15"
												y2="15"
											/>
										</svg>
									</button>
								</fieldset>
							</form>
						</div>
					</div>
					<Link
						href={{
							pathname: state.logoUrl,
						}}
					>
						<a
							title="Inici"
							className="block mr-8 xl:ml-8 xl:order-2 flex-1 lg:flex-none"
						>
							<picture>
								<img
									src="/logo-escapades-en-parella.svg"
									alt="Logo Escapadesenparella.cat"
									width={144}
									height={40}
									className="w-36 md:w-44 h-auto"
									loading="eager"
								/>
							</picture>
						</a>
					</Link>
					<div
						className={`menu ${
							state.isResponsiveMenuOpen ? "open" : ""
						} xl:w-5/12 order-3 md:order-2 flex-none`}
					>
						{/* Button open */}
						<button
							className="menu__open"
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

						{/* Menu list */}
						<ul className="menu__list">
							{/* Button close */}
							<li className="lg:hidden">
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
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<line x1="18" y1="6" x2="6" y2="18" />
										<line x1="6" y1="6" x2="18" y2="18" />
									</svg>
								</button>
							</li>
							<li className="menu__item">
								<Link href="/activitats">
									<a
										className="menu__link"
										title="Experiències en parella a Catalunya"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path
												stroke="none"
												d="M0 0h24v24H0z"
												fill="none"
											/>
											<path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
											<path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4z" />
											<path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" />
										</svg>
										Experiències
									</a>
								</Link>
							</li>
							<li className="menu__item">
								<Link href="/allotjaments">
									<a
										className="menu__link"
										title="Allotjaments amb encant a Catalunya"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
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
							</li>
							<li
								className={`menu__item menu-dropdown ${
									state.isMenuDropdownOpen ? "open" : ""
								}`}
							>
								<button
									className={`menu__link menu__link-more menu-dropdown__button`}
									onClick={() =>
										handleMenuDropdownVisibility()
									}
									aria-label="Gestionar menú"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<path d="M4 6l16 0" />
										<path d="M4 12l16 0" />
										<path d="M4 18l16 0" />
									</svg>
									Menú
								</button>
								<ul className="menu-dropdown__list">
									{dropdownItems.map((item) => {
										return (
											<li
												className={`menu__item ${
													item.liClassName
														? item.liClassName
														: ""
												}`}
											>
												<Link href={item.href}>
													<a
														className={`menu__link ${
															item.aClassName
																? item.aClassName
																: ""
														}`}
													>
														{item.icon ? (
															<span
																dangerouslySetInnerHTML={{
																	__html: item.icon,
																}}
															></span>
														) : (
															""
														)}
														{item.text}
													</a>
												</Link>
											</li>
										);
									})}
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<ContentBar />
		</header>
	);
};

export default NavigationBar;

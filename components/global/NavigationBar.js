import Router from "next/router";
import { useContext, useRef, useState } from "react";
import Link from "next/link";
import UserContext from "../../contexts/UserContext";

const NavigationBar = ({ logo_url, path }) => {
	const { user } = useContext(UserContext);
	const searchInputRef = useRef(null);

	const initialState = {
		searchQuery: "",
		isResponsiveMenuOpen: false,
		isSearchPanelOpen: false,
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
	}

	const handleResponsiveMenu = () => !state.isResponsiveMenuOpen ? setState({ ...state, isResponsiveMenuOpen: true }) : setState({ ...state, isResponsiveMenuOpen: false });
	const handleSearchPanel = () => !state.isSearchPanelOpen ? setState({ ...state, isSearchPanelOpen: true }) : setState({ ...state, isSearchPanelOpen: false });

	let logoLink =
		user === "null" || !user || user === undefined
			? "/"
			: "/2i8ZXlkM4cFKUPBrm3-admin-panel";

	return (
		<header className="z-50 bg-white w-full sticky top-0">
			<nav className="px-5 py-4 md:py-5 menu">
				<div className="w-full flex items-center justify-between lg:justify-start">
					{/* Search input */}
					<div className="flex xl:w-5/12 order-2 xl:order-1 lg:flex-1 lg:mr-8">
						<button className="search__open" onClick={() => handleSearchPanel()} aria-label="Obrir panell de cerca">
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
						<div className={`search__panel ${state.isSearchPanelOpen ? 'open' : ''}`}>
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
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
							<form className="search__form xl:max-w-md">
								<fieldset className="search__fieldset">
									<label htmlFor="search" className="search__label">Cerca experiències i allotjaments</label>

									<input
										onKeyDown={handleKeyPress}
										type="text"
										name="search"
										id="search"
										ref={searchInputRef}
										placeholder="Cerca escapades..."
										className="search__input"
									/>

									<button type="submit" className="search__submit button button__med button__primary" onClick={handleSearchSubmit}>
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
											<path stroke="none" d="M0 0h24v24H0z" />
											<circle cx="10" cy="10" r="7" />
											<line x1="21" y1="21" x2="15" y2="15" />
										</svg></button>
								</fieldset>
							</form>
						</div>
					</div>
					<Link href={logoLink}>
						<a title="Escapadesenparella.cat" className="block mr-8 xl:ml-8 xl:order-2 flex-1 lg:flex-none">
							<picture>
								<img src="/logo-escapades-en-parella.svg" alt="Logo Escapadesenparella.cat" className="w-36 md:w-44 h-auto" loading="eager" />
							</picture>
						</a>
					</Link>
					<div className={`menu ${state.isResponsiveMenuOpen ? 'open' : ''} xl:w-5/12 order-3 md:order-2 flex-none`}>

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
							<li>
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
							</li>
							<li className="menu__item">
								<Link href="/activitats">
									<a className="menu__link" title="Experiències en parella a Catalunya">
										Experiències
									</a>
								</Link>
							</li>
							<li className="menu__item">
								<Link href="/allotjaments">
									<a className="menu__link">
										Allotjaments
									</a>
								</Link>
							</li>
							<li className="menu__item">
								<Link href="/histories">
									<a className="menu__link">
										Històries
									</a>
								</Link>
							</li>
							<li className="menu__item">
								<Link href="/llistes">
									<a className="menu__link">
										Llistes
									</a>
								</Link>
							</li>
							<li className="menu__item">
								<Link href="/viatges">
									<a className="menu__link">
										Viatges
									</a>
								</Link>
							</li>
							<li className="menu__item">
								<Link href="/contacte">
									<a className="button button__primary button__med menu__link">
										Contacta'ns
									</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default NavigationBar;

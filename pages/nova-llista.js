import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import EditorNavbar from "../components/editor/EditorNavbar";
import StarterKit from "@tiptap/starter-kit";
import UserContext from "../contexts/UserContext";
import Router, { useRouter } from "next/router";
import NavigationBar from "../components/global/NavigationBar";
import Image from "@tiptap/extension-image";
import ContentService from "../services/contentService";
import FetchingSpinner from "../components/global/FetchingSpinner";
import Link from "@tiptap/extension-link";

const ListForm = () => {
	// Validate if user is allowed to access this view
	const { user } = useContext(UserContext);
	const [loadPage, setLoadPage] = useState(false);
	useEffect(() => {
		if (user) {
			setLoadPage(true);
		}
	}, []);
	// End validation

	const router = useRouter();

	useEffect(() => {
		if (!user || user === "null" || user === undefined) {
			router.push("/login");
		} else {
			if (user) {
				if (user.accountCompleted === false) {
					router.push("/signup/complete-account");
				}
				if (user.hasConfirmedEmail === false) {
					router.push("/signup/confirmacio-correu");
				}
			}
		}
		if (
			router.pathname.includes("editar") ||
			router.pathname.includes("nova-activitat") ||
			router.pathname.includes("nou-allotjament") ||
			router.pathname.includes("nova-historia") ||
			router.pathname.includes("nova-llista")
		) {
			document.querySelector("body").classList.add("bg-primary-100");
		} else {
			document.querySelector("body").classList.remove("bg-primary-100");
		}
	}, [user]);

	const initialState = {
		formData: {
			emptyForm: true,
			type: "list",
			title: "",
			subtitle: "",
			cover: "",
			blopCover: "",
			coverCloudImage: "",
			isReadyToSubmit: false,
			cloudImagesUploaded: false,
			coverCloudImageUploaded: false,
			metaTitle: "",
			metaDescription: "",
			slug: "",
		},
	};

	const [state, setState] = useState(initialState);
	const [editorData, setEditorData] = useState({});
	const [queryId, setQueryId] = useState(null);
	const [activeTab, setActiveTab] = useState("main");

	useEffect(() => {
		if (router && router.route) {
			setQueryId(router.route);
		}
	}, [router]);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Image,
			Link.configure({
				openOnClick: false,
				autolink: false,
				defaultProtocol: "https",
			}),
		],
		content: "",
		onUpdate: (props) => {
			const data = {
				html: props.editor.getHTML(),
				text: props.editor.state.doc.textContent,
			};
			setEditorData(data);
		},
		autofocus: false,
		parseOptions: {
			preserveWhitespace: true,
		},
	});

	const service = new ContentService();

	const saveFileToStatus = (e) => {
		const fileToUpload = e.target.files[0];
		if (e.target.name === "cover") {
			setState({
				...state,
				formData: {
					...state.formData,
					blopCover: URL.createObjectURL(fileToUpload),
					cover: fileToUpload,
				},
			});
		}
	};

	const handleChange = (e) => {
		setState({
			...state,
			formData: {
				...state.formData,
				[e.target.name]: e.target.value,
				emptyForm: false,
			},
		});
	};

	let coverImage;
	if (state.formData.blopCover) {
		coverImage = (
			<div className="m-2 relative w-48 h-auto overflow-hidden rounded-md border-8 border-white shadow">
				<img src={state.formData.blopCover} />
			</div>
		);
	}

	const handleFileUpload = async (e) => {
		const cover = state.formData.cover;
		const uploadData = new FormData();
		uploadData.append("imageUrl", cover);
		const uploadedCover = await service.uploadFile(uploadData);
		setState({
			...state,
			formData: {
				...state.formData,
				coverCloudImage: uploadedCover.path,
				coverCloudImageUploaded: true,
			},
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleFileUpload();
	};

	useEffect(() => {
		if (state.formData.coverCloudImageUploaded === true) {
			submitList();
		}
	}, [state.formData]);

	const submitList = async () => {
		const {
			type,
			title,
			subtitle,
			coverCloudImage,
			metaTitle,
			metaDescription,
			slug,
		} = state.formData;
		service
			.list(
				type,
				title,
				subtitle,
				coverCloudImage,
				metaTitle,
				metaDescription,
				slug,
				editorData.html
			)
			.then(() => {
				Router.push("/2i8ZXlkM4cFKUPBrm3-admin-panel");
			})
			.catch((err) => console.error(err));
	};

	if (!loadPage) {
		return <FetchingSpinner />;
	}

	return (
		<>
			<Head>
				<title>Crea una nova llista - Escapadesenparella.cat</title>
			</Head>
			<div id="storyForm">
				<NavigationBar
					logo_url={
						"https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
					}
					user={user}
					path={queryId}
				/>
				<section>
					<div className="container">
						<div className="pt-7 pb-12">
							<div className="flex items-center justify-between">
								<div className="w-full lg:w-1/2">
									<h1 className="text-3xl">
										Crea una llista
									</h1>
									<p className="text-base">
										Crea una nova llista per inspirar a
										altres parelles
									</p>
								</div>
								<div className="w-full lg:w-1/2 flex justify-end">
									<button
										className="button__primary button__lg"
										type="submit"
										onClick={handleSubmit}
									>
										Publicar
									</button>
								</div>
							</div>
							<div className="form-composer__body">
								<div className="flex items-center justify-between overflow-hidden border border-primary-100 mb-4 bg-white shadow rounded-md">
									<button
										className={`flex-1 bg-none px-4 py-4 text-primary-500 !rounded-md-none focus:border-t-4 focus:border-primary-500 text-sm ${
											activeTab === "main"
												? "border-t-4 border-primary-500"
												: ""
										}`}
										onClick={() => setActiveTab("main")}
									>
										Contingut principal
									</button>
									<button
										className={`flex-1 bg-none px-4 py-4 text-primary-500 !rounded-md-none focus:border-t-4 focus:border-primary-500 text-sm ${
											activeTab === "seo"
												? "border-t-4 border-primary-500"
												: ""
										}`}
										onClick={() => setActiveTab("seo")}
									>
										SEO
									</button>
								</div>
								{activeTab === "main" ? (
									<div className="form__wrapper">
										<form className="form">
											<div className="form__group">
												<label
													htmlFor="title"
													className="form__label"
												>
													Títol
												</label>
												<input
													type="text"
													name="title"
													placeholder="Títol de l'allotjament"
													className="form__control"
													value={state.formData.title}
													onChange={handleChange}
												/>
											</div>
											<div className="form__group">
												<label
													htmlFor="subtitle"
													className="form__label"
												>
													Subtítol
												</label>
												<input
													type="text"
													name="subtitle"
													placeholder="Subtítol de l'allotjament"
													className="form__control"
													value={
														state.formData.subtitle
													}
													onChange={handleChange}
												/>
											</div>
											<div className="cover">
												<span className="form__label">
													Imatge de portada
												</span>
												<div className="flex items-center flex-col max-w-full mb-4">
													<div className="bg-white border border-primary-100 rounded-tl-md rounded-tr-md w-full">
														<div className="bg-white border-none h-auto p-4 justify-start">
															<label className="form__label m-0 bg-white rounded-md shadow py-3 px-5 inline-flex items-center cursor-pointer">
																<input
																	type="file"
																	className="hidden"
																	name="cover"
																	onChange={
																		saveFileToStatus
																	}
																/>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	className="mr-2"
																	width="22"
																	height="22"
																	viewBox="0 0 24 24"
																	strokeWidth="1.5"
																	stroke="#0d1f44"
																	fill="none"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																>
																	<path
																		stroke="none"
																		d="M0 0h24v24H0z"
																		fill="none"
																	/>
																	<circle
																		cx="12"
																		cy="13"
																		r="3"
																	/>
																	<path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
																	<line
																		x1="15"
																		y1="6"
																		x2="21"
																		y2="6"
																	/>
																	<line
																		x1="18"
																		y1="3"
																		x2="18"
																		y2="9"
																	/>
																</svg>
																{state.formData
																	.cover
																	? "Canviar imatge"
																	: "Seleccionar imatge"}
															</label>
														</div>
													</div>
													<div className="w-full border border-primary-100 rounded-br-md rounded-bl-md -mt-px p-4 flex">
														<div className="-m-2.5 flex flex-wrap items-center">
															{coverImage}
														</div>
													</div>
												</div>
											</div>
										</form>
										<EditorNavbar editor={editor} />
										<EditorContent
											editor={editor}
											className="form-composer__editor"
										/>
									</div>
								) : (
									<div className="form__wrapper">
										<form
											className="form"
											onSubmit={handleSubmit}
										>
											<div className="form__group">
												<label
													htmlFor="metaTitle"
													className="form__label"
												>
													Meta títol{" "}
												</label>
												<input
													type="text"
													name="metaTitle"
													placeholder="Meta títol"
													className="form__control"
													value={
														state.formData.metaTitle
													}
													onChange={handleChange}
												/>
												<span className="form__text_info">
													Cada publicació hauria de
													tenir un meta títol únic,
													idealment de menys de 60
													caràcters de llargada
												</span>
											</div>

											<div className="form__group">
												<label
													htmlFor="metaDescription"
													className="form__label"
												>
													Meta descripció{" "}
												</label>
												<input
													type="text"
													name="metaDescription"
													placeholder="Meta descripció"
													className="form__control"
													value={
														state.formData
															.metaDescription
													}
													onChange={handleChange}
												/>
												<span className="form__text_info">
													Cada publicació hauria de
													tenir una meta descripció
													única, idealment de menys de
													160 caràcters de llargada
												</span>
											</div>

											<div className="form__group">
												<label
													htmlFor="slug"
													className="form__label"
												>
													Slug{" "}
												</label>
												<input
													type="text"
													name="slug"
													placeholder="Slug de l'allotjament"
													className="form__control"
													value={state.formData.slug}
													onChange={handleChange}
												/>
											</div>
										</form>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default ListForm;

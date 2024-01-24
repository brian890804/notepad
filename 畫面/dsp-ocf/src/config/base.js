// process.env pass by webpack

export default {
	domain: import.meta.env.VITE_APP_DOMAIN,
	contextRoot: import.meta.env.VITE_APP_CONTEXT_ROOT,
};

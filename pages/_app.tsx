import React from "react";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/global.scss";
import "../styles/tailwind.css";
import "../styles/components/index.scss";

// if (process.env.NEXT_PUBLIC_API_MOCKING === "true") {
// 	import("../mocks").then((res) => {
// 		res.setupMocks();
// 	});
// }

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = React.useRef(new QueryClient());

	return (
		<QueryClientProvider client={queryClient.current}>
			{/*
        Hydrate and deHydrate for cache everything in react query on the server
        we grab this dehydrated state as props
        prefetched the data on the server
      */}
			<Hydrate state={pageProps.dehydratedState}>
				<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;

import React from "react";
import Flashcard from "@/components/Flashcard";
import { ClerkProvider } from "@clerk/nextjs";


const App: React.FC = () => {
    return (
        <div>
            {/* <ClerkProvider {...pageProps} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}> */}
            <Flashcard />
            {/* </ClerkProvider> */}
        </div>
    );
};

export default App;


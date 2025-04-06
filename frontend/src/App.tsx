import { AppShell, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import Content from "./components/Content";


function App() {
    return (
        <MantineProvider forceColorScheme="dark">
            <AppShell
                header={{ height: 50 }}
                padding="md"
            >
                <AppShell.Main>
                    <Content />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    )
}

export default App

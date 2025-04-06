import { useState } from "react";
import {
    Button,
    Container,
    Group,
    Tabs,
    Title,
} from "@mantine/core";
import { IconFileCv, IconFileCvFilled } from "@tabler/icons-react";

import Drop from "./Drop";
import Pdf from "./Pdf";
import Typescript from "./Typescript";


export default function Content() {
    const [pdf, setPdf] = useState<string | null>(null);
    const [ts, setTs] = useState<string | null>(null);

    return (
        <Container>
            <Title ta="center" my="xl" size={70}>ResumeLang</Title>
            <Drop setPdf={setPdf} setTs={setTs}/>
            <Group mt="xl" justify  ="center">
                <Button
                    variant="default"
                    size="lg"
                    type="href"
                    component="a"
                    download
                    href={"example.resume"}
                    leftSection={<IconFileCvFilled />}
                >
                    Short Example
                </Button>
                <Button
                    variant="default"
                    size="lg"
                    type="href"
                    component="a"
                    download
                    href={"longer.resume"}
                    leftSection={<IconFileCvFilled />}
                >
                    Longer Example
                </Button>
                <Button
                    variant="default"
                    size="lg"
                    type="href"
                    component="a"
                    download
                    href={"template.resume"}
                    leftSection={<IconFileCv />}
                >
                    Template
                </Button>
            </Group>
            <Tabs defaultValue="pdf" mt="xl">
                <Tabs.List>
                    <Tabs.Tab value="pdf">PDF</Tabs.Tab>
                    <Tabs.Tab value="typescript">Typescript</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="pdf">
                    {pdf && (<Pdf pdf={pdf} />)}
                </Tabs.Panel>
                <Tabs.Panel value="typescript">
                    {ts && <Typescript ts={ts} />}
                </Tabs.Panel>
            </Tabs>
        </Container>
    )
}

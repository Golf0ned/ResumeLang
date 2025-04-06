import { useState } from "react";
import {
    Button,
    Code,
    Container,
    Title,
} from "@mantine/core";

import Drop from "./Drop";

export default function Content() {
    const [pdf, setPdf] = useState<string | null>(null);
    const [ts, setTs] = useState<string | null>(null);

    return (
        <Container>
            <Title ta="center" my="xl" size={70}>ResumeLang</Title>
            <Drop setPdf={setPdf} setTs={setTs}/>
            {pdf && (
                <Button
                    mt="xl"
                    component="a"
                    href={pdf}
                    download="resume.pdf"
                >
                    Download PDF
                </Button>
            )}
            {ts && (
                <Code block mt="xl" style={{ whiteSpace: "pre-wrap" }}>
                    {ts}
                </Code>
            )}
        </Container>
    )
}

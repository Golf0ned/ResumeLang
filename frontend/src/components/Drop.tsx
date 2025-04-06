import { useState } from "react";

import { Button, Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";


interface Props {
    setPdf: (file: string | null) => void;
    setTs: (file: string | null) => void;
}
export default function Drop({ setPdf, setTs }: Props) {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDrop = async (file: File[]) => {
        setFileName(file[0].name);
        const files = new FormData();
        files.append("resume", file[0]);
        // pdf
        try {
            const response_pdf = await fetch("http://127.0.0.1:5000/api/compile/pdf", {
                method: "POST",
                body: files,
            });

            if (!response_pdf.ok) {
                throw new Error("API call for resume failed");
            }
            const pdfBlob = await response_pdf.blob();
            const pdfFile = URL.createObjectURL(pdfBlob);

            setPdf(pdfFile);
        } catch (error) {
            console.error("Error compiling PDF file:", error);
        }

        // ts
        try {
            const response_ts = await fetch("http://127.0.0.1:5000/api/compile/typescript", {
                method: "POST",
                body: files,
            });
            if (!response_ts.ok) {
                throw new Error("API call for ts failed");
            }
            const tsBlob = await response_ts.blob();
            const reader = new FileReader();
            reader.onload = () => {
                const tsText = reader.result as string;
                setTs(tsText);
            };
            reader.readAsText(tsBlob);
        } catch (error) {
            console.error("Error compiling TS file:", error);
        }
    }

    return (
        <Dropzone
            onDrop={(file) => handleDrop(file)}
            maxSize={5 * 1024 ** 2}
            maxFiles={1}
        >
            <Button
                variant="default"
                fullWidth
                mih={220}
                onClick={(e) => e.preventDefault()}
            >
                <Group justify="center" gap="xl" style={{ pointerEvents: "none" }}>
                    <div>
                      <Text size="xl" inline>
                        Drag .resume files here or click to select files
                      </Text>
                      {fileName && (
                        <Text size="sm" c="dimmed" inline mt={7}>
                          {fileName}
                        </Text>
                      )}
                    </div>
                </Group>
            </Button>
        </Dropzone>
    );
}

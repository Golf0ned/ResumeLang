import { Space } from "@mantine/core";

interface Props {
    pdf: string;
}
export default function Pdf({ pdf }: Props) {
    return (
        <>
            <Space h="xl" />
            <object
                data={pdf}
                type="application/pdf"
                width="100%"
                height="1000px"
            />
        </>
    );
}

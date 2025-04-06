import {
    Code,
} from "@mantine/core";


interface Props {
    ts: string;
}
export default function Typescript({ ts }: Props) {
    return (
        <Code block mt="xl" style={{ whiteSpace: "pre-wrap" }}>
            {ts}
        </Code>
    )
}

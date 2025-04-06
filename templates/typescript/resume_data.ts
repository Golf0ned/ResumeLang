interface Education {
    name: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
}

interface Project {
    name: string;
    start: string;
    end: string;
    description?: string[];
}

interface Work {
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string[];
}

<< if education >>
export const education: Education[] = [
<< for e in education >>
    {
        name: "<;e.name;>",
        degree: "<;e.degree;>",
        location: "<;e.location;>",
        startDate: "<;e.start;>",
        endDate: "<;e.end;>",
        gpa: "<;e.gpa;>",
    },
<< endfor >>
];
<< endif >>

<< if projects >>
export const projects: Project[] = [
<< for p in projects >>
    {
        name: "<;p.name;>",
        start: "<;p.start;>",
        end: "<;p.end;>",
<< if p.bullets >>
        description: [
<< for d in p.bullets >>
            "<;d;>",
<< endfor >>
        ],
<< endif >>
    },
<< endfor >>
];
<< endif >>

<< if work >>
export const work: Work[] = [
<< for w in work >>
    {
        company: "<;w.company;>",
        role: "<;w.role;>",
        location: "<;w.location;>",
        startDate: "<;w.startDate;>",
        endDate: "<;w.endDate;>",
<< if w.bullets >>
        description: [
<< for d in w.bullets >>
            "<;d;>",
<< endfor >>
        ],
<< endif >>
    },
<< endfor >>
];
<< endif >>

export type {
<< if education >>
    Education,
<< endif >>
<< if projects >>
    Project,
<< endif >>
<< if work >>
    Work
<< endif >>
};

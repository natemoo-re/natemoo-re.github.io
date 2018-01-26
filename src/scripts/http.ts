export interface ProjectResponse {
    title: string;
    link: string;
}

export interface ProjectsResponse {
    projects: ProjectResponse[]
}

export class HTTP {
    getProjects(): Promise<ProjectsResponse> {
        return fetch('../data/projects.json')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => res.projects);
    }
}

const Http = new HTTP();
export default Http;
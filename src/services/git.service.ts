import Git from "nodegit";

export class GitService {
    async clone(uri: string, path: string): Promise<string> {
        await Git.Clone.clone(uri, path);
        return "Repository was cloned";
    }

    async pull(path: string): Promise<string> {
        const repo = await Git.Repository.open(path);
        await repo.fetchAll();
        await repo.mergeBranches(
            "master",
            "origin/master",
            Git.Signature.default(repo),
            Git.Merge.PREFERENCE.FASTFORWARD_ONLY
        );
        return "Repository was pulled";
    }

    async download(uri: string, path: string): Promise<string> {
        try {
            return this.pull(path);
        } catch (err) {
            return this.clone(uri, path);
        }
    }
}
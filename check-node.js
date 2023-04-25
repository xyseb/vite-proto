import semver from 'semver';
import pc from 'picocolors';
import conf from './package';
import { execSync } from 'node:child_process';

const nodeVersion = conf.engines.node;
const npmVersion = conf.engines.npm;
const currentNpmVersion = execSync('node -v', { 'encoding': 'utf-8' });

if (!semver.satisfies(process.version, nodeVersion))
{
    console.log(pc.red(`--------------------------------------------------`));
    console.log(pc.red(`[${conf.name}] Required node version ${nodeVersion} not satisfied with current version ${process.version}.`));
    console.log(pc.cyan(`Please run 'nvm use ${nodeVersion}' before.`));
    console.log(pc.red(`--------------------------------------------------`));
    process.exit(1);
}

if (currentNpmVersion !== npmVersion)
{
    console.log(pc.red(`--------------------------------------------------`));
    console.log(pc.red(`[${conf.name}] Required npm version ${npmVersion} not satisfied with current version ${currentNpmVersion}.`));
    console.log(pc.cyan(`Please ensure that the npm version definded into the engines.npm field of package.json is up to date with your npm version. This could appear when you update npm to a new version without update the package.json npm version.`));
    console.log(pc.red(`--------------------------------------------------`));
    process.exit(1);
}

process.exit(0);
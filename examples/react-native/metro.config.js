const path = require('path');
const { readdirSync } = require('fs');

const rootPackage = require('./package.json');
const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '../..');

function findSharedPackages(root, sharedPackagesFolder) {
  const sharedPackageRoots = sharedPackagesFolder.map((packageFolder) =>
    path.resolve(root, packageFolder),
  );

  return sharedPackageRoots
    .map((sharedPackageRoot) =>
      readdirSync(sharedPackageRoot, {
        withFileTypes: true,
      })
        .filter(
          ({ isDirectory, name }) => isDirectory() && !name.startsWith('.'),
        )
        .map(({ name }) => {
          const packagePath = path.resolve(sharedPackageRoot, name);
          const packageName = require(`${packagePath}/package.json`).name;

          return { packageName, packagePath };
        }),
    )
    .flat();
}

const config = { resolver: {}, transformer: {} };

// only 'packages' for now, but can be extended for use with another folder in the future
const monoRepoFolders = ['packages'];

const dependencies = {
  ...rootPackage.dependencies,
  ...rootPackage.devDependencies,
};

// use * as version to denote internally used packages
const internalUsedDeps = Object.keys(dependencies).filter(
  (dep) => dependencies[dep] === '*',
);

const isInternalUsedDep = ({ packageName }) =>
  internalUsedDeps.some((dep) => packageName === dep);
const isNotRootPackage = ({ packageName }) => packageName !== rootPackage.name;

const allRepoPackages = findSharedPackages(
  path.resolve(workspaceRoot),
  monoRepoFolders,
);

/**
 * Prevent watching the entire repo, only watch:
 * - Root node_modules
 * - Other libraries in the monorepo
 */

const watchFolders = allRepoPackages
  .filter(isInternalUsedDep)
  .map(({ packagePath }) => packagePath);

config.watchFolders = [
  path.resolve(__dirname, '../../node_modules'),
  ...watchFolders,
];

/**
 * Include app & package node_modules
 */

config.resolver.nodeModulesPath = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

/**
 * Prevent other deps from conflicting with the example app's node_modules
 *
 * 1. Block the folders of other apps & libraries that aren't a dependency
 * 2. For apps that are a dependency, block their node_modules as to not conflict
 *    with this project's react-native package and other dependencies it uses
 * 3. Omit this apps/package's project directory, to allow watching for changes
 */

const unusedRepoPackages = allRepoPackages
  .filter(isNotRootPackage)
  .filter((package) => !isInternalUsedDep(package))
  .map(
    ({ packagePath }) =>
      new RegExp(`^${escape(path.resolve(packagePath))}\\/.*$`),
  );
const usedRepoPackages = allRepoPackages
  .filter(isNotRootPackage)
  .filter(isInternalUsedDep)
  .map(
    ({ packagePath }) =>
      new RegExp(`^${escape(path.resolve(packagePath, 'node_modules'))}\\/.*$`),
  );

config.resolver.blockList = [...unusedRepoPackages, ...usedRepoPackages];

/**
 * Point to where the example project react-native module is
 */

config.resolver.extraNodeModules = {
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
};

/**
 * Base transform values included by `react-native init`
 * */

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;

# Skyhitz

## Expo

<img src="https://qr.expo.dev/expo-go?owner=skyhitz&slug=skyhitz&releaseChannel=staging&host=exp.host" width=200/>

## Vercel

https://skyhitz-expo-next.vercel.app/

## 📦 Included packages

- `solito` for cross-platform navigation
- `dripsy` for theming/design (you can bring your own, too)
- Expo SDK 44
- Next.js 12
- React Navigation 6

## 🗂 Folder layout

- `apps` entry points for each app

  - `expo`
  - `next`

- `packages` shared packages across apps
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation` Next.js has a `pages/` folder. React Native doesn't. This folder contains navigation-related code for RN. You may use it for any navigation code, such as custom links.

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

- Install dependencies: `yarn`

- Next.js local dev: `yarn web`
  - Runs `yarn next`
- Expo local dev: `yarn native`
  - Runs `expo start`

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `apps/expo`:

```sh
cd apps/expo
yarn add react-native-reanimated

cd ../..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

## Graphql

To add graphql query/mutation simply create file in the proper folder:

- `packages/app/api/queries/your_query.graphql` for queries
- `packages/app/api/mutations/your_mutation.graphql` for mutations

Then run the following script and let codegen generate graphql types for you:

```sh
yarn graphql:gen
```

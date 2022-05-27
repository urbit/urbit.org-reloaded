The website for Urbit is maintained by [Tlon](https://tlon.io) and the Urbit community. Issues and contributions are welcome.

## Getting Started

1. Fork the [Urbit site repository](https://github.com/urbit/urbit.org).

2. [Create a local clone](https://help.github.com/articles/cloning-a-repository/) of your fork.

3. Navigate to the `urbit.org` directory and install Node 14 using [nvm](https://github.com/nvm-sh/nvm):

    ```shell
    cd urbit.org
    nvm install 14
    ```
    You can then run `nvm use` whenever in the repository (or automate it with a script - see [here](https://github.com/nvm-sh/nvm#deeper-shell-integration)).

4. Install our dependencies:

    ```shell
    npm install
    ```
    
5. Run the development server:

    ```shell
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
    
## Contributing

Once you're ready to contribute:

1. Create a new local branch for your work:

    ``` shell
    cd urbit.org
    git checkout -b "<your branch name>"
    ```

2. Make your changes in the text editor of your choice (e.g., [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/)).

3. Stage your changes for commit:

    ```
    git add <filename>
    ```

4. Commit your changes:

    ```
    git commit -m "<concise message describing changes>"
    ```

5. Run the development server to view your local changes in your browser at [http://localhost:3000](http://localhost:3000).

    ```shell
    npm run dev
    # or
    yarn dev
    ```

6. [Push your local branch to the remote repo](https://help.github.com/articles/pushing-to-a-remote/).

7. Back in the urbit.org repo in the GitHub UI, [open a pull request](https://github.com/urbit/urbit.org/pulls).

Once your changes have been reviewed and any necessary edits have been made, you'll be able to merge your pull request.

## Framework and Library Documentation

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Tailwind CSS, take a look at the docs:

- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Docs

## Deployment

We deploy using Vercel. All pull requests will show a deployment preview via the same.

## Upgrades

The `/scripts` contains scripts used to programmatically upgrade site content data.
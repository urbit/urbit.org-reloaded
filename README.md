# urbit.org

## Test and Develop in Arvo

1. Make sure that all of the necessary submodules (docs) are up to date by running `git submodule init` and then `git submodule update --recursive --remote` in this repo

2. Make a fakezod, using [this branch](https://github.com/urbit/arvo/tree/static-site-dev). It just has a few different renderers and marks for svgs, images, etc. Use the command `urbit -F zod -A <path/to/arvo/repo> -s -c zod -S`

3. In the running fakezod, mount the filesystem by running `|mount /===`

4. Run `./scripts/topier <path/to/pier>` from this directory to copy the pertinent files to your pier

5. Visit `localhost:8080` to see the rendered urbit.org

## To render/export

1. Run `|static` in dojo
2. You will find the outputted site at `<pier>/.urb/put/web`

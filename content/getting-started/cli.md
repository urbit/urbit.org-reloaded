+++
title = "Command line install"
weight = 2
description = "Installation instructions for power users."
+++

If you're a power user, you can run the Urbit virtual machine directly using the
command line. This can be run on your local machine or a server in the cloud, we
just cover the general case here.

Note there is a much more comprehensive [cloud hosting
guide](https://operators.urbit.org/manual/running/hosting) which walks through
setting up Urbit on a [Digital Ocean](https://www.digitalocean.com/) VPS.

### 1. Install Urbit

Choose your operating system and run the given command in your terminal to
download the Urbit runtime:

{% tabs %}

{% tab label="MacOS" %}

```bash
curl -L https://urbit.org/install/mac/latest | tar xzk --strip=1 && ./urbit
```

> Note our Mac build is only compatible with Apple Silicon (M1/M2) via Rosetta.
> If you have such a machine you may need to run the following command:
>
> ```
> /usr/sbin/softwareupdate --install-rosetta --agree-to-license
> ```

{% /tab %}

{% tab label="Linux" %}

```shell
curl -L https://urbit.org/install/linux64/latest | tar xzk --strip=1 && ./urbit
```

> Linux users may need to run this command in another terminal window to access
> your urbit on port 80:
>
> ```shell
> sudo apt-get install libcap2-bin
> sudo setcap 'cap_net_bind_service=+ep' ./urbit
> ```

{% /tab %}

{% tab label="Windows" %}

```winbatch
curl -L https://urbit.org/install/windows/latest | tar -xzkf - --strip-components=1 && urbit
```

> Windows 10 build 17063 and later includes the familiar `curl` and `tar`
> command-line tools. If you're running an older version of Windows, you may need
> to visit
> [https://github.com/urbit/urbit/releases/latest](https://github.com/urbit/urbit/releases/latest)
> in the browser, download the `windows.zip` file, extract it and execute the
> contained `urbit.exe` file in the command prompt.

{% /tab %}

{% /tabs %}

If successful, you will see a block of output beginning with the line:

```
Urbit: a personal server operating function
```

### 2. Boot Urbit

An Urbit instance is intrinsically tied to a unique identity called an **Urbit
ID**. There are five classes of Urbit ID, but we will consider two here: comets
and planets.

- **Comet:** A comet is an identity which anyone can generate themselves, for
  free. It's a good option to try out Urbit. Comets are limited by the fact they
  cannot be "factory reset", meaning if your urbit somehow becomes broken or
  corrupted then you'll have to start again with a new identity. In that sense,
  they are impermanent.

- **Planet:** A planet is a permanent identity which you own forever. Planets
  are the class intended for individuals. While there are essentially an
  unlimited number of comets, planets are more scarce (preventing spamming,
  among other things). This scarcity means they usually aren't free (though
  sometimes nice people give them away). This guide will assume you've already
  acquired a planet. If you haven't, you can refer to the ["Get a planet"
  guide](https://urbit.org/getting-started/get-planet) before continuing.

Follow the instructions for your case:

{% tabs %}

{% tab label="Boot a Comet" %}

In the terminal, with the `urbit` binary you installed in the previous step, a
comet can be booted with the `-c` option:

```bash
./urbit -c mycomet
```

> `mycomet` will be the name given to the data folder it will create. You can
> choose any name you like.

It may take a while to initialize the comet (usually only a couple of minutes,
but it could take longer). When it's done, it'll take you to the dojo prompt
(the dojo is Urbit's shell):

```
ames: live on 31337
http: web interface live on http://localhost:8080
http: loopback live on http://localhost:12321
~sampel_marzod:dojo>
```

You can shut down the comet again by typing `|exit` in the dojo or hitting
`Ctrl+D`. When it's first shut down, the runtime will be copied inside the data
folder, so you can start it up again by doing:

```bash
./mycomet/.run
```

Since comets are often used temporarily and then discarded, kernel updates are
not enabled by default. If you plan to use your comet for a while, it's a good
idea to enable updates with the following command in the dojo:

```
|ota (sein:title our now our)
```

Lastly, while the dojo is quite powerful, most people use their urbit via
Landscape, the browser-based UI. In order to access Landscape, you need your web
login code. You can get this by running the following command in the dojo:

```
+code
```

It'll spit out a code that'll look something like `lidlut-tabwed-pillex-ridrup`.
Copy the code it gives you to the clipboard.

{% /tab %}

{% tab label="Boot a Planet" %}

In order to boot a planet, you need a copy of its private keys. If you got your
planet via a claim link, the passport backup `.zip` file you downloaded will
contain a file called something like `sampel-palnet-1.key`. If you don't have
the passport backup or you got your planet by another method, you can instead
login to [Bridge](https://bridge.urbit.org/), select your planet, go to the OS
section, and hit the "Download Keyfile" button.

Back in the terminal, with the `urbit` binary you installed in the previous
step, you can boot your planet with the following command (replacing
`sampel-palnet` with your own planet and pointing to the location of your
keyfile):

```bash
./urbit -w sampel-palnet -k sampel-palnet-1.key
```

This will create a data folder with the name of your planet and begin booting.
It may take a while to initialize the planet (usually only a couple of minutes,
but it could take longer). When it's done, it'll take you to the dojo prompt
(the dojo is Urbit's shell):

```
ames: live on 31337
http: web interface live on http://localhost:8080
http: loopback live on http://localhost:12321
~sampel-palnet:dojo>
```

You can shut down the planet again by typing `|exit` in the dojo or hitting
`Ctrl+D`. When it's first shut down, the runtime will be copied inside the data
folder, so you can start it up again by doing:

```bash
./sampel-palnet/.run
```

While the dojo is quite powerful, most people use their urbit via Landscape, the
browser-based UI. In order to access Landscape, you need your web login code.
You can get this by running the following command in the dojo:

```
+code
```

It'll spit out a code that'll look something like `lidlut-tabwed-pillex-ridrup`
(note this is a separate code to your master ticket). Copy the code it gives you
to the clipboard.

One last thing: The `sampel-palnet-1.key` keyfile is only needed once, when you
first boot your planet. Now that it's booted, it's good security practice to
delete that keyfile.

{% /tab %}

{% /tabs %}

### 3. Login

While your urbit is running, the web interface called *Landscape* can be
accessed in the browser. Its URL will usually be either `localhost` or
`localhost:8080`, depending on your platform. To check the address, you can look
at the boot messages in the terminal. You should see a line like:

```
http: web interface live on http://localhost:8080
```

Whichever address and port it says there is the one to open in the browser.

Once open, you'll be presented with the login screen. Paste in the web login
code you copied from the dojo in the previous step and hit "continue". You'll
now be taken to your homescreen, with tiles for the default apps such as Groups
and Terminal.

### Next steps

Learn how to [get around your
urbit](https://urbit.org/getting-started/getting-around).

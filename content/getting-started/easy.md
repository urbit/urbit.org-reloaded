+++
title = "Easy"
description = "Run Urbit with a desktop app"
weight = 1
+++

### Get Port

Port is a desktop GUI application that allows you to spin up, access, and manage your Urbit ships without any knowledge of the command line or Urbit binary.

<div id="port-os" class="os">
  <input type="radio" id="port-macos" name="port-os" checked>
  <label for="port-macos">MacOS</label>
  <div class="tab">
    <p>To install <strong>Port</strong> on MacOS simply download and open the <code>.dmg</code> file.</p>
    <a href="https://github.com/urbit/port/releases/latest/download/Port.dmg" class="button-lg bg-green-400 text-white" style="width: 12rem;">
      Download Port
    </a>
  </div>

  <input type="radio" id="port-linux" name="port-os">
  <label for="port-linux">Linux</label>
  <div class="tab">

We use `snap` so that **Port** can stay updated automatically. If you already have `snap` installed, simply run:

```sh
sudo snap install port
```

Or to install `snap` for your distribution, snapcraft provides [installation instructions](https://snapcraft.io/docs/installing-snapd).

  </div>

  <input type="radio" id="port-windows" name="port-os">
  <label for="port-windows">Windows</label>
  <div class="tab">
    <p>To install <strong>Port</strong> on Windows simply download and open the <code>.exe</code> file.</p>
    <a href="https://github.com/urbit/port/releases/latest/download/PortSetup.exe" class="button-lg bg-green-400 text-white" style="width: 12rem;">
      Download Port
    </a>
    <p><small>
    Note: The Windows version is newly released and is not yet code signed so you will have to click through a prompt warning you about running it. If you simply click <code>more info</code> -> <code>run anyway</code> it will run.
    </small></p>
  </div>
</div>

<style>
  .os {
    display: flex;
    flex-wrap: wrap;
  }
  .os label {
    order: -1;
    padding: .5rem;
    min-width: 70px;
    text-align: center;
    cursor: pointer;
  }
  .os input[type="radio"] {
    display: none;
  }
  .os .tab {
    display: none;
    margin-top: 1rem;
    width: 100%;
    max-width: 100%;
  }
  .os .tab p:first-child {
    margin-top: 0;
  }
  .os .tab p:last-child {
    margin-bottom: 0;
  }
  .os input[type='radio']:checked + label {
    font-weight: bold;
    background-color: rgba(244,243,241,1);
    border-radius: 0.5em;
  }
  .os input[type='radio']:checked + label + .tab {
    display: block;
}
</style>

### Launch a comet

A comet serves as a temporary identity for the network. It works just fine for checking out the network, but to download applications and get the full functionality of Urbit ID you’ll need a to get a planet.

Start Port and hit the **Start without an ID** button. It'll take a few minutes to spin up the new comet. Once that's finished, click **Launch Ship into Urbit** and you'll be on the network.

![](https://media.urbit.org/site/getting-started/getting-started-easy-1.png)

<div className="bg-wall-100 p-4 rounded-xl" style="padding-bottom: 1rem;">

**Want to combine the simplicity of Port with a permanent Urbit ID?**

If you already have a planet, first get your keyfile.

Start Port, click the **Boot a fresh ID** option. Give your ship a name, and in the **Shipname** field, enter your planet name, like `~sampel-palnet`. For the **Key File** field, browse to the keyfile, select it, and hit **Continue**.

Port will boot your Urbit in a few minutes!

For more information on getting a planet, see our [Getting an Urbit ID](/guides/getting-an-urbit-id) guide.

</div>

### Next steps

Learn how to [get around your urbit](/getting-started/get-around-your-urbit).
